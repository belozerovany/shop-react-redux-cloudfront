import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { OrderStatus } from "~/constants/order";
import { Order } from "~/models/Order";
import { fetchJson, getAuthHeaders } from "~/utils/http";

export function useOrders() {
  return useQuery<Order[], Error>("orders", async () => {
    const res = await fetchJson<Order[]>(`${API_PATHS.order}/order`);
    return res;
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("orders", { exact: true }),
    []
  );
}

export function useUpdateOrderStatus() {
  return useMutation(
    async (values: { id: string; status: OrderStatus; comment: string }) => {
      const { id, ...data } = values;
      const res = await fetchJson<void>(
        `${API_PATHS.order}/order/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(data),
        }
      );
      return res;
    }
  );
}

export function useSubmitOrder() {
  return useMutation(async (values: Omit<Order, "id">) => {
    const res = await fetchJson<void>(`${API_PATHS.order}/order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(values),
    });
    return res;
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) =>
      queryClient.invalidateQueries(["order", { id }], { exact: true }),
    []
  );
}

export function useDeleteOrder() {
  return useMutation(async (id: string) => {
    const res = await fetchJson<void>(`${API_PATHS.order}/order/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res;
  });
}
