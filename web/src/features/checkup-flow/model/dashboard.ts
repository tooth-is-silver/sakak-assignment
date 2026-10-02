import {
  determineCheckupStatus,
  type CheckupData,
  type CheckupStatus,
  type MeasurementField,
} from '@/entities/checkup';

interface DashboardField {
  field: MeasurementField;
  label: string;
}

export interface DashboardItem extends DashboardField {
  value: string;
  unit: string;
  status: CheckupStatus;
}

export interface RecentCheckupDashboard {
  checkupDate: string;
  items: DashboardItem[];
}

const DASHBOARD_FIELDS: DashboardField[] = [
  { field: 'BMI', label: '체질량지수' },
  { field: 'fastingBloodGlucose', label: '공복혈당' },
  { field: 'AST', label: 'AST' },
  { field: 'ALT', label: 'ALT' },
  { field: 'GFR', label: '신사구체여과율' },
  { field: 'serumCreatinine', label: '혈청크레아티닌' },
  { field: 'bloodPressure', label: '혈압' },
  { field: 'proteinuria', label: '요단백' },
  { field: 'chestXrayResult', label: '흉부 X선' },
];

export function createRecentCheckupDashboard(data: CheckupData): RecentCheckupDashboard | null {
  const [firstOverview, ...remainingOverview] = data.overviewList;
  if (!firstOverview) {
    return null;
  }

  const latestOverview = remainingOverview.reduce((latest, overview) => {
    return overview.checkupDate > latest.checkupDate ? overview : latest;
  }, firstOverview);
  const unitReference = data.referenceList.find((reference) => reference.refType === '단위');

  return {
    checkupDate: latestOverview.checkupDate,
    items: DASHBOARD_FIELDS.map(({ field, label }) => ({
      field,
      label,
      value: latestOverview[field],
      unit: unitReference?.[field] ?? '',
      status: determineCheckupStatus(latestOverview[field], field, data.referenceList),
    })),
  };
}
