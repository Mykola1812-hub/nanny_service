import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p className={css.brand}>Nanny.Services</p>
        <p className={css.copy}>
          © {new Date().getFullYear()} Nanny.Services. Care you can trust.
        </p>
      </div>
    </footer>
  );
}
