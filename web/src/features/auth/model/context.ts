import { createContext, useContext } from 'react';
import type { AuthenticatedUser, LoginFormValues } from './schema';

export interface AuthenticationContextValue {
  user: AuthenticatedUser | null;
  login: (credentials: LoginFormValues) => Promise<void>;
  logout: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextValue | null>(null);

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error('AuthenticationProvider 안에서 사용해야 합니다.');
  }

  return context;
}
