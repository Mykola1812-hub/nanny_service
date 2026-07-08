'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './RegistrationForm.module.css';
import {
  registerSchema,
  type RegisterValues,
} from '@/lib/validation/schemas';
import { register as registerUser } from '@/lib/api/authApi';
import { useAuthStore } from '@/lib/store/authStore';
import { getAuthErrorMessage } from '@/lib/utils';

interface RegistrationFormProps {
  onSuccess: () => void;
}

export default function RegistrationForm({
  onSuccess,
}: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (values: RegisterValues) => {
    try {
      const user = await registerUser(values);
      setUser(user);
      toast.success(`Welcome, ${user.name}!`);
      onSuccess();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.field}>
          <input
            type="text"
            placeholder="Name"
            className={css.input}
            {...register('name')}
          />
          {errors.name && <span className={css.error}>{errors.name.message}</span>}
        </div>

        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register('email')}
          />
          {errors.email && <span className={css.error}>{errors.email.message}</span>}
        </div>

        <div className={css.field}>
          <div className={css.passwordWrap}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={css.input}
              {...register('password')}
            />
            <button
              type="button"
              className={css.toggle}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className={css.submit} disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
