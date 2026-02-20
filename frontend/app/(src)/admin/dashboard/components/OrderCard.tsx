const OrderCard = ({
  id,
  client,
  items,
  total,
  btnText,
  btnColor,
  onAction,
  showBotonCancel,
  handleUpdateStatus,
}: {
  id: string;
  client: string;
  items: string;
  total: string;
  btnText: string;
  btnColor: string;
  showBotonCancel?: boolean;
  handleUpdateStatus?: () => void;
  onAction?: () => void;
}) => (
  <div className="bg-white rounded-4xl border border-gray-100 shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md group">
    <div className="p-5 flex items-center justify-between border-b border-gray-50 bg-gray-50/30">
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Ticket
        </span>
        <span className="text-xl font-black text-gray-800">#{id}</span>
      </div>
      <div className="text-right">
        <h3 className="font-black italic uppercase text-lg text-[#e35151] leading-none tracking-tight">
          {client}
        </h3>
      </div>
    </div>

    <div className="p-5 flex-1">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">
        Detalle del pedido
      </span>
      <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
        {items}
      </p>
    </div>

    <div className="p-5 bg-white border-t border-gray-100 flex flex-col gap-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-300 uppercase leading-none mb-1">
            Total a Pagar
          </span>
          <p className="text-2xl font-black text-gray-900 tracking-tighter">
            ${parseFloat(total).toFixed(2)}
          </p>
        </div>

        <div className="flex gap-4">
          {showBotonCancel && (
            <button
              onClick={handleUpdateStatus}
              disabled={!handleUpdateStatus}
              className={`bg-gray-800 hover:bg-gray-700 text-white font-black py-4 px-3 rounded-2xl shadow-lg transition-all uppercase tracking-widest text-[9px] active:scale-95 w-full md:w-auto`}
            >
              Cancelar
            </button>
          )}

          <button
            onClick={onAction}
            disabled={!onAction}
            className={`${btnColor} text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all uppercase tracking-widest text-[9px] active:scale-95 w-full md:w-auto`}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OrderCard;
