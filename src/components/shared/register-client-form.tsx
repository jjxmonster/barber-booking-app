"use client";

import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle, FileWarning, Terminal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";

import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Loader2 } from "lucide-react";
import { Role } from "@prisma/client";
import { clientRegistrationFormItems } from "lib/constants";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterClientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username: name, email, password } = values;
    setIsLoading(true);
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password, email, role: Role.CLIENT }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsLoading(false);

      push("/login");
    } else {
      setIsLoading(false);
      const data = await response.json();
      if (data.error === "email_taken") {
        setErrorMessage("Email already taken, please try another one");
      } else {
        setErrorMessage("Something went wrong, please try again");
      }
    }
  };

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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
          <div>{renderItems}</div>
          <Button disabled={isLoading} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
      {errorMessage && (
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default RegisterClientForm;
