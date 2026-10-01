import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { CheckupEntry, CheckupFlow } from '@/features/checkup-flow';
import { queryClient } from './queryClient';

function AppLayout() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Outlet />
    </main>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <CheckupEntry /> },
      { path: '/checkup', element: <CheckupFlow /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
