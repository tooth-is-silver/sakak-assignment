import type { CheckupData } from '@/entities/checkup';
import { CheckupHistory } from './CheckupHistory';
import { RecentCheckupDashboard } from './RecentCheckupDashboard';

interface Props {
  data: CheckupData;
}

export function CheckupResults({ data }: Props) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-10 sm:py-16">
      <RecentCheckupDashboard data={data} />
      <hr className="mt-12 border-slate-200" />
      <CheckupHistory data={data} />
    </div>
  );
}
