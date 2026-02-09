import { cookies } from "next/headers";
import ProductOfCar from "./ProductOfCar";

const OrderCar = () => {
  const getProductsCookies = async () => {
    const cookieStore = await cookies();
    const data = cookieStore.get("carrito")?.value;
    return data ? JSON.parse(decodeURIComponent(data)) : [];
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 w-full max-w-sm shadow-xl flex flex-col gap-4 border-gray-100 border">
      <div className="flex justify-between items-center">
        <h2 className="text-[11px] text-black font-black uppercase tracking-widest">
          Tu Selección
        </h2>
        <span className="bg-red-50 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold">
          1 platos
        </span>
      </div>

      <div className="overflow-y-auto h-20">
        <ProductOfCar />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Tu Nombre..."
          className="w-full border border-red-400 rounded-2xl py-4 px-5 text-sm outline-none focus:border-red-600 transition-all placeholder:text-gray-500 font-medium"
        />
      </div>

      <button className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-red-200 active:scale-[0.98]">
        Procesar pedido
      </button>
    </div>
  );
};

export default OrderCar;
