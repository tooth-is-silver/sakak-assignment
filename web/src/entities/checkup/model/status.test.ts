import type { CheckupReference } from '../api/schema';
import { determineCheckupStatus } from './status';

function createReference(refType: string, BMI: string): CheckupReference {
  return {
    height: '',
    weight: '',
    waist: '',
    BMI,
    vision: '',
    hearing: '',
    bloodPressure: '',
    proteinuria: '',
    hemoglobin: '',
    fastingBloodGlucose: '',
    totalCholesterol: '',
    HDLCholesterol: '',
    triglyceride: '',
    LDLCholesterol: '',
    serumCreatinine: '',
    GFR: '',
    AST: '',
    ALT: '',
    yGPT: '',
    chestXrayResult: '',
    osteoporosis: '',
    refType,
  };
}

const BMI_REFERENCES = [
  createReference('정상(A)', '18.5-24.9'),
  createReference('정상(B)', '18.5미만/25-29.9'),
  createReference('질환의심', '30이상'),
];

describe('검진 수치 상태 판정', () => {
  test.each([
    ['정상 범위', '22', 'normal'],
    ['주의 범위의 낮은 값', '18', 'caution'],
    ['주의 범위의 높은 값', '27', 'caution'],
    ['질환의심 범위', '30', 'risk'],
  ])('%s: %s를 %s으로 판정한다', (_case, measurement, expected) => {
    expect(determineCheckupStatus(measurement, 'BMI', BMI_REFERENCES)).toBe(expected);
  });
});

describe('기준 경계값 회귀', () => {
  test.each([
    ['미만', '9.9', '10미만'],
    ['이하', '10', '10이하'],
    ['이상', '10', '10이상'],
    ['초과', '10.1', '10초과'],
    ['범위 최솟값', '10', '10-20'],
    ['범위 최댓값', '20', '10-20'],
  ])('%s 기준을 바꾸지 않는다', (_case, measurement, reference) => {
    const references = [createReference('정상(A)', reference)];

    expect(determineCheckupStatus(measurement, 'BMI', references)).toBe('normal');
  });

  test('여러 단계의 기준이 겹치면 정상 단계부터 적용한다', () => {
    const references = [
      createReference('질환의심', '10이상'),
      createReference('정상(B)', '10이상'),
      createReference('정상(A)', '10이상'),
    ];

    expect(determineCheckupStatus('10', 'BMI', references)).toBe('normal');
  });
});

describe('판정할 수 없는 값 회귀', () => {
  test.each([
    ['빈 값', ''],
    ['숫자가 아닌 값', '검사 안 함'],
    ['무한대', 'Infinity'],
  ])('%s은 판정 불가다', (_case, measurement) => {
    expect(determineCheckupStatus(measurement, 'BMI', BMI_REFERENCES)).toBe('unknown');
  });

  test('읽을 수 없는 기준은 판정 불가다', () => {
    const references = [createReference('정상(A)', '정상')];

    expect(determineCheckupStatus('22', 'BMI', references)).toBe('unknown');
  });

  test('해당 단계의 기준이 없으면 판정 불가다', () => {
    expect(determineCheckupStatus('22', 'BMI', [])).toBe('unknown');
  });
});
