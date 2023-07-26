"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import {
  businessFormSchema,
  businessRegistrationFormItems,
  clientFormSchema,
  clientRegistrationFormItems,
} from "lib/constants";

import RegisterForm from "./register-form";
import { Role } from "@prisma/client";

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="client" className="mt-5">
      <TabsList>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
      </TabsList>
      <TabsContent value="client">
        <RegisterForm
          role={Role.CLIENT}
          formItems={clientRegistrationFormItems}
          formSchema={clientFormSchema}
        />
      </TabsContent>
      <TabsContent value="business">
        <RegisterForm
          role={Role.SALON_OWNER}
          formItems={businessRegistrationFormItems}
          formSchema={businessFormSchema}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RegisterTabs;
