import { useMutation } from '@tanstack/react-query';
import { cancelAuthentication, requestAuthentication, requestCheckupResult } from './checkup';
import type { FirstRequest, MultiFactorInfo } from './schema';

interface SecondRequestVariables {
  request: FirstRequest;
  multiFactorInfo: MultiFactorInfo;
}

/** 1차 요청. 성공하면 사용자 휴대폰에 간편인증이 발송된 상태가 된다. */
export function useAuthenticationMutation() {
  return useMutation({
    mutationFn: (request: FirstRequest) => requestAuthentication(request),
  });
}

/** 2차 요청. 1차 파라미터를 그대로 유지해야 하므로 request를 다시 받는다. */
export function useCheckupResultMutation() {
  return useMutation({
    mutationFn: ({ request, multiFactorInfo }: SecondRequestVariables) =>
      requestCheckupResult(request, multiFactorInfo),
  });
}

/** 취소 버튼용. 화면을 벗어날 때는 훅 대신 cancelAuthentication을 직접 호출한다. */
export function useCancelAuthenticationMutation() {
  return useMutation({
    mutationFn: ({ request, multiFactorInfo }: SecondRequestVariables) =>
      cancelAuthentication(request, multiFactorInfo),
  });
}
