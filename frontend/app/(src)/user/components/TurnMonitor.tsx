const TurnMonitor = () => {
  return (
    <div className=" h-80 bg-second rounded-4xl p-6 w-full max-w-sm shadow-2xl border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xs font-bold tracking-widest uppercase opacity-80">
          Monitor de Turnos
        </h2>
        <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-md border border-green-500/30 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 border-b border-gray-800 pb-8 mb-6">
        <div className="text-center">
          <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase">
            Espera
          </p>
          <p className="text-white text-xl font-bold">#15</p>
        </div>

        <div className="text-center border-x border-gray-800 px-2">
          <p className="text-[10px] text-yellow-500 font-bold mb-4 uppercase">
            Cocina
          </p>
          <div className="space-y-2">
            <p className="text-yellow-600 text-xl font-bold">#12</p>
            <p className="text-yellow-600 text-xl font-bold">#14</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-green-400 font-bold mb-4 uppercase">
            ¡Listo!
          </p>
          <div className="space-y-2">
            <p className="text-green-500 text-xl font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
              #9
            </p>
            <p className="text-green-500 text-xl font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
              #10
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 text-xs">🕒</span>
          <p className="text-[10px] text-gray-500 font-bold uppercase">
            Entregas Recientes
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800/30 py-3 rounded-xl text-center text-gray-600 font-bold text-sm">
            #8
          </div>
          <div className="bg-gray-800/30 py-3 rounded-xl text-center text-gray-600 font-bold text-sm">
            #7
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurnMonitor;
