"use server";

import { cookies } from "next/headers";

export async function getCarActionCookies() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("carrito");

  if (!cookie) return [];

  try {
    return JSON.parse(decodeURIComponent(cookie.value));
  } catch (error) {
    console.error("Error al leer la cookie del carrito:", error);
    return [];
  }
}
