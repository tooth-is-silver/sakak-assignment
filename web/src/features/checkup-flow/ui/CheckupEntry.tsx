interface Props {
  onStart: () => void;
}

export function CheckupEntry({ onStart }: Props) {
  return (
    <section
      aria-labelledby="checkup-entry-title"
      className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-12"
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-3 text-sm font-semibold text-teal-700">건강검진 결과 조회</p>
        <h1
          id="checkup-entry-title"
          className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl"
        >
          내 건강 상태를 한눈에 확인하세요
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
          간편인증을 완료하면 국민건강보험공단의 건강검진 결과를 불러와 건강 상태를 확인하실 수
          있습니다.
        </p>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="mb-4 text-sm leading-6 text-slate-500">
            건강검진 내역 조회를 위해 본인 명의 휴대전화와 간편인증이 필요합니다.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="min-h-11 w-full rounded-xl bg-teal-700 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 motion-reduce:transition-none sm:w-auto"
          >
            내역 조회 시작
          </button>
        </div>
      </div>
    </section>
  );
}
