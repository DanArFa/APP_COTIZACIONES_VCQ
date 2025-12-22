import { useState, useEffect } from 'react';
import { Edit2, Save, X, Lock } from 'lucide-react';
import { getProcesos, updateProceso } from '../services/procesos';
import { Proceso } from '../types';
import LoadingSpinner from './LoadingSpinner';

export default function ProcesosTab() {
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Record<number, string>>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProcesos();
  }, []);

  async function loadProcesos() {
    setLoading(true);
    const data = await getProcesos();
    setProcesos(data);
    setLoading(false);
  }

  const handleEdit = (idx: number) => {
    setEditingIdx(idx);
    setEditValues({ [idx]: procesos[idx].PRECIO_UNIT.toString() });
  };

  const handleCancel = () => {
    setEditingIdx(null);
    setEditValues({});
  };

  const handleSave = () => {
    if (editingIdx === null) return;
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    setSaving(true);
    setPasswordError('');

    if (editingIdx === null) return;

    const newPrice = parseFloat(editValues[editingIdx]);
    if (isNaN(newPrice) || newPrice < 0) {
      setPasswordError('Precio inválido');
      setSaving(false);
      return;
    }

    const success = await updateProceso(procesos[editingIdx].PROCESO, newPrice);

    if (success) {
      const updatedProcesos = [...procesos];
      updatedProcesos[editingIdx].PRECIO_UNIT = newPrice;
      setProcesos(updatedProcesos);
      setEditingIdx(null);
      setEditValues({});
      setShowPasswordModal(false);
      setPassword('');
    } else {
      setPasswordError('Error al actualizar el precio');
    }

    setSaving(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Procesos</h2>
          <p className="text-sm text-slate-400 mt-1">Configura los precios unitarios de cada proceso</p>
        </div>
        <div className="text-xs text-slate-500 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
          {procesos.length} procesos
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Proceso</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio unitario (MXN)</th>
                <th className="text-center px-4 py-3 text-slate-400 font-medium w-20">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {procesos.map((proceso, idx) => (
                <tr key={idx} className={`hover:bg-slate-800/30 transition-colors ${editingIdx === idx ? 'bg-slate-800/50' : ''}`}>
                  <td className="px-4 py-3 text-slate-200 font-medium">{proceso.PROCESO}</td>
                  <td className="px-4 py-3 text-right">
                    {editingIdx === idx ? (
                      <input
                        type="number"
                        value={editValues[idx] || ''}
                        onChange={(e) => setEditValues({ ...editValues, [idx]: e.target.value })}
                        className="w-28 px-2 py-1 bg-slate-900/50 border border-cyan-500/50 rounded text-slate-100 text-right focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-slate-300">${proceso.PRECIO_UNIT.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {editingIdx === idx ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="p-1.5 rounded hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-colors disabled:opacity-50"
                          title="Guardar"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={saving}
                          className="p-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="Cancelar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(idx)}
                        className="p-1.5 rounded hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Confirmar Cambio de Precio</h3>
            </div>

            <p className="text-slate-400 text-sm mb-4">
              Ingresa tu contraseña para confirmar el cambio de precio del proceso <strong>{procesos[editingIdx!].PROCESO}</strong>
            </p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              placeholder="Contraseña"
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 mb-2"
              disabled={saving}
            />

            {passwordError && (
              <p className="text-red-400 text-sm mb-4">{passwordError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPassword('');
                  setPasswordError('');
                }}
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-200 font-medium transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handlePasswordSubmit}
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <LoadingSpinner /> : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
