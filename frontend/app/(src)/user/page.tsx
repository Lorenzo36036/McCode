/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { OrderCar, ProductCard, SearchBar, TurnMonitor } from "./components";
import { Utensils, Monitor, X } from "lucide-react";
import { getProducts } from "@/app/api/get ";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Page() {
  const [isMonitorOpen, setIsMonitorOpen] = useState<boolean>(false);

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="min-h-screen bg-primary pb-24 lg:pb-0">
      <div className="bg-three p-4 text-white flex justify-between items-center font-bold italic shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-xl flex items-center justify-center w-10 h-10 shadow-sm">
            <Utensils className="text-red-700 w-5 h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black italic tracking-tighter leading-none">
            McLorenzo
          </h1>
        </div>
        <span className="bg-[#e35151] rounded-full px-4 py-2 text-[10px] sm:text-sm">
          KIOSKO DE PEDIDOS
        </span>
      </div>

      <h2 className="text-center lg:text-left text-3xl sm:text-4xl py-8 px-6 lg:mx-12 font-black italic tracking-tighter leading-none">
        Nuestras especialidades
      </h2>

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center py-4">
          {products.map((producto: any) => (
            <ProductCard
              key={producto.id}
              id={producto.id}
              name={producto.nombreProducto}
              price={producto.precioUnitario}
              image={producto.imagenUrl}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <OrderCar />
          {!isMonitorOpen && (
            <button
              onClick={() => setIsMonitorOpen(true)}
              className="fixed bottom-24 right-6 lg:hidden flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-2xl z-40 border-2 border-white active:scale-95 transition-all"
            >
              <Monitor size={24} />
            </button>
          )}

          <div
            className={`
              ${isMonitorOpen ? "fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" : "hidden lg:flex"} 
              lg:relative lg:inset-auto lg:bg-transparent lg:flex-col lg:gap-4 w-full
            `}
            onClick={() => setIsMonitorOpen(false)}
          >
            <div
              className="relative w-full max-w-md bg-black/40 lg:bg-transparent rounded-[2.5rem] p-6 lg:p-0  lg:border-none shadow-2xl lg:shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              {isMonitorOpen && (
                <button
                  onClick={() => setIsMonitorOpen(false)}
                  className="absolute -top-3 -right-3 lg:hidden bg-gray-800 text-white rounded-full p-2 shadow-lg"
                >
                  <X size={20} />
                </button>
              )}
              <TurnMonitor />
              <div className="mt-4">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
