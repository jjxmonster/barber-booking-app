import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Loader2, UserPlus } from "lucide-react";
import React, { FunctionComponent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddEmployeeDialogProps {
  barberShopId: number;
}

const formSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
});

const AddEmployeeDialog: FunctionComponent<AddEmployeeDialogProps> = ({
  barberShopId,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading, error } = useMutation(
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
        console.log(err, "ERRRRR");
      },
    }
  );

  const onSubmit = async () => {
    mutate();
  };

  return (
    <div className="mt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new employee</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new employee to your business</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={"Barber Jack"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeDialog;
