import { addDays, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'd MMM yyyy', { locale: es });
}

export function formatLongDate(iso: string): string {
  return format(parseISO(iso), "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function addDaysIso(iso: string, days: number): string {
  return format(addDays(parseISO(iso), days), 'yyyy-MM-dd');
}

export function todayIso(): string {
  return format(new Date(), 'yyyy-MM-dd');
}