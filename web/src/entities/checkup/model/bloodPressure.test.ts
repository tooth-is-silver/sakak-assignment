import { parseBloodPressureMeasurement, parseBloodPressureReference } from './bloodPressure';

describe('혈압 측정값 해석', () => {
  test.each([
    ['93/67', { systolic: 93, diastolic: 67 }],
    ['145/95', { systolic: 145, diastolic: 95 }],
    ['120 / 80', { systolic: 120, diastolic: 80 }],
  ])('%s를 수축기와 이완기로 나눈다', (text, expected) => {
    expect(parseBloodPressureMeasurement(text)).toEqual(expected);
  });

  test.each(['', '120/', '120/80/70', '높음/낮음'])('%s는 해석하지 않는다', (text) => {
    expect(parseBloodPressureMeasurement(text)).toBeNull();
  });
});

describe('혈압 기준 해석 회귀', () => {
  test('정상 기준의 두 조건을 모두 충족하도록 해석한다', () => {
    expect(parseBloodPressureReference('120미만 이며/80미만')).toEqual({
      systolic: { kind: 'lessThan', value: 120 },
      diastolic: { kind: 'lessThan', value: 80 },
      operator: 'and',
    });
  });

  test.each([
    [
      '120-139 또는 /80-89',
      {
        systolic: { kind: 'between', min: 120, max: 139 },
        diastolic: { kind: 'between', min: 80, max: 89 },
        operator: 'or',
      },
    ],
    [
      '140이상 또는 /90이상',
      {
        systolic: { kind: 'atLeast', value: 140 },
        diastolic: { kind: 'atLeast', value: 90 },
        operator: 'or',
      },
    ],
  ])('%s에서 둘 중 하나만 충족해도 되는 관계를 보존한다', (text, expected) => {
    expect(parseBloodPressureReference(text)).toEqual(expected);
  });

  test.each(['', '120미만/80미만', '정상 이며/80미만'])('%s는 해석하지 않는다', (text) => {
    expect(parseBloodPressureReference(text)).toBeNull();
  });
});
