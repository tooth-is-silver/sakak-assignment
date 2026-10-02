import type { CheckupData, CheckupResult } from '@/entities/checkup';

interface Props {
  data: CheckupData;
}

function createCheckupHistory(resultList: CheckupResult[]) {
  return resultList.toSorted((first, second) =>
    second.checkupDate.localeCompare(first.checkupDate),
  );
}

// 응답의 검진 종류는 "일반", "암(자궁경부 )"처럼 괄호 안에 공백이 남은 형태로 온다.
function formatCheckupType(checkupType: string) {
  return `${checkupType.replace(/\s*\)/, ')').trim()} 검진`;
}

export function CheckupHistory({ data }: Props) {
  const history = createCheckupHistory(data.resultList);

  if (history.length === 0) {
    return (
      <section aria-labelledby="empty-history-title" className="py-16 text-center">
        <h2 id="empty-history-title" className="text-2xl font-bold text-slate-950">
          조회된 건강검진 이력이 없습니다
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          선택한 기간에 제공기관이 보유한 검진 이력이 없습니다.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="checkup-history-title" className="py-8">
      <div>
        <p className="text-sm font-semibold text-teal-700">과거 건강검진 이력</p>
        <h1 id="checkup-history-title" className="mt-2 text-2xl font-bold text-slate-950">
          총 {history.length}건의 검진을 확인했어요
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          일반 건강검진과 암 검진을 최신 날짜순으로 보여드립니다.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-xl border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                검진일
              </th>
              <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                검진 종류
              </th>
              <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                검진 기관
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((result, index) => (
              <tr
                key={`${result.checkupDate}-${result.checkupType}-${index}`}
                className="border-b border-slate-100 last:border-b-0"
              >
                <td className="px-5 py-4 align-middle">
                  <time dateTime={result.checkupDate} className="text-sm text-slate-600">
                    {result.checkupDate}
                  </time>
                </td>
                <td className="px-5 py-4 align-middle text-sm font-semibold text-slate-950">
                  {formatCheckupType(result.checkupType)}
                </td>
                <td className="px-5 py-4 align-middle text-sm text-slate-600">
                  {result.organizationName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
