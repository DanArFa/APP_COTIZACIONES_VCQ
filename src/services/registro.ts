import { supabase } from '../lib/supabase';

export interface RegistroCotizacion {
  ID_COT: number;
  Fecha: string;
  Cliente: string;
  Producto: string;
  Dimensiones: string;
  Cantidad: number;
  Área_m2: number;
  Procesos: string;
  Total: string;
  Usuario: string;
}

export async function getRegistroCotizaciones(): Promise<RegistroCotizacion[]> {
  const { data, error } = await supabase
    .from('Registro Cotizacion')
    .select('*')
    .order('ID_COT', { ascending: false });

  if (error) {
    console.error('Error fetching registro:', error);
    return [];
  }

  return data || [];
}

export async function createRegistroCotizacion(registro: Omit<RegistroCotizacion, 'ID_COT'>): Promise<RegistroCotizacion | null> {
  const maxId = await supabase
    .from('Registro Cotizacion')
    .select('ID_COT')
    .order('ID_COT', { ascending: false })
    .limit(1);

  const nextId = (maxId.data?.[0]?.ID_COT || 0) + 1;

  const { data, error } = await supabase
    .from('Registro Cotizacion')
    .insert([{ ...registro, ID_COT: nextId }])
    .select()
    .single();

  if (error) {
    console.error('Error creating registro:', error);
    return null;
  }

  return data;
}
