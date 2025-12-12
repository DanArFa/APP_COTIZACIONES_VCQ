import { supabase } from '../lib/supabase';
import { Cotizacion } from '../types';

export async function saveCotizacion(cotizacion: Cotizacion): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('cotizaciones')
      .insert({
        id_cotizacion: cotizacion.ID_COTIZACION,
        fecha: cotizacion.FECHA,
        cliente: cotizacion.CLIENTE,
        producto: cotizacion.PRODUCTO,
        subtotal: cotizacion.SUBTOTAL,
        iva: cotizacion.IVA,
        total: cotizacion.TOTAL,
        usuario: cotizacion.USUARIO,
        id_usuario: cotizacion.ID_USUARIO,
        observaciones: cotizacion.OBSERVACIONES,
        aplicar_iva: cotizacion.APLICAR_IVA,
        tipo_precio: cotizacion.TIPO_PRECIO,
        precio_unitario: cotizacion.PRECIO_UNITARIO,
        piezas: cotizacion.PIEZAS,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getCotizaciones(idUsuario: number): Promise<Cotizacion[]> {
  try {
    const { data, error } = await supabase
      .from('cotizaciones')
      .select('*')
      .eq('id_usuario', idUsuario)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching cotizaciones:', error);
      return [];
    }

    return data.map(cot => ({
      ID_COTIZACION: cot.id_cotizacion,
      FECHA: cot.fecha,
      CLIENTE: cot.cliente,
      PRODUCTO: cot.producto,
      SUBTOTAL: cot.subtotal,
      IVA: cot.iva,
      TOTAL: cot.total,
      USUARIO: cot.usuario,
      ID_USUARIO: cot.id_usuario,
      OBSERVACIONES: cot.observaciones,
      APLICAR_IVA: cot.aplicar_iva,
      TIPO_PRECIO: cot.tipo_precio,
      PRECIO_UNITARIO: cot.precio_unitario,
      PRECIO_INSTALADOR: 0,
      PRECIO_PUBLICO: 0,
      PRECIO_CORTE: 0,
      PIEZAS: cot.piezas,
      PROCESOS: [],
    })) as Cotizacion[];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function getCotizacionById(idCotizacion: number): Promise<Cotizacion | null> {
  try {
    const { data, error } = await supabase
      .from('cotizaciones')
      .select('*')
      .eq('id_cotizacion', idCotizacion)
      .maybeSingle();

    if (error) {
      console.error('Error fetching cotizacion:', error);
      return null;
    }

    if (!data) return null;

    return {
      ID_COTIZACION: data.id_cotizacion,
      FECHA: data.fecha,
      CLIENTE: data.cliente,
      PRODUCTO: data.producto,
      SUBTOTAL: data.subtotal,
      IVA: data.iva,
      TOTAL: data.total,
      USUARIO: data.usuario,
      ID_USUARIO: data.id_usuario,
      OBSERVACIONES: data.observaciones,
      APLICAR_IVA: data.aplicar_iva,
      TIPO_PRECIO: data.tipo_precio,
      PRECIO_UNITARIO: data.precio_unitario,
      PRECIO_INSTALADOR: 0,
      PRECIO_PUBLICO: 0,
      PRECIO_CORTE: 0,
      PIEZAS: data.piezas,
      PROCESOS: [],
    } as Cotizacion;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
