import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "components/ui/use-toast";

const useDeleteService = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    async (service_id: number) => {
      const res = await fetch(`/api/services?id=${service_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete service");
      }
      return await res.json();
    },
    {
      onSuccess: () => {
        toast({
          title: "Done!",
          description: "Service deleted successfully.",
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

export default useDeleteService;
