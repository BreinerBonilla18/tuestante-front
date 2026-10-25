import type { TechDocument } from '../types/catalog';

export const documents: TechDocument[] = [
{ id: 'd01', title: 'Ficha técnica — Locker Inteligente RFID 6 puertas', productSlug: 'locker-inteligente-rfid-6', line: 'lockers', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 840, updatedAt: '2026-09-12' },
{ id: 'd02', title: 'Plano de fabricación — Locker RFID 6P', productSlug: 'locker-inteligente-rfid-6', line: 'lockers', type: 'plano', access: 'empleados', format: 'DWG', sizeKb: 2310, updatedAt: '2026-09-12' },
{ id: 'd03', title: 'Manual de instalación del lector RFID', productSlug: 'locker-inteligente-rfid-6', line: 'lockers', type: 'manual', access: 'publico', format: 'PDF', sizeKb: 1520, updatedAt: '2026-08-30' },
{ id: 'd04', title: 'Ficha técnica — Locker Digital 12 puertas', productSlug: 'locker-digital-12', line: 'lockers', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 760, updatedAt: '2026-07-18' },
{ id: 'd05', title: 'Tolerancias y calibres — Línea Lockers', productSlug: null, line: 'lockers', type: 'tolerancias', access: 'empleados', format: 'PDF', sizeKb: 410, updatedAt: '2026-06-02' },
{ id: 'd06', title: 'Ficha técnica — Locker Mecánico 4 puertas', productSlug: 'locker-mecanico-4', line: 'lockers', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 690, updatedAt: '2026-05-21' },
{ id: 'd07', title: 'Ficha técnica — Cajonera Móvil 3 gavetas', productSlug: 'cajonera-movil-3', line: 'cajoneras', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 580, updatedAt: '2026-08-04' },
{ id: 'd08', title: 'Plano de ensamble — Cajonera de Archivo', productSlug: 'cajonera-archivo-4', line: 'cajoneras', type: 'plano', access: 'publico', format: 'PDF', sizeKb: 1120, updatedAt: '2026-04-15' },
{ id: 'd09', title: 'Tolerancias — Gabinete de Taller 7 gavetas', productSlug: 'gabinete-taller-7', line: 'cajoneras', type: 'tolerancias', access: 'empleados', format: 'PDF', sizeKb: 330, updatedAt: '2026-03-09' },
{ id: 'd10', title: 'Ficha técnica — Estantería Ligera 5 niveles', productSlug: 'estanteria-ligera-5', line: 'estanterias', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 520, updatedAt: '2026-09-01' },
{ id: 'd11', title: 'Manual de montaje — Estantería Media Carga', productSlug: 'estanteria-media-carga', line: 'estanterias', type: 'manual', access: 'publico', format: 'PDF', sizeKb: 2040, updatedAt: '2026-07-07' },
{ id: 'd12', title: 'Cálculo estructural — Rack Industrial 500 kg', productSlug: 'rack-industrial-pesado', line: 'estanterias', type: 'especificaciones', access: 'empleados', format: 'PDF', sizeKb: 1780, updatedAt: '2026-10-02' },
{ id: 'd13', title: 'Plano de anclaje — Rack Industrial', productSlug: 'rack-industrial-pesado', line: 'estanterias', type: 'plano', access: 'publico', format: 'DWG', sizeKb: 2950, updatedAt: '2026-10-02' },
{ id: 'd14', title: 'Ficha técnica — Armario de Oficina 2 puertas', productSlug: 'armario-oficina-2p', line: 'armarios', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 610, updatedAt: '2026-06-28' },
{ id: 'd15', title: 'Tolerancias y calibres — Línea Armarios', productSlug: null, line: 'armarios', type: 'tolerancias', access: 'empleados', format: 'PDF', sizeKb: 395, updatedAt: '2026-06-02' },
{ id: 'd16', title: 'Ficha técnica — Armario de Seguridad Industrial', productSlug: 'armario-seguridad-industrial', line: 'armarios', type: 'especificaciones', access: 'publico', format: 'PDF', sizeKb: 730, updatedAt: '2026-08-19' }];


export const documentTypeLabels: Record<TechDocument['type'], string> = {
  plano: 'Plano',
  tolerancias: 'Tolerancias',
  especificaciones: 'Especificaciones',
  manual: 'Manual'
};