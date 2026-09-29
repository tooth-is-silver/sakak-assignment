import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>건강검진 대시보드</h1>
      </main>
    </QueryClientProvider>
  );
}
