import { describe, expect, test } from 'vitest';
import { getLookAndSayMiddleDigits } from './lookAndSayMiddleDigits';

const INPUT_ERROR_MESSAGE = 'n은 4 이상 99 이하의 정수여야 합니다.';

// L99는 약 3,921억 자리의 문자열이므로 L99 전체를 Node.js 프로세스 메모리에 만들 수 없다.
// 수열 생성 테스트는 n=30까지만 검증한다.
describe('getLookAndSayMiddleDigits 테스트', () => {
  test.each([
    [4, '21'],
    [5, '12'],
    [6, '22'],
    [7, '12'],
    [8, '21'],
    [9, '11'],
    [10, '23'],
    [12, '11'],
    [15, '21'],
    [20, '31'],
    [30, '21'],
  ])('유효한 입력 %d의 가운데 두 자리 %s를 반환한다', (n, expected) => {
    expect(getLookAndSayMiddleDigits(n)).toBe(expected);
  });

  test.each(['5', true, null, undefined, {}, [], 5n])(
    '숫자가 아닌 입력 %s에 TypeError를 반환한다',
    (input) => {
      expect(() => getLookAndSayMiddleDigits(input)).toThrow(TypeError);
      expect(() => getLookAndSayMiddleDigits(input)).toThrow(INPUT_ERROR_MESSAGE);
    },
  );

  test.each([0, 3, 100, 101, -1, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    '범위를 벗어난 입력 %s에 RangeError를 반환한다',
    (n) => {
      expect(() => getLookAndSayMiddleDigits(n)).toThrow(RangeError);
      expect(() => getLookAndSayMiddleDigits(n)).toThrow(INPUT_ERROR_MESSAGE);
    },
  );

  test.each([4.5, Number.NaN])('정수가 아닌 입력 %s에 오류를 반환한다', (n) => {
    expect(() => getLookAndSayMiddleDigits(n)).toThrow(Error);
    expect(() => getLookAndSayMiddleDigits(n)).toThrow(INPUT_ERROR_MESSAGE);
  });
});
