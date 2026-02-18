import { fetchConfig } from "./utils/fetchConfig";

export const getProducts = () => fetchConfig("/products");

export const getpurchaseOrder = () => fetchConfig(`/purchase-order`);

export const getShiftTickets = () => fetchConfig("/shifts");

export const getShiftTicketId = (numberTicket: string) => {
  return fetchConfig(`/shifts/${numberTicket}`);
};
