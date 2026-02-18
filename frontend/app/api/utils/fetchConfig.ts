/* eslint-disable @typescript-eslint/no-explicit-any */
export const BASE_URL = "http://localhost:3000/api";

export const fetchConfig = async (endpoint: string, options?: RequestInit) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return Promise.reject({
        message: data.message || `Error: ${response.statusText}`,
        status: response.status,
      });
    }

    return data;
  } catch (error: any) {
    return Promise.reject({
      message: error.message || "Error de conexión con el servidor",
    });
  }
};
