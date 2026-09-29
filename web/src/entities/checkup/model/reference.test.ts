import { parseNumericReference } from './reference';

describe('숫자로 읽을 수 있는 기준', () => {
  test.each([
    ['18.5-24.9', [{ kind: 'between', min: 18.5, max: 24.9 }]],
    ['100-125', [{ kind: 'between', min: 100, max: 125 }]],
    ['25~29.9', [{ kind: 'between', min: 25, max: 29.9 }]],
    ['100미만', [{ kind: 'lessThan', value: 100 }]],
    ['40이하', [{ kind: 'atMost', value: 40 }]],
    ['126이상', [{ kind: 'atLeast', value: 126 }]],
    ['1.6초과', [{ kind: 'greaterThan', value: 1.6 }]],
  ])('%s', (text, expected) => {
    expect(parseNumericReference(text)).toEqual(expected);
  });

  test('슬래시로 나뉜 기준은 조각 여러 개가 된다', () => {
    expect(parseNumericReference('18.5미만/25~29.9')).toEqual([
      { kind: 'lessThan', value: 18.5 },
      { kind: 'between', min: 25, max: 29.9 },
    ]);
  });
});

describe('숫자로 읽을 수 없는 기준은 판정 불가로 둔다', () => {
  test.each([
    ['빈 값', ''],
    ['단어 기준', '음성'],
    ['단어 기준', '정상, 비활동성'],
    ['혈압은 슬래시가 수축기·이완기 구분', '120미만 이며/80미만'],
    ['성별로 갈리는 기준', '남: 13-16.5 / 여: 12-15.5'],
    ['형식이 다른 기준', 'T-score -1 이상'],
  ])('%s: %s', (_label, text) => {
    expect(parseNumericReference(text)).toEqual([]);
  });

  test('일부만 읽히면 전체를 판정 불가로 둔다', () => {
    expect(parseNumericReference('100미만/음성')).toEqual([]);
  });
});
