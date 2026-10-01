import { z } from 'zod';

const BIRTHDATE_LENGTH = 8;
const YEAR_LENGTH = 4;
const MONTH_END_INDEX = 6;
const MONTH_OFFSET = 1;
const MINIMUM_NAME_LENGTH = 2;
const MAXIMUM_NAME_LENGTH = 20;

function isValidBirthdate(value: string) {
  const year = Number(value.slice(0, YEAR_LENGTH));
  const month = Number(value.slice(YEAR_LENGTH, MONTH_END_INDEX));
  const day = Number(value.slice(MONTH_END_INDEX, BIRTHDATE_LENGTH));
  const date = new Date(year, month - MONTH_OFFSET, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - MONTH_OFFSET &&
    date.getDate() === day
  );
}

export const checkupFormSchema = z
  .object({
    legalName: z.string().min(MINIMUM_NAME_LENGTH).max(MAXIMUM_NAME_LENGTH),
    birthdate: z
      .string()
      .regex(/^\d{8}$/)
      .refine(isValidBirthdate),
    phoneNo: z.string().regex(/^01[016789]\d{7,8}$/),
    telecom: z.enum(['0', '1', '2']),
    startDate: z.string().regex(/^\d{4}$/),
    endDate: z.string().regex(/^\d{4}$/),
  })
  .refine(({ startDate, endDate }) => startDate <= endDate, { path: ['endDate'] });

export type CheckupFormValues = z.infer<typeof checkupFormSchema>;
