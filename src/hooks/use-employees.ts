import { fetchEmployeesForBarberShop } from "data/employees";
import { useQuery } from "@tanstack/react-query";

const useEmployees = (barberShopId: number) => {
  return useQuery(
    ["employees"],
    () => fetchEmployeesForBarberShop(barberShopId),
    {
      retry: 2,
    }
  );
};

export default useEmployees;
