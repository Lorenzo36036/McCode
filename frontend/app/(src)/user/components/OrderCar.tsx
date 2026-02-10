"use client";

import ProductOfCar from "./ProductOfCar";
import { getCarActionCookies } from "../cookies/getCarActionCookies";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PriceProducts } from "../interface/Products";
import { useState } from "react";
import { deleteCarActionCookies } from "../cookies/deleteCarActionCookies";

const OrderCar = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: car = [], isLoading } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCarActionCookies(),
  });

  const sendData = () => {
    alert(name);
  };

  const clearProducts = async () => {
    await deleteCarActionCookies();
    queryClient.invalidateQueries({ queryKey: ["car"] });
    setName("");
    return;
  };

  const totalPrice = car.reduce(
    (acc: number, product: { priceTotal: number }) => acc + product.priceTotal,
    0,
  );
  return (
    <div className="h-80 bg-white rounded-[2.5rem] p-6 w-full max-w-sm shadow-xl flex flex-col gap-4 border-gray-100 border">
      <div className="flex justify-between items-center">
        <h2 className="text-[11px] text-black font-black uppercase tracking-widest">
          Tu Selección
        </h2>
        {car.length > 0 && (
          <span
            onClick={() => clearProducts()}
            className="animate-pulse cursor-pointer text-gray-800 hover:text-red-500 text-[14px] transition-colors font-bold underline"
          >
            Borrar platos
          </span>
        )}
        <span className="bg-red-50 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold">
          {car.length} platos
        </span>
      </div>

      <div className="overflow-y-auto h-40">
        {isLoading ? (
          <span className="text-gray-400 text-xs block text-center py-4 italic">
            Cargando...
          </span>
        ) : car.length > 0 ? (
          car.map((product: PriceProducts) => (
            <ProductOfCar
              key={product.name}
              name={product.name}
              priceUnit={product.priceUnit}
              priceTotal={product.priceTotal}
              quantity={product.quantity}
            />
          ))
        ) : (
          <span className="text-gray-400 text-xs block text-center py-4">
            No has agregado nada al carrito
          </span>
        )}
      </div>

      {car.length > 0 && (
        <span className="flex justify-between items-center  border-t border-dashed border-gray-200">
          <span className="text-gray-600 font-bold text-xs">Total:</span>
          <span className="text-xs font-black text-red-600">${totalPrice}</span>
        </span>
      )}

      <div className="relative">
        <input
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Tu Nombre..."
          className="h-10 w-full border border-red-400 rounded-xl py-4 px-5 text-sm outline-none focus:border-red-600 transition-all placeholder:text-gray-500 font-medium"
        />
      </div>

      <button
        disabled={car.length === 0 || name.trim().length === 0}
        onClick={() => sendData()}
        className={`h-12 w-full py-4 rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg
    ${
      car.length === 0 || name.trim().length === 0
        ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
        : "bg-red-600 hover:bg-red-500 text-white shadow-red-200 active:scale-[0.98] font-black"
    }`}
      >
        Procesar pedido
      </button>
    </div>
  );
};

export default OrderCar;
