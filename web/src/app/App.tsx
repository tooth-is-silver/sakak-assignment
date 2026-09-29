import { QueryClientProvider } from '@tanstack/react-query';
import { CheckupFlow } from '@/features/checkup-flow';
import { queryClient } from './queryClient';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-slate-50">
        <CheckupFlow />
      </main>
    </QueryClientProvider>
  );
}
