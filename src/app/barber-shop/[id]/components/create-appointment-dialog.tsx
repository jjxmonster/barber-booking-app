import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";
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
import useCreateAppointment from "hooks/use-create-appointment";
import { useForm } from "react-hook-form";
import useUpdateService from "hooks/use-update-service";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateAppointmentDialogProps {}

const formSchema = z.object({
  date: z.date({
    required_error: "A date of appointment is required",
  }),
});

const CreateAppointmentDialog: FunctionComponent<
  CreateAppointmentDialogProps
> = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  //   const { mutate, isLoading } = useCreateAppointment();

  const onSubmit = async () => {};
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book your appointment</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="flex flex-col gap-y-3"
            >
              <DialogFooter className="mt-5">
                <Button disabled={false} type="submit">
                  {false && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Book
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateAppointmentDialog;
