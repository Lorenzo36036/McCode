"use client";

import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  const ticketSearch = async () => {
    if (search.trim()) {
      alert("Enviado: " + search);
      // Opcional: limpiar la búsqueda tras enviar
      // setSearch("");
    }
  };

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
          placeholder="Busca por nombre o número..."
          className="w-full bg-white border border-red-100 rounded-full py-5 pl-16 pr-20 shadow-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#e35151] transition-all"
        />

        <button
          disabled={search.trim().length === 0}
          onClick={() => ticketSearch()}
          // Ajuste de lógica de colores aquí:
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
    </div>
  );
};

export default SearchBar;
