import { useState } from 'react';
import type { CheckupData, FirstRequest, MultiFactorInfo } from '@/entities/checkup';
import { INITIAL_CHECKUP_FLOW_STATE } from '../model/state';
import { AuthenticationWaiting } from './AuthenticationWaiting';
import { CheckupStart } from './CheckupStart';
import { RecentCheckupDashboard } from './RecentCheckupDashboard';

export function CheckupFlow() {
  const [flowState, setFlowState] = useState(INITIAL_CHECKUP_FLOW_STATE);

  function handleAuthenticationRequested(request: FirstRequest, multiFactorInfo: MultiFactorInfo) {
    setFlowState({ step: 'waitingForAuthentication', request, multiFactorInfo });
  }

  function handleResultReceived(data: CheckupData) {
    setFlowState({ step: 'result', data });
  }

  if (flowState.step === 'waitingForAuthentication') {
    return (
      <AuthenticationWaiting
        request={flowState.request}
        multiFactorInfo={flowState.multiFactorInfo}
        onResultReceived={handleResultReceived}
      />
    );
  }

  if (flowState.step === 'result') {
    return <RecentCheckupDashboard data={flowState.data} />;
  }

  return <CheckupStart onAuthenticationRequested={handleAuthenticationRequested} />;
}
