// app/actions.ts (o donde tengas tus cookies)
"use server";

import { cookies } from "next/headers";

export async function deleteCarActionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("carrito");
}
