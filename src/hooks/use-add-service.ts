import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { createServiceRequest } from "data/servies";
import { useToast } from "components/ui/use-toast";

const useAddService = (barberShopId: number, form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(async () => createServiceRequest(barberShopId, form), {
    onSuccess: () => {
      toast({
        title: "Done!",
        description: `New service "${form.getValues(
          "service"
        )}" has been successfully added`,
      });
      form.setValue("service", "");
      form.setValue("price", 0);

      queryClient.invalidateQueries(["services"]);
    },
    onError: () => {
      toast({
        title: "Ooops!",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    },
  });
};

export default useAddService;
