import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { AlertTriangleIcon, XIcon } from 'lucide-react';
import { usePortalSession } from '../../contexts/PortalSessionContext';
import { creditPolicy, payrollCredits } from '../../data/payrollCredits';
import { pricing } from '../../data/pricing';
import type { Product } from '../../types/catalog';
import { summarizeCredit } from '../../utils/credit';
import { formatUsd } from '../../utils/currency';

interface RequestProductDialogProps {
  product: Product | null;
  onClose: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function RequestProductDialog({ product, onClose }: RequestProductDialogProps) {
  const { user, addRequest } = usePortalSession();
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState<'nomina' | 'directo'>('nomina');
  const [installments, setInstallments] = useState(6);

  useEffect(() => {
    setQty(1);
    setPayment('nomina');
    setInstallments(6);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  if (!user) return null;
  const credit = summarizeCredit(user, payrollCredits);
  const unit = product ? product.basePriceUsd * (1 - pricing.internalDiscount) : 0;
  const total = unit * qty;
  const monthly = total / installments;
  const exceedsMonthly = payment === 'nomina' && monthly > credit.monthlyRoom;
  const exceedsLimit = payment === 'nomina' && total > credit.available;
  const blocked = exceedsMonthly || exceedsLimit;

  const submit = () => {
    if (!product || blocked) return;
    addRequest({
      type: 'producto',
      title: product.name,
      detail: `${qty} ${qty === 1 ? 'unidad' : 'unidades'} · ${payment === 'nomina' ? `Crédito de nómina a ${installments} cuotas` : 'Pago directo'}`,
      amountUsd: total
    });
    toast.success('Solicitud registrada', { description: `${product.name} · pendiente de aprobación` });
    onClose();
  };

  return (
    <AnimatePresence>
      {product &&
      <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, ease }} onClick={onClose} />
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="request-title"
          className="relative w-full max-w-md bg-white p-6 sm:rounded-md"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease }}>
          
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted">Solicitud interna · SKU {product.sku}</p>
                <h2 id="request-title" className="mt-1 text-lg font-semibold text-ink">{product.name}</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Cerrar" className="p-1 text-muted hover:text-ink">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="req-qty" className="mb-1.5 block text-sm font-medium text-ink">Cantidad</label>
                <select id="req-qty" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="h-10 w-full rounded border border-line px-3 text-sm focus:border-accent focus:outline-none">
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <fieldset>
                <legend className="mb-1.5 text-sm font-medium text-ink">Forma de pago</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(['nomina', 'directo'] as const).map((p) =>
                <button key={p} type="button" aria-pressed={payment === p} onClick={() => setPayment(p)} className={`h-10 rounded border text-sm transition-colors duration-150 ${payment === p ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-line text-ink hover:border-muted'}`}>
                      {p === 'nomina' ? 'Crédito de nómina' : 'Pago directo'}
                    </button>
                )}
                </div>
              </fieldset>
              {payment === 'nomina' &&
            <fieldset>
                  <legend className="mb-1.5 text-sm font-medium text-ink">Plazo</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {creditPolicy.installmentOptions.map((n) =>
                <button key={n} type="button" aria-pressed={installments === n} onClick={() => setInstallments(n)} className={`h-10 rounded border text-sm tabular-nums transition-colors duration-150 ${installments === n ? 'border-accent bg-accent-soft font-medium text-accent' : 'border-line text-ink hover:border-muted'}`}>
                        {n} meses
                      </button>
                )}
                  </div>
                </fieldset>
            }
            </div>

            <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm tabular-nums">
              <div className="flex justify-between"><dt className="text-muted">Precio interno (−{pricing.internalDiscount * 100} %)</dt><dd>{formatUsd(unit)}</dd></div>
              <div className="flex justify-between font-semibold text-ink"><dt>Total</dt><dd>{formatUsd(total)}</dd></div>
              {payment === 'nomina' && <div className="flex justify-between"><dt className="text-muted">Cuota mensual</dt><dd>{formatUsd(monthly)}</dd></div>}
            </dl>

            {blocked &&
          <p role="alert" className="mt-4 flex gap-2 rounded bg-danger-soft px-3 py-2.5 text-xs text-danger">
                <AlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {exceedsLimit ?
            'El monto supera su crédito disponible. Reduzca la cantidad o elija pago directo.' :
            `La cuota supera el ${creditPolicy.maxInstallmentShare * 100} % de su salario sumando sus créditos activos. Elija más cuotas.`}
              </p>
          }

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={onClose} className="h-11 flex-1 rounded border border-line text-sm font-medium text-ink hover:border-muted">Cancelar</button>
              <button type="button" onClick={submit} disabled={blocked} className="h-11 flex-1 rounded bg-accent text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50">
                Enviar solicitud
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}