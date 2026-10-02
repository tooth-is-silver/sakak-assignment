import { CandiyRequestError } from '@/shared/api';

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다. 고객센터로 문의해 주세요.';

const ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  'AE-003': '간편인증을 완료하지 못했습니다. 처음부터 다시 진행해 주세요.',
  'AE-009': '이미 진행 중인 인증 요청이 있습니다. 잠시 후 처음부터 다시 진행해 주세요.',
  'AT-002': '현재 건강검진 조회 서비스를 이용할 수 없습니다. 고객센터로 문의해 주세요.',
  'AT-003': '현재 건강검진 조회 서비스를 이용할 수 없습니다. 고객센터로 문의해 주세요.',
  'VE-002': '건강검진 조회 요청을 처리하지 못했습니다. 고객센터로 문의해 주세요.',
  'VE-007': '인증 정보가 일치하지 않습니다. 처음부터 다시 진행해 주세요.',
};

export function getCheckupErrorMessage(error: unknown) {
  if (!(error instanceof CandiyRequestError)) {
    return UNKNOWN_ERROR_MESSAGE;
  }

  return ERROR_MESSAGE_BY_CODE[error.code] ?? UNKNOWN_ERROR_MESSAGE;
}
