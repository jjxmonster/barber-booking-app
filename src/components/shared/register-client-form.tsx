"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { clientRegistrationFormItems } from "lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const styles = {
  form: "space-y-1 min-w-[400px] mt-5 flex flex-col gap-5",
};

const formSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters." })
    .email("This is not a valid email."),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const RegisterClientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {};

  const renderItems = clientRegistrationFormItems.map(
    ({ key, label, placeholder }) => (
      <FormField
        key={key}
        control={form.control}
        name={key}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <div>{renderItems}</div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterClientForm;
