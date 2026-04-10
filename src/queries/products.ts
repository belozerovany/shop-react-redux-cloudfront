import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct } from "~/models/Product";
import { useQuery, useQueryClient, useMutation } from "react-query";
import React from "react";
import { fetchJson, getAuthHeaders } from "~/utils/http";

export function useAvailableProducts() {
  return useQuery<AvailableProduct[], Error>("available-products", async () => {
    const res = await fetchJson<AvailableProduct[]>(
      `${API_PATHS.bff}/product/available`
    );
    return res;
  });
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries("available-products", { exact: true }),
    []
  );
}

export function useAvailableProduct(id?: string) {
  return useQuery<AvailableProduct, Error>(
    ["product", { id }],
    async () => {
      const res = await fetchJson<AvailableProduct>(
        `${API_PATHS.bff}/product/${id}`
      );
      return res;
    },
    { enabled: !!id }
  );
}

export function useRemoveProductCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) =>
      queryClient.removeQueries(["product", { id }], { exact: true }),
    []
  );
}

export function useUpsertAvailableProduct() {
  return useMutation(async (values: AvailableProduct) => {
    const res = await fetchJson<AvailableProduct>(`${API_PATHS.bff}/product`, {
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

export function useDeleteAvailableProduct() {
  return useMutation(async (id: string) => {
    const res = await fetchJson<void>(`${API_PATHS.bff}/product/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return res;
  });
}
