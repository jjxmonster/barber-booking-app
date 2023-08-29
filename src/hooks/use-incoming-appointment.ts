import { fetchAppointmentByEmail } from "data/appointment";
import { useQuery } from "@tanstack/react-query";

const useIncomingAppointment = (email: string) => {
  return useQuery(
    ["incoming-appointment"],
    () => fetchAppointmentByEmail(email),
    { retry: 2, refetchOnWindowFocus: false }
  );
};

export default useIncomingAppointment;
