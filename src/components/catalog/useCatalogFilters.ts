import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { heightRanges } from '../../data/catalogFilters';
import { environments } from '../../data/environments';
import { products } from '../../data/products';
import type { EnvironmentId, Product } from '../../types/catalog';

export type FilterKey = 'linea' | 'cerradura' | 'altura' | 'color';

export function useCatalogFilters() {
  const { ambiente } = useParams();
  const [params, setParams] = useSearchParams();

  const environment = environments.find((e) => e.id === ambiente) ?? null;
  const selected: Record<FilterKey, string[]> = {
    linea: params.getAll('linea'),
    cerradura: params.getAll('cerradura'),
    altura: params.getAll('altura'),
    color: params.getAll('color')
  };
  const query = params.get('q') ?? '';
  const sort = params.get('orden') ?? 'relevancia';

  const toggle = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params);
    const current = next.getAll(key);
    next.delete(key);
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updated.forEach((v) => next.append(key, v));
    setParams(next, { replace: true });
  };

  const setSort = (value: string) => {
    const next = new URLSearchParams(params);
    next.set('orden', value);
    setParams(next, { replace: true });
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    if (sort !== 'relevancia') next.set('orden', sort);
    setParams(next, { replace: true });
  };

  const clearQuery = () => {
    const next = new URLSearchParams(params);
    next.delete('q');
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p: Product) => {
      if (environment && !p.environments.includes(environment.id as EnvironmentId)) return false;
      if (selected.linea.length && !selected.linea.includes(p.line)) return false;
      if (selected.cerradura.length && !selected.cerradura.some((c) => p.lockTypes.includes(c as Product['lockTypes'][number]))) return false;
      if (selected.color.length && !selected.color.some((c) => p.colors.includes(c))) return false;
      if (selected.altura.length) {
        const ranges = heightRanges.filter((r) => selected.altura.includes(r.id));
        if (!p.dimensions.some((d) => ranges.some((r) => d.heightMm >= r.min && d.heightMm <= r.max))) return false;
      }
      if (q && !`${p.name} ${p.sku} ${p.summary}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const sorted = [...filtered];
    if (sort === 'precio-asc') sorted.sort((a, b) => a.basePriceUsd - b.basePriceUsd);
    if (sort === 'precio-desc') sorted.sort((a, b) => b.basePriceUsd - a.basePriceUsd);
    if (sort === 'nombre') sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, environment]);

  const activeCount =
  selected.linea.length + selected.cerradura.length + selected.altura.length + selected.color.length;

  return { environment, selected, query, sort, results, activeCount, toggle, setSort, clearAll, clearQuery };
}