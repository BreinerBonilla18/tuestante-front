import type { LockType } from './catalog';

export type Role = 'empleado' | 'supervisor' | 'admin';

export interface PortalUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  position: string;
  department: string;
  employeeId: string;
  salaryUsd: number;
  hiredAt: string;
  lockerId: string | null;
  cardUid: string;
}

export interface PayrollCredit {
  id: string;
  employeeId: string;
  concept: string;
  amountUsd: number;
  installments: number;
  paidInstallments: number;
  monthlyUsd: number;
  startedAt: string;
  status: 'activo' | 'pagado';
}

export type LockerStatus = 'asignado' | 'libre' | 'mantenimiento';

export interface Locker {
  id: string;
  bank: 'A' | 'B';
  location: string;
  type: LockType;
  assigneeName: string | null;
  status: LockerStatus;
}

export type RequestStatus = 'pendiente' | 'aprobada' | 'rechazada';
export type RequestType = 'producto' | 'locker' | 'credito';

export interface InternalRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: RequestType;
  title: string;
  detail: string;
  amountUsd: number | null;
  createdAt: string;
  status: RequestStatus;
}