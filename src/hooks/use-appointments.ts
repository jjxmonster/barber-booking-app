import { fetchAppointmentsByBarberShopId } from "data/appointment";
import { useQuery } from "@tanstack/react-query";

const useAppointments = (barberShopId: number) => {
  return useQuery(
    ["business-appointments"],
    () => fetchAppointmentsByBarberShopId(barberShopId),
    { retry: 2, refetchOnWindowFocus: false }
  );
};

export default useAppointments;
