import { Link } from 'react-router-dom';
import type { CheckupData } from '@/entities/checkup';
import { CheckupHistory } from './CheckupHistory';
import { RecentCheckupDashboard } from './RecentCheckupDashboard';

interface Props {
  data: CheckupData;
  onRestart: () => void;
}

export function CheckupResults({ data, onRestart }: Props) {
  const hasNoCheckupResults = data.overviewList.length === 0 && data.resultList.length === 0;

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:py-16">
      <nav aria-label="건강검진 결과 메뉴" className="mb-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          메인으로
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="min-h-11 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        >
          다른 정보로 조회
        </button>
      </nav>
      {hasNoCheckupResults ? (
        <section aria-labelledby="empty-results-title" className="py-16 text-center">
          <h1 id="empty-results-title" className="text-2xl font-bold text-slate-950">
            최근 진행하신 건강검진 결과가 없습니다.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            선택한 기간에 제공기관이 보유한 검진 내역이 없습니다.
          </p>
        </section>
      ) : (
        <>
          <RecentCheckupDashboard data={data} />
          <hr className="mt-12 border-slate-200" />
          <CheckupHistory data={data} />
        </>
      )}
    </div>
  );
}
