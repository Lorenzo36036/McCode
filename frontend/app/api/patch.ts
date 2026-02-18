/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchConfig } from "./utils/fetchConfig";

export const updateState = ({
  id,
  ...orderData
}: {
  id: string;
  [estado: string]: any;
}) => {
  return fetchConfig(`/purchase-order/${id}`, {
    method: "PATCH",
    body: JSON.stringify(orderData),
  });
};
