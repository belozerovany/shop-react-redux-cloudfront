import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { fetchJson, getAuthHeaders } from "~/utils/http";

export function useCart() {
  return useQuery<CartItem[], Error>("cart", async () => {
    const res = await fetchJson<CartItem[]>(`${API_PATHS.cart}/profile/cart`, {
      headers: getAuthHeaders(),
    });
    return res;
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>("cart");
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("cart", { exact: true }),
    []
  );
}

export function useUpsertCart() {
  return useMutation(async (values: CartItem) => {
    const res = await fetchJson<CartItem[]>(
      `${API_PATHS.cart}/profile/cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(values),
      }
    );
    return res;
  });
}
