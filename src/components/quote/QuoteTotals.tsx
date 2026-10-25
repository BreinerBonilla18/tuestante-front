import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext';
import { pricing } from '../../data/pricing';
import type { QuoteItem } from '../../types/quote';
import { formatMoney, formatRate } from '../../utils/currency';
import { formatDate } from '../../utils/dates';
import { computeTotals } from '../../utils/pricing';
import { CurrencyToggle } from '../layout/CurrencyToggle';

interface QuoteTotalsProps {
  items: QuoteItem[];
  formId: string;
  sending: boolean;
}

export function QuoteTotals({ items, formId, sending }: QuoteTotalsProps) {
  const { currency, rate } = useCurrency();
  const { subtotal, iva, total } = computeTotals(items, pricing.ivaRate);
  const other = currency === 'USD' ? 'VES' : 'USD';

  return (
    <div className="bg-surface p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink">Resumen</h2>
        <CurrencyToggle tone="surface" />
      </div>
      <dl className="mt-6 space-y-3 text-sm tabular-nums">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="text-ink">{formatMoney(subtotal, currency, rate)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">IVA ({Math.round(pricing.ivaRate * 100)} %)</dt>
          <dd className="text-ink">{formatMoney(iva, currency, rate)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-medium text-ink">Total estimado</dt>
          <dd className="text-right">
            <span className="block text-2xl font-semibold text-ink">{formatMoney(total, currency, rate)}</span>
            <span className="block text-xs text-muted">{formatMoney(total, other, rate)}</span>
          </dd>
        </div>
      </dl>
      <dl className="mt-6 space-y-1.5 border-t border-line pt-4 text-xs text-muted">
        <div className="flex justify-between gap-4">
          <dt>{pricing.rateLabel}</dt>
          <dd className="tabular-nums">{formatRate(rate)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Fecha de la tasa</dt>
          <dd>{formatDate(pricing.rateDate)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Vigencia de la cotización</dt>
          <dd>{pricing.validityDays} días</dd>
        </div>
      </dl>
      <button
        type="submit"
        form={formId}
        disabled={sending}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded bg-accent text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-80">
        
        {sending && <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {sending ? 'Generando propuesta…' : 'Solicitar cotización formal'}
      </button>
      <p className="mt-3 text-center text-xs text-muted">Sin compromiso de compra. No se procesan pagos en línea.</p>
    </div>);

}