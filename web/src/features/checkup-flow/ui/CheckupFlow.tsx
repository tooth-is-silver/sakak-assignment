import { useState } from 'react';
import type { CheckupData, FirstRequest, MultiFactorInfo } from '@/entities/checkup';
import { INITIAL_CHECKUP_FLOW_STATE } from '../model/state';
import { AuthenticationWaiting } from './AuthenticationWaiting';
import { CheckupStart } from './CheckupStart';

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
    return (
      <section
        aria-labelledby="checkup-result-ready-title"
        className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-10 sm:py-16"
      >
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-teal-700">건강검진 조회 완료</p>
          <h1 id="checkup-result-ready-title" className="mt-2 text-3xl font-bold text-slate-950">
            건강검진 결과를 불러왔습니다
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            다음 단계에서 최근 검진 결과와 과거 이력을 보여드립니다.
          </p>
        </div>
      </section>
    );
  }

  return <CheckupStart onAuthenticationRequested={handleAuthenticationRequested} />;
}
