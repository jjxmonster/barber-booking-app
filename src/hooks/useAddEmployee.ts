import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { useToast } from "components/ui/use-toast";

const useAddEmployee = (barberShopId: number, form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      fetch(`/api/employees`, {
        method: "POST",
        body: JSON.stringify({ name: form.getValues("name"), barberShopId }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
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
      onError: err => {
        // TODO: Handle error
        console.log(err, "ERRRRR");
      },
    }
  );
};

export default useAddEmployee;
