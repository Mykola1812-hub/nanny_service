'use client';

import Modal from '@/components/Modal/Modal';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import { useModalStore } from '@/lib/store/modalStore';

export default function AuthModals() {
  const authModal = useModalStore(state => state.authModal);
  const closeAuthModal = useModalStore(state => state.closeAuthModal);

  if (!authModal) {
    return null;
  }

  return (
    <Modal onClose={closeAuthModal}>
      {authModal === 'login' ? (
        <LoginForm onSuccess={closeAuthModal} />
      ) : (
        <RegistrationForm onSuccess={closeAuthModal} />
      )}
    </Modal>
  );
}
