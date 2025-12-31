import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .email('Provide a valid email')
    .min(5, 'Email must be at least 5 characters')
    .max(254, 'Email must be at most 254 characters')
    .trim(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(65, 'Password must be at most 64 characters')
    .trim(),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .trim(),

  email: z
    .email('Provide a valid email')
    .min(5, 'Email must be at least 5 characters')
    .max(254, 'Email must be at most 254 characters')
    .trim(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(65, 'Password must be at most 64 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/,
      'Password must include upper, lower, number, and special character ZOD',
    )
    .trim(),
});
