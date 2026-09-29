import { QueryClient } from '@tanstack/react-query';

// 무료 등급이 월 100건 제한이라 자동 재시도로 호출을 소모하지 않게 한다.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});
