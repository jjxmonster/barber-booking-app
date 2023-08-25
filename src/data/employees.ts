import { UseFormReturn } from "react-hook-form";

export const fetchEmployeesForBarberShop = async (barberShopId: number) => {
  const response = await fetch(`/api/employees?id=${barberShopId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Employees");
  }

  return await response.json();
};

export const createEmployeeRequest = async (
  barberShopId: number,
  form: UseFormReturn
) => {
  const res = await fetch(`/api/employees`, {
    method: "POST",
    body: JSON.stringify({ name: form.getValues("name"), barberShopId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to add employee");
  }

  return await res.json();
};
