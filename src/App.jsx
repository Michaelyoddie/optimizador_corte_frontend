import React, { useState } from 'react';
import ConfiguracionPanel from './components/ConfiguracionPanel';
import GestorPiezas from './components/GestorPiezas';
import VisualizadorCortes from './components/VisualizadorCortes';

function App() {
  const [config, setConfig] = useState({ ancho: 122, alto: 244, kerf: 0.5 });
  const [piezas, setPiezas] = useState([]);
  const [resultados, setResultados] = useState(null);

  const manejarCalculo = async () => {
    try {
      const respuesta = await fetch('http://127.0.0.1:5000/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, piezas }) 
      });
      if (!respuesta.ok) throw new Error("Error en el cálculo.");
      const datos = await respuesta.json();
      setResultados(datos); 
    } catch (error) {
      console.error("Error:", error);
      alert("Asegúrate de que Python esté corriendo y las medidas sean lógicas.");
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-4 md:p-8 overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 shrink-0">Optimizador de Taller</h1>
      
      {/* Contenedor principal trabado al alto de la pantalla */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Columna Izquierda: Ingreso de Datos */}
        <div className="lg:col-span-4 flex flex-col h-full bg-transparent">
          {/* Zona con scroll para los formularios */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-2">
            <ConfiguracionPanel config={config} setConfig={setConfig} />
            <GestorPiezas piezas={piezas} setPiezas={setPiezas} />
          </div>
          
          {/* Botón anclado abajo */}
          <div className="pt-4 shrink-0 border-t border-gray-300 mt-2">
            <button 
              onClick={manejarCalculo}
              className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={piezas.length === 0}
            >
              Calcular Cortes
            </button>
          </div>
        </div>
        
        {/* Columna Derecha: Renderizado del Plano */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center h-full">
          <VisualizadorCortes config={config} resultados={resultados} />
        </div>

      </div>
    </div>
  );
}

export default App;