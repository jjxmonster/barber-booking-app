import { fetchServicesForBarberShop } from "data/servies";
import { useQuery } from "@tanstack/react-query";

const useServices = (barberShopId: number) => {
  return useQuery(
    ["services"],
    () => fetchServicesForBarberShop(barberShopId),
    { retry: 2, refetchOnWindowFocus: false }
  );
};

export default useServices;
