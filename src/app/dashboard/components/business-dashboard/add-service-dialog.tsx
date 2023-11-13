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
import { createService } from "app/actions";
import SubmitButton from "components/shared/submit-button";

interface AddServiceDialogProps {
  barberShopId: number;
}

const formSchema = z.object({
  service: z
    .string()
    .min(3, { message: "Service must be at least 3 characters." }),
  price: z.number().min(1, { message: "Price must be greater than zero." }),
});

const AddServiceDialog: FunctionComponent<AddServiceDialogProps> = ({
  barberShopId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 0,
    },
  });

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
              action={createService}
              autoComplete="off"
              className="flex flex-col gap-y-3"
            >
              <input type="hidden" name="barberShopId" value={barberShopId} />
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
                <SubmitButton label="Add" />
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddServiceDialog;
