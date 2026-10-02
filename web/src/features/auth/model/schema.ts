import { z } from 'zod';
import { errorResponseSchema } from '@/shared/api';

export const loginFormSchema = z.object({
  id: z.string().min(1, '아이디를 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

const authenticatedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const authenticationSessionSchema = z.object({
  user: authenticatedUserSchema,
  sessionToken: z.string().min(1),
});

export const loginResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: authenticationSessionSchema }),
  errorResponseSchema,
]);

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type AuthenticationSession = z.infer<typeof authenticationSessionSchema>;
export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
