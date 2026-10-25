import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import { Price } from '../components/Price';
import { ProductPlaceholder } from '../components/ProductPlaceholder';
import { ProductSilhouette } from '../components/ProductSilhouette';
import { environments } from '../data/environments';
import { pricing } from '../data/pricing';
import { productLines } from '../data/productLines';
import { products } from '../data/products';
import { ralColors } from '../data/ralColors';

const popularSearches = [
{ label: 'Lockers RFID', to: '/catalogo?linea=lockers&cerradura=rfid' },
{ label: 'Racks de carga pesada', to: '/producto/rack-industrial-pesado' },
{ label: 'Cajoneras móviles', to: '/producto/cajonera-movil-3' }];


export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [previewColor, setPreviewColor] = useState(ralColors[4]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/catalogo?q=${encodeURIComponent(query.trim())}` : '/catalogo');
  };

  return (
    <div className="w-full bg-white">
      <section className="mx-auto grid max-w-site items-center gap-10 px-4 py-12 md:px-6 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-6">
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl lg:text-[56px]">
            Almacenamiento metálico, configurado para su espacio.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Lockers inteligentes, cajoneras, estanterías y armarios fabricados en Venezuela, con pintura electrostática en colores RAL. Cotice en dólares o bolívares.
          </p>
          <form onSubmit={submit} role="search" className="mt-8 flex max-w-xl">
            <label htmlFor="hero-search" className="sr-only">
              Buscar en el catálogo
            </label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="hero-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué necesita guardar? Ej. locker, archivo, rack"
                className="h-14 w-full rounded-l border border-r-0 border-line bg-white pl-12 pr-4 text-[15px] placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              
            </div>
            <button
              type="submit"
              className="h-14 rounded-r bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover">
              
              Buscar
            </button>
          </form>
          <p className="mt-4 text-sm text-muted">
            Más buscados:{' '}
            {popularSearches.map((item, i) =>
            <React.Fragment key={item.to}>
                {i > 0 && ' · '}
                <Link to={item.to} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                  {item.label}
                </Link>
              </React.Fragment>
            )}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3 lg:col-span-6">
          <ProductPlaceholder
            line="lockers"
            name="Locker Inteligente RFID 6 puertas"
            colorHex="#0E4C92"
            lock="rfid"
            label="Locker Inteligente RFID"
            className="col-span-3 aspect-[3/4]" />
          
          <div className="col-span-2 grid gap-3">
            <ProductPlaceholder line="estanterias" name="Estantería Media Carga" colorHex="#383E42" label="Estantería Media Carga" className="aspect-square" />
            <ProductPlaceholder line="cajoneras" name="Cajonera Móvil" colorHex="#CBD0CC" label="Cajonera Móvil" className="aspect-square" />
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="ambientes-title">
        <div className="mx-auto max-w-site px-4 py-16 md:px-6">
          <div className="flex items-end justify-between gap-6">
            <h2 id="ambientes-title" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Compre por ambiente
            </h2>
            <Link to="/catalogo" className="hidden items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:inline-flex">
              Ver todo el catálogo <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {environments.map((env) => {
              const count = products.filter((p) => p.environments.includes(env.id)).length;
              return (
                <Link key={env.id} to={`/catalogo/${env.id}`} className="group flex flex-col">
                  <ProductPlaceholder
                    line={env.featuredLine}
                    name={env.name}
                    className="aspect-[4/3] transition-colors duration-200 ease-out group-hover:bg-[#ECEFF3]"
                    silhouetteClassName="h-[58%] w-auto" />
                  
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium text-ink group-hover:text-accent">{env.name}</h3>
                    <span className="text-xs tabular-nums text-muted">{count} productos</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{env.description}</p>
                </Link>);

            })}
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="lineas-title">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 md:px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="lineas-title" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Líneas de producto
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Cada línea se fabrica en acero laminado en frío con calibres y tolerancias documentados en su ficha técnica.
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {productLines.map((line) => {
              const lineProducts = products.filter((p) => p.line === line.id);
              const from = Math.min(...lineProducts.map((p) => p.basePriceUsd));
              return (
                <li key={line.id} className="border-b border-line">
                  <Link
                    to={`/catalogo?linea=${line.id}`}
                    className="group grid grid-cols-[56px_1fr_auto] items-center gap-5 py-5 transition-colors duration-150 hover:bg-surface md:grid-cols-[72px_1fr_160px_24px] md:px-3">
                    
                    <div className="flex h-14 w-14 items-center justify-center bg-surface group-hover:bg-white md:h-[72px] md:w-[72px]">
                      <ProductSilhouette line={line.id} className="h-11 w-auto md:h-14" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-ink md:text-xl">{line.name}</h3>
                      <p className="mt-1 text-sm text-muted">{line.description}</p>
                    </div>
                    <div className="hidden md:block">
                      <Price usd={from} size="sm" prefix="Desde" />
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-muted transition-transform duration-150 ease-out group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
                  </Link>
                </li>);

            })}
          </ul>
        </div>
      </section>

      <section className="bg-surface" aria-labelledby="configurador-title">
        <div className="mx-auto grid max-w-site items-center gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 id="configurador-title" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              Configure antes de cotizar
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              Elija color RAL, acabado electrostático, tipo de cerradura, dimensiones y accesorios. El configurador solo le permite combinaciones que fabricamos, y el precio se actualiza mientras decide.
            </p>
            <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="text-muted">Colores</dt>
                <dd className="font-medium text-ink">Catálogo RAL</dd>
              </div>
              <div>
                <dt className="text-muted">Cerraduras</dt>
                <dd className="font-medium text-ink">Mecánica, Digital o RFID</dd>
              </div>
              <div>
                <dt className="text-muted">Acabado</dt>
                <dd className="font-medium text-ink">Pintura electrostática</dd>
              </div>
              <div>
                <dt className="text-muted">Entrega</dt>
                <dd className="font-medium text-ink">Propuesta en PDF</dd>
              </div>
            </dl>
            <Link
              to="/configurador/locker-inteligente-rfid-6"
              className="mt-10 inline-flex h-11 items-center gap-2 rounded bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover">
              
              Configurar un locker RFID <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-white p-6 md:p-10">
            <div className="flex aspect-[4/3] items-center justify-center">
              <ProductSilhouette line="lockers" colorHex={previewColor.hex} lock="rfid" className="h-full w-auto" />
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
              <p className="text-sm">
                <span className="font-medium text-ink">RAL {previewColor.code}</span>{' '}
                <span className="text-muted">{previewColor.name}</span>
              </p>
              <div className="flex gap-1.5" role="radiogroup" aria-label="Vista previa de color">
                {ralColors.slice(0, 6).map((c) =>
                <button
                  key={c.code}
                  type="button"
                  role="radio"
                  aria-checked={previewColor.code === c.code}
                  aria-label={`RAL ${c.code} ${c.name}`}
                  onClick={() => setPreviewColor(c)}
                  className={`h-6 w-6 rounded-full border border-black/10 transition-transform duration-150 ease-out hover:scale-110 ${
                  previewColor.code === c.code ? 'ring-2 ring-accent ring-offset-2' : ''}`
                  }
                  style={{ backgroundColor: c.hex }} />

                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-accent text-white" aria-labelledby="b2b-title">
        <div className="mx-auto grid max-w-site gap-10 px-4 py-16 md:px-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="b2b-title" className="text-3xl font-semibold tracking-tight md:text-4xl">
              ¿Equipa una sede completa?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Arme una cotización con varios productos y reciba una propuesta comercial en PDF con desglose técnico, IVA del {Math.round(pricing.ivaRate * 100)} % y montos en USD y VES, válida por {pricing.validityDays} días.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link to="/cotizacion" className="inline-flex h-12 items-center rounded bg-white px-6 text-sm font-semibold text-accent transition-colors duration-150 hover:bg-accent-soft">
              Iniciar cotización
            </Link>
            <Link to="/fichas-tecnicas" className="inline-flex h-12 items-center rounded border border-white/40 px-6 text-sm font-medium text-white transition-colors duration-150 hover:border-white">
              Ver fichas técnicas
            </Link>
          </div>
        </div>
      </section>
    </div>);

}