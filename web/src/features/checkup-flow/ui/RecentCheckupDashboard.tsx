import { getCheckupStatusBadge, type CheckupData, type CheckupStatus } from '@/entities/checkup';
import { createRecentCheckupDashboard } from '../model/dashboard';

const STATUS_CLASS_NAME: Record<CheckupStatus, string> = {
  normal: 'border-emerald-600 bg-emerald-600 text-white',
  caution: 'border-amber-600 bg-amber-600 text-white',
  risk: 'border-red-600 bg-red-600 text-white',
  unknown: 'border-slate-300 bg-slate-100 text-slate-950',
};

interface Props {
  data: CheckupData;
}

export function RecentCheckupDashboard({ data }: Props) {
  const dashboard = createRecentCheckupDashboard(data);

  if (!dashboard) {
    return (
      <section
        aria-labelledby="empty-checkup-title"
        className="flex min-h-[32rem] w-full items-center"
      >
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 id="empty-checkup-title" className="text-2xl font-bold text-slate-950">
            조회된 일반 건강검진 결과가 없습니다
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            선택한 기간에 제공기관이 보유한 일반검진 내역이 없습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-checkup-title" className="py-8">
      <p className="text-sm font-semibold text-teal-700">최근 건강검진 결과</p>
      <h1 id="recent-checkup-title" className="mt-2 text-3xl font-bold text-slate-950">
        {data.patientName}님의 건강 상태
      </h1>
      <p className="mt-3 text-sm text-slate-600">검진일 {dashboard.checkupDate}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dashboard.items.map((item) => {
          const statusBadge = getCheckupStatusBadge(item.value, item.field, data.referenceList);

          return (
            <li
              key={item.field}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-slate-700">{item.label}</h2>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS_NAME[statusBadge.status]}`}
                >
                  {statusBadge.label}
                </span>
              </div>
              <p className="mt-5 text-2xl font-bold text-slate-950">
                {item.value === '' ? '측정값 없음' : item.value}
                {item.value && item.unit && (
                  <span className="ml-1 text-sm font-medium text-slate-500">{item.unit}</span>
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
