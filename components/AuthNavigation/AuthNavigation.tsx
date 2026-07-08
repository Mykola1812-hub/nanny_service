'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useModalStore } from '@/lib/store/modalStore';
import { logout } from '@/lib/api/authApi';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const clearAuth = useAuthStore(state => state.clearAuth);
  const openLogin = useModalStore(state => state.openLogin);
  const openRegister = useModalStore(state => state.openRegister);

  const handleLogout = async () => {
    await logout();
    clearAuth();
    toast.success('You are logged out');
    router.push('/');
  };

  if (isLoading) {
    return <div className={css.placeholder} aria-hidden="true" />;
  }

  if (isAuthenticated) {
    return (
      <div className={css.userBox}>
        <span className={css.avatar} aria-hidden="true">
          {user?.name?.charAt(0).toUpperCase()}
        </span>
        <span className={css.userName}>{user?.name}</span>
        <button
          type="button"
          className={css.logoutButton}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={css.guestBox}>
      <button type="button" className={css.loginButton} onClick={openLogin}>
        Log In
      </button>
      <button
        type="button"
        className={css.registerButton}
        onClick={openRegister}
      >
        Registration
      </button>
    </div>
  );
}
