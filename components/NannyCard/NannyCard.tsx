'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './NannyCard.module.css';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import Modal from '@/components/Modal/Modal';
import AppointmentForm from '@/components/AppointmentForm/AppointmentForm';
import { getAge } from '@/lib/utils';
import type { Nanny } from '@/types/nanny';

interface NannyCardProps {
  nanny: Nanny;
}

export default function NannyCard({ nanny }: NannyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const meta = [
    { label: 'Age', value: getAge(nanny.birthday) },
    { label: 'Experience', value: nanny.experience },
    { label: 'Kids Age', value: nanny.kids_age },
  ];

  return (
    <>
      <article className={css.card}>
        <div className={css.avatarBox}>
          <Image
            src={nanny.avatar_url}
            alt={nanny.name}
            width={96}
            height={96}
            className={css.avatar}
          />
          <span className={css.online} aria-hidden="true" />
        </div>

        <div className={css.body}>
          <div className={css.top}>
            <div className={css.headings}>
              <p className={css.role}>Nanny</p>
              <h2 className={css.name}>{nanny.name}</h2>
            </div>

            <div className={css.stats}>
              <span className={css.stat}>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 21s-7-6-7-11a7 7 0 1114 0c0 5-7 11-7 11z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="10" r="2.5" fill="currentColor" />
                </svg>
                {nanny.location}
              </span>
              <span className={css.divider} aria-hidden="true" />
              <span className={css.stat}>
                <span className={css.star} aria-hidden="true">
                  ★
                </span>
                Rating: {nanny.rating}
              </span>
              <span className={css.divider} aria-hidden="true" />
              <span className={css.stat}>
                Price / 1 hour:{' '}
                <span className={css.price}>{nanny.price_per_hour}$</span>
              </span>
              <FavoriteButton nannyId={nanny.id} />
            </div>
          </div>

          <ul className={css.chips}>
            {meta.map(item => (
              <li className={css.chip} key={item.label}>
                {item.label}: <strong>{item.value}</strong>
              </li>
            ))}
            <li className={css.chip}>
              Characters:{' '}
              <strong>
                {nanny.characters
                  .map(item => item.charAt(0).toUpperCase() + item.slice(1))
                  .join(', ')}
              </strong>
            </li>
            <li className={css.chip}>
              Education: <strong>{nanny.education}</strong>
            </li>
          </ul>

          <p className={css.about}>{nanny.about}</p>

          {!expanded ? (
            <button
              type="button"
              className={css.readMore}
              onClick={() => setExpanded(true)}
            >
              Read more
            </button>
          ) : (
            <div className={css.details}>
              <ReviewsList reviews={nanny.reviews} />
              <button
                type="button"
                className={css.appointment}
                onClick={() => setIsAppointmentOpen(true)}
              >
                Make an appointment
              </button>
            </div>
          )}
        </div>
      </article>

      {isAppointmentOpen && (
        <Modal onClose={() => setIsAppointmentOpen(false)}>
          <AppointmentForm
            nanny={nanny}
            onSuccess={() => setIsAppointmentOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
