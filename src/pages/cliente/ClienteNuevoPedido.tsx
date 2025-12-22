import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutCliente } from '../../layouts/LayoutCliente';
import { Plus, X, ArrowLeft } from 'lucide-react';

interface PedidoForm {
  tipoVidrio: string;
  medidas: {
    alto: number;
    ancho: number;
  };
  cantidad: number;
  notas: string;
  direccionEntrega: string;
}

export function ClienteNuevoPedido() {
  const navigate = useNavigate();
  const [form, setForm] = useState<PedidoForm>({
    tipoVidrio: 'claro',
    medidas: { alto: 100, ancho: 100 },
    cantidad: 1,
    notas: '',
    direccionEntrega: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Connect to actual API endpoint to create pedido
      console.log('Submitting form:', form);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error creating pedido:', error);
    }
  };

  return (
    <LayoutCliente activeTab="nuevo">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/app/cliente')}
          className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-all mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Regresar
        </button>

        <div>
          <h2 className="text-3xl font-bold text-slate-100">Crear Nuevo Pedido</h2>
          <p className="text-slate-400 mt-1">Completa los datos para solicitar tu pedido</p>
        </div>

        {submitted && (
          <div className="bg-green-500/15 border border-green-500/50 text-green-300 rounded-xl p-4 flex items-start gap-3">
            <div className="flex-1">
              <p className="font-semibold">Formulario pendiente de conectar</p>
              <p className="text-sm mt-1">El sistema aún no tiene endpoint para guardar pedidos. Ponte en contacto con soporte.</p>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-green-300 hover:text-green-200">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 space-y-6">
          {/* Tipo de Vidrio */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Tipo de Vidrio
            </label>
            <select
              value={form.tipoVidrio}
              onChange={(e) => setForm({ ...form, tipoVidrio: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
              <option value="espejo">Espejo</option>
              <option value="templado">Templado</option>
            </select>
          </div>

          {/* Medidas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Alto (cm)
              </label>
              <input
                type="number"
                value={form.medidas.alto}
                onChange={(e) => setForm({
                  ...form,
                  medidas: { ...form.medidas, alto: Number(e.target.value) }
                })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Ancho (cm)
              </label>
              <input
                type="number"
                value={form.medidas.ancho}
                onChange={(e) => setForm({
                  ...form,
                  medidas: { ...form.medidas, ancho: Number(e.target.value) }
                })}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Cantidad
            </label>
            <input
              type="number"
              min="1"
              value={form.cantidad}
              onChange={(e) => setForm({ ...form, cantidad: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Dirección de Entrega */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Dirección de Entrega
            </label>
            <textarea
              value={form.direccionEntrega}
              onChange={(e) => setForm({ ...form, direccionEntrega: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              placeholder="Calle, número, colonia, ciudad..."
            />
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Observaciones (opcional)
            </label>
            <textarea
              value={form.notas}
              onChange={(e) => setForm({ ...form, notas: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              placeholder="Especificaciones adicionales, preferencias de horario, etc..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-semibold rounded-xl hover:from-cyan-400 hover:to-green-400 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Crear Pedido
          </button>

          <p className="text-center text-sm text-slate-400 border-t border-slate-700/50 pt-4">
            Pendiente de conectar - El sistema aún no tiene endpoint para guardar pedidos
          </p>
        </form>
      </div>
    </LayoutCliente>
  );
}
