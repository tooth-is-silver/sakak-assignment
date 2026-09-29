import type { CheckupData, FirstRequest, MultiFactorInfo } from '@/entities/checkup';

export type CheckupFlowState =
  | { step: 'start' }
  | { step: 'form' }
  | { step: 'waitingForAuthentication'; request: FirstRequest; multiFactorInfo: MultiFactorInfo }
  | { step: 'result'; data: CheckupData };

export const INITIAL_CHECKUP_FLOW_STATE: CheckupFlowState = { step: 'start' };
