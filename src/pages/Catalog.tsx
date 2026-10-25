import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PackageSearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CatalogFilters } from '../components/catalog/CatalogFilters';
import { ProductCard } from '../components/catalog/ProductCard';
import { useCatalogFilters } from '../components/catalog/useCatalogFilters';
import { sortOptions } from '../data/catalogFilters';
import { environments } from '../data/environments';
import { productLines } from '../data/productLines';

const ease = [0.23, 1, 0.32, 1] as const;

export function Catalog() {
  const { environment, selected, query, sort, results, activeCount, toggle, setSort, clearAll, clearQuery } =
  useCatalogFilters();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const singleLine = selected.linea.length === 1 ? productLines.find((l) => l.id === selected.linea[0]) : null;
  const title = environment?.name ?? singleLine?.name ?? 'Todos los productos';
  const description =
  environment?.description ?? singleLine?.description ?? 'Almacenamiento y mobiliario metálico para oficinas, educación, industria y hogar.';

  const filtersPanel =
  <CatalogFilters selected={selected} onToggle={toggle} onClear={clearAll} activeCount={activeCount} />;


  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-site px-4 pb-20 pt-8 md:px-6">
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Catálogo', to: environment ? '/catalogo' : undefined }, ...(environment ? [{ label: environment.name }] : [])]} />
        <div className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h1>
          <p className="mt-3 text-muted">{description}</p>
        </div>

        <nav aria-label="Ambientes" className="mt-8 overflow-x-auto border-b border-line">
          <ul className="flex min-w-max gap-6 text-sm">
            <EnvTab to="/catalogo" active={!environment} label="Todos" />
            {environments.map((env) =>
            <EnvTab key={env.id} to={`/catalogo/${env.id}`} active={environment?.id === env.id} label={env.name} />
            )}
          </ul>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[232px_1fr]">
          <aside className="hidden lg:block" aria-label="Filtros del catálogo">
            <div className="sticky top-32">{filtersPanel}</div>
          </aside>

          <section aria-label="Resultados">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-sm text-muted" aria-live="polite">
                <span className="font-medium tabular-nums text-ink">{results.length}</span> {results.length === 1 ? 'producto' : 'productos'}
                {query &&
                <>
                    {' '}para «<span className="text-ink">{query}</span>»{' '}
                    <button type="button" onClick={clearQuery} className="ml-1 text-accent hover:underline">
                      quitar búsqueda
                    </button>
                  </>
                }
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-9 items-center gap-2 rounded border border-line px-3 text-sm text-ink lg:hidden">
                  
                  <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
                  Filtros{activeCount > 0 && ` (${activeCount})`}
                </button>
                <label htmlFor="sort" className="sr-only">
                  Ordenar por
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 rounded border border-line bg-white px-3 text-sm text-ink focus:border-accent focus:outline-none">
                  
                  {sortOptions.map((o) =>
                  <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  )}
                </select>
              </div>
            </div>

            {results.length === 0 ?
            <div className="flex flex-col items-center py-24 text-center">
                <PackageSearchIcon className="h-10 w-10 text-subtle" aria-hidden="true" />
                <h2 className="mt-4 text-lg font-medium text-ink">No hay productos con estos filtros</h2>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Pruebe quitando algún filtro o escríbanos: fabricamos medidas especiales bajo pedido.
                </p>
                <div className="mt-6 flex gap-3">
                  <button type="button" onClick={clearAll} className="h-10 rounded bg-accent px-4 text-sm font-medium text-white hover:bg-accent-hover">
                    Limpiar filtros
                  </button>
                  <Link to="/cotizacion" className="inline-flex h-10 items-center rounded border border-line px-4 text-sm font-medium text-ink hover:border-ink">
                    Solicitar fabricación especial
                  </Link>
                </div>
              </div> :

            <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((product) =>
              <li key={product.slug}>
                    <ProductCard product={product} />
                  </li>
              )}
              </ul>
            }
          </section>
        </div>
      </div>

      <AnimatePresence>
        {filtersOpen &&
        <>
            <motion.div
            className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            onClick={() => setFiltersOpen(false)} />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filtros"
            className="fixed inset-y-0 left-0 z-50 flex w-[86%] max-w-sm flex-col bg-white lg:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.26, ease }}>
            
              <div className="flex justify-end border-b border-line p-3">
                <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Cerrar filtros" className="p-2">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{filtersPanel}</div>
              <div className="border-t border-line p-4">
                <button type="button" onClick={() => setFiltersOpen(false)} className="h-11 w-full rounded bg-accent text-sm font-medium text-white">
                  Ver {results.length} productos
                </button>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </div>);

}

function EnvTab({ to, active, label }: {to: string;active: boolean;label: string;}) {
  return (
    <li>
      <Link
        to={to}
        aria-current={active ? 'page' : undefined}
        className={`-mb-px inline-block border-b-2 pb-3 transition-colors duration-150 ${
        active ? 'border-accent font-medium text-ink' : 'border-transparent text-muted hover:text-ink'}`
        }>
        
        {label}
      </Link>
    </li>);

}