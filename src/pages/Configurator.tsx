import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { AlertTriangleIcon, InfoIcon, MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OptionRow, OptionStep } from '../components/configurator/OptionStep';
import { useConfigurator } from '../components/configurator/useConfigurator';
import { Price } from '../components/Price';
import { ProductSilhouette } from '../components/ProductSilhouette';
import { useCurrency } from '../contexts/CurrencyContext';
import { useQuote } from '../contexts/QuoteContext';
import { accessories, finishOptions, lockOptions } from '../data/configOptions';
import { productLines } from '../data/productLines';
import { products } from '../data/products';
import { ralColors } from '../data/ralColors';
import { pricing } from '../data/pricing';
import type { Product } from '../types/catalog';
import { getAccessoryReason, getFinishReason, getLockReason } from '../utils/configRules';
import { formatMoney } from '../utils/currency';
import { buildItemConfig } from '../utils/pricing';
import { NotFound } from './NotFound';

const ease = [0.23, 1, 0.32, 1] as const;

export function Configurator() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <NotFound />;
  return <ConfiguratorView key={product.slug} product={product} />;
}

function ConfiguratorView({ product }: {product: Product;}) {
  const navigate = useNavigate();
  const { addItem } = useQuote();
  const { currency, rate } = useCurrency();
  const c = useConfigurator(product);
  const line = productLines.find((l) => l.id === product.line);
  const colors = ralColors.filter((col) => product.colors.includes(col.code));
  const color = ralColors.find((col) => col.code === c.config.colorCode) ?? colors[0];
  const itemConfig = buildItemConfig(product, c.config);
  const plus = (usd: number) => usd === 0 ? 'Incluido' : `+ ${formatMoney(usd, currency, rate)}`;

  const addToQuote = () => {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      sku: product.sku,
      line: product.line,
      unitPriceUsd: c.unitPrice,
      qty: c.qty,
      config: itemConfig
    });
    toast.success('Configuración añadida a su cotización', { description: `${c.qty} × ${product.name}` });
    navigate('/cotizacion');
  };

  const summaryRows = [
  ['Color', `RAL ${itemConfig.colorCode} · ${itemConfig.colorName}`],
  ['Acabado', itemConfig.finishLabel],
  ['Cerradura', itemConfig.lockLabel],
  ['Medidas', itemConfig.dimensionLabel],
  ['Accesorios', itemConfig.accessoryLabels.length ? itemConfig.accessoryLabels.join(', ') : 'Ninguno']];


  return (
    <div className="w-full bg-white pb-28 lg:pb-0">
      <div className="mx-auto max-w-site px-4 pt-8 md:px-6">
        <Breadcrumbs
          items={[
          { label: 'Inicio', to: '/' },
          { label: line?.shortName ?? 'Catálogo', to: `/catalogo?linea=${product.line}` },
          { label: product.name, to: `/producto/${product.slug}` },
          { label: 'Configurador' }]
          } />
        
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted">Configurador · SKU {product.sku}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink md:text-3xl">{product.name}</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-surface">
                <ProductSilhouette line={product.line} colorHex={color.hex} lock={c.config.lock} className="h-[78%] w-auto" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-sm bg-white px-2.5 py-1.5 text-xs">
                  <span className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: color.hex }} aria-hidden="true" />
                  <span className="font-medium text-ink">RAL {color.code}</span>
                  <span className="text-muted">{color.name}</span>
                </div>
                <p className="absolute bottom-4 left-4 text-[11px] text-muted">Vista referencial · {itemConfig.dimensionLabel}</p>
              </div>

              <div className="mt-6 hidden lg:block">
                <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm xl:grid-cols-3">
                  {summaryRows.map(([label, value]) =>
                  <div key={label} className="min-w-0">
                      <dt className="text-xs text-muted">{label}</dt>
                      <dd className="truncate text-ink" title={value}>{value}</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 flex items-center gap-6 border-t border-line pt-6">
                  <QtyStepper qty={c.qty} setQty={c.setQty} />
                  <div className="flex-1">
                    <Price usd={c.total} size="lg" />
                    <p className="text-xs text-muted tabular-nums">
                      {formatMoney(c.unitPrice, currency, rate)} por unidad · antes de IVA
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addToQuote}
                    className="h-12 rounded bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover">
                    
                    Añadir a cotización
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence>
              {c.notice &&
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease }}
                role="status"
                className="mb-4 flex items-start gap-3 rounded bg-accent-soft px-4 py-3 text-sm text-ink">
                
                  <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <p className="flex-1">{c.notice}</p>
                  <button type="button" onClick={c.dismissNotice} aria-label="Cerrar aviso" className="text-muted hover:text-ink">
                    <XIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              }
            </AnimatePresence>

            <OptionStep index={1} title="Color RAL" value={`RAL ${color.code}`}>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Color RAL">
                {colors.map((col) => {
                  const active = col.code === c.config.colorCode;
                  return (
                    <button
                      key={col.code}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => c.setColor(col.code)}
                      className={`rounded border p-1.5 text-left transition-colors duration-150 ${active ? 'border-accent bg-accent-soft' : 'border-line hover:border-muted'}`}>
                      
                      <span className="block h-10 rounded-sm border border-black/10" style={{ backgroundColor: col.hex }} />
                      <span className="mt-1.5 block text-xs font-medium tabular-nums text-ink">{col.code}</span>
                      <span className="block truncate text-[11px] text-muted">{col.name}</span>
                    </button>);

                })}
              </div>
              <p className="mt-3 text-xs text-muted">
                Colores de seguridad (1023, 3020): + {formatMoney(pricing.specialColorSurchargeUsd, currency, rate)} por unidad.
              </p>
            </OptionStep>

            <OptionStep index={2} title="Acabado electrostático" value={itemConfig.finishLabel}>
              <div className="space-y-2" role="radiogroup" aria-label="Acabado">
                {finishOptions.map((f) =>
                <OptionRow
                  key={f.id}
                  selected={c.config.finish === f.id}
                  disabledReason={getFinishReason(product, f.id)}
                  onSelect={() => c.setFinish(f.id)}
                  title={f.label}
                  description={f.description}
                  price={plus(f.priceUsd)} />

                )}
              </div>
            </OptionStep>

            <OptionStep index={3} title="Cerradura" value={itemConfig.lockLabel}>
              <div className="space-y-2" role="radiogroup" aria-label="Cerradura">
                {lockOptions.map((l) =>
                <OptionRow
                  key={l.id}
                  selected={c.config.lock === l.id}
                  disabledReason={getLockReason(product, l.id)}
                  onSelect={() => c.setLock(l.id)}
                  title={l.label}
                  description={l.description}
                  price={plus(l.priceUsd)} />

                )}
              </div>
            </OptionStep>

            <OptionStep index={4} title="Dimensiones" value="Alto × ancho × fondo">
              <div className="space-y-2" role="radiogroup" aria-label="Dimensiones">
                {product.dimensions.map((d) =>
                <OptionRow
                  key={d.id}
                  selected={c.config.dimensionId === d.id}
                  onSelect={() => c.setDimension(d.id)}
                  title={d.label}
                  description={`Altura total ${d.heightMm.toLocaleString('es-VE')} mm`}
                  price={formatMoney(d.priceUsd, currency, rate)} />

                )}
              </div>
            </OptionStep>

            <OptionStep index={5} title="Accesorios" value={`${c.config.accessories.length} seleccionados`}>
              <div className="space-y-2">
                {accessories.
                filter((a) => product.accessories.includes(a.id)).
                map((a) =>
                <OptionRow
                  key={a.id}
                  type="checkbox"
                  selected={c.config.accessories.includes(a.id)}
                  disabledReason={getAccessoryReason(product, c.config, a.id)}
                  onSelect={() => c.toggleAccessory(a.id)}
                  title={a.label}
                  description={a.description}
                  price={plus(a.priceUsd)} />

                )}
              </div>
            </OptionStep>

            {c.warnings.length > 0 &&
            <div className="mb-8 space-y-2">
                {c.warnings.map((w) =>
              <p key={w} className="flex gap-3 rounded bg-warning-soft px-4 py-3 text-sm text-warning">
                    <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {w}
                  </p>
              )}
              </div>
            }
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <QtyStepper qty={c.qty} setQty={c.setQty} compact />
          <div className="min-w-0 flex-1">
            <Price usd={c.total} size="sm" />
          </div>
          <button type="button" onClick={addToQuote} className="h-11 rounded bg-accent px-4 text-sm font-medium text-white">
            Añadir
          </button>
        </div>
      </div>
    </div>);

}

function QtyStepper({ qty, setQty, compact = false }: {qty: number;setQty: (n: number) => void;compact?: boolean;}) {
  const size = compact ? 'h-9 w-8' : 'h-12 w-10';
  return (
    <div className="inline-flex items-center rounded border border-line">
      <button type="button" onClick={() => setQty(qty - 1)} className={`${size} flex items-center justify-center text-muted hover:text-ink disabled:opacity-40`} disabled={qty <= 1} aria-label="Disminuir cantidad">
        <MinusIcon className="h-4 w-4" />
      </button>
      <label className="sr-only" htmlFor={compact ? 'qty-m' : 'qty'}>Cantidad</label>
      <input
        id={compact ? 'qty-m' : 'qty'}
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className={`${compact ? 'h-9 w-10' : 'h-12 w-12'} border-x border-line text-center text-sm tabular-nums text-ink focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`} />
      
      <button type="button" onClick={() => setQty(qty + 1)} className={`${size} flex items-center justify-center text-muted hover:text-ink`} aria-label="Aumentar cantidad">
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>);

}