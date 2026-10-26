import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, FileTextIcon, PrinterIcon } from 'lucide-react';
import { ProposalSheet } from '../components/proposal/ProposalSheet';
import { useQuote } from '../contexts/QuoteContext';
import { pricing } from '../data/pricing';
import type { SubmittedQuote } from '../types/quote';
import { addDaysIso, todayIso } from '../utils/dates';

export function QuoteProposal() {
  const { submitted, items } = useQuote();
  const shouldReduceMotion = useReducedMotion();
  const draft: SubmittedQuote | null =
  !submitted && items.length > 0 ?
  {
    number: 'BORRADOR',
    issuedAt: todayIso(),
    validUntil: addDaysIso(todayIso(), pricing.validityDays),
    client: { company: '', rif: '', contact: '', email: '', phone: '', city: '', sector: '', notes: '', specialRequirements: '' },
    items,
    rate: pricing.exchangeRate,
    ivaRate: pricing.ivaRate
  } :
  null;
  const quote = submitted ?? draft;

  return (
    <motion.div
      className="public-page-motion min-h-screen w-full bg-surface print:bg-white"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}>
      <div className="sticky top-0 z-10 border-b border-line bg-white print:hidden">
        <div className="mx-auto flex h-14 max-w-[880px] items-center justify-between px-4">
          <Link to="/cotizacion" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            Volver a la cotización
          </Link>
          {quote &&
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-2 rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover">
            
              <PrinterIcon className="h-4 w-4" aria-hidden="true" />
              Descargar PDF
            </button>
          }
        </div>
      </div>
      <main className="px-4 py-10 print:p-0">
        {quote ?
        <ProposalSheet quote={quote} draft={!submitted} /> :

        <div className="mx-auto flex max-w-md flex-col items-center py-24 text-center">
            <FileTextIcon className="h-10 w-10 text-subtle" aria-hidden="true" />
            <h1 className="mt-4 text-xl font-medium text-ink">No hay una propuesta para mostrar</h1>
            <p className="mt-2 text-sm text-muted">Añada productos a su cotización y envíela para generar la propuesta comercial.</p>
            <Link to="/catalogo" className="mt-6 inline-flex h-11 items-center rounded bg-accent px-5 text-sm font-medium text-white">
              Ir al catálogo
            </Link>
          </div>
        }
      </main>
    </motion.div>);

}