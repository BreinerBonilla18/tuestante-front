import type { Currency } from '../types/quote';

const numberFormat = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

export function formatUsd(amount: number): string {
  return `US$ ${numberFormat.format(amount)}`;
}

export function formatVes(amount: number): string {
  return `Bs. ${numberFormat.format(amount)}`;
}

export function formatMoney(amountUsd: number, currency: Currency, rate: number): string {
  return currency === 'USD' ? formatUsd(amountUsd) : formatVes(amountUsd * rate);
}

export function formatRate(rate: number): string {
  return `1 US$ = ${formatVes(rate)}`;
}