import { supabase } from '../lib/supabase';

export interface HistorialCotizacion {
  ID_COTIZACION: string;
  FECHA: string;
  CLIENTE: string;
  SUBTOTAL: string;
  IVA: string;
  TOTAL: string;
  USUARIO: string;
  OBSERVACIONES: string;
}

export async function getHistorialCotizaciones(): Promise<HistorialCotizacion[]> {
  const { data, error } = await supabase
    .from('Cotizaciones')
    .select('*')
    .order('ID_COTIZACION', { ascending: false });

  if (error) {
    console.error('Error fetching historial:', error);
    return [];
  }

  return data || [];
}

export async function createHistorialCotizacion(historial: HistorialCotizacion): Promise<HistorialCotizacion | null> {
  const { data, error } = await supabase
    .from('Cotizaciones')
    .insert([historial])
    .select()
    .single();

  if (error) {
    console.error('Error creating historial:', error);
    return null;
  }

  return data;
}
