import { z } from 'zod';

/**
 * CANDiY 전 상품 공통 실패 응답.
 * 성공 응답은 상품마다 data 형태가 달라 각 슬라이스에서 정의한다.
 */
export const errorResponseSchema = z.object({
  status: z.literal('error'),
  message: z.string(),
  code: z.string().describe('AE-001, AT-002, VE-007 등 오류코드'),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
