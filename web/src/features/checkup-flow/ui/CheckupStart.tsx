import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { checkupFormSchema, type CheckupFormValues } from '../model/schema';

const EARLIEST_SELECTABLE_YEAR = 2000;
const currentYear = new Date().getFullYear();
const selectableYears = Array.from(
  { length: currentYear - EARLIEST_SELECTABLE_YEAR + 1 },
  (_, index) => currentYear - index,
);

function getFieldStateClassName(hasError: boolean) {
  if (hasError) {
    return 'border-red-600 focus:border-red-600 focus:ring-red-600/20';
  }

  return 'border-slate-300 focus:border-teal-700 focus:ring-teal-700/20';
}

export function CheckupStart() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckupFormValues>({ resolver: zodResolver(checkupFormSchema) });
  const validateForm = handleSubmit(() => undefined);

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

        <form className="mt-8 space-y-6" onSubmit={validateForm} noValidate>
          <div>
            <label htmlFor="legalName" className="text-sm font-semibold text-slate-800">
              이름
            </label>
            <input
              id="legalName"
              type="text"
              autoComplete="name"
              aria-invalid={Boolean(errors.legalName)}
              aria-describedby={errors.legalName ? 'legalName-error' : ''}
              placeholder="홍길동"
              {...register('legalName')}
              className={`mt-2 min-h-11 w-full rounded-xl border px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.legalName))}`}
            />
            {errors.legalName && (
              <p id="legalName-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.legalName.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="birthdate" className="text-sm font-semibold text-slate-800">
              생년월일
            </label>
            <input
              id="birthdate"
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              maxLength={8}
              aria-invalid={Boolean(errors.birthdate)}
              aria-describedby={errors.birthdate ? 'birthdate-error' : ''}
              placeholder="19900101"
              {...register('birthdate')}
              className={`mt-2 min-h-11 w-full rounded-xl border px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.birthdate))}`}
            />
            {errors.birthdate && (
              <p id="birthdate-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.birthdate.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">휴대전화</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-[10rem_1fr]">
              <label className="sr-only" htmlFor="telecom">
                통신사
              </label>
              <select
                id="telecom"
                defaultValue=""
                aria-invalid={Boolean(errors.telecom)}
                aria-describedby="telecom-description"
                {...register('telecom')}
                className={`min-h-11 rounded-xl border bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.telecom))}`}
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
                type="tel"
                autoComplete="tel"
                maxLength={11}
                aria-invalid={Boolean(errors.phoneNo)}
                aria-describedby="telecom-description"
                placeholder="01012345678"
                {...register('phoneNo')}
                className={`min-h-11 rounded-xl border px-4 py-3 text-slate-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.phoneNo))}`}
              />
            </div>
            <div
              id="telecom-description"
              role={errors.phoneNo ? 'alert' : ''}
              className={`mt-2 text-sm ${errors.phoneNo ? 'text-red-700' : 'text-slate-500'}`}
            >
              {errors.phoneNo ? (
                <p>{errors.phoneNo.message}</p>
              ) : (
                <p>알뜰폰은 이용 중인 통신망을 선택하고, 번호는 하이픈 없이 입력해 주세요.</p>
              )}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-slate-800">조회 기간</legend>
            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <label className="sr-only" htmlFor="startDate">
                조회 시작 연도
              </label>
              <select
                id="startDate"
                defaultValue=""
                aria-invalid={Boolean(errors.startDate)}
                aria-describedby="period-description"
                {...register('startDate')}
                className={`min-h-11 min-w-0 rounded-xl border bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.startDate))}`}
              >
                <option value="" disabled>
                  시작 연도
                </option>
                {selectableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <span aria-hidden="true" className="text-slate-400">
                –
              </span>
              <label className="sr-only" htmlFor="endDate">
                조회 종료 연도
              </label>
              <select
                id="endDate"
                defaultValue=""
                aria-invalid={Boolean(errors.endDate)}
                aria-describedby="period-description"
                {...register('endDate')}
                className={`min-h-11 min-w-0 rounded-xl border bg-white px-4 py-3 text-slate-950 focus:outline-none focus:ring-2 ${getFieldStateClassName(Boolean(errors.endDate))}`}
              >
                <option value="" disabled>
                  종료 연도
                </option>
                {selectableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>
            <div
              id="period-description"
              role={errors.startDate || errors.endDate ? 'alert' : undefined}
              className={`mt-2 text-sm ${
                errors.startDate || errors.endDate ? 'text-red-700' : 'text-slate-500'
              }`}
            >
              {errors.startDate || errors.endDate ? (
                <p>
                  {errors.startDate?.message}
                  {errors.startDate && errors.endDate && ' '}
                  {errors.endDate?.message}
                </p>
              ) : (
                <p>조회 결과는 제공기관이 보유한 건강검진 내역에 따라 달라질 수 있습니다.</p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="min-h-11 w-full rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            간편인증 요청
          </button>
        </form>
      </div>
    </section>
  );
}
