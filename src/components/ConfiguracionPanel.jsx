import React from 'react';

const ConfiguracionPanel = ({ config, setConfig }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Configuración de Plancha</h2>
      
      <div className="space-y-4">
        {/* Selector de Dimensiones */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensiones (cm)</label>
          <select 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white"
            onChange={(e) => {
              const [ancho, alto] = e.target.value.split('x').map(Number);
              setConfig({...config, ancho, alto});
            }}
          >
            <option value="122x244">OSB Estándar (122 x 244)</option>
            <option value="183x250">Melamina Grande (183 x 250)</option>
            <option value="0x0">Manual</option>
          </select>
        </div>

        {/* Input para el Kerf */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Espesor de la sierra (cm)</label>
          <input 
            type="number" 
            value={config.kerf}
            onChange={(e) => setConfig({...config, kerf: parseFloat(e.target.value) || 0})}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPanel;