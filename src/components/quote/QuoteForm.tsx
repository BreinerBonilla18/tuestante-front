import React, { useState } from 'react';
import { environments } from '../../data/environments';
import type { ClientInfo } from '../../types/quote';

interface QuoteFormProps {
  formId: string;
  disabled: boolean;
  onSubmit: (client: ClientInfo) => void;
}

type Errors = Partial<Record<keyof ClientInfo, string>>;

const empty: ClientInfo = {
  company: '',
  rif: '',
  contact: '',
  email: '',
  phone: '',
  city: '',
  sector: '',
  notes: '',
  specialRequirements: ''
};

export function QuoteForm({ formId, disabled, onSubmit }: QuoteFormProps) {
  const [values, setValues] = useState<ClientInfo>(empty);
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof ClientInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      onSubmit(values);
    } else {
      const first = Object.keys(next)[0];
      document.getElementById(`f-${first}`)?.focus();
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <Field id="company" label="Razón social" error={errors.company}>
        <input id="f-company" value={values.company} onChange={set('company')} disabled={disabled} autoComplete="organization" className={inputClass(errors.company)} />
      </Field>
      <Field id="rif" label="RIF" hint="Formato J-12345678-9" error={errors.rif}>
        <input id="f-rif" value={values.rif} onChange={set('rif')} disabled={disabled} placeholder="J-12345678-9" className={inputClass(errors.rif)} />
      </Field>
      <Field id="contact" label="Persona de contacto" error={errors.contact}>
        <input id="f-contact" value={values.contact} onChange={set('contact')} disabled={disabled} autoComplete="name" className={inputClass(errors.contact)} />
      </Field>
      <Field id="email" label="Correo corporativo" error={errors.email}>
        <input id="f-email" type="email" value={values.email} onChange={set('email')} disabled={disabled} autoComplete="email" className={inputClass(errors.email)} />
      </Field>
      <Field id="phone" label="Teléfono" error={errors.phone}>
        <input id="f-phone" type="tel" value={values.phone} onChange={set('phone')} disabled={disabled} placeholder="+58 412 000 0000" autoComplete="tel" className={inputClass(errors.phone)} />
      </Field>
      <Field id="city" label="Ciudad de entrega" error={errors.city}>
        <input id="f-city" value={values.city} onChange={set('city')} disabled={disabled} className={inputClass(errors.city)} />
      </Field>
      <Field id="sector" label="Ambiente" error={errors.sector}>
        <select id="f-sector" value={values.sector} onChange={set('sector')} disabled={disabled} className={inputClass(errors.sector)}>
          <option value="">Seleccione…</option>
          {environments.map((e) =>
          <option key={e.id} value={e.name}>{e.name}</option>
          )}
        </select>
      </Field>
      <div className="hidden sm:block" />
      <Field id="notes" label="Observaciones" optional className="sm:col-span-2">
        <textarea id="f-notes" rows={3} value={values.notes} onChange={set('notes')} disabled={disabled} className={`${inputClass()} h-auto py-2.5`} />
      </Field>
      <Field id="specialRequirements" label="Requerimientos especiales" optional hint="Medidas fuera de catálogo, logotipo, instalación, plazos" className="sm:col-span-2">
        <textarea id="f-specialRequirements" rows={3} value={values.specialRequirements} onChange={set('specialRequirements')} disabled={disabled} className={`${inputClass()} h-auto py-2.5`} />
      </Field>
    </form>);

}

function validate(v: ClientInfo): Errors {
  const e: Errors = {};
  if (!v.company.trim()) e.company = 'Indique la razón social.';
  if (!/^[JGVEP]-\d{8}-\d$/i.test(v.rif.trim())) e.rif = 'El RIF debe tener el formato J-12345678-9.';
  if (!v.contact.trim()) e.contact = 'Indique una persona de contacto.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Ingrese un correo válido.';
  if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Ingrese un teléfono de al menos 10 dígitos.';
  if (!v.city.trim()) e.city = 'Indique la ciudad de entrega.';
  if (!v.sector) e.sector = 'Seleccione un ambiente.';
  return e;
}

function inputClass(error?: string) {
  return `h-11 w-full rounded border bg-white px-3 text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-2 disabled:bg-surface disabled:text-muted ${
  error ? 'border-danger focus:ring-danger/20' : 'border-line focus:border-accent focus:ring-accent/20'}`;

}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, hint, error, optional, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Opcional</span>}
      </label>
      {children}
      {error ?
      <p className="mt-1.5 text-xs text-danger" role="alert">{error}</p> :

      hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>
      }
    </div>);

}