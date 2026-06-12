import React, { useState, useEffect } from 'react';

const VisualizadorCortes = ({ config, resultados }) => {
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    setPagina(0);
  }, [resultados]);

  if (!resultados) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">El mapa de cortes aparecerá aquí al presionar "Calcular Cortes"</p>
      </div>
    );
  }

  const { ancho, alto } = config;
  const esVertical = alto > ancho;
  const viewBoxAncho = esVertical ? alto : ancho;
  const viewBoxAlto = esVertical ? ancho : alto;
  const planchaActual = resultados.detalle_planchas[pagina];

  const cortesTabla = {};
  planchaActual.cortes.forEach(corte => {
    const clave = `${corte.nombre}-${corte.w}-${corte.h}`;
    if (!cortesTabla[clave]) {
      cortesTabla[clave] = { ...corte, cantidad: 1 };
    } else {
      cortesTabla[clave].cantidad += 1;
    }
  });
  const filasTabla = Object.values(cortesTabla);

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-3 border-b pb-3 shrink-0">
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

      {/* Mapa SVG */}
      <div className="w-full flex-1 min-h-0 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200 mb-3">
        <svg 
          viewBox={`0 0 ${viewBoxAncho} ${viewBoxAlto}`} 
          className="max-w-full max-h-full drop-shadow-md"
        >
          <rect x="0" y="0" width={viewBoxAncho} height={viewBoxAlto} fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
          
          {planchaActual.cortes.map((corte, index) => {
            const x = esVertical ? corte.y : corte.x;
            const y = esVertical ? corte.x : corte.y;
            const w = esVertical ? corte.h : corte.w;
            const h = esVertical ? corte.w : corte.h;

            return (
              <g key={index}>
                <rect x={x} y={y} width={w} height={h} fill="#fbbf24" stroke="#78350f" strokeWidth={config.kerf} />
                
                {/* LÍMITE BAJADO A 6cm. Si la pieza es menor a 15, la letra se hace más chiquita (2.5) */}
                {w > 6 && h > 6 && (
                   <>
                     <text 
                       x={x + w / 2} 
                       y={y + h / 2 - 2} 
                       fontSize={w < 15 || h < 15 ? "2.5" : "4"} 
                       fill="#451a03" 
                       textAnchor="middle" 
                       dominantBaseline="middle" 
                       className="font-bold font-sans"
                     >
                       {corte.nombre}
                     </text>
                     <text 
                       x={x + w / 2} 
                       y={y + h / 2 + 2} 
                       fontSize={w < 15 || h < 15 ? "2" : "3"} 
                       fill="#78350f" 
                       textAnchor="middle" 
                       dominantBaseline="middle" 
                       className="font-sans"
                     >
                       {corte.w} x {corte.h}
                     </text>
                   </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tabla de Piezas */}
      <div className="w-full shrink-0 h-[22vh] flex flex-col mb-2">
        <h3 className="text-sm font-bold text-gray-700 mb-2 shrink-0">Piezas en esta plancha</h3>
        <div className="flex-1 overflow-y-auto rounded-lg border border-gray-200 shadow-sm min-h-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 sticky top-0">
              <tr>
                <th className="px-4 py-2 font-semibold border-b">Nombre de la pieza</th>
                <th className="px-4 py-2 font-semibold border-b text-center">Medidas (cm)</th>
                <th className="px-4 py-2 font-semibold border-b text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filasTabla.map((fila, i) => (
                 <tr key={i} className="hover:bg-gray-50">
                   <td className="px-4 py-2 font-medium text-gray-800">{fila.nombre}</td>
                   <td className="px-4 py-2 text-center text-gray-600">{fila.w} x {fila.h}</td>
                   <td className="px-4 py-2 text-center font-bold text-gray-700">{fila.cantidad}</td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {resultados.planchas > 1 && (
        <div className="flex justify-center gap-4 shrink-0 pt-2 border-t mt-1">
          <button 
            onClick={() => setPagina(p => Math.max(0, p - 1))}
            disabled={pagina === 0}
            className="px-6 py-2 bg-slate-800 text-white rounded-md disabled:opacity-30 disabled:bg-slate-400 font-medium hover:bg-slate-700 transition"
          >
            ← Plancha Anterior
          </button>
          <button 
            onClick={() => setPagina(p => Math.min(resultados.planchas - 1, p + 1))}
            disabled={pagina === resultados.planchas - 1}
            className="px-6 py-2 bg-slate-800 text-white rounded-md disabled:opacity-30 disabled:bg-slate-400 font-medium hover:bg-slate-700 transition"
          >
            Siguiente Plancha →
          </button>
        </div>
      )}
    </div>
  );
};

export default VisualizadorCortes;