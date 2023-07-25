"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

import RegisterBusinessForm from "./register-business-form";
import RegisterClientForm from "./register-client-form";

const styles = {
  tabs_container: "flex items-center flex-col",
};

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="client" className={styles.tabs_container}>
      <TabsList>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
      </TabsList>
      <TabsContent value="client">
        <RegisterClientForm />
      </TabsContent>
      <TabsContent value="business">
        <RegisterBusinessForm />
      </TabsContent>
    </Tabs>
  );
};

export default RegisterTabs;