import React, { useState } from 'react';
import ConfiguracionPanel from './components/ConfiguracionPanel';

function App() {
  // Aquí guardamos el estado global de la configuración
  const [config, setConfig] = useState({ ancho: 122, alto: 244, kerf: 0.5 });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Optimizador de Taller</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna Izquierda: Controles */}
        <div className="md:col-span-1 space-y-6">
          <ConfiguracionPanel config={config} setConfig={setConfig} />
        </div>
        
        {/* Columna Derecha: Aquí irá el visualizador de cortes más adelante */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex items-center justify-center min-h-[400px]">
          <p className="text-gray-400">El mapa de cortes aparecerá aquí</p>
        </div>
      </div>
    </div>
  );
}

export default App;