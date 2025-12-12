import { useState, useEffect } from 'react';
import { UserPlus, Edit2, Trash2, X } from 'lucide-react';
import { getClientes, createCliente, getNextClienteId, updateCliente, deleteCliente } from '../services/clientes';
import { Cliente } from '../types';

export default function ClientesTab() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [rfc, setRfc] = useState('');
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRfc, setEditRfc] = useState('');

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    setLoading(true);
    const data = await getClientes();
    setClientes(data);
    setLoading(false);
  }

  const handleGuardar = async () => {
    if (!nombre.trim()) {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    const id = await getNextClienteId();
    const nuevoCliente = {
      ID_CLIENTE: String(id),
      NOMBRE: nombre.trim(),
      TELEFONO: telefono.trim(),
      CORREO: email.trim(),
      RFC: rfc.trim(),
      DIRECCION: '',
      NOTAS: '',
    };

    const result = await createCliente(nuevoCliente);
    if (result) {
      await loadClientes();
      setNombre('');
      setTelefono('');
      setEmail('');
      setRfc('');
      alert('Cliente guardado exitosamente');
    } else {
      alert('Error al guardar el cliente');
    }
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setEditNombre(cliente.NOMBRE);
    setEditTelefono(cliente.TELEFONO);
    setEditEmail(cliente.CORREO);
    setEditRfc(cliente.RFC);
  };

  const handleGuardarEdicion = async () => {
    if (!editingCliente) return;

    if (!editNombre.trim()) {
      alert('El nombre del cliente es obligatorio');
      return;
    }

    const result = await updateCliente(editingCliente.ID_CLIENTE, {
      NOMBRE: editNombre.trim(),
      TELEFONO: editTelefono.trim(),
      CORREO: editEmail.trim(),
      RFC: editRfc.trim(),
    });

    if (result) {
      await loadClientes();
      setEditingCliente(null);
      alert('Cliente actualizado exitosamente');
    } else {
      alert('Error al actualizar el cliente');
    }
  };

  const handleEliminarCliente = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Deseas eliminar el cliente "${nombre}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    const result = await deleteCliente(id);
    if (result) {
      await loadClientes();
      alert('Cliente eliminado exitosamente');
    } else {
      alert('Error al eliminar el cliente');
    }
  };

  if (loading) {
    return <div className="text-slate-400">Cargando clientes...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1">Gestión de Clientes</h2>
      </div>

      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-green-500/20 rounded-lg border border-cyan-500/30">
            <UserPlus className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Agregar Nuevo Cliente</h3>
            <p className="text-xs text-slate-400">Complete los datos del cliente</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre completo o empresa"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Teléfono
            </label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="555-1234-5678"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@example.com"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              RFC
            </label>
            <input
              type="text"
              value={rfc}
              onChange={(e) => setRfc(e.target.value.toUpperCase())}
              placeholder="ABC123456DEF"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleGuardar}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:from-cyan-400 hover:to-green-400 transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
          <UserPlus className="w-5 h-5" />
          Guardar Cliente
        </button>
      </div>

      <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-slate-800/30 border-b border-slate-700/50">
          <h3 className="text-lg font-semibold text-slate-200">Lista de Clientes</h3>
          <p className="text-xs text-slate-400 mt-1">
            {clientes.length} {clientes.length === 1 ? 'cliente registrado' : 'clientes registrados'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 sticky top-0 z-10">
                <tr>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">ID</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Nombre</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Teléfono</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">RFC</th>
                  <th className="text-center px-6 py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center">
                          <UserPlus className="w-6 h-6 text-slate-600" />
                        </div>
                        <p className="text-slate-500 font-medium">No hay clientes registrados</p>
                        <p className="text-xs text-slate-600">Agrega tu primer cliente usando el formulario de arriba</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  clientes
                    .sort((a, b) => parseInt(a.ID_CLIENTE) - parseInt(b.ID_CLIENTE))
                    .map((cliente) => (
                      <tr key={cliente.ID_CLIENTE} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/50 text-slate-300 font-semibold text-xs group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                            {cliente.ID_CLIENTE}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-200 font-medium">{cliente.NOMBRE}</td>
                        <td className="px-6 py-4 text-slate-300">{cliente.TELEFONO || '-'}</td>
                        <td className="px-6 py-4 text-slate-300">{cliente.CORREO || '-'}</td>
                        <td className="px-6 py-4 text-slate-300">{cliente.RFC || '-'}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditarCliente(cliente)}
                              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                              title="Editar cliente"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEliminarCliente(cliente.ID_CLIENTE, cliente.NOMBRE)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Eliminar cliente"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingCliente && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200">Editar Cliente</h3>
              <button
                onClick={() => setEditingCliente(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    placeholder="Nombre completo o empresa"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={editTelefono}
                    onChange={(e) => setEditTelefono(e.target.value)}
                    placeholder="555-1234-5678"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="cliente@example.com"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    RFC
                  </label>
                  <input
                    type="text"
                    value={editRfc}
                    onChange={(e) => setEditRfc(e.target.value.toUpperCase())}
                    placeholder="ABC123456DEF"
                    className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-slate-700">
              <button
                onClick={() => setEditingCliente(null)}
                className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarEdicion}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-slate-950 font-medium rounded-lg transition-all duration-200"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
