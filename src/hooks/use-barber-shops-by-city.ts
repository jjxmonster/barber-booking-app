import { fetchBarberShopsByCity } from "data/barber-shop";
import { useQuery } from "@tanstack/react-query";

const useBarberShopsByCity = (city: string) => {
  return useQuery(
    ["barber-shops-by-city"],
    () => fetchBarberShopsByCity(city),
    {
      retry: 2,
    }
  );
};

export default useBarberShopsByCity;
