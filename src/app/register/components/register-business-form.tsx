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
import { businessRegistrationFormItems } from "lib/constants";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const styles = {
  form: "space-y-1 min-w-[400px] mt-5 flex flex-col gap-5",
};

const formSchema = z.object({
  business_name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters." })
    .email("This is not a valid email."),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const RegisterBusinessForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { business_name, address, email, password } = values;
    setIsLoading(true);
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        business_name,
        address,
        password,
        email,
        role: Role.SALON_OWNER,
      }),
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
      console.log(data);
    }
  };

  const renderItems = businessRegistrationFormItems.map(
    ({ key, label, placeholder }) => (
      <FormField
        key={key}
        control={form.control}
        name={key}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                autoComplete="off"
                type={key === "password" ? "password" : "text"}
                placeholder={placeholder}
                {...field}
              />
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={styles.form}
          autoComplete="off"
        >
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

export default RegisterBusinessForm;
