import type { CheckupData } from '@/entities/checkup';
import { createRecentCheckupDashboard } from './dashboard';

const emptyMeasurements = {
  height: '',
  weight: '',
  waist: '',
  BMI: '',
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
};

const checkupData = {
  patientName: '김검진',
  overviewList: [
    { ...emptyMeasurements, checkupDate: '2025-04-14', evaluation: '정B', BMI: '27.3' },
    { ...emptyMeasurements, checkupDate: '2021-12-14', evaluation: '정A', BMI: '20.8' },
  ],
  referenceList: [
    { ...emptyMeasurements, refType: '단위', BMI: 'kg/m²' },
    { ...emptyMeasurements, refType: '정상(A)', BMI: '18.5-24.9' },
    { ...emptyMeasurements, refType: '정상(B)', BMI: '25-29.9' },
    { ...emptyMeasurements, refType: '질환의심', BMI: '30이상' },
  ],
  resultList: [],
} satisfies CheckupData;

describe('최근 건강검진 대시보드 구성', () => {
  test('응답 순서와 관계없이 가장 최근 검진을 선택한다', () => {
    const dashboard = createRecentCheckupDashboard(checkupData);

    expect(dashboard?.checkupDate).toBe('2025-04-14');
    expect(dashboard?.items[0]).toEqual({
      field: 'BMI',
      label: '체질량지수',
      value: '27.3',
      unit: 'kg/m²',
      status: 'caution',
    });
  });

  test('일반검진 결과가 없으면 대시보드를 만들지 않는다', () => {
    expect(createRecentCheckupDashboard({ ...checkupData, overviewList: [] })).toBeNull();
  });
});
