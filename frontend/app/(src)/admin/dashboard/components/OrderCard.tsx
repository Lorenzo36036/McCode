const OrderCard = ({
  id,
  client,
  items,
  total,
  btnText,
  btnColor,
}: {
  id: string;
  client: string;
  items: string;
  total: string;
  btnText: string;
  btnColor: string;
}) => (
  <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
        <span className="text-2xl font-black text-gray-800">#{id}</span>
      </div>
      <div>
        <h3 className="font-black italic uppercase text-gray-800 leading-none mb-1">
          {client}
        </h3>
        <p className="text-xs text-gray-400 font-medium">{items}</p>
      </div>
    </div>

    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
      <div className="text-right">
        <p className="text-[10px] font-black text-gray-300 uppercase leading-none">
          Total
        </p>
        <p className="text-xl font-black text-gray-800">${total}</p>
      </div>
      <button
        className={`${btnColor} text-white font-black py-3 px-6 rounded-2xl shadow-lg transition-all uppercase tracking-widest text-[10px] active:scale-95 min-w-35`}
      >
        {btnText}
      </button>
    </div>
  </div>
);

export default OrderCard;
