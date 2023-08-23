import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { useToast } from "components/ui/use-toast";

const useUpdateService = (form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async (service_id: number) => {
      const res = await fetch(`/api/services?id=${service_id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.getValues("service"),
          price: form.getValues("price"),
          id: service_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to update service");
      }
      return await res.json();
    },
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: "Service updated successfully.",
        });

        queryClient.invalidateQueries(["services"]);
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

export default useUpdateService;
