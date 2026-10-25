import React from 'react';
import { company } from '../../data/pricing';
import { products } from '../../data/products';
import type { SubmittedQuote } from '../../types/quote';
import { formatRate, formatUsd, formatVes } from '../../utils/currency';
import { formatLongDate } from '../../utils/dates';
import { computeTotals } from '../../utils/pricing';

interface ProposalSheetProps {
  quote: SubmittedQuote;
  draft: boolean;
}

const technicalKeys = ['Calibre de lámina', 'Acabado', 'Tolerancia dimensional'];

export function ProposalSheet({ quote, draft }: ProposalSheetProps) {
  const { subtotal, iva, total } = computeTotals(quote.items, quote.ivaRate);
  const c = quote.client;

  return (
    <article className="relative mx-auto w-full max-w-[816px] bg-white px-8 py-10 text-[12px] leading-relaxed text-ink shadow-[0_1px_3px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.06)] md:px-14 md:py-14 print:max-w-none print:px-[0.6in] print:py-[0.5in] print:shadow-none">
      {draft &&
      <p className="mb-6 rounded-sm bg-warning-soft px-3 py-2 text-[11px] text-warning print:hidden">
          Borrador: complete los datos de la empresa y envíe la cotización para obtener un número oficial.
        </p>
      }
      <header className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-ink pb-6">
        <div>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="2" fill="#1E4F8A" />
              <rect x="6" y="7" width="12" height="1.6" fill="#fff" />
              <rect x="6" y="11.2" width="12" height="1.6" fill="#fff" />
              <rect x="6" y="15.4" width="12" height="1.6" fill="#fff" />
            </svg>
            <span className="text-base font-semibold">TuEstante</span>
          </div>
          <p className="mt-3 text-[11px] text-muted">
            {company.legalName} · RIF {company.rif}
            <br />
            {company.address}
            <br />
            {company.phone} · {company.email}
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-semibold tracking-tight">Propuesta comercial</h1>
          <p className="mt-1 text-sm font-medium tabular-nums">N.º {quote.number}</p>
          <p className="mt-2 text-[11px] text-muted">
            Emitida: {formatLongDate(quote.issuedAt)}
            <br />
            Válida hasta: {formatLongDate(quote.validUntil)}
          </p>
        </div>
      </header>

      <section className="grid gap-6 border-b border-line py-6 sm:grid-cols-2">
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted">Cliente</h2>
          <p className="mt-2 font-medium">{c.company || '—'}</p>
          <p>RIF {c.rif || '—'}</p>
          <p>{c.contact || '—'}</p>
          <p className="text-muted">{[c.email, c.phone].filter(Boolean).join(' · ') || '—'}</p>
        </div>
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted">Entrega</h2>
          <p className="mt-2">{c.city || '—'}</p>
          <p>Ambiente: {c.sector || '—'}</p>
          <p className="text-muted">Fabricación estimada: 15 a 20 días hábiles</p>
        </div>
      </section>

      <section className="py-6">
        <table className="w-full tabular-nums">
          <thead>
            <tr className="border-b border-ink text-left text-[10px] uppercase tracking-wider text-muted">
              <th scope="col" className="w-6 pb-2 font-semibold">#</th>
              <th scope="col" className="pb-2 font-semibold">Producto y configuración</th>
              <th scope="col" className="pb-2 text-right font-semibold">Cant.</th>
              <th scope="col" className="pb-2 text-right font-semibold">P. unit. US$</th>
              <th scope="col" className="pb-2 text-right font-semibold">Total US$</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((item, i) =>
            <tr key={item.id} className="border-b border-line align-top">
                <td className="py-3 text-muted">{i + 1}</td>
                <td className="py-3 pr-4">
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-[11px] text-muted">
                    SKU {item.sku} · RAL {item.config.colorCode} {item.config.colorName} · {item.config.finishLabel} · Cerradura {item.config.lockLabel.toLowerCase()} · {item.config.dimensionLabel}
                    {item.config.accessoryLabels.length > 0 && ` · ${item.config.accessoryLabels.join(', ')}`}
                  </p>
                </td>
                <td className="py-3 text-right">{item.qty}</td>
                <td className="py-3 text-right">{formatUsd(item.unitPriceUsd).replace('US$ ', '')}</td>
                <td className="py-3 text-right font-medium">{formatUsd(item.unitPriceUsd * item.qty).replace('US$ ', '')}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-xs space-y-1.5 tabular-nums">
            <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatUsd(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">IVA ({Math.round(quote.ivaRate * 100)} %)</dt><dd>{formatUsd(iva)}</dd></div>
            <div className="flex justify-between border-t border-ink pt-2 text-sm font-semibold"><dt>Total</dt><dd>{formatUsd(total)}</dd></div>
            <div className="flex justify-between text-sm font-semibold"><dt>Equivalente</dt><dd>{formatVes(total * quote.rate)}</dd></div>
            <div className="pt-1 text-right text-[10px] text-muted">Tasa referencial BCV: {formatRate(quote.rate)}</div>
          </dl>
        </div>
      </section>

      <section className="border-t border-line py-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted">Desglose técnico</h2>
        <div className="mt-3 space-y-3">
          {quote.items.map((item) => {
            const product = products.find((p) => p.slug === item.productSlug);
            const specs = product?.specs.filter((s) => technicalKeys.includes(s.label)) ?? [];
            return (
              <div key={item.id} className="grid gap-1 sm:grid-cols-[200px_1fr]">
                <p className="font-medium">{item.productName}</p>
                <p className="text-muted">{specs.map((s) => `${s.label}: ${s.value}`).join(' · ')}</p>
              </div>);

          })}
        </div>
      </section>

      {(c.notes || c.specialRequirements) &&
      <section className="border-t border-line py-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted">Observaciones del cliente</h2>
          {c.notes && <p className="mt-2">{c.notes}</p>}
          {c.specialRequirements && <p className="mt-2"><span className="font-medium">Requerimientos especiales:</span> {c.specialRequirements}</p>}
        </section>
      }

      <section className="border-t border-line py-6">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-muted">Condiciones</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-[11px] text-muted">
          <li>Precios expresados en dólares estadounidenses. El monto en bolívares se calcula a la tasa referencial del BCV del día de facturación.</li>
          <li>Esta propuesta tiene una vigencia de {Math.round((new Date(quote.validUntil).getTime() - new Date(quote.issuedAt).getTime()) / 86400000)} días continuos desde su emisión.</li>
          <li>Pago contra factura mediante transferencia. No se procesan pagos en línea.</li>
          <li>Garantía según la ficha técnica de cada producto. Instalación cotizada por separado.</li>
        </ol>
      </section>

      <footer className="mt-10 grid gap-10 sm:grid-cols-2">
        <div className="border-t border-ink pt-2 text-[11px]">
          Asesor comercial
          <br />
          <span className="text-muted">TuEstante</span>
        </div>
        <div className="border-t border-ink pt-2 text-[11px]">
          Aceptación del cliente
          <br />
          <span className="text-muted">Firma y sello</span>
        </div>
      </footer>
    </article>);

}