import type { HeightRange } from '../types/catalog';

export const heightRanges: HeightRange[] = [
{ id: 'baja', label: 'Hasta 1.000 mm', min: 0, max: 1000 },
{ id: 'media', label: '1.001 – 1.800 mm', min: 1001, max: 1800 },
{ id: 'alta', label: 'Más de 1.800 mm', min: 1801, max: 99999 }];


export const sortOptions = [
{ id: 'relevancia', label: 'Relevancia' },
{ id: 'precio-asc', label: 'Precio: menor a mayor' },
{ id: 'precio-desc', label: 'Precio: mayor a menor' },
{ id: 'nombre', label: 'Nombre (A–Z)' }];