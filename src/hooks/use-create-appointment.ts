import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { createAppointmentRequest } from "data/appointment";
import { createEmployeeRequest } from "data/employees";
import { useToast } from "components/ui/use-toast";

const useCreateAppointment = (
  barberShopId: number,
  form: UseFormReturn<any>,
  clientEmail: string,
  serviceId: number
) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async () =>
      createAppointmentRequest(barberShopId, clientEmail, serviceId, form),
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: `Appointment has been successfully scheduled`,
        });
        form.setValue("name", "");
        queryClient.invalidateQueries(["employees"]);
      },
      onError: (err: any) => {
        console.log(err);
        toast({
          title: "Ooops!",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      },
    }
  );
};

export default useCreateAppointment;
