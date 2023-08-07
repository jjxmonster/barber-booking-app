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

interface AddServiceDialogProps {
  barberShopId: number;
}

const formSchema = z.object({
  service: z
    .string()
    .min(3, { message: "Service must be at least 3 characters." }),
  price: z.number().min(0, { message: "Price must be greater than zero." }),
});

const AddServiceDialog: FunctionComponent<AddServiceDialogProps> = ({
  barberShopId,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  //   const { mutate, isLoading, error } = useMutation(
  //     () =>
  //       fetch(`/api/employees`, {
  //         method: "POST",
  //         body: JSON.stringify({ name: form.getValues("name"), barberShopId }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }),
  //     {
  //       onSuccess: () => {
  //         toast({
  //           title: "Done!",
  //           description: `Employee ${form.getValues(
  //             "name"
  //           )} has been successfully added`,
  //         });
  //         form.setValue("name", "");
  //         queryClient.invalidateQueries(["employees"]);
  //       },
  //       onError: err => {
  //         console.log(err, "ERRRRR");
  //       },
  //     }
  //   );

  const onSubmit = async () => {
    // mutate();
  };
  return (
    <div className="mt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new service to your offer</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder={"Hair and beard"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder={"$$$"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button disabled={false} type="submit">
                  {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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

export default AddServiceDialog;
