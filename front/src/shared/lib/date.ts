import { format, differenceInCalendarDays, addDays } from 'date-fns';

export const formatDate = (
  date: Date | string,
  template = 'd MMM yyyy'
): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, template);
};

export function getDaysUntil(date: string): number {
  return differenceInCalendarDays(date, new Date());
}

export function getNextPaymentDate(expiresAt: string): Date {
  return addDays(expiresAt, 30); // +30 дней
}

