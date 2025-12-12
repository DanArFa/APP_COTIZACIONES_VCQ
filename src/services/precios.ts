import { supabase } from '../lib/supabase';
import { Precio } from '../types';

export async function getPrecios(): Promise<Precio[]> {
  const { data, error } = await supabase
    .from('Precios')
    .select('*')
    .order('Producto');

  if (error) {
    console.error('Error fetching precios:', error);
    return [];
  }

  return (data || []).map(p => ({
    PRODUCTO: p.Producto || '',
    PRECIO_INSTALADOR: parseFloat(p.PRECIO_INSTALADOR) || 0,
    PRECIO_PUBLICO: parseFloat(p.PRECIO_PUBLICO) || 0,
    PRECIO_CORTE: parseFloat(p.PRECIO_CORTE) || 0
  }));
}

export async function updatePrecio(producto: string, updates: Partial<Precio>): Promise<boolean> {
  const updateData: any = {};
  if (updates.PRECIO_INSTALADOR !== undefined) updateData.PRECIO_INSTALADOR = String(updates.PRECIO_INSTALADOR);
  if (updates.PRECIO_PUBLICO !== undefined) updateData.PRECIO_PUBLICO = String(updates.PRECIO_PUBLICO);
  if (updates.PRECIO_CORTE !== undefined) updateData.PRECIO_CORTE = String(updates.PRECIO_CORTE);

  const { error } = await supabase
    .from('Precios')
    .update(updateData)
    .eq('Producto', producto);

  if (error) {
    console.error('Error updating precio:', error);
    return false;
  }

  return true;
}
