import { fetchConfig } from "./utils/fetchConfig";

export const getProducts = () => fetchConfig("/products");

// export const getOrderById = (id: string) => fetchConfig(`/orders/${id}`);
