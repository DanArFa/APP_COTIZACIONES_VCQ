import { useState, useEffect } from 'react';
import { Plus, X, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CampoMedida {
  nombre: string;
  valor_default: number;
  unidad?: string;
}

interface StandardFigura {
  id: string;
  nombre: string;
  descripcion: string;
  tipo_figura: string;
  campos_medida: CampoMedida[];
  es_activa: boolean;
}

export default function AdminFigurasTab() {
  const [figuras, setFiguras] = useState<StandardFigura[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    tipo_figura: 'rectangulo',
    campos_medida: [{ nombre: 'alto', valor_default: 100, unidad: 'cm' }],
  });

  const tiposFigura = ['rectangulo', 'cuadrado', 'triangulo', 'circulo', 'hexagono', 'personalizado'];

  useEffect(() => {
    loadFiguras();
  }, []);

  const loadFiguras = async () => {
    try {
      const { data, error } = await supabase
        .from('standard_figures')
        .select('*');

      if (error) throw error;
      setFiguras(data || []);
    } catch (error) {
      console.error('Error loading figuras:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCampo = () => {
    setForm({
      ...form,
      campos_medida: [...form.campos_medida, { nombre: '', valor_default: 0, unidad: 'cm' }],
    });
  };

  const handleRemoveCampo = (index: number) => {
    setForm({
      ...form,
      campos_medida: form.campos_medida.filter((_, i) => i !== index),
    });
  };

  const handleCampoChange = (index: number, field: string, value: string | number) => {
    const newCampos = [...form.campos_medida];
    newCampos[index] = { ...newCampos[index], [field]: value };
    setForm({ ...form, campos_medida: newCampos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const { error } = await supabase
          .from('standard_figures')
          .update({
            nombre: form.nombre,
            descripcion: form.descripcion,
            tipo_figura: form.tipo_figura,
            campos_medida: form.campos_medida,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);

        if (error) throw error;
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from('standard_figures')
          .insert([{
            nombre: form.nombre,
            descripcion: form.descripcion,
            tipo_figura: form.tipo_figura,
            campos_medida: form.campos_medida,
          }]);

        if (error) throw error;
      }

      resetForm();
      setShowForm(false);
      loadFiguras();
    } catch (error) {
      console.error('Error saving figura:', error);
    }
  };

  const handleEdit = (figura: StandardFigura) => {
    setForm({
      nombre: figura.nombre,
      descripcion: figura.descripcion,
      tipo_figura: figura.tipo_figura,
      campos_medida: figura.campos_medida,
    });
    setEditingId(figura.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta figura?')) return;
    try {
      const { error } = await supabase
        .from('standard_figures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadFiguras();
    } catch (error) {
      console.error('Error deleting figura:', error);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      descripcion: '',
      tipo_figura: 'rectangulo',
      campos_medida: [{ nombre: 'alto', valor_default: 100, unidad: 'cm' }],
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="text-slate-400">Cargando figuras...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Figuras Estándar</h3>
          <p className="text-sm text-slate-400 mt-1">Gestiona las figuras de vidrio disponibles para clientes</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            Nueva Figura
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-100">{editingId ? 'Editar' : 'Agregar'} Figura</h4>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="text-slate-400 hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tipo de Figura</label>
            <select
              value={form.tipo_figura}
              onChange={(e) => setForm({ ...form, tipo_figura: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              {tiposFigura.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">Campos de Medida</label>
              <button
                type="button"
                onClick={handleAddCampo}
                className="text-xs text-cyan-400 hover:text-cyan-300"
              >
                + Agregar Campo
              </button>
            </div>
            <div className="space-y-2">
              {form.campos_medida.map((campo, idx) => (
                <div key={idx} className="flex gap-2 items-end">
                  <input
                    type="text"
                    placeholder="Ej: alto, ancho, lado"
                    value={campo.nombre}
                    onChange={(e) => handleCampoChange(idx, 'nombre', e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <input
                    type="number"
                    placeholder="Valor default"
                    value={campo.valor_default}
                    onChange={(e) => handleCampoChange(idx, 'valor_default', Number(e.target.value))}
                    className="w-24 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <select
                    value={campo.unidad || 'cm'}
                    onChange={(e) => handleCampoChange(idx, 'unidad', e.target.value)}
                    className="w-20 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                    <option value="mm">mm</option>
                  </select>
                  {form.campos_medida.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCampo(idx)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all font-medium"
            >
              {editingId ? 'Actualizar' : 'Crear'} Figura
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {figuras.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          No hay figuras estándar creadas aún
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {figuras.map((figura) => (
            <div key={figura.id} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-100">{figura.nombre}</h4>
                  <p className="text-xs text-slate-500 capitalize">{figura.tipo_figura}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(figura)}
                    className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(figura.id)}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {figura.descripcion && (
                <p className="text-xs text-slate-400 mb-3">{figura.descripcion}</p>
              )}
              <div className="space-y-1">
                {figura.campos_medida.map((campo, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 capitalize">{campo.nombre}:</span>
                    <span className="text-slate-300">{campo.valor_default} {campo.unidad}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
