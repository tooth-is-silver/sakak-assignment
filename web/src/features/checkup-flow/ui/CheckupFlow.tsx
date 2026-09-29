import { useState } from 'react';
import { INITIAL_CHECKUP_FLOW_STATE, type CheckupFlowState } from '../model/state';
import { CheckupEntry } from './CheckupEntry';
import { CheckupStart } from './CheckupStart';

export function CheckupFlow() {
  const [flowState, setFlowState] = useState<CheckupFlowState>(INITIAL_CHECKUP_FLOW_STATE);

  if (flowState.step === 'start') {
    return <CheckupEntry onStart={() => setFlowState({ step: 'form' })} />;
  }

  if (flowState.step === 'form') {
    return <CheckupStart />;
  }

  return null;
}
