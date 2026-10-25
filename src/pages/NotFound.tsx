import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-site flex-col items-start px-4 py-28 md:px-6">
      <p className="text-sm font-medium tabular-nums text-muted">Error 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">No encontramos esta página</h1>
      <p className="mt-3 max-w-md text-muted">Es posible que el producto haya cambiado de nombre o ya no esté disponible.</p>
      <Link to="/catalogo" className="mt-8 inline-flex h-11 items-center rounded bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover">
        Ir al catálogo
      </Link>
    </div>);

}