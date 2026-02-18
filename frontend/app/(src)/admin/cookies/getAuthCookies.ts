import { cookies } from "next/headers";

export async function getAuthCookies() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value || null;
  const userRaw = cookieStore.get("user")?.value || null;

  const user = userRaw ? JSON.parse(userRaw) : null;

  if (!token && !userRaw) return null;

  return { token, user };
}
