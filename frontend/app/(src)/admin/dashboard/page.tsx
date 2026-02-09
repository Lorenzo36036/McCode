import {
  Utensils,
  Clock,
  DollarSign,
  ChefHat,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import OrderCard from "./components/OrderCard";
import QuickStat from "./components/QuickStat";

const SimpleAdmin = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <nav className=" bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#e35151] p-1.5 rounded-lg opacity-0 lg:opacity-100">
            <Utensils className="text-white w-5 h-5" />
          </div>
          <span className="py-1 text-2xl font-black italic tracking-tighter text-[#e35151] uppercase">
            McLorenzo Admin
          </span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            En línea
          </span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <QuickStat
            label="Pendientes"
            value="5"
            color="text-amber-500"
            icon={<Clock size={16} />}
          />
          <QuickStat
            label="Listos"
            value="3"
            color="text-blue-500"
            icon={<ChefHat size={16} />}
          />
          <QuickStat
            label="Retirados"
            value="42"
            color="text-indigo-500"
            icon={<PackageCheck size={16} />}
          />
          <QuickStat
            label="Hoy"
            value="$450"
            color="text-emerald-500"
            icon={<DollarSign size={16} />}
          />
        </div>

        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-[#e35151]" /> Pedidos por
            Cobrar
          </h2>
          <OrderCard
            id="15"
            client="Lorenzo"
            items="2x Big McLorenzo, 1x Coca-Cola"
            total="25.00"
            btnText="Confirmar Pago"
            btnColor="bg-[#e35151] hover:bg-red-600 shadow-red-100"
          />
          <OrderCard
            id="16"
            client="Maria"
            items="1x Choco Lorenzo"
            total="12.00"
            btnText="Confirmar Pago"
            btnColor="bg-[#e35151] hover:bg-red-600 shadow-red-100"
          />
        </div>

        {/* --- SECCIÓN: COCINA --- */}
        <div className="space-y-4 mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <ChefHat size={16} className="text-amber-500" /> En Cocina
          </h2>
          <OrderCard
            id="12"
            client="Carlos"
            items="1x Mack Lorenzo"
            total="9.00"
            btnText="Marcar Listo"
            btnColor="bg-amber-500 hover:bg-amber-600 shadow-amber-100"
          />
          <OrderCard
            id="14"
            client="Ana"
            items="2x Choco Lorenzo"
            total="18.00"
            btnText="Marcar Listo"
            btnColor="bg-amber-500 hover:bg-amber-600 shadow-amber-100"
          />
        </div>

        {/* --- SECCIÓN: RETIROS --- */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <ShoppingBag size={16} className="text-emerald-500" /> Por Retirar
          </h2>
          <OrderCard
            id="09"
            client="Pedro"
            items="1x Big McLorenzo"
            total="12.50"
            btnText="Entregado"
            btnColor="bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"
          />
        </div>
      </main>
    </div>
  );
};

export default SimpleAdmin;
