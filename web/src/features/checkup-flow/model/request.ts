import type { FirstRequest } from '@/entities/checkup';
import type { CheckupFormValues } from './schema';

export function createAuthenticationRequest(
  formValues: CheckupFormValues,
  requestId: string,
): FirstRequest {
  return {
    id: requestId,
    loginTypeLevel: '1',
    ...formValues,
    inquiryType: '0',
  };
}
