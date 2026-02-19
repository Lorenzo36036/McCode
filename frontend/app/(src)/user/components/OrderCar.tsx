/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ProductOfCar from "./ProductOfCar";
import { getCarActionCookies } from "../cookies/getCarActionCookies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PriceProducts } from "../interface/Products";
import { useState } from "react";
import { deleteCarActionCookies } from "../cookies/deleteCarActionCookies";
import { createOrder } from "@/app/api/post";
import { ShoppingCart, X } from "lucide-react";

const OrderCar = () => {
  const [name, setName] = useState<string>("");
  const queryClient = useQueryClient();
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
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
    const orderPayload = {
      nombreConsumidor: name,
      numeroTicket: Date.now().toString().slice(-5),
      cantidad: car.reduce((acc: number, item: any) => acc + item.quantity, 0),
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
  };

  const totalPrice = car.reduce(
    (acc: number, product: any) => acc + product.priceTotal,
    0,
  );

  return (
    <div className="w-full">
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 lg:hidden flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl z-40 border-2 border-white active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            {car.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                {car.length}
              </span>
            )}
          </div>
        </button>
      )}

      <div
        className={`
          ${isMinimized ? "hidden lg:flex" : "fixed inset-0 z-120 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"} 
          lg:relative lg:inset-auto lg:flex lg:w-full lg:bg-transparent lg:p-0
        `}
        onClick={() => setIsMinimized(true)}
      >
        <div
          className="bg-white rounded-[2.5rem] p-6 w-full max-w-sm flex flex-col gap-4 border-gray-100 border shadow-2xl h-80 lg:shadow-xl lg:border-none"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-between   items-center">
            <h2 className="text-[11px] text-black font-black uppercase tracking-widest">
              Tu Selección
            </h2>
            <div className="flex  items-center">
              {car.length > 0 && (
                <span
                  onClick={clearProducts}
                  className="cursor-pointer text-gray-800 hover:text-red-500 text-[12px] transition-colors font-bold underline"
                >
                  Borrar platos
                </span>
              )}
            </div>
            <span className="bg-red-50 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold">
              {car.length} platos
            </span>
            {!isMinimized && (
              <button
                onClick={() => setIsMinimized(true)}
                className="lg:hidden p-1 bg-gray-100 rounded-full"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="overflow-y-auto h-40 pr-1">
            {isLoading ? (
              <span className="text-gray-400 text-xs block text-center py-4 italic">
                Cargando...
              </span>
            ) : car.length > 0 ? (
              car.map((product: PriceProducts) => (
                <ProductOfCar key={product.id} {...product} />
              ))
            ) : (
              <span className="text-gray-400 text-xs block text-center py-4 italic">
                No has agregado nada aún
              </span>
            )}
          </div>

          <div className="mt-auto space-y-3">
            {car.length > 0 && (
              <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-2">
                <span className="text-gray-600 font-bold text-xs uppercase">
                  Total:
                </span>
                <span className="text-sm font-black text-red-600">
                  ${totalPrice}
                </span>
              </div>
            )}
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Tu Nombre..."
              className="h-10 w-full border border-red-400 rounded-xl px-4 text-xs outline-none focus:border-red-600 transition-all font-medium"
            />
            <button
              disabled={
                car.length === 0 || name.trim().length === 0 || isPending
              }
              onClick={() => {
                setIsMinimized(true);
                sendData();
              }}
              className={`h-11 w-full rounded-xl transition-all uppercase tracking-widest text-[10px] font-black
                ${car.length === 0 || name.trim().length === 0 || isPending ? "bg-gray-200 text-gray-400" : "bg-red-600 text-white shadow-lg active:scale-95"}`}
            >
              {isPending ? "Enviando..." : "Procesar pedido"}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && lastOrder && (
        <div
          className="fixed inset-0 z-140 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity"
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
