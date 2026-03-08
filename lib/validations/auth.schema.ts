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
      'Password must include upper, lower, number, and special character',
    )
    .trim(),
});

const MAX_SIZE = 2 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export const profileFormSchema = z.object({
  profileImage: z
    .any()
    .refine((file) => file instanceof File, 'Image is required')
    .refine((file) => file.size > 0, 'Image is required')
    .refine((file) => file.size <= MAX_SIZE, 'Max 2MB allowed')
    .refine(
      (file) => ACCEPTED_TYPES.includes(file.type),
      'Only JPG, PNG, WEBP allowed',
    ),
});

export const fileSchema = z.object({
  size: z.number().max(MAX_SIZE, 'Max 2MB is allowed'),
  type: z
    .string()
    .refine(
      (fileType) => ACCEPTED_TYPES.includes(fileType),
      'Only JPG, PNG, WEBP is allowed',
    ),
});

export const emailSchema = z.object({
  purpose: z.string(),
  email: z.email(),
});

const emailVerificationSchema = z.object({
  token: z.string(),
  purpose: z.literal('email_verification'),
});

const passwordResetSchema = z.object({
  token: z.string(),
  purpose: z.literal('reset_password'),
});

export const verifyActionSchema = z.discriminatedUnion('purpose', [
  emailVerificationSchema,
  passwordResetSchema,
]);
