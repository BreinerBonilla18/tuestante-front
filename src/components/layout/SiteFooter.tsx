import React from 'react';
import { Link } from 'react-router-dom';
import { environments } from '../../data/environments';
import { company, pricing } from '../../data/pricing';
import { productLines } from '../../data/productLines';
import { formatRate } from '../../utils/currency';
import { formatDate } from '../../utils/dates';
import { Logo } from '../Logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 md:grid-cols-12 md:px-6">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Soluciones de almacenamiento y mobiliario metálico fabricadas en Venezuela para empresas, instituciones y hogares.
          </p>
          <address className="mt-6 space-y-1 text-sm not-italic text-muted">
            <p>{company.address}</p>
            <p>{company.phone}</p>
            <p>{company.email}</p>
          </address>
        </div>
        <FooterColumn title="Productos" links={productLines.map((l) => ({ to: `/catalogo?linea=${l.id}`, label: l.shortName }))} />
        <FooterColumn title="Ambientes" links={environments.map((e) => ({ to: `/catalogo/${e.id}`, label: e.name }))} />
        <FooterColumn
          title="Empresas"
          links={[
          { to: '/cotizacion', label: 'Solicitar cotización' },
          { to: '/fichas-tecnicas', label: 'Fichas técnicas' },
          { to: '/configurador/locker-inteligente-rfid-6', label: 'Configurador' },
          { to: '/portal', label: 'Portal de empleados' }]
          } />
        
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-col gap-2 px-4 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © 2026 {company.legalName} · RIF {company.rif}
          </p>
          <p className="tabular-nums">
            {pricing.rateLabel}: {formatRate(pricing.exchangeRate)} · {formatDate(pricing.rateDate)}
          </p>
        </div>
      </div>
    </footer>);

}

function FooterColumn({ title, links }: {title: string;links: {to: string;label: string;}[];}) {
  return (
    <div className="md:col-span-2 lg:col-span-2 [&:last-child]:md:col-span-4 [&:last-child]:lg:col-span-4">
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) =>
        <li key={link.to}>
            <Link to={link.to} className="text-muted hover:text-ink">
              {link.label}
            </Link>
          </li>
        )}
      </ul>
    </div>);

}