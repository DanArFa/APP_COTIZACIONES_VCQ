import { useState, useEffect } from 'react';
import { Edit2, Save, X, Lock } from 'lucide-react';
import { getPrecios, updatePrecio } from '../services/precios';
import { verificarContrasena } from '../services/usuarios';
import { Precio, User } from '../types';

interface PreciosTabProps {
  currentUser?: User;
}

export default function PreciosTab({ currentUser }: PreciosTabProps) {
  const [precios, setPrecisos] = useState<Precio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedPrecios, setEditedPrecios] = useState<Precio | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [pendingChanges, setPendingChanges] = useState<{ index: number; precio: Precio } | null>(null);

  const isAdmin = currentUser?.ROL === 'ADMIN';

  useEffect(() => {
    loadPrecios();
  }, []);

  async function loadPrecios() {
    setLoading(true);
    const data = await getPrecios();
    setPrecisos(data);
    setLoading(false);
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedPrecios({ ...precios[index] });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditedPrecios(null);
  };

  const handleSaveClick = (index: number) => {
    if (!editedPrecios) return;
    setPendingChanges({ index, precio: editedPrecios });
    setShowPasswordModal(true);
  };

  const handleConfirmPassword = async () => {
    if (!currentUser || !pendingChanges) return;

    const isValid = await verificarContrasena(currentUser.ID_USUARIO, password);

    if (!isValid) {
      alert('Contraseña incorrecta');
      setPassword('');
      return;
    }

    const success = await updatePrecio(pendingChanges.precio.PRODUCTO, {
      PRECIO_INSTALADOR: pendingChanges.precio.PRECIO_INSTALADOR,
      PRECIO_PUBLICO: pendingChanges.precio.PRECIO_PUBLICO,
      PRECIO_CORTE: pendingChanges.precio.PRECIO_CORTE,
    });

    if (success) {
      alert('Precio actualizado correctamente');
      await loadPrecios();
      setEditingIndex(null);
      setEditedPrecios(null);
    } else {
      alert('Error al actualizar el precio');
    }

    setShowPasswordModal(false);
    setPassword('');
    setPendingChanges(null);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPendingChanges(null);
  };

  if (loading) {
    return <div className="text-slate-400">Cargando precios...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Lista de precios</h2>
        {isAdmin && (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Edit2 className="w-3 h-3" />
            Haz clic en editar para modificar precios
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Producto</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio instalador</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio público</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Precio corte</th>
                {isAdmin && <th className="text-center px-4 py-3 text-slate-400 font-medium">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {precios.map((precio, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium">{precio.PRODUCTO}</td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {editingIndex === idx ? (
                      <input
                        type="number"
                        value={editedPrecios?.PRECIO_INSTALADOR || 0}
                        onChange={(e) =>
                          setEditedPrecios({
                            ...editedPrecios!,
                            PRECIO_INSTALADOR: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-28 px-2 py-1 bg-slate-900/50 border border-cyan-500/50 rounded text-slate-100 text-right focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    ) : (
                      `$${precio.PRECIO_INSTALADOR.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {editingIndex === idx ? (
                      <input
                        type="number"
                        value={editedPrecios?.PRECIO_PUBLICO || 0}
                        onChange={(e) =>
                          setEditedPrecios({
                            ...editedPrecios!,
                            PRECIO_PUBLICO: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-28 px-2 py-1 bg-slate-900/50 border border-cyan-500/50 rounded text-slate-100 text-right focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    ) : (
                      `$${precio.PRECIO_PUBLICO.toFixed(2)}`
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-300">
                    {editingIndex === idx ? (
                      <input
                        type="number"
                        value={editedPrecios?.PRECIO_CORTE || 0}
                        onChange={(e) =>
                          setEditedPrecios({
                            ...editedPrecios!,
                            PRECIO_CORTE: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-28 px-2 py-1 bg-slate-900/50 border border-cyan-500/50 rounded text-slate-100 text-right focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    ) : (
                      `$${precio.PRECIO_CORTE.toFixed(2)}`
                    )}
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3">
                      {editingIndex === idx ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleSaveClick(idx)}
                            className="p-1.5 bg-green-500/20 border border-green-500/50 text-green-300 rounded hover:bg-green-500/30 transition-all"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1.5 bg-red-500/20 border border-red-500/50 text-red-400 rounded hover:bg-red-500/30 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleEdit(idx)}
                            className="p-1.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded hover:bg-cyan-500/30 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Lock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">Confirmar cambios</h3>
            </div>

            <p className="text-sm text-slate-400 mb-4">
              Para actualizar los precios, ingresa tu contraseña para confirmar la operación.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirmPassword()}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmPassword}
                  className="flex-1 px-4 py-2.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 font-medium rounded-lg hover:bg-cyan-500/30 transition-all"
                >
                  Confirmar
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 text-slate-400 font-medium rounded-lg hover:bg-slate-700/50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
