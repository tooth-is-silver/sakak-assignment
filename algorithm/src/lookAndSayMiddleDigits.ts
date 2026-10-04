const MIDDLE_DIGIT_COUNT = 2;
const INPUT_ERROR_MESSAGE = 'n은 4 이상 99 이하의 정수여야 합니다.';

function createNextTerm(previousTerm: string) {
  let nextTerm = '';
  let left = 0;

  for (let right = 1; right < previousTerm.length; right += 1) {
    const currentDigit = previousTerm[right];
    if (previousTerm[left] !== currentDigit) {
      const count = right - left;
      nextTerm += `${count}${previousTerm[left]}`;
      left = right;
    }
  }

  const lastCount = previousTerm.length - left;
  nextTerm += `${lastCount}${previousTerm[left]}`;

  return nextTerm;
}

function getMiddleTwoDigits(term: string) {
  const middleIndex = term.length / MIDDLE_DIGIT_COUNT;
  return term.slice(middleIndex - 1, middleIndex + 1);
}

function createLookAndSayTerm(n: number): string {
  if (n === 1) {
    return '1';
  }

  const previousTerm = createLookAndSayTerm(n - 1);
  return createNextTerm(previousTerm);
}

export function getLookAndSayMiddleDigits(n: unknown) {
  if (typeof n !== 'number') {
    throw new TypeError(INPUT_ERROR_MESSAGE);
  }

  if (n < 4 || n > 99) {
    throw new RangeError(INPUT_ERROR_MESSAGE);
  }

  if (!Number.isInteger(n)) {
    throw new Error(INPUT_ERROR_MESSAGE);
  }

  return getMiddleTwoDigits(createLookAndSayTerm(n));
}
