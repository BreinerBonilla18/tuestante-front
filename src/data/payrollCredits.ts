import type { PayrollCredit } from '../types/portal';

export const payrollCredits: PayrollCredit[] = [
{ id: 'c1', employeeId: 'EMP-0142', concept: 'Cajonera Móvil 3 gavetas (uso personal)', amountUsd: 142.5, installments: 6, paidInstallments: 4, monthlyUsd: 23.75, startedAt: '2026-05-30', status: 'activo' },
{ id: 'c2', employeeId: 'EMP-0142', concept: 'Adelanto de crédito', amountUsd: 300, installments: 12, paidInstallments: 3, monthlyUsd: 25, startedAt: '2026-07-30', status: 'activo' },
{ id: 'c3', employeeId: 'EMP-0142', concept: 'Estantería Ligera 5 niveles', amountUsd: 108.75, installments: 3, paidInstallments: 3, monthlyUsd: 36.25, startedAt: '2025-11-30', status: 'pagado' },
{ id: 'c4', employeeId: 'EMP-0087', concept: 'Gabinete de Taller 7 gavetas', amountUsd: 465, installments: 12, paidInstallments: 2, monthlyUsd: 38.75, startedAt: '2026-08-30', status: 'activo' },
{ id: 'c5', employeeId: 'EMP-0021', concept: 'Armario de Oficina 2 puertas', amountUsd: 307.5, installments: 6, paidInstallments: 6, monthlyUsd: 51.25, startedAt: '2026-01-30', status: 'pagado' }];


export const creditPolicy = {
  limitMultiplier: 3,
  maxInstallmentShare: 0.3,
  installmentOptions: [3, 6, 12],
  minTenureMonths: 6
};