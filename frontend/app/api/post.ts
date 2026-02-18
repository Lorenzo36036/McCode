import { fetchConfig } from "./utils/fetchConfig";

export const createOrder = (orderData: unknown) => {
  return fetchConfig("/purchase-order", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

export const login = (send: { email: string; password: string }) => {
  return fetchConfig("/auth/login", {
    method: "POST",
    body: JSON.stringify(send),
  });
};
