import { accessories, finishOptions, lockOptions } from '../data/configOptions';
import { pricing } from '../data/pricing';
import { ralColors } from '../data/ralColors';
import type { Product, ProductConfig } from '../types/catalog';
import type { QuoteItem, QuoteItemConfig } from '../types/quote';

export function computeUnitPrice(product: Product, config: ProductConfig): number {
  const dimension = product.dimensions.find((d) => d.id === config.dimensionId) ?? product.dimensions[0];
  const lock = lockOptions.find((l) => l.id === config.lock)?.priceUsd ?? 0;
  const finish = finishOptions.find((f) => f.id === config.finish)?.priceUsd ?? 0;
  const extras = config.accessories.reduce(
    (sum, id) => sum + (accessories.find((a) => a.id === id)?.priceUsd ?? 0),
    0
  );
  const color = ralColors.find((c) => c.code === config.colorCode);
  const colorSurcharge = color?.special ? pricing.specialColorSurchargeUsd : 0;
  return dimension.priceUsd + lock + finish + extras + colorSurcharge;
}

export function buildItemConfig(product: Product, config: ProductConfig): QuoteItemConfig {
  const color = ralColors.find((c) => c.code === config.colorCode) ?? ralColors[0];
  return {
    colorCode: color.code,
    colorName: color.name,
    colorHex: color.hex,
    finishLabel: finishOptions.find((f) => f.id === config.finish)?.label ?? '',
    lock: config.lock,
    lockLabel: lockOptions.find((l) => l.id === config.lock)?.label ?? 'Sin cerradura',
    dimensionLabel: product.dimensions.find((d) => d.id === config.dimensionId)?.label ?? '',
    accessoryLabels: config.accessories.map((id) => accessories.find((a) => a.id === id)?.label ?? id)
  };
}

export function computeTotals(items: QuoteItem[], ivaRate: number) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPriceUsd * item.qty, 0);
  const iva = subtotal * ivaRate;
  return { subtotal, iva, total: subtotal + iva };
}