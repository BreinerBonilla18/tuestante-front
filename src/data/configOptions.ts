import type { Accessory, FinishOption, LockOption } from '../types/catalog';

export const lockOptions: LockOption[] = [
{ id: 'mecanica', label: 'Mecánica', description: 'Llave de doble paleta con copia maestra.', priceUsd: 0 },
{ id: 'digital', label: 'Digital', description: 'Teclado con código de 4 a 6 dígitos.', priceUsd: 48 },
{ id: 'rfid', label: 'RFID', description: 'Tarjeta o credencial 13,56 MHz con registro de aperturas.', priceUsd: 96 }];


export const finishOptions: FinishOption[] = [
{ id: 'mate', label: 'Liso mate', description: 'Pintura electrostática en polvo, brillo 10–20 %.', priceUsd: 0 },
{ id: 'brillante', label: 'Liso semibrillante', description: 'Pintura electrostática en polvo, brillo 60–70 %.', priceUsd: 8 },
{ id: 'texturizado', label: 'Texturizado', description: 'Mayor resistencia al rayado y a las huellas.', priceUsd: 14 }];


export const accessories: Accessory[] = [
{ id: 'zocalo', label: 'Zócalo nivelador', description: 'Base de 100 mm con niveladores regulables.', priceUsd: 35 },
{ id: 'ruedas', label: 'Ruedas con freno', description: 'Cuatro ruedas giratorias de 50 mm.', priceUsd: 28 },
{ id: 'cargador-usb', label: 'Puerto de carga USB', description: 'Carga de dispositivos dentro de cada compartimiento.', priceUsd: 22 },
{ id: 'techo-inclinado', label: 'Techo inclinado', description: 'Evita la acumulación de objetos y polvo.', priceUsd: 30 },
{ id: 'divisores', label: 'Divisores internos', description: 'Juego de 4 divisores ajustables.', priceUsd: 18 },
{ id: 'portaetiquetas', label: 'Portaetiquetas', description: 'Marco metálico por puerta o gaveta.', priceUsd: 6 }];