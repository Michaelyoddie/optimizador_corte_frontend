import React, { useState, useEffect } from 'react';

const VisualizadorCortes = ({ config, resultados }) => {
  // Estado para saber en qué plancha estamos (0 es la primera)
  const [pagina, setPagina] = useState(0);

  // Si hacemos un cálculo nuevo, regresamos a la plancha 1 automáticamente
  useEffect(() => {
    setPagina(0);
  }, [resultados]);

  if (!resultados) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">El mapa de cortes aparecerá aquí al presionar "Calcular Cortes"</p>
      </div>
    );
  }

  const { ancho, alto } = config;
  const planchaActual = resultados.detalle_planchas[pagina];

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 border-b pb-4 shrink-0">
        <h2 className="text-xl font-bold text-gray-800">Mapa de Cortes</h2>
        <div className="flex gap-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">
            Plancha {pagina + 1} de {resultados.planchas}
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-semibold">
            Desperdicio: {planchaActual.desperdicio}%
          </span>
        </div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[50vh]">
        <svg viewBox={`0 0 ${ancho} ${alto}`} className="w-full h-full max-h-[60vh] bg-amber-100 shadow-md border-2 border-amber-900">
          <rect x="0" y="0" width={ancho} height={alto} fill="#fde68a" />
          {planchaActual.cortes.map((corte, index) => (
            <g key={index}>
              <rect x={corte.x} y={corte.y} width={corte.w} height={corte.h} fill="#fbbf24" stroke="#78350f" strokeWidth={config.kerf} />
              {corte.w > 15 && corte.h > 15 && (
                 <>
                   <text x={corte.x + corte.w / 2} y={corte.y + corte.h / 2 - 2} fontSize="4" fill="#451a03" textAnchor="middle" dominantBaseline="middle" className="font-bold font-sans">
                     {corte.nombre}
                   </text>
                   <text x={corte.x + corte.w / 2} y={corte.y + corte.h / 2 + 3} fontSize="3" fill="#78350f" textAnchor="middle" dominantBaseline="middle" className="font-sans">
                     {corte.w} x {corte.h}
                   </text>
                 </>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Controles de paginación si hay más de 1 plancha */}
      {resultados.planchas > 1 && (
        <div className="flex justify-center gap-4 mt-4 shrink-0">
          <button 
            onClick={() => setPagina(p => Math.max(0, p - 1))}
            disabled={pagina === 0}
            className="px-6 py-2 bg-slate-800 text-white rounded-md disabled:opacity-30 disabled:bg-slate-400 font-medium hover:bg-slate-700 transition"
          >
            ← Anterior
          </button>
          <button 
            onClick={() => setPagina(p => Math.min(resultados.planchas - 1, p + 1))}
            disabled={pagina === resultados.planchas - 1}
            className="px-6 py-2 bg-slate-800 text-white rounded-md disabled:opacity-30 disabled:bg-slate-400 font-medium hover:bg-slate-700 transition"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default VisualizadorCortes;