import { getLookAndSayMiddleDigits } from './lookAndSayMiddleDigits';

const input = process.argv[2];
const n = input === undefined ? undefined : Number(input);

try {
  console.log(getLookAndSayMiddleDigits(n));
} catch (error) {
  if (!(error instanceof Error)) {
    throw error;
  }

  console.error(error.message);
  process.exitCode = 1;
}
