import * as z from "zod";

export const clientRegistrationFormItems: {
  key: "email" | "username" | "password";
  label: string;
  placeholder: string;
}[] = [
  {
    key: "username",
    label: "Username",
    placeholder: "John Doe",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "johndoe@example.com",
  },
  {
    key: "password",
    label: "Password",
    placeholder: "**********",
  },
];
export const loginFormItems: {
  key: "email" | "password";
  label: string;
  placeholder: string;
}[] = [
  {
    key: "email",
    label: "Email",
    placeholder: "johndoe@example.com",
  },
  {
    key: "password",
    label: "Password",
    placeholder: "**********",
  },
];

export const businessRegistrationFormItems: {
  key: "business_name" | "email" | "address" | "password" | "city";
  label: string;
  placeholder: string;
}[] = [
  {
    key: "business_name",
    label: "Business Name",
    placeholder: "Barber Shop",
  },
  {
    key: "address",
    label: "Address",
    placeholder: "Sunny St. 24",
  },
  {
    key: "city",
    label: "City",
    placeholder: "New York",
  },
  {
    key: "email",
    label: "Email",
    placeholder: "johndoe@example.com",
  },
  {
    key: "password",
    label: "Password",
    placeholder: "**********",
  },
];

export const clientFormSchema = z.object({
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

export const businessFormSchema = z.object({
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
  city: z.string().min(5, {
    message: "City must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const appointmentTimeItems = [
  {
    value: "8:00",
  },
  {
    value: "9:00",
  },
  {
    value: "10:00",
  },
  {
    value: "11:00",
  },
  {
    value: "12:00",
  },
  {
    value: "13:00",
  },
  {
    value: "14:00",
  },
  {
    value: "15:00",
  },
];
