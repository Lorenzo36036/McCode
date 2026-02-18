/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductOfCar from "./ProductOfCar";
import { getCarActionCookies } from "../cookies/getCarActionCookies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PriceProducts } from "../interface/Products";
import { useState } from "react";
import { deleteCarActionCookies } from "../cookies/deleteCarActionCookies";
import { createOrder } from "@/app/api/post";

const OrderCar = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const { data: car = [], isLoading } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCarActionCookies(),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      setLastOrder(data);
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      setIsModalOpen(true);
      clearProducts();
    },
    onError: (error) => {
      console.error("❌ Error al crear la orden:", error);
      alert("Hubo un error al procesar tu pedido.");
    },
  });

  const sendData = () => {
    const totalPagar = car.reduce(
      (acc: number, item: any) => acc + item.priceTotal,
      0,
    );
    const totalProductos = car.reduce(
      (acc: number, item: any) => acc + item.quantity,
      0,
    );
    const numeroTicket = Date.now().toString().slice(-5);
    const orderPayload = {
      nombreConsumidor: name,
      numeroTicket: numeroTicket,
      cantidad: totalProductos,
      precioTotal: totalPagar,
      estado: "pendiente",
      orderDetail: car.map((item: any) => ({
        nombreProducto: item.name,
        cantidad: item.quantity,
        precioUnitario: item.priceUnit,
        productId: item.id,
      })),
    };

    mutate(orderPayload);
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
    <div className="w-full">
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
                id={product.id}
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
            <span className="text-xs font-black text-red-600">
              ${totalPrice}
            </span>
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
          disabled={car.length === 0 || name.trim().length === 0 || isPending}
          onClick={() => sendData()}
          className={`h-12 w-full py-4 rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg
          ${
            car.length === 0 || name.trim().length === 0 || isPending
              ? "bg-gray-300 cursor-not-allowed text-gray-500 shadow-none"
              : "bg-red-600 hover:bg-red-500 text-white shadow-red-200 active:scale-[0.98] font-black"
          }`}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              Enviando...
            </span>
          ) : (
            "Procesar pedido"
          )}
        </button>
      </div>

      {isModalOpen && lastOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm m-4 overflow-hidden animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex  justify-center items-start mb-6">
                <div>
                  <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Tu número de ticket:
                  </h2>
                  <p className="text-center text-4xl font-black text-gray-900">
                    #{lastOrder.numeroTicket}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">Cliente</span>
                  <span className="text-gray-900 font-bold">
                    {lastOrder.order.nombreConsumidor}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                  <span className="text-gray-500 font-medium">
                    Total a Pagar
                  </span>
                  <span className="font-bold text-red-600">
                    ${lastOrder.order.precioTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black active:scale-95 transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCar;
