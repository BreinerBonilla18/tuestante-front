export type EnvironmentId = 'oficinas' | 'educacion' | 'industria' | 'hogar';
export type LineId = 'lockers' | 'cajoneras' | 'estanterias' | 'armarios';
export type LockType = 'mecanica' | 'digital' | 'rfid';
export type FinishId = 'mate' | 'brillante' | 'texturizado';
export type AccessoryId =
'zocalo' |
'ruedas' |
'cargador-usb' |
'techo-inclinado' |
'divisores' |
'portaetiquetas';

export interface Environment {
  id: EnvironmentId;
  name: string;
  description: string;
  featuredLine: LineId;
}

export interface ProductLine {
  id: LineId;
  name: string;
  shortName: string;
  description: string;
}

export interface RalColor {
  code: string;
  name: string;
  hex: string;
  special?: boolean;
}

export interface DimensionOption {
  id: string;
  label: string;
  heightMm: number;
  priceUsd: number;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  sku: string;
  line: LineId;
  environments: EnvironmentId[];
  summary: string;
  description: string;
  highlights: string[];
  basePriceUsd: number;
  dimensions: DimensionOption[];
  lockTypes: LockType[];
  colors: string[];
  accessories: AccessoryId[];
  specs: Spec[];
  heavyDuty?: boolean;
  isNew?: boolean;
}

export interface LockOption {
  id: LockType;
  label: string;
  description: string;
  priceUsd: number;
}

export interface FinishOption {
  id: FinishId;
  label: string;
  description: string;
  priceUsd: number;
}

export interface Accessory {
  id: AccessoryId;
  label: string;
  description: string;
  priceUsd: number;
}

export interface ProductConfig {
  colorCode: string;
  finish: FinishId;
  lock: LockType | null;
  dimensionId: string;
  accessories: AccessoryId[];
}

export type DocumentType = 'plano' | 'tolerancias' | 'especificaciones' | 'manual';
export type DocumentAccess = 'publico' | 'empleados';

export interface TechDocument {
  id: string;
  title: string;
  productSlug: string | null;
  line: LineId;
  type: DocumentType;
  access: DocumentAccess;
  format: 'PDF' | 'DWG';
  sizeKb: number;
  updatedAt: string;
}

export interface HeightRange {
  id: string;
  label: string;
  min: number;
  max: number;
}