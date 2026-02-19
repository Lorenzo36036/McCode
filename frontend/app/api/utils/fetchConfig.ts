/* eslint-disable @typescript-eslint/no-explicit-any */
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const fetchConfig = async (
  endpoint: string,
  options?: RequestInit,
  token?: string,
) => {
  try {
    const headers = new Headers(options?.headers);

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) return Promise.reject(data);
    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};
