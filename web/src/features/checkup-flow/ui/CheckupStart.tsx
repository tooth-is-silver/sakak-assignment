import { Link } from 'react-router-dom';

export function CheckupStart() {
  return (
    <section
      aria-labelledby="checkup-form-title"
      className="mx-auto min-h-screen w-full max-w-3xl px-6 py-10 sm:py-16"
    >
      <Link
        to="/"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-600 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
      >
        ← 처음으로
      </Link>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-sm font-semibold text-teal-700">건강검진 결과 조회</p>
        <h1 id="checkup-form-title" className="mt-2 text-3xl font-bold text-slate-950">
          본인 정보를 입력해 주세요
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          입력한 정보는 건강검진 결과 조회와 본인인증에만 사용됩니다.
        </p>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="legalName" className="text-sm font-semibold text-slate-800">
              이름
            </label>
            <input
              id="legalName"
              name="legalName"
              type="text"
              autoComplete="name"
              placeholder="홍길동"
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            />
          </div>

          <div>
            <label htmlFor="birthdate" className="text-sm font-semibold text-slate-800">
              생년월일
            </label>
            <input
              id="birthdate"
              name="birthdate"
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              placeholder="19900101"
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
            />
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">휴대전화</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-[10rem_1fr]">
              <label className="sr-only" htmlFor="telecom">
                통신사
              </label>
              <select
                id="telecom"
                name="telecom"
                defaultValue=""
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
              >
                <option value="" disabled>
                  통신사 선택
                </option>
                <option value="0">SKT</option>
                <option value="1">KT</option>
                <option value="2">LG U+</option>
              </select>
              <label className="sr-only" htmlFor="phoneNo">
                휴대전화 번호
              </label>
              <input
                id="phoneNo"
                name="phoneNo"
                type="tel"
                autoComplete="tel"
                placeholder="01012345678"
                className="min-h-11 rounded-xl border border-slate-300 px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
              />
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
