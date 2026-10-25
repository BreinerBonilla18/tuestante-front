import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FileTextIcon, MenuIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react';
import { useQuote } from '../../contexts/QuoteContext';
import { environments } from '../../data/environments';
import { productLines } from '../../data/productLines';
import { Logo } from '../Logo';
import { CurrencyToggle } from './CurrencyToggle';

const ease = [0.23, 1, 0.32, 1] as const;

export function SiteHeader() {
  const { itemCount } = useQuote();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLine = new URLSearchParams(location.search).get('linea');

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/catalogo?q=${encodeURIComponent(query.trim())}` : '/catalogo');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="hidden border-b border-line bg-surface md:block">
        <div className="mx-auto flex h-9 max-w-site items-center justify-between px-6 text-xs text-muted">
          <p>Fabricación nacional · Despachos a toda Venezuela</p>
          <div className="flex items-center gap-5">
            <Link to="/fichas-tecnicas" className="hover:text-ink">
              Fichas técnicas
            </Link>
            <Link to="/portal" className="inline-flex items-center gap-1.5 hover:text-ink">
              <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Portal de empleados
            </Link>
            <CurrencyToggle tone="surface" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-site items-center gap-8 px-4 md:px-6">
        <Logo />
        <nav aria-label="Líneas de producto" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                to="/catalogo"
                className={`py-5 ${
                location.pathname.startsWith('/catalogo') && !activeLine ? 'text-accent' : 'text-ink hover:text-accent'}`
                }>
                
                Todos los productos
              </Link>
            </li>
            {productLines.map((line) =>
            <li key={line.id}>
                <Link
                to={`/catalogo?linea=${line.id}`}
                className={`py-5 transition-colors duration-150 ${
                activeLine === line.id ? 'text-accent' : 'text-ink hover:text-accent'}`
                }>
                
                  {line.shortName}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <form onSubmit={submitSearch} role="search" className="relative hidden md:block">
            <label htmlFor="header-search" className="sr-only">
              Buscar productos
            </label>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="header-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por producto o SKU"
              className="h-9 w-56 rounded border border-line bg-white pl-9 pr-3 text-sm placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 xl:w-64" />
            
          </form>
          <Link
            to="/cotizacion"
            className="inline-flex h-9 items-center gap-2 rounded bg-accent px-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            
            <FileTextIcon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cotización</span>
            <span className="min-w-[20px] rounded-sm bg-white/15 px-1.5 text-center text-xs tabular-nums">{itemCount}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-ink lg:hidden"
            aria-label="Abrir menú">
            
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen &&
        <>
            <motion.div
            className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            onClick={() => setMenuOpen(false)} />
          
            <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease }}>
            
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <Logo />
                <button type="button" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" className="p-2 text-ink">
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={submitSearch} role="search" className="border-b border-line p-5">
                <label htmlFor="mobile-search" className="sr-only">
                  Buscar productos
                </label>
                <input
                id="mobile-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por producto o SKU"
                className="h-10 w-full rounded border border-line px-3 text-sm focus:border-accent focus:outline-none" />
              
              </form>
              <MobileGroup title="Líneas de producto" links={productLines.map((l) => ({ to: `/catalogo?linea=${l.id}`, label: l.name }))} />
              <MobileGroup title="Ambientes" links={environments.map((e) => ({ to: `/catalogo/${e.id}`, label: e.name }))} />
              <MobileGroup
              title="Recursos"
              links={[
              { to: '/fichas-tecnicas', label: 'Fichas técnicas' },
              { to: '/cotizacion', label: 'Mi cotización' },
              { to: '/portal', label: 'Portal de empleados' }]
              } />
            
              <div className="mt-auto flex items-center justify-between border-t border-line p-5 text-sm text-muted">
                Moneda
                <CurrencyToggle />
              </div>
            </motion.aside>
          </>
        }
      </AnimatePresence>
    </header>);

}

function MobileGroup({ title, links }: {title: string;links: {to: string;label: string;}[];}) {
  return (
    <div className="border-b border-line px-5 py-4">
      <p className="mb-2 text-xs font-medium text-muted">{title}</p>
      <ul>
        {links.map((link) =>
        <li key={link.to}>
            <Link to={link.to} className="block py-2 text-[15px] text-ink">
              {link.label}
            </Link>
          </li>
        )}
      </ul>
    </div>);

}