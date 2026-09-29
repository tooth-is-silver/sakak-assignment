import type { CheckupReference } from '../api/schema';
import { parseBloodPressureMeasurement, parseBloodPressureReference } from './bloodPressure';
import { parseNumericReference, type ReferenceRange } from './reference';

export type CheckupStatus = 'normal' | 'caution' | 'risk' | 'unknown';

/** 검진 수치가 들어 있는 항목 이름. refType은 기준 종류라 제외한다. */
export type MeasurementField = keyof Omit<CheckupReference, 'refType'>;

const STATUS_BY_REFERENCE_TYPE = [
  { refType: '정상(A)', status: 'normal' },
  { refType: '정상(B)', status: 'caution' },
  { refType: '질환의심', status: 'risk' },
] as const;

function matchesRange(value: number, range: ReferenceRange): boolean {
  switch (range.kind) {
    case 'lessThan':
      return value < range.value;
    case 'atMost':
      return value <= range.value;
    case 'atLeast':
      return value >= range.value;
    case 'greaterThan':
      return value > range.value;
    case 'between':
      return range.min <= value && value <= range.max;
  }
}

function determineBloodPressureStatus(
  measurement: string,
  referenceList: CheckupReference[],
): CheckupStatus {
  const bloodPressure = parseBloodPressureMeasurement(measurement);
  if (!bloodPressure) {
    return 'unknown';
  }

  for (const { refType, status } of STATUS_BY_REFERENCE_TYPE.toReversed()) {
    const reference = referenceList.find((item) => item.refType === refType);
    if (!reference) continue;

    const bloodPressureReference = parseBloodPressureReference(reference.bloodPressure);
    if (!bloodPressureReference) continue;

    const isSystolicMatch = matchesRange(bloodPressure.systolic, bloodPressureReference.systolic);
    const isDiastolicMatch = matchesRange(
      bloodPressure.diastolic,
      bloodPressureReference.diastolic,
    );

    if (bloodPressureReference.operator === 'and' && isSystolicMatch && isDiastolicMatch) {
      return status;
    }

    if (bloodPressureReference.operator === 'or' && (isSystolicMatch || isDiastolicMatch)) {
      return status;
    }
  }

  return 'unknown';
}

/**
 * 검진 수치가 어느 단계에 해당하는지 판정한다.
 * 숫자 항목은 정상(A) -> 정상(B) -> 질환의심 순으로 맞춰보고 처음 맞는 단계를 쓴다.
 * 혈압은 수축기와 이완기가 서로 다른 단계에 걸칠 수 있어 더 높은 위험도를 우선한다.
 *
 * 수치나 기준을 숫자로 읽을 수 없으면 unknown을 돌려준다.
 * 화면은 색 없이 수치와 기준 글자만 보여주면 된다.
 */
export function determineCheckupStatus(
  measurement: string,
  field: MeasurementField,
  referenceList: CheckupReference[],
): CheckupStatus {
  if (field === 'bloodPressure') {
    return determineBloodPressureStatus(measurement, referenceList);
  }

  const value = Number(measurement);
  if (measurement.trim() === '' || !Number.isFinite(value)) {
    return 'unknown';
  }

  for (const { refType, status } of STATUS_BY_REFERENCE_TYPE) {
    const reference = referenceList.find((item) => item.refType === refType);
    if (!reference) continue;

    const ranges = parseNumericReference(reference[field]);
    if (ranges.some((range) => matchesRange(value, range))) {
      return status;
    }
  }

  return 'unknown';
}
