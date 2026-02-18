/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Clock,
  DollarSign,
  ChefHat,
  PackageCheck,
  ShoppingBag,
} from "lucide-react";
import OrderCard from "./components/OrderCard";
import QuickStat from "./components/QuickStat";
import { getpurchaseOrder } from "@/app/api/get ";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateState } from "@/app/api/patch";

enum OrderStatus {
  PENDIENTE = "pendiente",
  PREPARANDO = "preparando",
  LISTO = "listo",
  RETIRADO = "retirado",
  CANCELADO = "cancelado",
}

const SimpleAdmin = () => {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getpurchaseOrder,
    refetchInterval: 1500,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });

  const formatItems = (details: any[]) => {
    return details
      .map((item) => `${item.cantidad}x ${item.nombreProducto}`)
      .join(", ");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateState,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["tickets"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);
      alert(`¡Actualizado!`);
    },
    onError: (error) => {
      console.error("❌ Error al cambiar el estado:", error);
      alert("Hubo un error al procesar el cambio de estado.");
    },
  });

  const pedidosPendientes = products.filter(
    (p: any) => p.estado === OrderStatus.PENDIENTE,
  );
  const pedidosEnCocina = products.filter(
    (p: any) => p.estado === OrderStatus.PREPARANDO,
  );
  const pedidosListos = products.filter(
    (p: any) => p.estado === OrderStatus.LISTO,
  );
  const pedidosRetirados = products.filter(
    (p: any) => p.estado === OrderStatus.RETIRADO,
  );

  const nextStatusMap: Record<OrderStatus, OrderStatus> = {
    [OrderStatus.PENDIENTE]: OrderStatus.PREPARANDO,
    [OrderStatus.PREPARANDO]: OrderStatus.LISTO,
    [OrderStatus.LISTO]: OrderStatus.RETIRADO,
    [OrderStatus.RETIRADO]: OrderStatus.RETIRADO,
    [OrderStatus.CANCELADO]: OrderStatus.CANCELADO,
  };

  const handleChangeState = (id: string, currentStatus: OrderStatus) => {
    const nextStatus = nextStatusMap[currentStatus];

    if (
      nextStatus === currentStatus &&
      currentStatus === OrderStatus.RETIRADO
    ) {
      return;
    }

    mutate({ id, estado: nextStatus });
  };

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    mutate({ id, estado: newStatus });
  };

  const handleNextStep = (id: string, currentStatus: OrderStatus) => {
    const nextStatus = nextStatusMap[currentStatus];
    if (nextStatus !== currentStatus) {
      handleUpdateStatus(id, nextStatus);
    }
  };

  const ventasHoy = products
    .filter(
      (p: any) =>
        p.estado !== OrderStatus.PENDIENTE &&
        p.estado !== OrderStatus.CANCELADO,
    )
    .reduce((acc: number, curr: any) => acc + parseFloat(curr.precioTotal), 0);

  if (isLoading)
    return <div className="p-10 text-center">Cargando pedidos...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      <main className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <QuickStat
            label="Pendientes"
            value={pedidosPendientes.length.toString()}
            color="text-amber-500"
            icon={<Clock size={16} />}
          />
          <QuickStat
            label="En Cocina"
            value={pedidosEnCocina.length.toString()}
            color="text-blue-500"
            icon={<ChefHat size={16} />}
          />
          <QuickStat
            label="Listos"
            value={pedidosListos.length.toString()}
            color="text-emerald-500"
            icon={<ShoppingBag size={16} />}
          />
          <QuickStat
            label="Ventas Hoy"
            value={`$${ventasHoy.toFixed(2)}`}
            color="text-emerald-600"
            icon={<DollarSign size={16} />}
          />
        </div>

        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <DollarSign size={16} className="text-[#e35151]" /> Pedidos por
            Cobrar
          </h2>
          <div className="space-y-4 max-h-120 overflow-y-auto ">
            <div className="space-y-4 max-h-72">
              {pedidosPendientes.map((order: any) => (
                <div key={order.id} className="relative group">
                  <OrderCard
                    id={order.numeroTicket.toString()}
                    client={order.nombreConsumidor}
                    items={formatItems(order.orderDetail)}
                    total={order.precioTotal}
                    btnText="Confirmar Pago"
                    btnColor="bg-[#e35151] hover:bg-red-600 shadow-red-100"
                    onAction={() =>
                      handleNextStep(order.id, OrderStatus.PENDIENTE)
                    }
                    handleUpdateStatus={() =>
                      handleUpdateStatus(order.id, OrderStatus.CANCELADO)
                    }
                    showBotonCancel={true}
                  />
                </div>
              ))}
            </div>
            {pedidosPendientes.length === 0 && (
              <p className="text-red-400 font-bold  italic text-sm">
                No hay nada por cobrar
              </p>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <ChefHat size={16} className="text-amber-500" /> En Cocina
          </h2>
          <div className="space-y-4 max-h-120 overflow-y-auto ">
            {pedidosEnCocina.map((order: any) => (
              <OrderCard
                key={order.id}
                id={order.numeroTicket.toString()}
                client={order.nombreConsumidor}
                items={formatItems(order.orderDetail)}
                total={order.precioTotal}
                btnText="Marcar Listo"
                btnColor="bg-amber-500 hover:bg-amber-600 shadow-amber-100"
                onAction={() =>
                  handleChangeState(order.id, OrderStatus.PREPARANDO)
                }
              />
            ))}
            {pedidosEnCocina.length === 0 && (
              <p className="text-yellow-400 italic font-bold  text-sm">
                No hay nada en cocina todavia
              </p>
            )}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <ShoppingBag size={16} className="text-blue-500" /> Por retirar
          </h2>
          <div className="space-y-4 max-h-120 overflow-y-auto">
            {pedidosListos.map((order: any) => (
              <OrderCard
                key={order.id}
                id={order.numeroTicket.toString()}
                client={order.nombreConsumidor}
                items={formatItems(order.orderDetail)}
                total={order.precioTotal}
                btnText="Entregar"
                btnColor="bg-blue-500 hover:bg-blue-600 shadow-blue-100"
                onAction={() => handleChangeState(order.id, OrderStatus.LISTO)}
              />
            ))}

            {pedidosListos.length === 0 && (
              <p className="text-blue-400  font-bold italic text-sm">
                No hay pedidos Listos todavia
              </p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
            <PackageCheck size={16} className="text-emerald-500" /> Retirados
            recientemente
          </h2>
          <div className="space-y-4 opacity-70 max-h-120 overflow-y-auto ">
            {pedidosRetirados.map((order: any) => (
              <OrderCard
                key={order.id}
                id={order.numeroTicket.toString()}
                client={order.nombreConsumidor}
                items={formatItems(order.orderDetail)}
                total={order.precioTotal}
                btnText="Finalizado"
                btnColor="bg-gray-400 cursor-default"
              />
            ))}
            {pedidosRetirados.length === 0 && (
              <p className="text-green-400 italic text-sm font-bold ">
                No hay pedidos Retirados
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SimpleAdmin;
