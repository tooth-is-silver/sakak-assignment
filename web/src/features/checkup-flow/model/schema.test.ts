import {
  CURRENT_CHECKUP_YEAR,
  EARLIEST_CHECKUP_YEAR,
  checkupFormSchema,
} from './schema';

const validFormValues = {
  legalName: '홍길동',
  birthdate: '19900201',
  phoneNo: '01012345678',
  telecom: '0',
  startDate: String(EARLIEST_CHECKUP_YEAR),
  endDate: String(CURRENT_CHECKUP_YEAR),
};

describe('건강검진 조회 폼 검증', () => {
  test('올바른 본인 정보와 조회 기간을 허용한다', () => {
    expect(checkupFormSchema.safeParse(validFormValues).success).toBe(true);
  });

  test('윤년의 2월 29일을 허용한다', () => {
    expect(
      checkupFormSchema.safeParse({ ...validFormValues, birthdate: '20000229' }).success,
    ).toBe(true);
  });

  test.each([
    ['존재하지 않는 생년월일', { birthdate: '19900230' }],
    ['윤년이 아닌 해의 2월 29일', { birthdate: '19000229' }],
    ['하이픈이 포함된 전화번호', { phoneNo: '010-1234-5678' }],
    ['지원하지 않는 통신사', { telecom: '3' }],
    ['한 글자인 이름', { legalName: '김' }],
  ])('%s을 거부한다', (_case, invalidValues) => {
    expect(checkupFormSchema.safeParse({ ...validFormValues, ...invalidValues }).success).toBe(false);
  });

  test('종료 연도가 시작 연도보다 빠르면 거부한다', () => {
    const result = checkupFormSchema.safeParse({
      ...validFormValues,
      startDate: String(CURRENT_CHECKUP_YEAR),
      endDate: String(EARLIEST_CHECKUP_YEAR),
    });

    expect(result.error?.issues[0]).toMatchObject({
      message: '종료 연도는 시작 연도와 같거나 이후여야 합니다.',
      path: ['endDate'],
    });
  });

  test.each([
    ['최근 5년보다 이전인 연도', String(EARLIEST_CHECKUP_YEAR - 1)],
    ['현재보다 이후인 연도', String(CURRENT_CHECKUP_YEAR + 1)],
  ])('%s를 거부한다', (_case, startDate) => {
    const result = checkupFormSchema.safeParse({ ...validFormValues, startDate });

    expect(result.error?.issues[0]).toMatchObject({
      message: '최근 5년 이내의 연도를 선택해 주세요.',
      path: ['startDate'],
    });
  });

  test('존재하지 않는 생년월일에 사용자용 오류를 제공한다', () => {
    const result = checkupFormSchema.safeParse({ ...validFormValues, birthdate: '19900230' });

    expect(result.error?.issues[0]).toMatchObject({
      message: '올바른 생년월일을 입력해 주세요.',
      path: ['birthdate'],
    });
  });
});
