import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({ required_error: 'Username is a required field.' }).min(4, { message: 'Username must be at least 4 characters.' }).optional(),
  email: z.string({ required_error: 'Email is a required field. '}).email(),
  password: z.string({ required_error: 'Password is a required field. '}).min(4, { message: 'Password must be at least 4 characters.' }).optional(),
  socialId: z.string().optional(),
  type: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string({required_error: 'Username is a required field.'})
    .min(4, { message: 'Username is a required field.' })
    .refine((val) => /^(?=[a-z0-9.]{3,20}$)[a-z0-9]+\.?[a-z0-9]+$|^.*@\w+\.[\w.]+$/.test(val), {
      message: 'Field must be either username or email.',
    }).optional(),
  email: z.string({ required_error: 'Email is a required field. '}).email().optional(),
  password: z.string({required_error: 'Password is a required field.'}).min(4, { message: 'Password must be at least 4 characters.' }).optional(),
  socialId: z.string().optional(),
  type: z.string().optional(),
});

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
