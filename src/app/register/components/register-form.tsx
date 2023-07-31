import * as z from "zod";

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
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
import { Role } from "@prisma/client";
import { UserPayload } from "types/common";
import registerUser from "helpers/registerUser";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const styles = {
  form: "space-y-1 min-w-[400px] mt-5 flex flex-col gap-5",
};

interface RegisterFormProps {
  formItems: Array<{
    key: string;
    label: string;
    placeholder: string;
  }>;
  formSchema: z.ZodObject<any>;
  role: Role;
}

const RegisterForm = ({ formItems, formSchema, role }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    let payload: UserPayload = {
      email: "",
      password: "",
      role: role,
    };

    if (role === Role.CLIENT) {
      const { username: name, email, password } = values;

      payload = { ...payload, name, email, password };
    } else {
      const { business_name, address, email, password, city } = values;

      payload = { ...payload, business_name, address, email, password, city };
    }

    const response = await registerUser(payload);

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

  const renderItems = formItems.map(({ key, label, placeholder }) => (
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
  ));

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

export default RegisterForm;
