import type { LineId, LockType } from './catalog';

export type Currency = 'USD' | 'VES';

export interface QuoteItemConfig {
  colorCode: string;
  colorName: string;
  colorHex: string;
  finishLabel: string;
  lock: LockType | null;
  lockLabel: string;
  dimensionLabel: string;
  accessoryLabels: string[];
}

export interface QuoteItem {
  id: string;
  productSlug: string;
  productName: string;
  sku: string;
  line: LineId;
  unitPriceUsd: number;
  qty: number;
  config: QuoteItemConfig;
}

export interface ClientInfo {
  company: string;
  rif: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  sector: string;
  notes: string;
  specialRequirements: string;
}

export interface SubmittedQuote {
  number: string;
  issuedAt: string;
  validUntil: string;
  client: ClientInfo;
  items: QuoteItem[];
  rate: number;
  ivaRate: number;
}