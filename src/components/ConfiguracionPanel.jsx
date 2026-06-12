import React, { useState } from 'react';

const ConfiguracionPanel = ({ config, setConfig, nombreProyecto, setNombreProyecto }) => {
  const [esManual, setEsManual] = useState(false);

  const manejarCambioSelect = (e) => {
    const valor = e.target.value;
    if (valor === 'manual') {
      setEsManual(true);
      setConfig({ ...config, ancho: '', alto: '' }); 
    } else {
      setEsManual(false);
      const [ancho, alto] = valor.split('x').map(Number);
      setConfig({ ...config, ancho, alto });
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración General</h2>
      
      <div className="space-y-4">
        
        {/* NUEVO CAMPO: Cliente o Proyecto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cliente / Proyecto</label>
          <input 
            type="text" 
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
            placeholder="Ej. Mueble de Cocina"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensiones (cm)</label>
          <select 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
            onChange={manejarCambioSelect}
            defaultValue="122x244"
          >
            <option value="122x244">OSB Estándar (122 x 244)</option>
            <option value="183x250">Melamina Grande (183 x 250)</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        {esManual && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <label className="block text-xs text-gray-600">Ancho (cm)</label>
              <input 
                type="number" 
                value={config.ancho}
                onChange={(e) => setConfig({...config, ancho: parseFloat(e.target.value) || 0})}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Alto (cm)</label>
              <input 
                type="number" 
                value={config.alto}
                onChange={(e) => setConfig({...config, alto: parseFloat(e.target.value) || 0})}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Espesor de la sierra (cm)</label>
          <input 
            type="number" 
            value={config.kerf}
            onChange={(e) => setConfig({...config, kerf: parseFloat(e.target.value) || 0})}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPanel;