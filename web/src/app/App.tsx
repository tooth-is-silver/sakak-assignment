import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { CheckupEntry, CheckupFlow } from '@/features/checkup-flow';
import { AuthenticationProvider, LoginPage, useAuthentication } from '@/features/auth';
import { queryClient } from './queryClient';

function RequireAuthentication() {
  const { user } = useAuthentication();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function LoginRoute() {
  const { user } = useAuthentication();

  return user ? <Navigate to="/" replace /> : <LoginPage />;
}

function AuthenticatedLayout() {
  const { user, logout } = useAuthentication();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-16 w-full max-w-5xl items-center justify-between px-6">
          <p className="font-semibold text-slate-900">{user?.id}</p>
          <button
            type="button"
            onClick={logout}
            className="min-h-11 rounded-lg px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            로그아웃
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  { path: '/login', element: <LoginRoute /> },
  {
    element: <RequireAuthentication />,
    children: [
      {
        element: <AuthenticatedLayout />,
        children: [
          { path: '/', element: <CheckupEntry /> },
          { path: '/checkup', element: <CheckupFlow /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <RouterProvider router={router} />
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}
