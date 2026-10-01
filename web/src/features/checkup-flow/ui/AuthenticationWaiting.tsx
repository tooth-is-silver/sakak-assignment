export function AuthenticationWaiting() {
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
        <p role="status" className="mt-3 text-sm leading-6 text-slate-600">
          간편인증 앱에서 인증을 완료한 뒤 결과 조회를 계속할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
