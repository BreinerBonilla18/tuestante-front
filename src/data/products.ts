import type { Product } from '../types/catalog';

export const products: Product[] = [
{
  slug: 'locker-inteligente-rfid-6',
  name: 'Locker Inteligente RFID 6 puertas',
  sku: 'TE-LK-RF06',
  line: 'lockers',
  environments: ['oficinas', 'educacion', 'industria'],
  summary: 'Acceso con credencial RFID y registro de aperturas para equipos híbridos.',
  description:
  'Locker de seis compartimientos con cerradura electrónica RFID compatible con credenciales corporativas de 13,56 MHz. Cada apertura queda registrada y puede exportarse para control interno. Estructura soldada en acero laminado en frío con pintura electrostática en polvo.',
  highlights: [
  'Lectura RFID 13,56 MHz compatible con credenciales existentes',
  'Registro de aperturas exportable a CSV',
  'Puertas con ventilación troquelada'],

  basePriceUsd: 780,
  dimensions: [
  { id: '1800-900-450', label: '1.800 × 900 × 450 mm', heightMm: 1800, priceUsd: 780 },
  { id: '1980-900-500', label: '1.980 × 900 × 500 mm', heightMm: 1980, priceUsd: 865 }],

  lockTypes: ['mecanica', 'digital', 'rfid'],
  colors: ['9016', '7035', '7016', '5010', '1023', '3020'],
  accessories: ['zocalo', 'cargador-usb', 'techo-inclinado', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Puertas cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por compartimiento', value: '25 kg' },
  { label: 'Garantía', value: '5 años estructura · 2 años electrónica' }],

  isNew: true
},
{
  slug: 'locker-digital-12',
  name: 'Locker Digital 12 puertas',
  sku: 'TE-LK-DG12',
  line: 'lockers',
  environments: ['oficinas', 'educacion'],
  summary: 'Doce compartimientos con teclado digital y código maestro de administración.',
  description:
  'Locker de alta densidad para áreas comunes. Cada puerta incorpora un teclado con código de usuario configurable y un código maestro para supervisión. Bisagras internas antivandálicas.',
  highlights: ['Código maestro para administración', 'Bisagras internas antivandálicas', 'Batería con autonomía de 18 meses'],
  basePriceUsd: 1240,
  dimensions: [
  { id: '1800-1200-450', label: '1.800 × 1.200 × 450 mm', heightMm: 1800, priceUsd: 1240 },
  { id: '1980-1200-500', label: '1.980 × 1.200 × 500 mm', heightMm: 1980, priceUsd: 1360 }],

  lockTypes: ['mecanica', 'digital', 'rfid'],
  colors: ['9016', '7035', '7016', '5010'],
  accessories: ['zocalo', 'cargador-usb', 'techo-inclinado', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Puertas cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por compartimiento', value: '15 kg' },
  { label: 'Garantía', value: '5 años estructura · 2 años electrónica' }]

},
{
  slug: 'locker-mecanico-4',
  name: 'Locker Mecánico 4 puertas',
  sku: 'TE-LK-MC04',
  line: 'lockers',
  environments: ['industria', 'educacion'],
  summary: 'Vestidor de planta resistente, con cerradura de llave y porta candado.',
  description:
  'Locker vestidor de cuatro compartimientos de altura media, pensado para plantas industriales y áreas deportivas. Incluye porta candado y barra para ganchos en cada puerta.',
  highlights: ['Porta candado y barra para ganchos', 'Ventilación superior e inferior', 'Patas regulables'],
  basePriceUsd: 395,
  dimensions: [
  { id: '1800-600-450', label: '1.800 × 600 × 450 mm', heightMm: 1800, priceUsd: 395 },
  { id: '1800-900-450', label: '1.800 × 900 × 450 mm', heightMm: 1800, priceUsd: 470 }],

  lockTypes: ['mecanica', 'digital'],
  colors: ['7035', '7016', '5010', '6005', '1023'],
  accessories: ['zocalo', 'techo-inclinado', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Puertas cal. 22' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por compartimiento', value: '30 kg' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'locker-escolar-3',
  name: 'Locker Escolar 3 niveles',
  sku: 'TE-LK-ES03',
  line: 'lockers',
  environments: ['educacion'],
  summary: 'Columnas de tres niveles para pasillos escolares y universitarios.',
  description:
  'Módulo de tres compartimientos apilados con portaetiquetas integrado. Se ancla en batería para formar pasillos continuos y admite colores institucionales.',
  highlights: ['Anclaje en batería', 'Portaetiquetas integrado', 'Bordes redondeados de seguridad'],
  basePriceUsd: 285,
  dimensions: [
  { id: '1500-300-450', label: '1.500 × 300 × 450 mm', heightMm: 1500, priceUsd: 285 },
  { id: '1800-300-450', label: '1.800 × 300 × 450 mm', heightMm: 1800, priceUsd: 315 }],

  lockTypes: ['mecanica', 'digital', 'rfid'],
  colors: ['9016', '5010', '6005', '1023', '3020'],
  accessories: ['zocalo', 'techo-inclinado', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 24 · Puertas cal. 22' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por compartimiento', value: '15 kg' },
  { label: 'Garantía', value: '3 años' }]

},
{
  slug: 'cajonera-movil-3',
  name: 'Cajonera Móvil 3 gavetas',
  sku: 'TE-CJ-MV03',
  line: 'cajoneras',
  environments: ['oficinas', 'hogar'],
  summary: 'Pedestal bajo escritorio con gaveta lapicera y cerradura central.',
  description:
  'Cajonera de tres gavetas sobre ruedas, con cerradura de bloqueo central y gaveta inferior para carpetas colgantes tamaño carta y oficio.',
  highlights: ['Bloqueo central de las tres gavetas', 'Gaveta para carpetas colgantes', 'Guías de extensión total'],
  basePriceUsd: 190,
  dimensions: [
  { id: '600-420-520', label: '600 × 420 × 520 mm', heightMm: 600, priceUsd: 190 },
  { id: '720-420-600', label: '720 × 420 × 600 mm', heightMm: 720, priceUsd: 215 }],

  lockTypes: ['mecanica', 'digital'],
  colors: ['9016', '7035', '7016', '9005'],
  accessories: ['ruedas', 'divisores', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Frentes cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 1,5 mm' },
  { label: 'Carga por gaveta', value: '25 kg' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'cajonera-archivo-4',
  name: 'Cajonera de Archivo 4 gavetas',
  sku: 'TE-CJ-AR04',
  line: 'cajoneras',
  environments: ['oficinas'],
  summary: 'Archivador vertical con sistema antivuelco y guías telescópicas.',
  description:
  'Archivador de cuatro gavetas para carpetas colgantes. El sistema antivuelco impide abrir más de una gaveta a la vez, y las guías telescópicas soportan hasta 40 kg.',
  highlights: ['Sistema antivuelco', 'Guías telescópicas de 40 kg', 'Portaetiquetas por gaveta'],
  basePriceUsd: 340,
  dimensions: [{ id: '1320-470-620', label: '1.320 × 470 × 620 mm', heightMm: 1320, priceUsd: 340 }],
  lockTypes: ['mecanica', 'digital'],
  colors: ['9016', '7035', '7016'],
  accessories: ['zocalo', 'divisores', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Frentes cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 1,5 mm' },
  { label: 'Carga por gaveta', value: '40 kg' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'gabinete-taller-7',
  name: 'Gabinete de Taller 7 gavetas',
  sku: 'TE-CJ-TL07',
  line: 'cajoneras',
  environments: ['industria'],
  summary: 'Gabinete de herramientas con gavetas de carga pesada y tope de trabajo.',
  description:
  'Gabinete de siete gavetas con rodamientos de bolas y capacidad de 60 kg por gaveta. Tope reforzado apto como superficie de trabajo ligera.',
  highlights: ['Rodamientos de bolas de 60 kg', 'Tope reforzado de trabajo', 'Divisores modulares'],
  basePriceUsd: 620,
  dimensions: [
  { id: '1000-720-500', label: '1.000 × 720 × 500 mm', heightMm: 1000, priceUsd: 620 },
  { id: '1000-1020-500', label: '1.000 × 1.020 × 500 mm', heightMm: 1000, priceUsd: 745 }],

  lockTypes: ['mecanica', 'digital'],
  colors: ['7016', '9005', '5010', '1023', '3020'],
  accessories: ['ruedas', 'divisores', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 18 · Gavetas cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 80–100 µm' },
  { label: 'Tolerancia dimensional', value: '± 1,5 mm' },
  { label: 'Carga por gaveta', value: '60 kg' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'estanteria-ligera-5',
  name: 'Estantería Ligera 5 niveles',
  sku: 'TE-ES-LG05',
  line: 'estanterias',
  environments: ['hogar', 'oficinas', 'educacion'],
  summary: 'Ensamble sin tornillos con niveles regulables cada 25 mm.',
  description:
  'Estantería de ensamble por encastre, sin tornillería, para depósitos, bibliotecas y garajes. Los niveles se regulan cada 25 mm y soportan hasta 120 kg distribuidos.',
  highlights: ['Ensamble sin tornillos', 'Niveles regulables cada 25 mm', '120 kg por nivel'],
  basePriceUsd: 145,
  dimensions: [
  { id: '1800-900-400', label: '1.800 × 900 × 400 mm', heightMm: 1800, priceUsd: 145 },
  { id: '2000-1000-500', label: '2.000 × 1.000 × 500 mm', heightMm: 2000, priceUsd: 178 }],

  lockTypes: [],
  colors: ['9016', '7035', '7016', '5010'],
  accessories: ['zocalo', 'divisores', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Paral cal. 16 · Bandejas cal. 22' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por nivel', value: '120 kg distribuidos' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'estanteria-media-carga',
  name: 'Estantería Media Carga',
  sku: 'TE-ES-MC04',
  line: 'estanterias',
  environments: ['industria', 'oficinas'],
  summary: 'Paral perforado con vigas tipo escalón para archivo muerto y almacenes.',
  description:
  'Estantería de carga media con vigas tipo escalón y bandejas de lámina. Pensada para archivo muerto, almacenes de repuestos y depósitos comerciales.',
  highlights: ['Vigas tipo escalón', '250 kg por nivel', 'Ampliable con módulos adosados'],
  basePriceUsd: 260,
  dimensions: [
  { id: '2000-1200-500', label: '2.000 × 1.200 × 500 mm', heightMm: 2000, priceUsd: 260 },
  { id: '2400-1500-600', label: '2.400 × 1.500 × 600 mm', heightMm: 2400, priceUsd: 335 }],

  lockTypes: [],
  colors: ['7035', '7016', '5010', '1023'],
  accessories: ['zocalo', 'divisores', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero estructural' },
  { label: 'Calibre de lámina', value: 'Paral cal. 14 · Bandejas cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 80–100 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por nivel', value: '250 kg distribuidos' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'rack-industrial-pesado',
  name: 'Rack Industrial Carga Pesada',
  sku: 'TE-ES-RK500',
  line: 'estanterias',
  environments: ['industria'],
  summary: 'Rack selectivo de 500 kg por nivel para paletas y cargas voluminosas.',
  description:
  'Rack selectivo con marcos soldados y vigas de perfil cerrado. Soporta 500 kg por nivel y se entrega con placas base para anclaje al piso.',
  highlights: ['500 kg por nivel', 'Marcos soldados con placa de anclaje', 'Vigas con seguro antidesenganche'],
  basePriceUsd: 690,
  dimensions: [
  { id: '2400-1800-600', label: '2.400 × 1.800 × 600 mm', heightMm: 2400, priceUsd: 690 },
  { id: '3000-2400-900', label: '3.000 × 2.400 × 900 mm', heightMm: 3000, priceUsd: 980 }],

  lockTypes: [],
  colors: ['5010', '7016', '1023'],
  accessories: ['portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero estructural ASTM A36' },
  { label: 'Calibre de lámina', value: 'Marco cal. 12 · Vigas cal. 14' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 80–100 µm' },
  { label: 'Tolerancia dimensional', value: '± 3 mm' },
  { label: 'Carga por nivel', value: '500 kg distribuidos' },
  { label: 'Garantía', value: '10 años estructura' }],

  heavyDuty: true
},
{
  slug: 'armario-oficina-2p',
  name: 'Armario de Oficina 2 puertas',
  sku: 'TE-AR-OF02',
  line: 'armarios',
  environments: ['oficinas', 'hogar', 'educacion'],
  summary: 'Cuatro entrepaños regulables y cerradura de falleba de tres puntos.',
  description:
  'Armario de dos puertas batientes con cuatro entrepaños regulables. La cerradura de falleba asegura la puerta en tres puntos para mayor resistencia.',
  highlights: ['Cerradura de falleba de 3 puntos', 'Cuatro entrepaños regulables', 'Apertura de 110°'],
  basePriceUsd: 410,
  dimensions: [
  { id: '1000-900-450', label: '1.000 × 900 × 450 mm', heightMm: 1000, priceUsd: 410 },
  { id: '1950-900-450', label: '1.950 × 900 × 450 mm', heightMm: 1950, priceUsd: 520 }],

  lockTypes: ['mecanica', 'digital'],
  colors: ['9016', '7035', '7016', '9005'],
  accessories: ['zocalo', 'ruedas', 'divisores'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío' },
  { label: 'Calibre de lámina', value: 'Cuerpo cal. 22 · Puertas cal. 20' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 60–80 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por entrepaño', value: '50 kg' },
  { label: 'Garantía', value: '5 años' }]

},
{
  slug: 'armario-seguridad-industrial',
  name: 'Armario de Seguridad Industrial',
  sku: 'TE-AR-SG01',
  line: 'armarios',
  environments: ['industria'],
  summary: 'Doble pared con bandeja antiderrame para insumos de planta.',
  description:
  'Armario de doble pared con bandeja inferior antiderrame de 50 mm. Indicado para insumos de mantenimiento, lubricantes y químicos no inflamables.',
  highlights: ['Doble pared con cámara de aire', 'Bandeja antiderrame de 50 mm', 'Señalización de seguridad incluida'],
  basePriceUsd: 880,
  dimensions: [{ id: '1650-860-460', label: '1.650 × 860 × 460 mm', heightMm: 1650, priceUsd: 880 }],
  lockTypes: ['mecanica', 'digital'],
  colors: ['1023', '3020', '7016'],
  accessories: ['zocalo', 'portaetiquetas'],
  specs: [
  { label: 'Material', value: 'Acero laminado en frío, doble pared' },
  { label: 'Calibre de lámina', value: 'Cal. 18' },
  { label: 'Acabado', value: 'Pintura electrostática en polvo, 80–100 µm' },
  { label: 'Tolerancia dimensional', value: '± 2 mm' },
  { label: 'Carga por entrepaño', value: '80 kg' },
  { label: 'Garantía', value: '5 años' }]

}];