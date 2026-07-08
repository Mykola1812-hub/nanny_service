'use client';

import { useEffect, useRef, useState } from 'react';
import css from './Filters.module.css';
import { SORT_OPTIONS } from '@/lib/constants';
import { useFilterStore } from '@/lib/store/filterStore';

export default function Filters() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const sort = useFilterStore(state => state.sort);
  const setSort = useFilterStore(state => state.setSort);

  const current =
    SORT_OPTIONS.find(option => option.value === sort) ?? SORT_OPTIONS[6];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={css.wrapper} ref={ref}>
      <span className={css.label}>Filters</span>
      <button
        type="button"
        className={css.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {current.label}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={isOpen ? css.chevronOpen : css.chevron}
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.menu} role="listbox">
          {SORT_OPTIONS.map(option => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === sort}
                className={`${css.option} ${
                  option.value === sort ? css.selected : ''
                }`}
                onClick={() => {
                  setSort(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
