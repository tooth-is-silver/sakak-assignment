import { z } from 'zod';
import { errorResponseSchema } from '@/shared/api';

/**
 * 건강검진 결과 조회 1차 요청.
 * 요청 후 사용자 휴대폰으로 간편인증이 발송된다.
 *
 * @see https://docs.candiy.io
 */
export const firstRequestSchema = z.object({
  id: z.string().min(1),
  loginTypeLevel: z.string(),
  legalName: z.string().min(2).max(20),
  birthdate: z.string().regex(/^\d{8}$/),
  phoneNo: z.string().regex(/^01[016789]\d{7,8}$/),
  telecom: z.enum(['0', '1', '2']),
  startDate: z.string().regex(/^\d{4}$/),
  endDate: z.string().regex(/^\d{4}$/),
  inquiryType: z.enum(['0', '1', '3', '4']).default('0'),
});

/** 1차 응답으로 받아 2차 요청에 그대로 되돌려 보내는 인증 식별자. */
export const multiFactorInfoSchema = z.object({
  transactionId: z.string(),
  jobIndex: z.number(),
  threadIndex: z.number(),
  multiFactorTimestamp: z.number(),
});

/**
 * 인증 완료 후 보내는 2차 요청.
 * 1차와 같은 엔드포인트이며, 1차 파라미터를 모두 그대로 유지해야 한다.
 */
// 1차와 2차의 파라미터가 다르면 VE-007로 거절된다.
export const secondRequestSchema = firstRequestSchema.extend({
  isContinue: z.enum(['0', '1']),
  multiFactorInfo: multiFactorInfoSchema,
});

/** overviewList(실측값)와 referenceList(판정 기준)가 공유하는 검진 항목. */
const checkupMeasurementSchema = z.object({
  height: z.string(),
  weight: z.string(),
  waist: z.string(),
  BMI: z.string(),
  vision: z.string(),
  hearing: z.string(),
  bloodPressure: z.string(),
  proteinuria: z.string(),
  hemoglobin: z.string(),
  fastingBloodGlucose: z.string(),
  totalCholesterol: z.string(),
  HDLCholesterol: z.string(),
  triglyceride: z.string(),
  LDLCholesterol: z.string(),
  serumCreatinine: z.string(),
  GFR: z.string(),
  AST: z.string(),
  ALT: z.string(),
  yGPT: z.string(),
  chestXrayResult: z.string(),
  osteoporosis: z.string(),
});

/** 검진 회차별 실측값. 측정하지 않은 항목은 빈 문자열로 온다. */
export const checkupOverviewSchema = checkupMeasurementSchema.extend({
  checkupDate: z.string(),
  evaluation: z.string(),
});

/** 정상(A)/정상(B)/질환의심 판정 기준. */
export const checkupReferenceSchema = checkupMeasurementSchema.extend({
  refType: z.string().describe('단위 | 정상(A) | 정상(B) | 질환의심'),
});

/** 검진 회차별 메타 정보. */
export const checkupResultSchema = z.object({
  // 문서에는 String으로 명시돼 있으나 실제 응답은 Number로 온다.
  caseType: z.number(),
  checkupType: z.string(),
  checkupDate: z.string(),
  organizationName: z.string(),
  // 문서에 없으나 응답에 포함.
  checkupFindings: z.string(),
  pdfData: z.string(),
  questionnaire: z.array(z.unknown()),
  // 문서에 없으나 응답에 포함. 항상 빈 배열.
  infantsCheckupList: z.array(z.unknown()),
  infantsDentalList: z.array(z.unknown()),
});

export const checkupDataSchema = z.object({
  patientName: z.string(),
  overviewList: z.array(checkupOverviewSchema),
  referenceList: z.array(checkupReferenceSchema),
  resultList: z.array(checkupResultSchema),
});

/** 1차 응답. 검진 데이터가 아니라 인증 대기용 식별자 발송. */
export const firstResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: multiFactorInfoSchema }),
  errorResponseSchema,
]);

/** 2차 응답. 실제 검진 결과. */
export const secondResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success'), data: checkupDataSchema }),
  errorResponseSchema,
]);

/** 취소 성공 시 data 계약은 확인되지 않아 공통 상태코드만 검증한다. */
export const cancellationResponseSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('success') }),
  errorResponseSchema,
]);

export type FirstRequest = z.infer<typeof firstRequestSchema>;
export type MultiFactorInfo = z.infer<typeof multiFactorInfoSchema>;
export type CheckupOverview = z.infer<typeof checkupOverviewSchema>;
export type CheckupReference = z.infer<typeof checkupReferenceSchema>;
export type CheckupData = z.infer<typeof checkupDataSchema>;
export type CheckupResult = z.infer<typeof checkupResultSchema>;
