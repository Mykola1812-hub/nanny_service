'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import css from './AppointmentForm.module.css';
import {
  appointmentSchema,
  type AppointmentValues,
} from '@/lib/validation/schemas';
import { createAppointment } from '@/lib/api/appointmentsApi';
import type { Nanny } from '@/types/nanny';

interface AppointmentFormProps {
  nanny: Nanny;
  onSuccess: () => void;
}

export default function AppointmentForm({
  nanny,
  onSuccess,
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: yupResolver(appointmentSchema),
    defaultValues: { phone: '+380' },
  });

  const onSubmit = async (values: AppointmentValues) => {
    try {
      await createAppointment({
        nannyId: nanny.id,
        nannyName: nanny.name,
        ...values,
      });
      toast.success('Your appointment request has been sent!');
      onSuccess();
    } catch {
      toast.error('Could not send the request, please try again');
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Make an appointment with a babysitter</h2>
      <p className={css.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>

      <div className={css.nanny}>
        <Image
          src={nanny.avatar_url}
          alt={nanny.name}
          width={44}
          height={44}
          className={css.nannyAvatar}
        />
        <div>
          <p className={css.nannyLabel}>Your nanny</p>
          <p className={css.nannyName}>{nanny.name}</p>
        </div>
      </div>

      <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={css.row}>
          <div className={css.field}>
            <input
              type="text"
              placeholder="Address"
              className={css.input}
              {...register('address')}
            />
            {errors.address && (
              <span className={css.error}>{errors.address.message}</span>
            )}
          </div>
          <div className={css.field}>
            <input
              type="tel"
              placeholder="+380"
              className={css.input}
              {...register('phone')}
            />
            {errors.phone && (
              <span className={css.error}>{errors.phone.message}</span>
            )}
          </div>
        </div>

        <div className={css.row}>
          <div className={css.field}>
            <input
              type="text"
              placeholder="Child's age"
              className={css.input}
              {...register('childAge')}
            />
            {errors.childAge && (
              <span className={css.error}>{errors.childAge.message}</span>
            )}
          </div>
          <div className={css.field}>
            <input
              type="time"
              className={css.input}
              {...register('meetingTime')}
            />
            {errors.meetingTime && (
              <span className={css.error}>{errors.meetingTime.message}</span>
            )}
          </div>
        </div>

        <div className={css.field}>
          <input
            type="email"
            placeholder="Email"
            className={css.input}
            {...register('email')}
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.field}>
          <input
            type="text"
            placeholder="Father's or mother's name"
            className={css.input}
            {...register('parentName')}
          />
          {errors.parentName && (
            <span className={css.error}>{errors.parentName.message}</span>
          )}
        </div>

        <div className={css.field}>
          <textarea
            placeholder="Comment"
            rows={4}
            className={css.textarea}
            {...register('comment')}
          />
          {errors.comment && (
            <span className={css.error}>{errors.comment.message}</span>
          )}
        </div>

        <button type="submit" className={css.submit} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
