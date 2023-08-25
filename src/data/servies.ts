import { UseFormReturn } from "react-hook-form";

export const createServiceRequest = async (
  barberShopId: number,
  form: UseFormReturn
) => {
  const { service, price } = form.getValues();
  const res = await fetch(`/api/services`, {
    method: "POST",
    body: JSON.stringify({
      name: service,
      price,
      barberShopId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to add service");
  }
  return await res.json();
};

export const updateServiceRequest = async (
  service_id: number,
  form: UseFormReturn
) => {
  const { service, price } = form.getValues();
  const res = await fetch(`/api/services?id=${service_id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: service,
      price,
      id: service_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to update service");
  }
  return await res.json();
};
