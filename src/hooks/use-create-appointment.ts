import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { createAppointmentRequest } from "data/appointment";
import { useToast } from "components/ui/use-toast";

const useCreateAppointment = (
  barberShopId: number,
  form: UseFormReturn<any>,
  clientEmail: string,
  serviceId: number
) => {
  const { toast } = useToast();

  return useMutation(
    async () =>
      createAppointmentRequest(barberShopId, clientEmail, serviceId, form),
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: `Appointment has been successfully scheduled`,
        });
        form.reset();
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
