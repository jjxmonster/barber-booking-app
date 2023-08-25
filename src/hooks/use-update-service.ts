import { useMutation, useQueryClient } from "@tanstack/react-query";

import { UseFormReturn } from "react-hook-form";
import { updateServiceRequest } from "data/servies";
import { useToast } from "components/ui/use-toast";

const useUpdateService = (form: UseFormReturn<any>) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async (service_id: number) => updateServiceRequest(service_id, form),
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
