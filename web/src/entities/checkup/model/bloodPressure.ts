import { parseNumericReference, type ReferenceRange } from './reference';

interface BloodPressureMeasurement {
  systolic: number;
  diastolic: number;
}

export interface BloodPressureReference {
  systolic: ReferenceRange;
  diastolic: ReferenceRange;
  operator: 'and' | 'or';
}

const BLOOD_PRESSURE_PATTERN = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/;
const BLOOD_PRESSURE_REFERENCE_PATTERN = /^(.*?)\s*(이며|또는)\s*\/\s*(.+)$/;

export function parseBloodPressureMeasurement(text: string): BloodPressureMeasurement | null {
  const match = BLOOD_PRESSURE_PATTERN.exec(text.trim());
  if (!match) {
    return null;
  }

  return {
    systolic: Number(match[1]),
    diastolic: Number(match[2]),
  };
}

export function parseBloodPressureReference(text: string): BloodPressureReference | null {
  const match = BLOOD_PRESSURE_REFERENCE_PATTERN.exec(text.trim());
  if (!match) {
    return null;
  }

  const systolicRanges = parseNumericReference(match[1].trim());
  const diastolicRanges = parseNumericReference(match[3].trim());
  if (systolicRanges.length !== 1 || diastolicRanges.length !== 1) {
    return null;
  }

  return {
    systolic: systolicRanges[0],
    diastolic: diastolicRanges[0],
    operator: match[2] === '이며' ? 'and' : 'or',
  };
}
