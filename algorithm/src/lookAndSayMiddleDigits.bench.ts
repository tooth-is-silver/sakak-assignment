import { expect, test } from 'vitest';
import { getLookAndSayMiddleDigits } from './lookAndSayMiddleDigits';

const BENCHMARK_TERM_NUMBER = 30;
const MAXIMUM_AVERAGE_LATENCY_MILLISECONDS = 100;

test('재귀 풀이가 제한 시간 안에 실행된다', async ({ bench }) => {
  const result = await bench(`n=${BENCHMARK_TERM_NUMBER} 재귀 풀이`, () => {
    getLookAndSayMiddleDigits(BENCHMARK_TERM_NUMBER);
  }).run();

  expect(result.latency.mean).toBeLessThan(MAXIMUM_AVERAGE_LATENCY_MILLISECONDS);
});
