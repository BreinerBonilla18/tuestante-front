import type { Environment } from '../types/catalog';

export const environments: Environment[] = [
{
  id: 'oficinas',
  name: 'Oficinas',
  description: 'Archivo, cajoneras y lockers para equipos que trabajan de forma híbrida.',
  featuredLine: 'cajoneras'
},
{
  id: 'educacion',
  name: 'Educación',
  description: 'Lockers escolares, estanterías de biblioteca y armarios de laboratorio.',
  featuredLine: 'lockers'
},
{
  id: 'industria',
  name: 'Industria',
  description: 'Racks de carga pesada, gabinetes de taller y vestidores de planta.',
  featuredLine: 'estanterias'
},
{
  id: 'hogar',
  name: 'Hogar / Home Office',
  description: 'Soluciones compactas para estudios, garajes y depósitos.',
  featuredLine: 'armarios'
}];