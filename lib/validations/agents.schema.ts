import * as z from 'zod';

export const agentCreationSchema = z.object({
  domain: z.string(),

  style: z.string(),

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

  level: z.string(),
});

export const voiceAgentInstructionSchema = z.object({
  instruction: z
    .string()
    .trim()
    .min(10, 'Please describe your purpose clearly.')
    .max(200, 'Purpose must be under 200 characters.'),
});
