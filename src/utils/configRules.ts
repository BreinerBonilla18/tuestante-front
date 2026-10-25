import { accessories } from '../data/configOptions';
import { ralColors } from '../data/ralColors';
import type { AccessoryId, FinishId, LockType, Product, ProductConfig } from '../types/catalog';

export function defaultConfig(product: Product): ProductConfig {
  return {
    colorCode: product.colors[0],
    finish: 'mate',
    lock: product.lockTypes[0] ?? null,
    dimensionId: product.dimensions[0].id,
    accessories: []
  };
}

export function getLockReason(product: Product, lock: LockType): string | null {
  if (product.line === 'estanterias') return 'Las estanterías abiertas no llevan cerradura.';
  if (lock === 'rfid' && product.line !== 'lockers') return 'La cerradura RFID solo está disponible en lockers.';
  if (!product.lockTypes.includes(lock)) return 'No disponible para este modelo.';
  return null;
}

export function getFinishReason(product: Product, finish: FinishId): string | null {
  if (product.heavyDuty && finish === 'texturizado') {
    return 'Las estanterías de carga pesada no admiten acabado texturizado.';
  }
  return null;
}

export function getAccessoryReason(product: Product, config: ProductConfig, accessory: AccessoryId): string | null {
  if (accessory === 'cargador-usb' && config.lock !== 'digital' && config.lock !== 'rfid') {
    return 'Requiere cerradura Digital o RFID.';
  }
  if (accessory === 'ruedas') {
    const dimension = product.dimensions.find((d) => d.id === config.dimensionId);
    if (dimension && dimension.heightMm > 1800) return 'No compatible con alturas superiores a 1.800 mm.';
  }
  return null;
}

export function sanitizeConfig(
product: Product,
config: ProductConfig)
: {config: ProductConfig;removedLabels: string[];} {
  const kept = config.accessories.filter((id) => !getAccessoryReason(product, config, id));
  const removedLabels = config.accessories.
  filter((id) => !kept.includes(id)).
  map((id) => accessories.find((a) => a.id === id)?.label ?? id);
  return { config: { ...config, accessories: kept }, removedLabels };
}

export function getConfigWarnings(product: Product, config: ProductConfig): string[] {
  const warnings: string[] = [];
  const color = ralColors.find((c) => c.code === config.colorCode);
  if (color?.special) {
    warnings.push('Los colores de seguridad requieren pedido mínimo de 10 unidades y suman 7 días hábiles de fabricación.');
  }
  if (product.heavyDuty) {
    warnings.push('El rack de carga pesada debe anclarse al piso. Incluye placas base y pernos de expansión.');
  }
  return warnings;
}