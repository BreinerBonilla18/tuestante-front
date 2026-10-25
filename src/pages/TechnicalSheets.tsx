import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { DownloadIcon, FileSearchIcon, LockIcon, SearchIcon } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { usePortalSession } from '../contexts/PortalSessionContext';
import { documents, documentTypeLabels } from '../data/documents';
import { productLines } from '../data/productLines';
import { products } from '../data/products';
import type { DocumentType, LineId } from '../types/catalog';
import { formatDate } from '../utils/dates';

const types = Object.keys(documentTypeLabels) as DocumentType[];

export function TechnicalSheets() {
  const { user } = usePortalSession();
  const [line, setLine] = useState<LineId | 'todas'>('todas');
  const [type, setType] = useState<DocumentType | 'todos'>('todos');
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter(
      (d) =>
      (line === 'todas' || d.line === line) && (
      type === 'todos' || d.type === type) && (
      !q || d.title.toLowerCase().includes(q))
    );
  }, [line, type, query]);

  const restrictedCount = documents.filter((d) => d.access === 'empleados').length;

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-site px-4 pb-20 pt-8 md:px-6">
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Fichas técnicas' }]} />
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">Fichas técnicas y descargables</h1>
            <p className="mt-3 max-w-xl text-muted">
              Planos, tolerancias, calibres de lámina y especificaciones de cada línea. Algunos documentos de fabricación están reservados al personal.
            </p>
          </div>
          {!user &&
          <p className="text-sm text-muted lg:col-span-5 lg:text-right">
              <LockIcon className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
              {restrictedCount} documentos privados ·{' '}
              <Link to="/portal/login" className="font-medium text-accent hover:underline">Acceso de empleados</Link>
            </p>
          }
        </div>

        <div className="mt-10 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por línea">
            <Chip active={line === 'todas'} onClick={() => setLine('todas')}>Todas las líneas</Chip>
            {productLines.map((l) =>
            <Chip key={l.id} active={line === l.id} onClick={() => setLine(l.id)}>{l.shortName}</Chip>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="doc-type" className="sr-only">Tipo de documento</label>
            <select id="doc-type" value={type} onChange={(e) => setType(e.target.value as DocumentType | 'todos')} className="h-9 rounded border border-line bg-white px-3 text-sm text-ink focus:border-accent focus:outline-none">
              <option value="todos">Todos los tipos</option>
              {types.map((t) =>
              <option key={t} value={t}>{documentTypeLabels[t]}</option>
              )}
            </select>
            <div className="relative">
              <label htmlFor="doc-search" className="sr-only">Buscar documento</label>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input id="doc-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar documento" className="h-9 w-56 rounded border border-line pl-9 pr-3 text-sm focus:border-accent focus:outline-none" />
            </div>
          </div>
        </div>

        {results.length === 0 ?
        <div className="flex flex-col items-center py-24 text-center">
            <FileSearchIcon className="h-10 w-10 text-subtle" aria-hidden="true" />
            <p className="mt-4 font-medium text-ink">No hay documentos con estos criterios</p>
            <button type="button" onClick={() => {setLine('todas');setType('todos');setQuery('');}} className="mt-4 text-sm font-medium text-accent hover:underline">
              Restablecer filtros
            </button>
          </div> :

        <table className="w-full text-sm">
            <caption className="sr-only">Documentos técnicos</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-line text-left text-xs text-muted">
                <th scope="col" className="py-3 font-medium">Documento</th>
                <th scope="col" className="py-3 font-medium">Tipo</th>
                <th scope="col" className="py-3 font-medium">Tamaño</th>
                <th scope="col" className="py-3 font-medium">Actualizado</th>
                <th scope="col" className="py-3 text-right font-medium">Acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {results.map((doc) => {
              const product = products.find((p) => p.slug === doc.productSlug);
              const locked = doc.access === 'empleados' && !user;
              return (
                <tr key={doc.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-4 md:table-row">
                    <td className="w-full md:w-auto md:py-4 md:pr-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-9 shrink-0 items-center justify-center rounded-sm bg-surface text-[10px] font-semibold text-muted">{doc.format}</span>
                        <div className="min-w-0">
                          <p className="text-ink">{doc.title}</p>
                          {product ?
                        <Link to={`/producto/${product.slug}`} className="text-xs text-muted hover:text-accent hover:underline">{product.sku}</Link> :

                        <p className="text-xs text-muted">Toda la línea</p>
                        }
                        </div>
                      </div>
                    </td>
                    <td className="text-xs text-muted md:py-4 md:text-sm">{documentTypeLabels[doc.type]}</td>
                    <td className="text-xs tabular-nums text-muted md:py-4 md:text-sm">{(doc.sizeKb / 1024).toFixed(1)} MB</td>
                    <td className="text-xs text-muted md:py-4 md:text-sm">{formatDate(doc.updatedAt)}</td>
                    <td className="ml-auto md:py-4 md:text-right">
                      {locked ?
                    <Link to="/portal/login" className="inline-flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-ink hover:text-ink">
                          <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          Solo empleados
                        </Link> :

                    <button
                      type="button"
                      onClick={() => toast('Descarga iniciada', { description: doc.title })}
                      className="inline-flex items-center gap-1.5 rounded bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent hover:text-white">
                      
                          <DownloadIcon className="h-3.5 w-3.5" aria-hidden="true" />
                          Descargar
                        </button>
                    }
                    </td>
                  </tr>);

            })}
            </tbody>
          </table>
        }
      </div>
    </div>);

}

function Chip({ active, onClick, children }: {active: boolean;onClick: () => void;children: React.ReactNode;}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-8 rounded-sm px-3 text-sm transition-colors duration-150 ${active ? 'bg-ink text-white' : 'bg-surface text-ink hover:bg-line'}`}>
      
      {children}
    </button>);

}