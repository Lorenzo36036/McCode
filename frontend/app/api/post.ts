import { fetchConfig } from "./utils/fetchConfig";

export const createOrder = (orderData: unknown) => {
  return fetchConfig("/purchase-order", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};
