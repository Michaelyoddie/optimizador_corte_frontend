import React, { useState } from 'react';

const GestorPiezas = ({ piezas, setPiezas }) => {
  const [nueva, setNueva] = useState({ nombre: '', ancho: '', alto: '', cantidad: 1 });

  const agregar = (e) => {
    e.preventDefault();
    if (!nueva.nombre || nueva.ancho <= 0 || nueva.alto <= 0 || nueva.cantidad <= 0) return;
    
    setPiezas([...piezas, { ...nueva, id: Date.now() }]);
    setNueva({ nombre: '', ancho: '', alto: '', cantidad: 1 }); 
  };

  const eliminar = (id) => {
    setPiezas(piezas.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Piezas a Cortar</h2>
      
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

      {/* ESTA ES LA CLAVE: Altura bloqueada a 200px con scroll interno */}
      <div className="space-y-2 h-[200px] overflow-y-auto pr-2 border-t border-gray-100 pt-4">
        {piezas.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No hay piezas ingresadas aún.</p>
        ) : (
          piezas.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
              <div>
                <p className="font-medium text-sm text-gray-800">{p.nombre} <span className="text-gray-500 font-normal">(x{p.cantidad})</span></p>
                <p className="text-xs text-gray-500">{p.ancho} x {p.alto} cm</p>
              </div>
              <button onClick={() => eliminar(p.id)} className="text-red-500 hover:text-red-700 text-sm font-medium px-2">
                Borrar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GestorPiezas;