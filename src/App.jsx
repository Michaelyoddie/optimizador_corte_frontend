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
      // Le tocamos la puerta al servidor de Python
      const respuesta = await fetch('http://127.0.0.1:5000/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, piezas }) 
      });

      if (!respuesta.ok) {
        throw new Error("Error en el cálculo.");
      }

      // Recibimos el mapa real dibujado por Python
      const datos = await respuesta.json();
      setResultados(datos); 

    } catch (error) {
      console.error("Error:", error);
      alert("Asegúrate de que Python (Flask) esté corriendo y las medidas sean correctas.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Optimizador de Taller</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 flex flex-col">
          <ConfiguracionPanel config={config} setConfig={setConfig} />
          <GestorPiezas piezas={piezas} setPiezas={setPiezas} />
          
          {/* Este botón ahora ejecuta manejarCalculo */}
          <button 
            onClick={manejarCalculo}
            className="mt-6 w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={piezas.length === 0}
          >
            Calcular Cortes
          </button>
        </div>
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center min-h-[500px]">
          <VisualizadorCortes config={config} resultados={resultados} />
        </div>

      </div>
    </div>
  );
}

export default App;