import {
  useCheckupResultMutation,
  type CheckupData,
  type FirstRequest,
  type MultiFactorInfo,
} from '@/entities/checkup';

interface Props {
  request: FirstRequest;
  multiFactorInfo: MultiFactorInfo;
  onResultReceived: (data: CheckupData) => void;
}

export function AuthenticationWaiting({ request, multiFactorInfo, onResultReceived }: Props) {
  const checkupResultMutation = useCheckupResultMutation();

  function handleAuthenticationCompleted() {
    checkupResultMutation.mutate(
      { request, multiFactorInfo },
      { onSuccess: onResultReceived },
    );
  }

  return (
    <section
      aria-labelledby="authentication-waiting-title"
      className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-10 sm:py-16"
    >
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-teal-700">간편인증 요청 완료</p>
        <h1 id="authentication-waiting-title" className="mt-2 text-3xl font-bold text-slate-950">
          휴대전화에서 인증해 주세요
        </h1>
        <div aria-live="polite" className="mt-3 text-sm leading-6">
          {checkupResultMutation.isError ? (
            <p role="alert" className="text-red-700">
              {checkupResultMutation.error.message}
            </p>
          ) : (
            <p className="text-slate-600">
              간편인증 앱에서 인증을 완료한 뒤 아래 버튼을 눌러 주세요.
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={checkupResultMutation.isPending}
          onClick={handleAuthenticationCompleted}
          className="mt-8 min-h-11 w-full rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {checkupResultMutation.isPending ? '결과 조회 중…' : '인증 완료'}
        </button>
      </div>
    </section>
  );
}
