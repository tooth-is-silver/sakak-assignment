import { cancellationResponseSchema } from './schema';

describe('인증 취소 응답 검증', () => {
  test('성공 응답은 확인되지 않은 data 형태를 강제하지 않는다', () => {
    expect(
      cancellationResponseSchema.safeParse({
        status: 'success',
        data: { message: '취소됨' },
      }).success,
    ).toBe(true);
  });

  test('오류 응답은 코드와 메시지를 모두 요구한다', () => {
    expect(
      cancellationResponseSchema.safeParse({
        status: 'error',
        code: 'AE-009',
        message: '이미 처리 중인 요청입니다',
      }).success,
    ).toBe(true);
  });

  test.each([
    ['알 수 없는 상태', { status: 'pending' }],
    ['코드가 없는 오류', { status: 'error', message: '실패' }],
    ['상태가 없는 응답', { data: {} }],
  ])('%s는 거부한다', (_case, response) => {
    expect(cancellationResponseSchema.safeParse(response).success).toBe(false);
  });
});
