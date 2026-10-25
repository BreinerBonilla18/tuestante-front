import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { DownloadIcon, LockIcon, SlidersHorizontalIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/catalog/ProductCard';
import { Price } from '../components/Price';
import { ProductPlaceholder } from '../components/ProductPlaceholder';
import { usePortalSession } from '../contexts/PortalSessionContext';
import { useQuote } from '../contexts/QuoteContext';
import { lockOptions } from '../data/configOptions';
import { documents, documentTypeLabels } from '../data/documents';
import { environments } from '../data/environments';
import { productLines } from '../data/productLines';
import { products } from '../data/products';
import { ralColors } from '../data/ralColors';
import { defaultConfig } from '../utils/configRules';
import { formatDate } from '../utils/dates';
import { buildItemConfig, computeUnitPrice } from '../utils/pricing';
import { NotFound } from './NotFound';

const views = ['Vista frontal', 'Vista lateral', 'Detalle de cerradura'];

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useQuote();
  const { user } = usePortalSession();
  const [view, setView] = useState(0);
  const product = products.find((p) => p.slug === slug);

  if (!product) return <NotFound />;

  const line = productLines.find((l) => l.id === product.line);
  const colors = ralColors.filter((c) => product.colors.includes(c.code));
  const docs = documents.filter((d) => d.productSlug === product.slug || d.productSlug === null && d.line === product.line);
  const related = products.filter((p) => p.line === product.line && p.slug !== product.slug).slice(0, 3);
  const envNames = environments.filter((e) => product.environments.includes(e.id)).map((e) => e.name);

  const addStandard = () => {
    const config = defaultConfig(product);
    addItem({
      productSlug: product.slug,
      productName: product.name,
      sku: product.sku,
      line: product.line,
      unitPriceUsd: computeUnitPrice(product, config),
      qty: 1,
      config: buildItemConfig(product, config)
    });
    toast.success('Añadido a su cotización', {
      description: `${product.name} · configuración estándar`,
      action: { label: 'Ver cotización', onClick: () => navigate('/cotizacion') }
    });
  };

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-site px-4 pb-20 pt-8 md:px-6">
        <Breadcrumbs
          items={[
          { label: 'Inicio', to: '/' },
          { label: line?.shortName ?? 'Catálogo', to: `/catalogo?linea=${product.line}` },
          { label: product.name }]
          } />
        

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProductPlaceholder
              line={product.line}
              name={product.name}
              label={views[view]}
              showName
              lock={view === 2 ? product.lockTypes[product.lockTypes.length - 1] : product.lockTypes[0]}
              className="aspect-square md:aspect-[5/4]"
              silhouetteClassName={view === 2 ? 'h-[92%] w-auto' : 'h-[66%] w-auto'} />
            
            <div className="mt-3 grid grid-cols-3 gap-3" role="tablist" aria-label="Vistas del producto">
              {views.map((label, i) =>
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={view === i}
                onClick={() => setView(i)}
                className={`rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent ${view === i ? 'ring-2 ring-accent' : 'ring-1 ring-transparent hover:ring-line'}`}>
                
                  <ProductPlaceholder line={product.line} name={`${product.name} — ${label}`} className="aspect-[4/3]" silhouetteClassName="h-[60%] w-auto" />
                  <span className="sr-only">{label}</span>
                </button>
              )}
            </div>
            <p className="mt-3 text-xs text-muted">Imágenes referenciales. Las fotografías finales se publicarán en formato WebP.</p>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm text-muted">{line?.name} · SKU {product.sku}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted">{product.summary}</p>
            <div className="mt-6">
              <Price usd={product.basePriceUsd} size="lg" prefix="Desde" />
              <p className="mt-1 text-xs text-muted">Precio unitario antes de IVA. Varía según configuración.</p>
            </div>

            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              <div className="flex items-start justify-between gap-6 py-3.5">
                <dt className="text-muted">Colores</dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {colors.map((c) =>
                  <span key={c.code} title={`RAL ${c.code} · ${c.name}`} className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                  )}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-6 py-3.5">
                <dt className="text-muted">Cerraduras</dt>
                <dd className="text-right text-ink">
                  {product.lockTypes.length ? lockOptions.filter((l) => product.lockTypes.includes(l.id)).map((l) => l.label).join(' · ') : 'Sin cerradura'}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-6 py-3.5">
                <dt className="text-muted">Medidas</dt>
                <dd className="text-right tabular-nums text-ink">
                  {product.dimensions.map((d) =>
                  <div key={d.id}>{d.label}</div>
                  )}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-6 py-3.5">
                <dt className="text-muted">Ambientes</dt>
                <dd className="text-right text-ink">{envNames.join(', ')}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/configurador/${product.slug}`}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover">
                
                <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                Configurar
              </Link>
              <button
                type="button"
                onClick={addStandard}
                className="inline-flex h-12 flex-1 items-center justify-center rounded border border-ink px-5 text-sm font-medium text-ink transition-colors duration-150 hover:bg-ink hover:text-white">
                
                Añadir estándar a cotización
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <section className="lg:col-span-7" aria-labelledby="desc-title">
            <h2 id="desc-title" className="text-xl font-semibold text-ink">Descripción</h2>
            <p className="mt-4 leading-relaxed text-muted">{product.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink">
              {product.highlights.map((h) =>
              <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1 w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {h}
                </li>
              )}
            </ul>

            <h2 className="mt-14 text-xl font-semibold text-ink">Especificaciones técnicas</h2>
            <table className="mt-4 w-full text-sm">
              <tbody className="divide-y divide-line border-y border-line">
                {product.specs.map((s) =>
                <tr key={s.label}>
                    <th scope="row" className="w-2/5 py-3 pr-4 text-left font-normal text-muted">{s.label}</th>
                    <td className="py-3 tabular-nums text-ink">{s.value}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          <section className="lg:col-span-5" aria-labelledby="docs-title">
            <div className="flex items-baseline justify-between">
              <h2 id="docs-title" className="text-xl font-semibold text-ink">Fichas técnicas</h2>
              <Link to="/fichas-tecnicas" className="text-sm text-accent hover:underline">Ver biblioteca</Link>
            </div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {docs.map((doc) => {
                const locked = doc.access === 'empleados' && !user;
                return (
                  <li key={doc.id} className="flex items-center gap-4 py-3.5">
                    <span className="flex h-10 w-9 shrink-0 items-center justify-center rounded-sm bg-surface text-[10px] font-semibold text-muted">{doc.format}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink">{doc.title}</p>
                      <p className="text-xs text-muted">
                        {documentTypeLabels[doc.type]} · {(doc.sizeKb / 1024).toFixed(1)} MB · {formatDate(doc.updatedAt)}
                      </p>
                    </div>
                    {locked ?
                    <Link to="/portal/login" className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink" title="Requiere acceso de empleado">
                        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        Privado
                      </Link> :

                    <button
                      type="button"
                      onClick={() => toast('Descarga iniciada', { description: doc.title })}
                      className="inline-flex h-8 w-8 items-center justify-center rounded text-accent hover:bg-accent-soft"
                      aria-label={`Descargar ${doc.title}`}>
                      
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                    }
                  </li>);

              })}
            </ul>
          </section>
        </div>

        {related.length > 0 &&
        <section className="mt-20 border-t border-line pt-12" aria-labelledby="related-title">
            <h2 id="related-title" className="text-xl font-semibold text-ink">Otros {line?.shortName.toLowerCase()}</h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) =>
            <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
            )}
            </ul>
          </section>
        }
      </div>
    </div>);

}