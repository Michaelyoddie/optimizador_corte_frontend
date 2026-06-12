import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const VisualizadorCortes = ({ config, resultados, nombreProyecto }) => {
  const [pagina, setPagina] = useState(0);
  const componentePDFRef = useRef();

  useEffect(() => {
    setPagina(0);
  }, [resultados]);

  // Si escribiste un nombre, el archivo PDF se llamará así al guardarse
  const exportarPDF = useReactToPrint({
    contentRef: componentePDFRef,
    documentTitle: nombreProyecto ? `Cortes_${nombreProyecto.replace(/\s+/g, '_')}` : `Optimizador_Cortes`,
  });

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
    <div className="w-full flex flex-col h-full overflow-hidden relative">
      
      <div className="flex justify-between items-center mb-3 border-b pb-3 shrink-0">
        <h2 className="text-xl font-bold text-gray-800">
          {/* Muestra el nombre del proyecto en la pantalla si existe */}
          {nombreProyecto ? `Mapa de Cortes: ${nombreProyecto}` : 'Mapa de Cortes'}
        </h2>
        <div className="flex gap-2 items-center">
          <button 
            onClick={exportarPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-bold transition mr-2 shadow-sm"
          >
            📄 Generar PDF Completo
          </button>
          <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-md text-sm font-semibold hidden md:inline-block">
            Plancha {pagina + 1} de {resultados.planchas}
          </span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md text-sm font-semibold">
            Desperdicio: {planchaActual.desperdicio}%
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 bg-white p-2 rounded-lg">
        <div className="w-full flex-1 min-h-0 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200 mb-3">
          <svg viewBox={`0 0 ${viewBoxAncho} ${viewBoxAlto}`} className="max-w-full max-h-full drop-shadow-md">
            <rect x="0" y="0" width={viewBoxAncho} height={viewBoxAlto} fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
            {planchaActual.cortes.map((corte, index) => {
              const x = esVertical ? corte.y : corte.x;
              const y = esVertical ? corte.x : corte.y;
              const w = esVertical ? corte.h : corte.w;
              const h = esVertical ? corte.w : corte.h;
              return (
                <g key={index}>
                  <rect x={x} y={y} width={w} height={h} fill="#fbbf24" stroke="#78350f" strokeWidth={config.kerf} />
                  {w > 6 && h > 6 && (
                     <>
                       <text x={x + w / 2} y={y + h / 2 - 2} fontSize={w < 15 || h < 15 ? "2.5" : "4"} fill="#451a03" textAnchor="middle" dominantBaseline="middle" className="font-bold font-sans">
                         {corte.nombre}
                       </text>
                       <text x={x + w / 2} y={y + h / 2 + 2} fontSize={w < 15 || h < 15 ? "2" : "3"} fill="#78350f" textAnchor="middle" dominantBaseline="middle" className="font-sans">
                         {corte.w} x {corte.h}
                       </text>
                     </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="w-full shrink-0 flex flex-col mb-1 h-[22vh]">
          <h3 className="text-sm font-bold text-gray-700 mb-2 shrink-0">Lista de cortes para esta plancha</h3>
          <div className="flex-1 overflow-y-auto rounded-lg border border-gray-200 shadow-sm min-h-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 sticky top-0">
                <tr>
                  <th className="px-4 py-2 font-semibold border-b">Pieza</th>
                  <th className="px-4 py-2 font-semibold border-b text-center">Medidas (cm)</th>
                  <th className="px-4 py-2 font-semibold border-b text-center">Cantidad a cortar</th>
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
      </div>

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

      {/* ========================================================================= */}
      {/* VISTA OCULTA PARA IMPRIMIR CON TÍTULO PERSONALIZADO */}
      {/* ========================================================================= */}
      <div className="hidden">
        <div ref={componentePDFRef} className="p-8 bg-white text-black">
          {resultados.detalle_planchas.map((plancha, planchaIndex) => {

            const cortesTablaImpresion = {};
            plancha.cortes.forEach(corte => {
              const clave = `${corte.nombre}-${corte.w}-${corte.h}`;
              if (!cortesTablaImpresion[clave]) {
                cortesTablaImpresion[clave] = { ...corte, cantidad: 1 };
              } else {
                cortesTablaImpresion[clave].cantidad += 1;
              }
            });
            const filasTablaImpresion = Object.values(cortesTablaImpresion);

            return (
              <div key={planchaIndex} className="break-after-page mb-16">
                
                <div className="mb-6 text-center border-b-2 border-gray-800 pb-4">
                  {/* AQUÍ SE IMPRIME EL NOMBRE DEL PROYECTO O CLIENTE */}
                  <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                    {nombreProyecto ? `Proyecto: ${nombreProyecto}` : 'Hoja de Ruta - Optimizador'}
                  </h1>
                  <p className="text-gray-600 mt-2 font-medium">Plancha {planchaIndex + 1} de {resultados.planchas} | Medidas Originales: {ancho}x{alto} cm | Desperdicio: {plancha.desperdicio}%</p>
                </div>

                <div className="w-full mb-8 flex justify-center">
                  <svg viewBox={`0 0 ${viewBoxAncho} ${viewBoxAlto}`} className="w-full h-auto max-h-[600px] border-2 border-gray-800 shadow-sm">
                    <rect x="0" y="0" width={viewBoxAncho} height={viewBoxAlto} fill="#fde68a" />
                    {plancha.cortes.map((corte, index) => {
                      const x = esVertical ? corte.y : corte.x;
                      const y = esVertical ? corte.x : corte.y;
                      const w = esVertical ? corte.h : corte.w;
                      const h = esVertical ? corte.w : corte.h;
                      return (
                        <g key={index}>
                          <rect x={x} y={y} width={w} height={h} fill="#fbbf24" stroke="#78350f" strokeWidth={config.kerf} />
                          {w > 6 && h > 6 && (
                             <>
                               <text x={x + w / 2} y={y + h / 2 - 2} fontSize={w < 15 || h < 15 ? "2.5" : "4"} fill="#451a03" textAnchor="middle" dominantBaseline="middle" className="font-bold font-sans">
                                 {corte.nombre}
                               </text>
                               <text x={x + w / 2} y={y + h / 2 + 2} fontSize={w < 15 || h < 15 ? "2" : "3"} fill="#78350f" textAnchor="middle" dominantBaseline="middle" className="font-sans">
                                 {corte.w} x {corte.h}
                               </text>
                             </>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">Despiece a Cortar</h3>
                  <table className="w-full text-sm text-left border-collapse border border-gray-400">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 font-bold text-gray-800 border border-gray-400">Nombre de la Pieza</th>
                        <th className="px-4 py-2 font-bold text-gray-800 border border-gray-400 text-center">Medidas (cm)</th>
                        <th className="px-4 py-2 font-bold text-gray-800 border border-gray-400 text-center">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filasTablaImpresion.map((fila, i) => (
                         <tr key={i}>
                           <td className="px-4 py-2 font-medium text-gray-800 border border-gray-400">{fila.nombre}</td>
                           <td className="px-4 py-2 text-center text-gray-800 border border-gray-400">{fila.w} x {fila.h}</td>
                           <td className="px-4 py-2 text-center font-bold text-gray-900 border border-gray-400">{fila.cantidad}</td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default VisualizadorCortes;