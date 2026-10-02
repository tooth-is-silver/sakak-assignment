import { CandiyRequestError } from '@/shared/api';
import { getCheckupErrorMessage } from './errorMessage';

describe('건강검진 오류 사용자 문구', () => {
  test.each([
    ['AE-003', '간편인증을 완료하지 못했습니다. 처음부터 다시 진행해 주세요.'],
    ['AE-009', '이미 진행 중인 인증 요청이 있습니다. 잠시 후 처음부터 다시 진행해 주세요.'],
    ['AT-002', '현재 건강검진 조회 서비스를 이용할 수 없습니다. 고객센터로 문의해 주세요.'],
    ['AT-003', '현재 건강검진 조회 서비스를 이용할 수 없습니다. 고객센터로 문의해 주세요.'],
    ['VE-002', '건강검진 조회 요청을 처리하지 못했습니다. 고객센터로 문의해 주세요.'],
    ['VE-007', '인증 정보가 일치하지 않습니다. 처음부터 다시 진행해 주세요.'],
  ])('%s를 사용자 문구로 바꾼다', (code, expectedMessage) => {
    const error = new CandiyRequestError(code, '외부 API 원본 오류');

    expect(getCheckupErrorMessage(error)).toBe(expectedMessage);
  });

  test.each([
    ['확인하지 않은 CANDiY 오류', new CandiyRequestError('AE-999', '외부 API 원본 오류')],
    ['응답 형식 오류', new Error('건강검진 응답 형태가 계약과 다릅니다')],
    ['네트워크 오류', new TypeError('Failed to fetch')],
  ])('%s는 알 수 없는 오류로 안내한다', (_case, error) => {
    expect(getCheckupErrorMessage(error)).toBe(
      '알 수 없는 오류가 발생했습니다. 고객센터로 문의해 주세요.',
    );
  });
});
