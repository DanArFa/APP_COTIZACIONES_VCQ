import { supabase } from '../lib/supabase';
import { User } from '../types';

export async function getUsuarios(): Promise<User[]> {
  const { data, error } = await supabase
    .from('Usuarios')
    .select('*')
    .order('ID_USUARIO');

  if (error) {
    console.error('Error fetching usuarios:', error);
    return [];
  }

  return data || [];
}

export async function createUsuario(usuario: Omit<User, 'ID_USUARIO'>): Promise<User | null> {
  const maxId = await supabase
    .from('Usuarios')
    .select('ID_USUARIO')
    .order('ID_USUARIO', { ascending: false })
    .limit(1);

  const nextId = (maxId.data?.[0]?.ID_USUARIO || 0) + 1;

  const { data, error } = await supabase
    .from('Usuarios')
    .insert([{ ...usuario, ID_USUARIO: nextId }])
    .select()
    .single();

  if (error) {
    console.error('Error creating usuario:', error);
    return null;
  }

  return data;
}

export async function updateUsuario(id: number, updates: Partial<User>): Promise<boolean> {
  const { error } = await supabase
    .from('Usuarios')
    .update(updates)
    .eq('ID_USUARIO', id);

  if (error) {
    console.error('Error updating usuario:', error);
    return false;
  }

  return true;
}

export async function deleteUsuario(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('Usuarios')
    .delete()
    .eq('ID_USUARIO', id);

  if (error) {
    console.error('Error deleting usuario:', error);
    return false;
  }

  return true;
}

export async function loginUsuario(usuario: string, contrasena: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('Usuarios')
    .select('*')
    .eq('USUARIO', usuario)
    .eq('CONTRASENA', contrasena)
    .eq('ACTIVO', 'SI')
    .maybeSingle();

  if (error) {
    console.error('Error login:', error);
    return null;
  }

  return data;
}
