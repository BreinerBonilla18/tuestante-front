import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, FileTextIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { QuoteForm } from '../components/quote/QuoteForm';
import { QuoteItemRow } from '../components/quote/QuoteItemRow';
import { QuoteTotals } from '../components/quote/QuoteTotals';
import { useQuote } from '../contexts/QuoteContext';
import type { ClientInfo, SubmittedQuote } from '../types/quote';
import { formatLongDate } from '../utils/dates';

const FORM_ID = 'quote-form';

export function Quote() {
  const { items, updateQty, removeItem, submitQuote } = useQuote();
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState<SubmittedQuote | null>(null);

  const handleSubmit = (client: ClientInfo) => {
    setSending(true);
    window.setTimeout(() => {
      setConfirmation(submitQuote(client));
      setSending(false);
      window.scrollTo(0, 0);
    }, 1200);
  };

  if (confirmation) {
    return (
      <div className="mx-auto max-w-site px-4 py-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl">
          
          <CheckCircle2Icon className="h-10 w-10 text-success" aria-hidden="true" />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Cotización enviada</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Recibimos su solicitud, {confirmation.client.contact.split(' ')[0]}. Un asesor comercial la revisará y le escribirá a{' '}
            <span className="text-ink">{confirmation.client.email}</span> en un máximo de un día hábil.
          </p>
          <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted">Número de cotización</dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">{confirmation.number}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Empresa</dt>
              <dd className="mt-1 text-ink">{confirmation.client.company}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Válida hasta</dt>
              <dd className="mt-1 text-ink">{formatLongDate(confirmation.validUntil)}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/cotizacion/propuesta" className="inline-flex h-12 items-center gap-2 rounded bg-accent px-6 text-sm font-medium text-white hover:bg-accent-hover">
              <FileTextIcon className="h-4 w-4" aria-hidden="true" />
              Ver propuesta en PDF
            </Link>
            <Link to="/catalogo" className="inline-flex h-12 items-center rounded border border-line px-6 text-sm font-medium text-ink hover:border-ink">
              Seguir explorando
            </Link>
          </div>
        </motion.div>
      </div>);

  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-site px-4 pb-20 pt-8 md:px-6">
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Cotización' }]} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Su cotización</h1>

        {items.length === 0 ?
        <div className="mt-10 flex flex-col items-start border-t border-line pt-16">
            <FileTextIcon className="h-10 w-10 text-subtle" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-medium text-ink">Aún no ha añadido productos</h2>
            <p className="mt-2 max-w-md text-muted">
              Configure un producto o añádalo en su versión estándar desde el catálogo. Podrá combinar varias líneas en una misma propuesta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="inline-flex h-11 items-center rounded bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover">
                Explorar catálogo
              </Link>
              <Link to="/configurador/locker-inteligente-rfid-6" className="inline-flex h-11 items-center rounded border border-line px-5 text-sm font-medium text-ink hover:border-ink">
                Abrir configurador
              </Link>
            </div>
          </div> :

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <section aria-labelledby="items-title">
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <h2 id="items-title" className="text-base font-semibold text-ink">
                    Productos <span className="font-normal tabular-nums text-muted">({items.length})</span>
                  </h2>
                  <Link to="/catalogo" className="text-sm text-accent hover:underline">Añadir más productos</Link>
                </div>
                <ul className="divide-y divide-line border-b border-line">
                  {items.map((item) =>
                <QuoteItemRow key={item.id} item={item} onQty={(q) => updateQty(item.id, q)} onRemove={() => removeItem(item.id)} />
                )}
                </ul>
              </section>

              <section className="mt-14" aria-labelledby="client-title">
                <h2 id="client-title" className="text-base font-semibold text-ink">Datos de la empresa</h2>
                <p className="mb-6 mt-1 text-sm text-muted">Aparecerán en la propuesta comercial en PDF.</p>
                <QuoteForm formId={FORM_ID} disabled={sending} onSubmit={handleSubmit} />
              </section>
            </div>
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <QuoteTotals items={items} formId={FORM_ID} sending={sending} />
              </div>
            </aside>
          </div>
        }
      </div>
    </div>);

}