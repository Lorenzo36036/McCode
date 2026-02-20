/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getShiftTickets } from "@/app/api/get ";
import { useQuery } from "@tanstack/react-query";

export enum OrderStatus {
  PENDIENTE = "pendiente",
  PREPARANDO = "preparando",
  LISTO = "listo",
  RETIRADO = "retirado",
  CANCELADO = "cancelado",
}

const TurnMonitor = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getShiftTickets(),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  const onHold = tickets.filter(
    (ticket: any) => ticket.estado === OrderStatus.PENDIENTE,
  );
  const preparing = tickets.filter(
    (ticket: any) => ticket.estado === OrderStatus.PREPARANDO,
  );
  const ready = tickets.filter(
    (ticket: any) => ticket.estado === OrderStatus.LISTO,
  );

  const retored = tickets.filter(
    (ticket: any) => ticket.estado === OrderStatus.RETIRADO,
  );

  if (isLoading) {
    return (
      <div className="h-80 bg-second rounded-4xl p-6 w-full max-w-sm flex items-center justify-center">
        <span className="text-white animate-pulse">Cargando monitor...</span>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-68 bg-second rounded-4xl p-6 w-full max-w-sm shadow-2xl border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-xs font-bold tracking-widest uppercase opacity-80">
          Monitor de Turnos
        </h2>
        <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-md border border-green-500/30 flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          LIVE
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-4 border-b border-gray-800 pb-8 mb-6
         pr-2
          max-h-20
         overflow-y-auto
        [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-500/20
  [&::-webkit-scrollbar-thumb]:bg-gray-500
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-600
      "
      >
        <div className="text-center">
          <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase">
            Espera
          </p>
          <div className="space-y-2">
            {onHold.length > 0 ? (
              onHold.map((t: any) => (
                <p key={t.id} className="text-white text-xl font-bold">
                  #{t.numeroTicket}
                </p>
              ))
            ) : (
              <p className="text-gray-700 text-sm">-</p>
            )}
          </div>
        </div>

        <div className="text-center border-x border-gray-800 px-2">
          <p className="text-[10px] text-yellow-500 font-bold mb-4 uppercase">
            Cocina
          </p>
          <div className="space-y-2">
            {preparing.length > 0 ? (
              preparing.map((t: any) => (
                <p key={t.id} className="text-yellow-600 text-xl font-bold">
                  #{t.numeroTicket}
                </p>
              ))
            ) : (
              <p className="text-gray-700 text-sm">-</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-green-400 font-bold mb-4 uppercase">
            ¡Listo!
          </p>
          <div className="space-y-2">
            {ready.length > 0 ? (
              ready.map((t: any) => (
                <p
                  key={t.id}
                  className="text-green-500 text-xl font-bold drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                >
                  #{t.numeroTicket}
                </p>
              ))
            ) : (
              <p className="text-gray-700 text-sm">-</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-15 overflow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-500 text-xs">🕒</span>
          <p className="text-[10px] text-gray-500 font-bold uppercase">
            Entregas Recientes
          </p>
        </div>
        <div
          className="grid grid-cols-2 gap-3 
          pr-2
          max-h-15
         overflow-y-auto
        [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-500/20
  [&::-webkit-scrollbar-thumb]:bg-gray-500
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-gray-600"
        >
          {retored.length > 0 ? (
            retored.map((t: any) => (
              <div
                key={t.id}
                className="bg-gray-800/30 py-3 rounded-xl text-center text-gray-300 font-bold text-sm"
              >
                #{t.numeroTicket}
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-[10px] text-gray-700">
              Sin entregas recientes
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurnMonitor;
