/**
 * 검진 기준 하나. "100미만", "18.5-24.9" 같은 글자를 코드가 판정에 쓸 수 있는 형태로 바꾼 것.
 */
export type ReferenceRange =
  | { kind: 'lessThan'; value: number }
  | { kind: 'atMost'; value: number }
  | { kind: 'atLeast'; value: number }
  | { kind: 'greaterThan'; value: number }
  | { kind: 'between'; min: number; max: number };

const SUFFIX_TO_KIND = {
  미만: 'lessThan',
  이하: 'atMost',
  이상: 'atLeast',
  초과: 'greaterThan',
} as const;

const RANGE_PATTERN = /^(\d+(?:\.\d+)?)\s*[-~]\s*(\d+(?:\.\d+)?)$/;
const SUFFIX_PATTERN = /^(\d+(?:\.\d+)?)\s*(미만|이하|이상|초과)$/;

function parseReferenceRange(text: string): ReferenceRange | null {
  const range = RANGE_PATTERN.exec(text);
  if (range) {
    return { kind: 'between', min: Number(range[1]), max: Number(range[2]) };
  }

  const suffix = SUFFIX_PATTERN.exec(text);
  if (suffix) {
    return {
      kind: SUFFIX_TO_KIND[suffix[2] as keyof typeof SUFFIX_TO_KIND],
      value: Number(suffix[1]),
    };
  }

  return null;
}

/**
 * 기준 글자를 조각들로 나눈다. 조각이 여러 개면 "이 중 하나라도 맞으면 해당"이라는 뜻이다.
 * 예: "18.5미만/25~29.9" → 18.5보다 작거나, 25~29.9 사이
 *
 * 숫자로 읽을 수 없는 기준(빈 값, "음성", 혈압처럼 둘로 나뉘는 값)은 빈 배열을 돌려준다.
 */
export function parseNumericReference(text: string): ReferenceRange[] {
  const parsed = text
    .split('/')
    .map((part) => parseReferenceRange(part.trim()))
    .filter((range) => range !== null);

  return parsed.length === text.split('/').length ? parsed : [];
}
