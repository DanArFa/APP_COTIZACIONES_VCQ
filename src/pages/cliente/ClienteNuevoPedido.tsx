import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutCliente } from '../../layouts/LayoutCliente';
import ClienteFigurasPedido from '../../components/ClienteFigurasPedido';
import { Plus, X, ArrowLeft } from 'lucide-react';

interface PiezaPersonalizada {
  figura_id: string;
  figura_nombre: string;
  tipo_figura: string;
  campos: Array<{ nombre: string; valor: number; unidad?: string }>;
  cantidad: number;
}

interface PedidoForm {
  tipoVidrio: string;
  medidas: {
    alto: number;
    ancho: number;
  };
  cantidad: number;
  notas: string;
  direccionEntrega: string;
  piezas: PiezaPersonalizada[];
}

export function ClienteNuevoPedido() {
  const navigate = useNavigate();
  const [form, setForm] = useState<PedidoForm>({
    tipoVidrio: 'claro',
    medidas: { alto: 100, ancho: 100 },
    cantidad: 1,
    notas: '',
    direccionEntrega: '',
    piezas: [],
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
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate('/app/cliente')}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-slate-300 group"
                title="Volver a Mis Pedidos"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <h1 className="text-4xl font-bold text-slate-100">Nuevo Pedido</h1>
            </div>
            <p className="text-slate-400 ml-11">Selecciona y personaliza tus figuras de vidrio</p>
          </div>
        </div>

        {submitted && (
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/50 text-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-lg animate-slideDown">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Sistema en desarrollo</p>
              <p className="text-sm mt-1">El almacenamiento de pedidos está siendo completado. Por ahora puedes ver las figuras disponibles.</p>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-amber-300 hover:text-amber-200 flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
          <ClienteFigurasPedido onPiezasChange={(piezas) => setForm({ ...form, piezas })} />
        </div>

        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Información Adicional del Pedido</h3>
            <p className="text-sm text-slate-400">Completa los detalles de tu pedido</p>
          </div>

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
