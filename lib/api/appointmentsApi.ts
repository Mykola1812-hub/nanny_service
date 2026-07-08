import { push, ref, serverTimestamp, set } from 'firebase/database';
import { db } from '../firebase/clientApp';

export interface AppointmentPayload {
  nannyId: string;
  nannyName: string;
  address: string;
  phone: string;
  childAge: string;
  meetingTime: string;
  email: string;
  parentName: string;
  comment: string;
}

export const createAppointment = async (
  payload: AppointmentPayload,
): Promise<void> => {
  const appointmentRef = push(ref(db, 'appointments'));
  await set(appointmentRef, { ...payload, createdAt: serverTimestamp() });
};
