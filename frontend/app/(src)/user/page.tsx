"use client";

import { OrderCar, ProductCard, SearchBar, TurnMonitor } from "./components";
import { Utensils } from "lucide-react";
import { getProducts } from "@/app/api/get ";
import { useQuery } from "@tanstack/react-query";
import { Key } from "react";

function Page() {
  const productos = [
    {
      id: 1,
      nombre: "Mack Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
    {
      id: 2,
      nombre: "Amburger Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
    {
      id: 3,
      nombre: "Choco Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
    {
      id: 4,
      nombre: "Mack Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
    {
      id: 5,
      nombre: "Amburger Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
    {
      id: 6,
      nombre: "Choco Lorenzo",
      precio: 250,
      imagen: "/hamburguesa.jpg",
    },
  ];

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="min-h-screen bg-primary">
      <div className="bg-three p-4 text-white flex justify-between items-center font-bold italic">
        <div className="flex items-center gap-2">
          <div className="bg-white  rounded-xl flex items-center justify-center w-10 h-10 shadow-sm border border-gray-100">
            <Utensils className="text-red-700 w-5 h-5" />
          </div>
          <h1 className="text-2xl font-black italic tracking-tighter  leading-none">
            McLorenzo
          </h1>
        </div>
        <span className="bg-[#e35151] rounded-4xl p-3">KIOSKO DE PEDIDOS</span>
      </div>

      <h2 className="text-4xl py-8  mx-12  font-black italic tracking-tighter  leading-none grid">
        Nuestras especialidades
      </h2>
      <div className="w-full grid grid-cols-[1fr_400px] bg-primary p-4">
        <div className=" grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 justify-items-center  py-10 gap-10    ">
          {products.map(
            (producto: {
              id: Key | null | undefined;
              nombreProducto: string;
              precioUnitario: number;
              imagenUrl: string;
            }) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
                name={producto.nombreProducto}
                price={producto.precioUnitario}
                image={producto.imagenUrl}
              />
            ),
          )}
        </div>

        <div className="flex justify-center h-screen ">
          <div className="fixed grid grid-cols-1 justify-items-center gap-y-4 py-2">
            <OrderCar />
            <TurnMonitor />
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
