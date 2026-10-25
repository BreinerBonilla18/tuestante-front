import type { PortalUser, Role } from '../types/portal';

export const portalUsers: PortalUser[] = [
{
  id: 'u1',
  name: 'María Fernández',
  email: 'empleado@tuestante.com',
  password: 'demo1234',
  role: 'empleado',
  position: 'Analista de Compras',
  department: 'Administración',
  employeeId: 'EMP-0142',
  salaryUsd: 820,
  hiredAt: '2021-03-15',
  lockerId: 'B-07',
  cardUid: '04:A3:9F:1C:22:80'
},
{
  id: 'u2',
  name: 'Carlos Rondón',
  email: 'supervisor@tuestante.com',
  password: 'demo1234',
  role: 'supervisor',
  position: 'Jefe de Planta',
  department: 'Producción',
  employeeId: 'EMP-0087',
  salaryUsd: 1350,
  hiredAt: '2018-09-03',
  lockerId: 'A-03',
  cardUid: '04:7B:12:EE:41:09'
},
{
  id: 'u3',
  name: 'Daniela Pérez',
  email: 'rrhh@tuestante.com',
  password: 'demo1234',
  role: 'admin',
  position: 'Coordinadora de RRHH',
  department: 'Talento Humano',
  employeeId: 'EMP-0021',
  salaryUsd: 1500,
  hiredAt: '2016-01-11',
  lockerId: 'A-01',
  cardUid: '04:C8:55:0A:9D:31'
}];


export const roleLabels: Record<Role, string> = {
  empleado: 'Empleado',
  supervisor: 'Supervisor',
  admin: 'Administrador RRHH'
};

export const employeeDirectory: string[] = [
'José Martínez',
'Ana Rojas',
'Luis Gómez',
'Patricia Salas',
'Rafael Medina',
'Gabriela Torres',
'Andrés Villalobos',
'Valentina Ochoa'];