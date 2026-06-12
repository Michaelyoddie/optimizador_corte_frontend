import React, { useState } from 'react';

const GestorPiezas = ({ piezas, setPiezas }) => {
  const [nueva, setNueva] = useState({ nombre: '', ancho: '', alto: '', cantidad: 1 });

  const agregar = (e) => {
    e.preventDefault();
    if (!nueva.nombre || nueva.ancho <= 0 || nueva.alto <= 0 || nueva.cantidad <= 0) return;
    
    setPiezas([...piezas, { ...nueva, id: Date.now() }]);
    // Vaciamos el formulario para que sea rápido agregar la siguiente
    setNueva({ nombre: '', ancho: '', alto: '', cantidad: 1 }); 
  };

  const eliminar = (id) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Piezas a Cortar</h2>
      
      {/* Formulario de ingreso (se mantiene igual) */}
      <form onSubmit={agregar} className="grid grid-cols-2 gap-3 mb-4">
        <div className="col-span-2">
          <label className="block text-sm text-gray-600">Nombre (ej. Puerta de mueble)</label>
          <input type="text" value={nueva.nombre} onChange={e => setNueva({...nueva, nombre: e.target.value})} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Ancho (cm)</label>
          <input type="number" step="0.1" value={nueva.ancho} onChange={e => setNueva({...nueva, ancho: parseFloat(e.target.value) || ''})} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Alto (cm)</label>
          <input type="number" step="0.1" value={nueva.alto} onChange={e => setNueva({...nueva, alto: parseFloat(e.target.value) || ''})} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
        </div>
        <div className="col-span-2 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-600">Cantidad</label>
            <input type="number" value={nueva.cantidad} onChange={e => setNueva({...nueva, cantidad: parseInt(e.target.value) || 1})} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required min="1" />
          </div>
          <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-700 transition h-[42px]">
            Agregar
          </button>
        </div>
      </form>

      {/* NUEVA VISTA: Tabla compacta en lugar de tarjetas */}
      <div className="h-[200px] overflow-y-auto border border-gray-200 rounded-md">
        {piezas.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">No hay piezas ingresadas aún.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 sticky top-0 shadow-sm">
              <tr>
                <th className="px-3 py-2 font-semibold">Pieza</th>
                <th className="px-3 py-2 font-semibold text-center">Medidas</th>
                <th className="px-3 py-2 font-semibold text-center">Cant.</th>
                <th className="px-3 py-2 font-semibold text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {piezas.map(p => (
                <tr key={p.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-3 py-2 font-medium text-gray-800 truncate max-w-[120px]" title={p.nombre}>
                    {p.nombre}
                  </td>
                  <td className="px-3 py-2 text-center text-gray-600 text-xs">
                    {p.ancho} x {p.alto}
                  </td>
                  <td className="px-3 py-2 text-center font-semibold text-gray-700">
                    {p.cantidad}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button 
                      onClick={() => eliminar(p.id)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full w-6 h-6 flex items-center justify-center font-bold transition"
                      title="Borrar pieza"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GestorPiezas;