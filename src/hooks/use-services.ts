import { useQuery } from "@tanstack/react-query";

const useServices = (barberShopId: number) => {
  const { data } = useQuery(["services"], () =>
    fetch(`/api/services?id=${barberShopId}`).then(res => res.json())
  );

  const { services } = data || { services: [] };

  return services;
};

export default useServices;
