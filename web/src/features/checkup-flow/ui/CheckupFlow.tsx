import { useState } from 'react';
import type { FirstRequest, MultiFactorInfo } from '@/entities/checkup';
import { INITIAL_CHECKUP_FLOW_STATE } from '../model/state';
import { AuthenticationWaiting } from './AuthenticationWaiting';
import { CheckupStart } from './CheckupStart';

export function CheckupFlow() {
  const [flowState, setFlowState] = useState(INITIAL_CHECKUP_FLOW_STATE);

  function handleAuthenticationRequested(request: FirstRequest, multiFactorInfo: MultiFactorInfo) {
    setFlowState({ step: 'waitingForAuthentication', request, multiFactorInfo });
  }

  if (flowState.step === 'waitingForAuthentication') {
    return <AuthenticationWaiting />;
  }

  if (flowState.step === 'result') {
    return null;
  }

  return <CheckupStart onAuthenticationRequested={handleAuthenticationRequested} />;
}
