/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface Props {
  name: string;
  priceUnit: number;
  priceTotal: number;
  quantity: number;
}

export async function interactionButtonSaveCardCookie(
  name: string,
  priceUnit: number,
  priceTotal: number,
  quantity: number,
): Promise<void> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("carrito");
  let car: Props[] = [];

  if (cookie?.value) {
    try {
      car = JSON.parse(cookie!.value);
    } catch (e: any) {
      console.error("Error al parsear carrito:", e);
      car = [];
    }
  }

  const index = car.findIndex((data) => data.name === name);

  if (index !== -1) {
    if (quantity <= 0) {
      car.splice(index, 1);
    } else {
      car[index].quantity = quantity;
      car[index].priceTotal = priceTotal;
    }
  } else if (quantity > 0) {
    car.push({
      name,
      quantity,
      priceUnit,
      priceTotal,
    });
  }

  cookieStore.set("carrito", JSON.stringify(car), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  revalidatePath("/user");
}
