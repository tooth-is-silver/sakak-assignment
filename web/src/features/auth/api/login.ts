import { shouldUseMock } from '@/shared/api';
import {
  loginResponseSchema,
  type AuthenticationSession,
  type LoginFormValues,
} from '../model/schema';

const LOGIN_URL = '/api/login';
const MOCK_LOGIN_URL = '/mock/login.json';
const MOCK_LOGIN_ERROR_URL = '/mock/login-error.json';

export async function requestLogin(credentials: LoginFormValues): Promise<AuthenticationSession> {
  const isMockCredentialsValid = credentials.id === 'sakak' && credentials.password === 'sakak1234';
  const response = shouldUseMock
    ? await fetch(isMockCredentialsValid ? MOCK_LOGIN_URL : MOCK_LOGIN_ERROR_URL)
    : await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  const parsed = loginResponseSchema.safeParse(await response.json().catch(() => null));

  if (!parsed.success) {
    throw new Error('로그인 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }
  if (parsed.data.status === 'error') {
    throw new Error(parsed.data.message);
  }

  return parsed.data.data;
}
