import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const appointmentSchema = yup.object({
  address: yup.string().trim().required('Address is required'),
  phone: yup
    .string()
    .trim()
    .matches(/^\+?\d{10,15}$/, 'Enter a valid phone number')
    .required('Phone is required'),
  childAge: yup.string().trim().required("Child's age is required"),
  meetingTime: yup.string().trim().required('Meeting time is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  parentName: yup.string().trim().required('Name is required'),
  comment: yup
    .string()
    .trim()
    .min(5, 'Comment must be at least 5 characters')
    .required('Comment is required'),
});

export type RegisterValues = yup.InferType<typeof registerSchema>;
export type LoginValues = yup.InferType<typeof loginSchema>;
export type AppointmentValues = yup.InferType<typeof appointmentSchema>;
