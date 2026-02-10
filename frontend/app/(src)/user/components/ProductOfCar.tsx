"use client";
import React, { useState } from "react";
import { PriceProducts } from "../interface/Products";
import { interactionButtonSaveCardCookie } from "../cookies/interactionButtonSaveCardCookie.ts";
import { useQueryClient } from "@tanstack/react-query";

function ProductOfCar({
  name,
  priceUnit,
  priceTotal,
  quantity,
}: PriceProducts) {
  const queryClient = useQueryClient();

  const updateQuantityProduct = async (action: boolean) => {
    const newQuantity = action ? quantity + 1 : quantity - 1;
    priceTotal = priceUnit * newQuantity;

    try {
      await interactionButtonSaveCardCookie(
        name,
        priceUnit,
        priceTotal,
        newQuantity,
      );
      queryClient.invalidateQueries({ queryKey: ["car"] });
    } catch (e) {
      alert("Ocurrio un error al agregar el producto");
      console.log(e);
      return;
    }
  };
  return (
    <div className="px-1 flex justify-between items-center bg-gray-50/50  rounded-2xl">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-black text-gray-800">{name}</p>
        <p className="text-xs font-bold text-gray-400">{priceTotal}</p>
      </div>

      <div className=" flex items-center gap-3 bg-white border border-gray-100 rounded-full px-2 py-1 shadow-sm">
        <button
          onClick={() => {
            updateQuantityProduct(false);
          }}
          className="cursor-pointer w-4 h-4 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors font-bold text-xl"
        >
          −
        </button>

        <span className=" text-sm font-black text-gray-700 min-w-5 text-center">
          {quantity}
        </span>

        <button
          onClick={() => updateQuantityProduct(true)}
          className="cursor-pointer w-4 h-4 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-full transition-colors font-bold text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductOfCar;
