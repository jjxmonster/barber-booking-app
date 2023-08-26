import * as z from "zod";

import { CalendarIcon, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import React, { FunctionComponent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

import { Button } from "components/ui/button";
import { Calendar } from "components/ui/calendar";
import { DialogFooter } from "components/ui/dialog";
import { Employee } from "@prisma/client";
import { PopoverContent } from "components/ui/popover";
import { appointmentTimeItems } from "lib/constants";
import { cn } from "lib/utils";
import { format } from "date-fns";
import useCreateAppointment from "hooks/use-create-appointment";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  date: z.date({
    required_error: "A date of appointment is required",
  }),
  employee: z.string({
    required_error: "Staffer is required",
  }),
  time: z.string({
    required_error: "Appointment Time is required",
  }),
});

interface CreateAppointmentFormProps {
  employees: Array<Employee>;
  serviceId: number;
  barberShopId: number;
}

const CreateAppointmentForm: FunctionComponent<CreateAppointmentFormProps> = ({
  employees,
  serviceId,
  barberShopId,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const { data } = useSession();
  const { mutate, isLoading } = useCreateAppointment(
    barberShopId,
    form,
    data?.user.email as string,
    serviceId
  );

  const renderStafferSelectorItems = (employees ?? []).map(
    (employee: Employee) => (
      <SelectItem key={employee.id} value={String(employee.id)}>
        {employee.name}
      </SelectItem>
    )
  );

  const renderAppointmentTimeSelectorItems = appointmentTimeItems.map(
    ({ value }) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    )
  );

  const onSubmit = async () => {
    mutate();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-y-3"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of appointment</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left text-white font-normal"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date < new Date() ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staffer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Staffer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{renderStafferSelectorItems}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Appointment Time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {renderAppointmentTimeSelectorItems}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-5">
          <Button disabled={false} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Book
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateAppointmentForm;
