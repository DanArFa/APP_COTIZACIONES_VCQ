import { useState, useEffect } from 'react';
import { UserPlus } from 'lucide-react';
import { getClientes, createCliente, getNextClienteId } from '../services/clientes';
import { Cliente } from '../types';

export default function ClientesTab() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [rfc, setRfc] = useState('');

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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {clientes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
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
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
