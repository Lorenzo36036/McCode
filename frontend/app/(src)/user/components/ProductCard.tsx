/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { interactionButtonSaveCardCookie } from "../cookies/interactionButtonSaveCardCookie.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCarActionCookies } from "../cookies/getCarActionCookies";
import { PriceProducts } from "../interface/Products.js";

const ProductCard = ({
  id,
  name,
  price,
  image,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
}) => {
  const queryClient = useQueryClient();
  const { data: car = [] } = useQuery({
    queryKey: ["car"],
    queryFn: () => getCarActionCookies(),
  });

  const productInCar = car.find((p: PriceProducts) => p.name === name);
  const currentQuantity = productInCar ? productInCar.quantity : 0;

  const productAdd = async () => {
    const quantity = currentQuantity + 1;
    const priceTotal = price * quantity;
    try {
      await interactionButtonSaveCardCookie(
        name,
        price,
        priceTotal,
        quantity,
        id,
      );
      queryClient.invalidateQueries({ queryKey: ["car"] });
    } catch (e) {
      alert("Ocurrio un error al agregar el producto");
      console.log(e);
      return;
    }
  };

  return (
    <div className="h-85 bg-primary rounded-3xl shadow-lg overflow-hidden w-65 flex flex-col items-center pb-6 relative">
      <div className="relative w-full h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-three text-white text-xs font-bold px-3 py-1 rounded-full">
          ${price}
        </span>
      </div>

      <div className="mt-6 mb-8">
        <h3 className="text-second font-bold text-lg text-center">{name}</h3>
      </div>

      <button
        onClick={() => {
          productAdd();
        }}
        className="w-10 h-10 rounded-full border border-gray-100 shadow-sm flex items-center justify-center hover:scale-110 transition-transform bg-white"
      >
        <span className="text-three text-2xl font-light">+</span>
      </button>
    </div>
  );
};

export default ProductCard;
