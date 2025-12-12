import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Plus, Edit2, Trash2, X } from 'lucide-react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/usuarios';
import { User } from '../types';

export default function UsuariosTab() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    USUARIO: '',
    NOMBRE: '',
    CONTRASENA: '',
    ROL: 'VENDEDOR' as const,
    ACTIVO: 'SI' as const,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingUsuario, setEditingUsuario] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState({
    USUARIO: '',
    NOMBRE: '',
    CONTRASENA: '',
    ROL: 'VENDEDOR' as const,
    ACTIVO: 'SI' as const,
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    setLoading(true);
    const data = await getUsuarios();
    setUsuarios(data);
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.USUARIO || !formData.NOMBRE || !formData.CONTRASENA) {
      setMessage({ type: 'error', text: 'Por favor completa todos los campos' });
      return;
    }

    setSubmitting(true);
    const newUser = await createUsuario(formData);
    setSubmitting(false);

    if (newUser) {
      setMessage({ type: 'success', text: 'Usuario creado exitosamente' });
      setFormData({ USUARIO: '', NOMBRE: '', CONTRASENA: '', ROL: 'VENDEDOR', ACTIVO: 'SI' });
      setShowForm(false);
      loadUsuarios();
    } else {
      setMessage({ type: 'error', text: 'Error al crear el usuario' });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const handleEditarUsuario = (usuario: User) => {
    setEditingUsuario(usuario);
    setEditFormData({
      USUARIO: usuario.USUARIO,
      NOMBRE: usuario.NOMBRE,
      CONTRASENA: usuario.CONTRASENA,
      ROL: usuario.ROL,
      ACTIVO: usuario.ACTIVO,
    });
  };

  const handleGuardarEdicion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUsuario) return;

    if (!editFormData.USUARIO || !editFormData.NOMBRE) {
      setMessage({ type: 'error', text: 'Por favor completa los campos requeridos' });
      return;
    }

    const success = await updateUsuario(editingUsuario.ID_USUARIO, editFormData);
    if (success) {
      setMessage({ type: 'success', text: 'Usuario actualizado exitosamente' });
      loadUsuarios();
      setEditingUsuario(null);
    } else {
      setMessage({ type: 'error', text: 'Error al actualizar el usuario' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEliminarUsuario = async (id: number, nombre: string) => {
    if (!window.confirm(`¿Deseas eliminar el usuario "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    const success = await deleteUsuario(id);
    if (success) {
      setMessage({ type: 'success', text: 'Usuario eliminado exitosamente' });
      loadUsuarios();
    } else {
      setMessage({ type: 'error', text: 'Error al eliminar el usuario' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return <div className="text-slate-400">Cargando usuarios...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-100">Usuarios del sistema</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-cyan-500/15 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Agregar usuario
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={formData.USUARIO}
                  onChange={(e) => setFormData({ ...formData, USUARIO: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.NOMBRE}
                  onChange={(e) => setFormData({ ...formData, NOMBRE: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={formData.CONTRASENA}
                  onChange={(e) => setFormData({ ...formData, CONTRASENA: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rol
                </label>
                <select
                  value={formData.ROL}
                  onChange={(e) => setFormData({ ...formData, ROL: e.target.value as 'ADMIN' | 'VENDEDOR' })}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="VENDEDOR">Vendedor</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.type === 'success'
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 text-sm font-medium bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50"
              >
                {submitting ? 'Creando...' : 'Crear usuario'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium bg-slate-800/50 border border-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-700/50 transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto rounded-xl border border-slate-700/50">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/50 sticky top-0">
              <tr>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">ID</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Usuario</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Nombre</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Rol</th>
                <th className="text-center px-4 py-3 text-slate-400 font-medium">Activo</th>
                <th className="text-center px-4 py-3 text-slate-400 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {usuarios.map((usuario) => (
                <tr key={usuario.ID_USUARIO} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-medium">{usuario.ID_USUARIO}</td>
                  <td className="px-4 py-3 text-slate-300 font-mono text-xs">{usuario.USUARIO}</td>
                  <td className="px-4 py-3 text-slate-200">{usuario.NOMBRE}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        usuario.ROL === 'ADMIN'
                          ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                          : 'bg-slate-700/30 border border-slate-600/30 text-slate-400'
                      }`}
                    >
                      {usuario.ROL === 'ADMIN' ? 'Administrador' : 'Vendedor'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {usuario.ACTIVO === 'SI' ? (
                      <CheckCircle className="w-5 h-5 text-green-400 inline-block" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 inline-block" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditarUsuario(usuario)}
                        className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                        title="Editar usuario"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEliminarUsuario(usuario.ID_USUARIO, usuario.NOMBRE)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUsuario && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200">Editar Usuario</h3>
              <button
                onClick={() => setEditingUsuario(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleGuardarEdicion} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Usuario <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.USUARIO}
                    onChange={(e) => setEditFormData({ ...editFormData, USUARIO: e.target.value })}
                    placeholder="nombre_usuario"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.NOMBRE}
                    onChange={(e) => setEditFormData({ ...editFormData, NOMBRE: e.target.value })}
                    placeholder="Nombre completo"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={editFormData.CONTRASENA}
                    onChange={(e) => setEditFormData({ ...editFormData, CONTRASENA: e.target.value })}
                    placeholder="Dejar en blanco para no cambiar"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Rol
                  </label>
                  <select
                    value={editFormData.ROL}
                    onChange={(e) => setEditFormData({ ...editFormData, ROL: e.target.value as 'ADMIN' | 'VENDEDOR' })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  >
                    <option value="VENDEDOR">Vendedor</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Estado
                  </label>
                  <select
                    value={editFormData.ACTIVO}
                    onChange={(e) => setEditFormData({ ...editFormData, ACTIVO: e.target.value as 'SI' | 'NO' })}
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  >
                    <option value="SI">Activo</option>
                    <option value="NO">Inactivo</option>
                  </select>
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'success'
                    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setEditingUsuario(null)}
                  className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-slate-950 font-medium rounded-lg transition-all duration-200"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
