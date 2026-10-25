import React, { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2Icon, AlertTriangleIcon } from 'lucide-react';
import { MaskedValue, RevealToggle } from '../../components/portal/MaskedValue';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { creditPolicy, payrollCredits } from '../../data/payrollCredits';
import { summarizeCredit } from '../../utils/credit';
import { formatUsd } from '../../utils/currency';
import { formatDate } from '../../utils/dates';

export function PortalCredits() {
  const { user, addRequest } = usePortalSession();
  const [revealed, setRevealed] = useState(false);
  const [amount, setAmount] = useState(200);
  const [installments, setInstallments] = useState(6);
  if (!user) return null;

  const s = summarizeCredit(user, payrollCredits);
  const monthly = amount / installments;
  const share = (s.monthlyCommitted + monthly) / user.salaryUsd;
  const overLimit = amount > s.available;
  const overShare = share > creditPolicy.maxInstallmentShare;
  const invalid = !amount || amount <= 0;
  const ok = !invalid && !overLimit && !overShare;

  const requestAdvance = () => {
    if (!ok) return;
    addRequest({ type: 'credito', title: 'Adelanto de crédito', detail: `${formatUsd(amount)} a ${installments} cuotas`, amountUsd: amount });
    toast.success('Solicitud de crédito enviada', { description: 'RRHH la revisará en un máximo de 48 horas.' });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Créditos de nómina</h1>
          <p className="mt-1 text-sm text-muted">Descuentos por nómina para la compra de productos y adelantos.</p>
        </div>
        <RevealToggle revealed={revealed} onToggle={() => setRevealed((v) => !v)} />
      </div>

      <section className="mt-8 grid gap-8 border-y border-line py-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]" aria-label="Resumen de crédito">
        <div>
          <p className="text-sm text-muted">Disponible</p>
          <MaskedValue value={formatUsd(s.available)} revealed={revealed} className="mt-1 block text-4xl font-semibold text-ink" />
        </div>
        <Stat label="Límite (3 salarios)" value={formatUsd(s.limit)} revealed={revealed} />
        <Stat label="Saldo por pagar" value={formatUsd(s.used)} revealed={revealed} />
        <Stat label="Cuotas mensuales" value={`${formatUsd(s.monthlyCommitted)} / ${formatUsd(s.maxMonthly)}`} revealed={revealed} />
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7" aria-labelledby="active-title">
          <h2 id="active-title" className="text-base font-semibold text-ink">Créditos</h2>
          {s.credits.length === 0 ?
          <p className="mt-4 text-sm text-muted">No tiene créditos registrados.</p> :

          <ul className="mt-4 divide-y divide-line border-y border-line">
              {s.credits.map((c) => {
              const pct = c.paidInstallments / c.installments * 100;
              return (
                <li key={c.id} className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-ink">{c.concept}</p>
                        <p className="text-xs text-muted">Desde {formatDate(c.startedAt)}</p>
                      </div>
                      <MaskedValue value={formatUsd(c.amountUsd)} revealed={revealed} className="text-sm font-medium text-ink" />
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1 flex-1 bg-surface" role="progressbar" aria-valuenow={c.paidInstallments} aria-valuemin={0} aria-valuemax={c.installments} aria-label="Cuotas pagadas">
                        <div className={`h-full ${c.status === 'pagado' ? 'bg-success' : 'bg-accent'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs tabular-nums text-muted">
                        {c.status === 'pagado' ? 'Pagado' : `${c.paidInstallments} de ${c.installments} cuotas`}
                      </span>
                    </div>
                  </li>);

            })}
            </ul>
          }
          <p className="mt-6 text-xs leading-relaxed text-muted">
            Política: límite de {creditPolicy.limitMultiplier} salarios, la suma de cuotas no puede superar el {creditPolicy.maxInstallmentShare * 100} % del salario mensual y se requieren {creditPolicy.minTenureMonths} meses de antigüedad.
          </p>
        </section>

        <section className="bg-surface p-6 lg:col-span-5" aria-labelledby="sim-title">
          <h2 id="sim-title" className="text-base font-semibold text-ink">Simulador de adelanto</h2>
          <div className="mt-5">
            <label htmlFor="sim-amount" className="mb-1.5 block text-sm font-medium text-ink">Monto (US$)</label>
            <input id="sim-amount" type="number" min={0} step={10} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="h-11 w-full rounded border border-line bg-white px-3 text-sm tabular-nums focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <fieldset className="mt-4">
            <legend className="mb-1.5 text-sm font-medium text-ink">Plazo</legend>
            <div className="grid grid-cols-3 gap-2">
              {creditPolicy.installmentOptions.map((n) =>
              <button key={n} type="button" aria-pressed={installments === n} onClick={() => setInstallments(n)} className={`h-10 rounded border text-sm tabular-nums transition-colors duration-150 ${installments === n ? 'border-accent bg-white font-medium text-accent' : 'border-line bg-white text-ink hover:border-muted'}`}>
                  {n} meses
                </button>
              )}
            </div>
          </fieldset>
          <dl className="mt-6 space-y-2 text-sm tabular-nums">
            <div className="flex justify-between"><dt className="text-muted">Cuota mensual</dt><dd className="font-semibold text-ink">{formatUsd(monthly || 0)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Compromiso sobre salario</dt><dd className="text-ink"><MaskedValue value={`${(share * 100).toFixed(1)} %`} revealed={revealed} /></dd></div>
          </dl>
          <p role="status" className={`mt-4 flex gap-2 rounded px-3 py-2.5 text-xs ${ok ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}>
            {ok ? <CheckCircle2Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : <AlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
            {invalid ?
            'Ingrese un monto mayor a cero.' :
            overLimit ?
            'El monto supera su crédito disponible.' :
            overShare ?
            `Las cuotas superarían el ${creditPolicy.maxInstallmentShare * 100} % de su salario. Pruebe un plazo mayor.` :
            'Cumple con la política de crédito.'}
          </p>
          <button type="button" onClick={requestAdvance} disabled={!ok} className="mt-5 h-11 w-full rounded bg-accent text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50">
            Solicitar adelanto
          </button>
        </section>
      </div>
    </div>);

}

function Stat({ label, value, revealed }: {label: string;value: string;revealed: boolean;}) {
  return (
    <div>
      <p className="text-sm text-muted">{label}</p>
      <MaskedValue value={value} revealed={revealed} className="mt-2 block text-base font-medium text-ink" />
    </div>);

}