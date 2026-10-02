import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { useAuthentication } from '../model/context';
import { loginFormSchema, type LoginFormValues } from '../model/schema';

export function LoginPage() {
  const { login } = useAuthentication();
  const loginMutation = useMutation({ mutationFn: login });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { id: 'sakak', password: 'sakak1234' },
  });
  const credentials = useWatch({ control });
  const isLoginDisabled =
    loginMutation.isPending || credentials.id === '' || credentials.password === '';
  const submitLogin = handleSubmit((values) => loginMutation.mutate(values));

  function resetLoginError() {
    if (loginMutation.isError) {
      loginMutation.reset();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <section
        aria-labelledby="login-title"
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10"
      >
        <p className="text-sm font-semibold text-teal-700">건강검진 대시보드</p>
        <h1 id="login-title" className="mt-2 text-3xl font-bold text-slate-950">
          로그인
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          과제 확인용 계정이 입력되어 있습니다. 로그인 버튼을 눌러 시작해 주세요.
        </p>

        <form
          className="mt-8 space-y-5"
          aria-busy={loginMutation.isPending}
          onSubmit={submitLogin}
          noValidate
        >
          <div>
            <label htmlFor="loginId" className="text-sm font-semibold text-slate-800">
              아이디
            </label>
            <input
              id="loginId"
              type="text"
              autoComplete="username"
              disabled={loginMutation.isPending}
              aria-invalid={Boolean(errors.id)}
              aria-describedby={errors.id ? 'login-id-error' : undefined}
              {...register('id', { onChange: resetLoginError })}
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            />
            {errors.id && (
              <p id="login-id-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.id.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="loginPassword" className="text-sm font-semibold text-slate-800">
              비밀번호
            </label>
            <input
              id="loginPassword"
              type="password"
              autoComplete="current-password"
              disabled={loginMutation.isPending}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              {...register('password', { onChange: resetLoginError })}
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-950 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            />
            {errors.password && (
              <p id="login-password-error" role="alert" className="mt-2 text-sm text-red-700">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginMutation.isError && (
            <p role="alert" className="text-sm text-red-700">
              {loginMutation.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoginDisabled}
            className="min-h-11 w-full rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loginMutation.isPending ? '로그인 중…' : '로그인'}
          </button>
        </form>
      </section>
    </main>
  );
}
