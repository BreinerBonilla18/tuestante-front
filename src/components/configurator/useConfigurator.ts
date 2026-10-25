import { useMemo, useState } from 'react';
import type { AccessoryId, FinishId, LockType, Product, ProductConfig } from '../../types/catalog';
import { defaultConfig, getConfigWarnings, sanitizeConfig } from '../../utils/configRules';
import { computeUnitPrice } from '../../utils/pricing';

export function useConfigurator(product: Product) {
  const [config, setConfig] = useState<ProductConfig>(() => defaultConfig(product));
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  const apply = (patch: Partial<ProductConfig>) => {
    const { config: next, removedLabels } = sanitizeConfig(product, { ...config, ...patch });
    setConfig(next);
    setNotice(
      removedLabels.length ?
      `Se quitó «${removedLabels.join('», «')}» porque no es compatible con la nueva selección.` :
      null
    );
  };

  const setColor = (colorCode: string) => apply({ colorCode });
  const setFinish = (finish: FinishId) => apply({ finish });
  const setLock = (lock: LockType) => apply({ lock });
  const setDimension = (dimensionId: string) => apply({ dimensionId });
  const toggleAccessory = (id: AccessoryId) =>
  apply({
    accessories: config.accessories.includes(id) ?
    config.accessories.filter((a) => a !== id) :
    [...config.accessories, id]
  });

  const unitPrice = useMemo(() => computeUnitPrice(product, config), [product, config]);
  const warnings = useMemo(() => getConfigWarnings(product, config), [product, config]);

  return {
    config,
    qty,
    setQty: (value: number) => setQty(Math.max(1, Math.min(999, value || 1))),
    notice,
    dismissNotice: () => setNotice(null),
    unitPrice,
    total: unitPrice * qty,
    warnings,
    setColor,
    setFinish,
    setLock,
    setDimension,
    toggleAccessory
  };
}