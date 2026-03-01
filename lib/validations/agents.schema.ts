import * as z from 'zod';

export const agentCreationSchema = z.object({
  domain: z.string(),

  style: z.string().optional(),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .trim(),

  purpose: z
    .string()
    .trim()
    .max(150, 'Role description must be under 150 characters.')
    .optional(),

  level: z.string().optional(),
});

export const voiceAgentInstructionSchema = z.object({
  instruction: z
    .string()
    .trim()
    .min(10, 'Please describe your instruction clearly.')
    .max(200, 'Instruction must be under 200 characters.'),
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
