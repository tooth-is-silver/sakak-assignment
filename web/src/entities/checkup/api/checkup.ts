import { CandiyRequestError, shouldUseMock } from '@/shared/api';
import {
  cancellationResponseSchema,
  firstResponseSchema,
  secondResponseSchema,
  type CheckupData,
  type FirstRequest,
  type MultiFactorInfo,
} from './schema';

const CHECKUP_PROXY_URL = '/api/checkup';
const MOCK_FIRST_URL = '/mock/first.json';
const MOCK_SECOND_URL = '/mock/second.json';

async function postCheckup(body: unknown, mockUrl: string, signal?: AbortSignal) {
  const response = shouldUseMock
    ? await fetch(mockUrl, { signal })
    : await fetch(CHECKUP_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal,
      });

  return response.json();
}

/** 1차 요청. 응답을 받으면 사용자 휴대폰으로 간편인증이 발송된 상태가 된다. */
export async function requestAuthentication(
  request: FirstRequest,
  signal?: AbortSignal,
): Promise<MultiFactorInfo> {
  const parsed = firstResponseSchema.safeParse(await postCheckup(request, MOCK_FIRST_URL, signal));

  if (!parsed.success) {
    throw new Error('1차 인증 응답 형태가 계약과 다릅니다');
  }
  if (parsed.data.status === 'error') {
    throw new CandiyRequestError(parsed.data.code, parsed.data.message);
  }

  return parsed.data.data;
}

/**
 * 2차 요청. 사용자가 간편인증을 마친 뒤에 호출해야 한다.
 * 1차 파라미터를 그대로 유지해야 하므로 request를 다시 받는다.
 */
export async function requestCheckupResult(
  request: FirstRequest,
  multiFactorInfo: MultiFactorInfo,
  signal?: AbortSignal,
): Promise<CheckupData> {
  const body = { ...request, isContinue: '1', multiFactorInfo };
  const parsed = secondResponseSchema.safeParse(await postCheckup(body, MOCK_SECOND_URL, signal));

  if (!parsed.success) {
    throw new Error('건강검진 응답 형태가 계약과 다릅니다');
  }
  if (parsed.data.status === 'error') {
    throw new CandiyRequestError(parsed.data.code, parsed.data.message);
  }

  return parsed.data.data;
}

/**
 * 인증 대기를 중단한다.
 * 브라우저 요청만 끊으면 CANDiY는 대기 상태를 유지하므로 중단을 명시적으로 알려야 한다.
 */
export async function cancelAuthentication(
  request: FirstRequest,
  multiFactorInfo: MultiFactorInfo,
): Promise<void> {
  const parsed = cancellationResponseSchema.safeParse(
    await postCheckup({ ...request, isContinue: '0', multiFactorInfo }, MOCK_SECOND_URL),
  );

  if (!parsed.success) {
    throw new Error('인증 취소 응답 형태가 계약과 다릅니다');
  }
  if (parsed.data.status === 'error') {
    throw new CandiyRequestError(parsed.data.code, parsed.data.message);
  }
}
