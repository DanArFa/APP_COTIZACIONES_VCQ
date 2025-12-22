import { LayoutCliente } from '../../layouts/LayoutCliente';
import { FileText, Download } from 'lucide-react';

export function ClienteDocumentos() {
  const documentos = [
    // TODO: Connect to actual API to fetch cotizaciones and PDFs
  ];

  return (
    <LayoutCliente activeTab="documentos">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Mis Documentos</h2>
          <p className="text-slate-400 mt-1">Descargar cotizaciones y documentos</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-12 border border-slate-700/50 text-center">
          <FileText className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-slate-200 mb-2">Sin documentos disponibles</h3>
          <p className="text-slate-400 mb-6">Cuando tengas cotizaciones, aparecerán aquí para descargar</p>
        </div>

        {documentos.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Documento</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Fecha</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {/* Rows will go here */}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LayoutCliente>
  );
}
