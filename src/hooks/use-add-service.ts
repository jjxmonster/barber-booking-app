import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { useToast } from "components/ui/use-toast";

const useAddService = (barberShopId: number, form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const res = await fetch(`/api/services`, {
        method: "POST",
        body: JSON.stringify({
          name: form.getValues("service"),
          price: form.getValues("price"),
          barberShopId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add service");
      }
      return await res.json();
    },
    {
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
      onError: err => {
        console.log(err, "ERRRRR");
      },
    }
  );
};

export default useAddService;
