import React, { useState } from 'react';
import ConfiguracionPanel from './components/ConfiguracionPanel';
import GestorPiezas from './components/GestorPiezas';
import VisualizadorCortes from './components/VisualizadorCortes';

function App() {
  const [config, setConfig] = useState({ ancho: 122, alto: 244, kerf: 0.5 });
  const [piezas, setPiezas] = useState([]);
  
  // Nuevo estado para guardar la respuesta que nos enviará Python más adelante
  const [resultados, setResultados] = useState(null);

  // Esta función simula lo que hará Flask en el futuro
  const manejarCalculoSimulado = () => {
    // Datos ficticios imitando la estructura de una plancha de 122x244
    const respuestaFalsa = {
      planchas: 1,
      desperdicio: 18.5,
      cortes: [
        { x: 0, y: 0, w: 60, h: 100, nombre: 'Puerta Izquierda' },
        { x: 60, y: 0, w: 60, h: 100, nombre: 'Puerta Derecha' },
        { x: 0, y: 100, w: 120, h: 40, nombre: 'Repisa Superior' },
        { x: 0, y: 140, w: 50, h: 50, nombre: 'Cajón 1' },
        { x: 50, y: 140, w: 50, h: 50, nombre: 'Cajón 2' }
      ]
    };
    
    setResultados(respuestaFalsa);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Optimizador de Taller</h1>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Ingreso de Datos */}
        <div className="lg:col-span-1 flex flex-col">
          <ConfiguracionPanel config={config} setConfig={setConfig} />
          <GestorPiezas piezas={piezas} setPiezas={setPiezas} />
          
          <button 
            onClick={manejarCalculoSimulado}
            className="mt-6 w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={piezas.length === 0}
          >
            Calcular Cortes
          </button>
        </div>
        
        {/* Columna Derecha: Renderizado del Plano */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center min-h-[500px]">
          <VisualizadorCortes config={config} resultados={resultados} />
        </div>

      </div>
    </div>
  );
}

export default App;