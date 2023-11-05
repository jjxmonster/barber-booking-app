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
import React from "react";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployee } from "app/actions";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const formSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters." }),
});

const AddEmployeeDialog = ({ barberShopId }: { barberShopId: number }) => {
  const formstatus = useFormStatus();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
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
            <form action={createEmployee} autoComplete="off">
              <input type="hidden" name="barberShopId" value={barberShopId} />
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
                <Button disabled={formstatus.pending} type="submit">
                  {formstatus.pending && (
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
