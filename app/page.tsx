import Link from 'next/link';
import css from './Home.module.css';
import Header from '@/components/Header/Header';

export default function Home() {
  return (
    <main>
      <section className={css.hero}>
        <Header variant="hero" />
        <div className={css.copy}>
          <h1 className={css.title}>
            Make Life Easier <span>for the Family:</span>
          </h1>
          <p className={css.subtitle}>
            Find Babysitters Online for All Occasions
          </p>
          <Link href="/nannies" className={css.cta}>
            Get started
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 17L17 7M9 7h8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className={css.visual}>
          <div className={css.badge}>
            <span className={css.badgeIcon} aria-hidden="true">
              ✓
            </span>
            <div>
              <p className={css.badgeLabel}>Experienced nannies</p>
              <p className={css.badgeValue}>15,000</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
