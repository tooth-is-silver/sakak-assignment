import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { requestLogin } from '../api/login';
import { AuthenticationContext } from './context';
import {
  authenticationSessionSchema,
  type AuthenticationSession,
  type LoginFormValues,
} from './schema';

const AUTHENTICATION_STORAGE_KEY = 'sakak-authentication-session';

function readStoredSession(): AuthenticationSession | null {
  const storedSession = localStorage.getItem(AUTHENTICATION_STORAGE_KEY);
  if (!storedSession) {
    return null;
  }

  try {
    const parsed = authenticationSessionSchema.safeParse(JSON.parse(storedSession));
    if (parsed.success) {
      return parsed.data;
    }
  } catch {
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
    return null;
  }

  localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
  return null;
}

interface Props {
  children: ReactNode;
}

export function AuthenticationProvider({ children }: Props) {
  const [session, setSession] = useState(readStoredSession);

  const login = useCallback(async (credentials: LoginFormValues) => {
    const nextSession = await requestLogin(credentials);

    localStorage.setItem(AUTHENTICATION_STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ user: session?.user ?? null, login, logout }),
    [login, logout, session],
  );

  return <AuthenticationContext value={value}>{children}</AuthenticationContext>;
}
