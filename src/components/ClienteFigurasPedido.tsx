import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import FigureVisualizer from './FigureVisualizer';
import { Plus, X } from 'lucide-react';

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
}

interface PiezaPersonalizada {
  figura_id: string;
  figura_nombre: string;
  tipo_figura: string;
  campos: Array<{ nombre: string; valor: number; unidad?: string }>;
  cantidad: number;
}

interface ClienteFigurasPedidoProps {
  onPiezasChange?: (piezas: PiezaPersonalizada[]) => void;
}

export default function ClienteFigurasPedido({ onPiezasChange }: ClienteFigurasPedidoProps) {
  const [figuras, setFiguras] = useState<StandardFigura[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFigura, setSelectedFigura] = useState<StandardFigura | null>(null);
  const [piezas, setPiezas] = useState<PiezaPersonalizada[]>([]);
  const [tempCampos, setTempCampos] = useState<Array<{ nombre: string; valor: number; unidad?: string }>>([]);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    loadFiguras();
  }, []);

  useEffect(() => {
    onPiezasChange?.(piezas);
  }, [piezas, onPiezasChange]);

  const loadFiguras = async () => {
    try {
      const { data, error } = await supabase
        .from('standard_figures')
        .select('*')
        .eq('es_activa', true);

      if (error) throw error;
      setFiguras(data || []);
    } catch (error) {
      console.error('Error loading figuras:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFigura = (figura: StandardFigura) => {
    setSelectedFigura(figura);
    setTempCampos(
      figura.campos_medida.map(campo => ({
        nombre: campo.nombre,
        valor: campo.valor_default,
        unidad: campo.unidad,
      }))
    );
    setCantidad(1);
  };

  const handleChangeCampo = (index: number, valor: number) => {
    const newCampos = [...tempCampos];
    newCampos[index].valor = valor;
    setTempCampos(newCampos);
  };

  const handleAddPieza = () => {
    if (!selectedFigura) return;

    const newPieza: PiezaPersonalizada = {
      figura_id: selectedFigura.id,
      figura_nombre: selectedFigura.nombre,
      tipo_figura: selectedFigura.tipo_figura,
      campos: tempCampos,
      cantidad,
    };

    setPiezas([...piezas, newPieza]);
    setSelectedFigura(null);
    setTempCampos([]);
    setCantidad(1);
  };

  const handleRemovePieza = (index: number) => {
    setPiezas(piezas.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="text-slate-400">Cargando figuras disponibles...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-100 mb-2">Figuras de Vidrio Personalizadas</h3>
        <p className="text-slate-400">Selecciona una figura estándar y personaliza sus medidas</p>
      </div>

      {figuras.length === 0 ? (
        <div className="text-center py-8 text-slate-400 bg-slate-900/50 rounded-xl border border-slate-700">
          No hay figuras estándar disponibles
        </div>
      ) : (
        <div className="space-y-6">
          {!selectedFigura ? (
            <div>
              <h4 className="text-lg font-semibold text-slate-100 mb-4">Selecciona una Figura</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {figuras.map((figura) => (
                  <button
                    key={figura.id}
                    onClick={() => handleSelectFigura(figura)}
                    className="text-left p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <h5 className="font-semibold text-slate-100">{figura.nombre}</h5>
                    <p className="text-xs text-slate-500 capitalize mt-1">{figura.tipo_figura}</p>
                    {figura.descripcion && (
                      <p className="text-xs text-slate-400 mt-2">{figura.descripcion}</p>
                    )}
                    <div className="mt-3 space-y-1">
                      {figura.campos_medida.map((campo, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 capitalize">{campo.nombre}:</span>
                          <span className="text-slate-300">{campo.valor_default} {campo.unidad}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-100">{selectedFigura.nombre}</h4>
                  <p className="text-sm text-slate-400 capitalize">{selectedFigura.tipo_figura}</p>
                </div>
                <button
                  onClick={() => setSelectedFigura(null)}
                  className="text-slate-400 hover:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FigureVisualizer tipoFigura={selectedFigura.tipo_figura} campos={tempCampos} scale={1.5} />

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold text-slate-100 mb-4">Personaliza las Medidas</h5>
                    <div className="space-y-3">
                      {selectedFigura.campos_medida.map((campo, idx) => (
                        <div key={idx}>
                          <label className="block text-sm text-slate-300 mb-1 capitalize">
                            {campo.nombre} ({campo.unidad || 'cm'})
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="number"
                              value={tempCampos[idx]?.valor || campo.valor_default}
                              onChange={(e) => handleChangeCampo(idx, Number(e.target.value))}
                              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              min="1"
                            />
                            <span className="text-sm text-slate-400 w-8 text-right">
                              {campo.unidad || 'cm'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Cantidad</label>
                    <input
                      type="number"
                      value={cantidad}
                      onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      min="1"
                    />
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <button
                      onClick={handleAddPieza}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar Pieza
                    </button>
                    <button
                      onClick={() => setSelectedFigura(null)}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {piezas.length > 0 && (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
          <h4 className="text-lg font-semibold text-slate-100 mb-4">Piezas Personalizadas ({piezas.length})</h4>
          <div className="space-y-3">
            {piezas.map((pieza, idx) => (
              <div key={idx} className="flex items-start justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex-1">
                  <p className="font-medium text-slate-100">{pieza.figura_nombre}</p>
                  <p className="text-xs text-slate-400 capitalize mb-2">{pieza.tipo_figura}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {pieza.campos.map((campo, cIdx) => (
                      <div key={cIdx} className="text-xs">
                        <span className="text-slate-400 capitalize">{campo.nombre}:</span>
                        <span className="text-slate-300 ml-1">{campo.valor} {campo.unidad}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Cantidad</p>
                    <p className="text-lg font-semibold text-slate-100">{pieza.cantidad}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePieza(idx)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-800/50 rounded-lg transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
