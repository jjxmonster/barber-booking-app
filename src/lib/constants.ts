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

export const businessRegistrationFormItems: {
  key: "business_name" | "email" | "address" | "password";
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
    placeholder: "Sun St. 24, New York",
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
