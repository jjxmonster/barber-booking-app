import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { useToast } from "components/ui/use-toast";

const useAddEmployee = (barberShopId: number, form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const res = await fetch(`/api/employees`, {
        method: "POST",
        body: JSON.stringify({ name: form.getValues("name"), barberShopId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add employee");
      }

      return await res.json();
    },
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: `Employee ${form.getValues(
            "name"
          )} has been successfully added`,
        });
        form.setValue("name", "");
        queryClient.invalidateQueries(["employees"]);
      },
      onError: () => {
        toast({
          title: "Ooops!",
          description: "Something went wrong, please try again",
          variant: "destructive",
        });
      },
    }
  );
};

export default useAddEmployee;
