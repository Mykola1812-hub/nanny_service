'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './LoginForm.module.css';
import { loginSchema, type LoginValues } from '@/lib/validation/schemas';
import { login } from '@/lib/api/authApi';
import { useAuthStore } from '@/lib/store/authStore';
import { getAuthErrorMessage } from '@/lib/utils';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore(state => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    try {
      const user = await login(values);
      setUser(user);
      toast.success(`Welcome back, ${user.name}!`);
      onSuccess();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
