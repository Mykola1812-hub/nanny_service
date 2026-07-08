import { create } from 'zustand';

type AuthModal = 'login' | 'register' | null;

interface ModalStore {
  authModal: AuthModal;
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  authModal: null,
  openLogin: () => set({ authModal: 'login' }),
  openRegister: () => set({ authModal: 'register' }),
  closeAuthModal: () => set({ authModal: null }),
}));
