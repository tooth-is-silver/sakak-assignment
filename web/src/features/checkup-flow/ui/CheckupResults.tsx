import { Link } from 'react-router-dom';
import type { CheckupData } from '@/entities/checkup';
import { CheckupHistory } from './CheckupHistory';
import { RecentCheckupDashboard } from './RecentCheckupDashboard';

interface Props {
  data: CheckupData;
  onRestart: () => void;
}

export function CheckupResults({ data, onRestart }: Props) {
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
      <RecentCheckupDashboard data={data} />
      <hr className="mt-12 border-slate-200" />
      <CheckupHistory data={data} />
    </div>
  );
}
