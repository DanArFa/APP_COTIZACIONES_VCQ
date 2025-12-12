import { supabase } from '../lib/supabase';
import { Cliente } from '../types';

export async function getClientes(): Promise<Cliente[]> {
  const { data, error } = await supabase
    .from('Clientes')
    .select('*')
    .order('ID_CLIENTE');

  if (error) {
    console.error('Error fetching clientes:', error);
    return [];
  }

  return data || [];
}

export async function createCliente(cliente: Cliente): Promise<Cliente | null> {
  const { data, error } = await supabase
    .from('Clientes')
    .insert([cliente])
    .select()
    .single();

  if (error) {
    console.error('Error creating cliente:', error);
    return null;
  }

  return data;
}

export async function updateCliente(id: string, updates: Partial<Cliente>): Promise<boolean> {
  const { error } = await supabase
    .from('Clientes')
    .update(updates)
    .eq('ID_CLIENTE', id);

  if (error) {
    console.error('Error updating cliente:', error);
    return false;
  }

  return true;
}

export async function deleteCliente(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('Clientes')
    .delete()
    .eq('ID_CLIENTE', id);

  if (error) {
    console.error('Error deleting cliente:', error);
    return false;
  }

  return true;
}

export async function getNextClienteId(): Promise<number> {
  const { data } = await supabase
    .from('Clientes')
    .select('ID_CLIENTE')
    .order('ID_CLIENTE', { ascending: false })
    .limit(1);

  if (!data || data.length === 0) return 1;

  const lastId = parseInt(data[0].ID_CLIENTE);
  return isNaN(lastId) ? 1 : lastId + 1;
}
