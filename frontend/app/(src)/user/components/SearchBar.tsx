"use client";

import { getShiftTicketId } from "@/app/api/get ";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export enum OrderStatus {
  PENDIENTE = "pendiente",
  PREPARANDO = "preparando",
  LISTO = "listo",
  RETIRADO = "retirado",
  CANCELADO = "cancelado",
}

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: ticket, refetch } = useQuery({
    queryKey: ["shift_Id"],
    queryFn: () => getShiftTicketId(search),
    enabled: false,
  });

  const ticketSearch = async () => {
    if (search.trim()) {
      const { data } = await refetch();

      if (data) {
        setIsModalOpen(true);
        setSearch("");
      }
    }
  };

  console.log(ticket);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group flex items-center">
        <span className="absolute left-6 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Busca por numero de ticket..."
          className="w-full bg-white border border-red-100 rounded-full py-5 pl-16 pr-20 shadow-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#e35151] transition-all"
        />

        <button
          disabled={search.trim().length === 0}
          onClick={() => ticketSearch()}
          className={`absolute right-2 p-3 rounded-full transition-all shadow-md flex items-center justify-center 
            ${
              search.trim().length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#e35151] hover:bg-red-600 text-white active:scale-95"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>

      {isModalOpen && ticket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm m-4 overflow-hidden animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Estado del Turno
                  </h2>
                  <p className="text-4xl font-black text-gray-900">
                    #{ticket.numeroTicket}
                  </p>
                </div>
                <div className="bg-red-50 text-[#e35151] p-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">Cliente</span>
                  <span className="text-gray-900 font-bold">
                    {ticket.nombreConsumidor}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">Estado</span>
                  <span
                    className={`font-bold px-4 py-2 rounded-xl transition-all ${
                      ticket.estado?.toLowerCase() === OrderStatus.PENDIENTE
                        ? "bg-gray-100 text-gray-500"
                        : ticket.estado?.toLowerCase() ===
                            OrderStatus.PREPARANDO
                          ? "bg-blue-100 text-blue-600 animate-pulse"
                          : ticket.estado?.toLowerCase() === OrderStatus.LISTO
                            ? "bg-green-100 text-green-600 shadow-md ring-1 ring-green-200"
                            : ticket.estado?.toLowerCase() ===
                                OrderStatus.RETIRADO
                              ? "bg-purple-100 text-purple-600 opacity-70"
                              : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {ticket.estado?.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black active:scale-95 transition-all"
              >
                Cerrar consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
