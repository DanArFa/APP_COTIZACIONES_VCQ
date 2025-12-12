import { Cotizacion, Cliente } from '../types';

const LS_COTIZACIONES_KEY = 'vcq_cotizaciones';
const LS_COTIZACIONES_ID_KEY = 'vcq_next_id';
const LS_CLIENTES_KEY = 'vcq_clientes';
const LS_CLIENTES_ID_KEY = 'vcq_clientes_next_id';

export function getNextCotizacionId(): number {
  const id = parseInt(localStorage.getItem(LS_COTIZACIONES_ID_KEY) || '1', 10);
  localStorage.setItem(LS_COTIZACIONES_ID_KEY, String(id + 1));
  return id;
}

export function getNextClienteId(): number {
  const id = parseInt(localStorage.getItem(LS_CLIENTES_ID_KEY) || '1', 10);
  localStorage.setItem(LS_CLIENTES_ID_KEY, String(id + 1));
  return id;
}

export function loadCotizaciones(): Cotizacion[] {
  try {
    const raw = localStorage.getItem(LS_COTIZACIONES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCotizaciones(cotizaciones: Cotizacion[]): void {
  localStorage.setItem(LS_COTIZACIONES_KEY, JSON.stringify(cotizaciones));
}

export function loadClientes(): Cliente[] {
  try {
    const raw = localStorage.getItem(LS_CLIENTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveClientes(clientes: Cliente[]): void {
  localStorage.setItem(LS_CLIENTES_KEY, JSON.stringify(clientes));
}
