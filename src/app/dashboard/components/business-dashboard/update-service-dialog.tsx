"use client";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Edit } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import React, { FunctionComponent } from "react";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import updateService from "app/actions";
import SubmitButton from "components/shared/submit-button";

interface UpdateServiceDialogProps {
  serviceId: number;
  name: string;
  price: number;
}

const formSchema = z.object({
  service: z
    .string()
    .min(3, { message: "Service must be at least 3 characters." }),
  price: z.number().min(1, { message: "Price must be greater than zero." }),
});

const UpdateServiceDialog: FunctionComponent<UpdateServiceDialogProps> = ({
  serviceId,
  name,
  price,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price,
      service: name,
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Edit className="h-4 w-4 text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update service</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              action={updateService}
              autoComplete="off"
              className="flex flex-col gap-y-3"
            >
              <input type="hidden" name="id" value={serviceId} />
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
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          autoComplete="off"
                          placeholder={"$$$"}
                          onChange={event =>
                            form.setValue("price", Number(event.target.value))
                          }
                          value={field.value}
                          name={field.name}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <DialogFooter className="mt-5">
                <SubmitButton label="Update" />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateServiceDialog;
