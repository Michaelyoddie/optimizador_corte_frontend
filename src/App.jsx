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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Optimizador de Taller</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Columna Izquierda */}
        <div className="lg:col-span-4 flex flex-col gap-6 relative">
          <ConfiguracionPanel config={config} setConfig={setConfig} />
          <GestorPiezas piezas={piezas} setPiezas={setPiezas} />
          
          {/* Botón Flotante/Pegajoso */}
          <div className="sticky bottom-4 z-10 pt-2">
            <button 
              onClick={manejarCalculo}
              className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.5)] hover:bg-blue-700 transition disabled:bg-gray-400 disabled:shadow-none"
              disabled={piezas.length === 0}
            >
              Calcular Cortes
            </button>
          </div>
        </div>
        
        {/* Columna Derecha */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center min-h-[500px]">
          <VisualizadorCortes config={config} resultados={resultados} />
        </div>

      </div>
    </div>
  );
}

export default App;