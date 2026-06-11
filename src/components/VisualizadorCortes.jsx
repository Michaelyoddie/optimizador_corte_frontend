import React from 'react';

const VisualizadorCortes = ({ config, resultados }) => {
  // Si aún no hay resultados, mostramos el mensaje por defecto
  if (!resultados) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400">El mapa de cortes aparecerá aquí al presionar "Calcular Cortes"</p>
      </div>
    );
  }

  const { ancho, alto } = config;

  return (
    <div className="w-full flex flex-col h-full">
      {/* Cabecera con estadísticas */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-bold text-gray-800">Mapa de Cortes</h2>
        <div className="flex gap-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">
            Planchas: {resultados.planchas}
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-semibold">
            Desperdicio: {resultados.desperdicio}%
          </span>
        </div>
      </div>

      {/* Contenedor del dibujo de la plancha */}
      <div className="flex-1 w-full flex items-center justify-center bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
        
        {/* El SVG escala automáticamente sus medidas internas (viewBox) al tamaño de la pantalla */}
        <svg 
          viewBox={`0 0 ${ancho} ${alto}`} 
          className="w-full h-auto max-h-[600px] bg-amber-100 shadow-md border-2 border-amber-900"
        >
          {/* Fondo completo de la plancha */}
          <rect x="0" y="0" width={ancho} height={alto} fill="#fde68a" />
          
          {/* Dibujamos cada pieza cortada iterando sobre los resultados */}
          {resultados.cortes.map((corte, index) => (
            <g key={index}>
              <rect 
                x={corte.x} 
                y={corte.y} 
                width={corte.w} 
                height={corte.h} 
                fill="#fbbf24" 
                stroke="#78350f" 
                strokeWidth={config.kerf} 
              />
              
              {/* Solo dibujamos texto si la pieza es lo suficientemente grande para que se lea */}
              {corte.w > 15 && corte.h > 15 && (
                 <>
                   <text 
                     x={corte.x + corte.w / 2} 
                     y={corte.y + corte.h / 2 - 2} 
                     fontSize="4" 
                     fill="#451a03" 
                     textAnchor="middle" 
                     dominantBaseline="middle"
                     className="font-bold font-sans"
                   >
                     {corte.nombre}
                   </text>
                   <text 
                     x={corte.x + corte.w / 2} 
                     y={corte.y + corte.h / 2 + 3} 
                     fontSize="3" 
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
          ))}
        </svg>

      </div>
    </div>
  );
};

export default VisualizadorCortes;