import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: {items: Crumb[];}) {
  return (
    <nav aria-label="Ruta de navegación" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) =>
        <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />}
            {item.to ?
          <Link to={item.to} className="hover:text-ink hover:underline">
                {item.label}
              </Link> :

          <span aria-current="page" className="text-ink">
                {item.label}
              </span>
          }
          </li>
        )}
      </ol>
    </nav>);

}