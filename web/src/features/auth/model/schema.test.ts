import { authenticationSessionSchema, loginFormSchema } from './schema';

describe('로그인 입력 검증', () => {
  test('아이디와 비밀번호가 있으면 요청할 수 있다', () => {
    expect(loginFormSchema.safeParse({ id: 'sakak', password: 'sakak1234' }).success).toBe(true);
  });

  test.each([
    ['아이디 없음', { id: '', password: 'sakak1234' }],
    ['비밀번호 없음', { id: 'sakak', password: '' }],
  ])('%s을 거부한다', (_case, credentials) => {
    expect(loginFormSchema.safeParse(credentials).success).toBe(false);
  });
});

test('저장된 세션은 사용자와 세션 값을 모두 요구한다', () => {
  expect(
    authenticationSessionSchema.safeParse({ user: { id: 'sakak', name: 'SAKAK' } }).success,
  ).toBe(false);
});
