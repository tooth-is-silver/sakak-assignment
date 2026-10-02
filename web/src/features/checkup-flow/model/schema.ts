import { z } from 'zod';

const BIRTHDATE_LENGTH = 8;
const YEAR_LENGTH = 4;
const MONTH_END_INDEX = 6;
const MONTH_OFFSET = 1;
const MINIMUM_NAME_LENGTH = 2;
const MAXIMUM_NAME_LENGTH = 20;
const BIRTHDATE_PATTERN = /^\d{8}$/;
const YEAR_PATTERN = /^\d{4}$/;

export const CHECKUP_HISTORY_YEAR_COUNT = 10;
export const CURRENT_CHECKUP_YEAR = new Date().getFullYear();
export const EARLIEST_CHECKUP_YEAR = CURRENT_CHECKUP_YEAR - CHECKUP_HISTORY_YEAR_COUNT + 1;
export const SELECTABLE_CHECKUP_YEARS = Array.from(
  { length: CHECKUP_HISTORY_YEAR_COUNT },
  (_, index) => CURRENT_CHECKUP_YEAR - index,
);

function isValidBirthdate(value: string) {
  const year = Number(value.slice(0, YEAR_LENGTH));
  const month = Number(value.slice(YEAR_LENGTH, MONTH_END_INDEX));
  const day = Number(value.slice(MONTH_END_INDEX, BIRTHDATE_LENGTH));
  const date = new Date(year, month - MONTH_OFFSET, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - MONTH_OFFSET &&
    date.getDate() === day
  );
}

function isSelectableCheckupYear(value: string) {
  const year = Number(value);

  return year >= EARLIEST_CHECKUP_YEAR && year <= CURRENT_CHECKUP_YEAR;
}

function createCheckupYearSchema(requiredMessage: string) {
  return z
    .string()
    .regex(YEAR_PATTERN, requiredMessage)
    .refine(
      (value) => !YEAR_PATTERN.test(value) || isSelectableCheckupYear(value),
      '최근 10년 이내의 연도를 선택해 주세요.',
    );
}

export const checkupFormSchema = z
  .object({
    legalName: z
      .string()
      .min(MINIMUM_NAME_LENGTH, '이름을 2자 이상 입력해 주세요.')
      .max(MAXIMUM_NAME_LENGTH, '이름은 20자 이하로 입력해 주세요.'),
    birthdate: z
      .string()
      .regex(BIRTHDATE_PATTERN, '생년월일 8자리를 입력해 주세요.')
      .refine(
        (value) => !BIRTHDATE_PATTERN.test(value) || isValidBirthdate(value),
        '올바른 생년월일을 입력해 주세요.',
      ),
    phoneNo: z.string().regex(/^01[016789]\d{7,8}$/, '올바른 휴대전화 번호를 입력해 주세요.'),
    telecom: z.enum(['0', '1', '2'], { error: '통신사를 선택해 주세요.' }),
    startDate: createCheckupYearSchema('시작 연도를 선택해 주세요.'),
    endDate: createCheckupYearSchema('종료 연도를 선택해 주세요.'),
  })
  .refine(({ startDate, endDate }) => startDate <= endDate, {
    message: '종료 연도는 시작 연도와 같거나 이후여야 합니다.',
    path: ['endDate'],
  });

export type CheckupFormValues = z.infer<typeof checkupFormSchema>;
