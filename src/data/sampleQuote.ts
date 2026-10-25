import type { QuoteItem } from '../types/quote';

export const initialQuoteItems: QuoteItem[] = [
{
  id: 'q-seed-1',
  productSlug: 'locker-inteligente-rfid-6',
  productName: 'Locker Inteligente RFID 6 puertas',
  sku: 'TE-LK-RF06',
  line: 'lockers',
  unitPriceUsd: 898,
  qty: 4,
  config: {
    colorCode: '5010',
    colorName: 'Azul genciana',
    colorHex: '#0E4C92',
    finishLabel: 'Liso mate',
    lock: 'rfid',
    lockLabel: 'RFID',
    dimensionLabel: '1.800 × 900 × 450 mm',
    accessoryLabels: ['Puerto de carga USB']
  }
},
{
  id: 'q-seed-2',
  productSlug: 'cajonera-movil-3',
  productName: 'Cajonera Móvil 3 gavetas',
  sku: 'TE-CJ-MV03',
  line: 'cajoneras',
  unitPriceUsd: 218,
  qty: 10,
  config: {
    colorCode: '7035',
    colorName: 'Gris luminoso',
    colorHex: '#CBD0CC',
    finishLabel: 'Liso mate',
    lock: 'mecanica',
    lockLabel: 'Mecánica',
    dimensionLabel: '600 × 420 × 520 mm',
    accessoryLabels: ['Ruedas con freno']
  }
}];