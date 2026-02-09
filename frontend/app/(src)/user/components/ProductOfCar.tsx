import React from "react";

function ProductOfCar() {
  return (
    <div className="px-1 flex justify-between items-center bg-gray-50/50  rounded-2xl">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-black text-gray-800">Big McLorenzo</p>
        <p className="text-xs font-bold text-gray-400">$85.00</p>
      </div>

      <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-full px-2 py-1 shadow-sm">
        <button className="w-4 h-4 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors font-bold text-xl">
          −
        </button>

        <span className="text-sm font-black text-gray-700 min-w-5 text-center">
          10
        </span>

        <button className="w-4 h-4 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors font-bold text-xl">
          +
        </button>
      </div>
    </div>
  );
}

export default ProductOfCar;
