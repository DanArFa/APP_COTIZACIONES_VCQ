import { supabase } from '../lib/supabase';
import { Proceso } from '../types';

export async function getProcesos(): Promise<Proceso[]> {
  const { data, error } = await supabase
    .from('Procesos')
    .select('*')
    .order('Proceso');

  if (error) {
    console.error('Error fetching procesos:', error);
    return [];
  }

  return (data || []).map(p => ({
    PROCESO: p.Proceso || '',
    PRECIO_UNIT: parseFloat(p.Precio) || 0
  }));
}

export async function updateProceso(proceso: string, precioUnit: number): Promise<boolean> {
  const { error } = await supabase
    .from('Procesos')
    .update({ Precio: String(precioUnit) })
    .eq('Proceso', proceso);

  if (error) {
    console.error('Error updating proceso:', error);
    return false;
  }

  return true;
}
