/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchConfig } from "./utils/fetchConfig";

export const updateState = ({
  id,
  token,
  ...orderData
}: {
  id: string;
  token: string;
  [key: string]: any;
}) => {
  return fetchConfig(
    `/purchase-order/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(orderData),
    },
    token,
  );
};
