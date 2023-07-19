"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

import RegisterClientForm from "./register-client-form";

const styles = {
  tabs_container: "flex items-center flex-col",
};

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="client" className={styles.tabs_container}>
      <TabsList>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="business">Barber Shop</TabsTrigger>
      </TabsList>
      <TabsContent value="client">
        <RegisterClientForm />
      </TabsContent>
      <TabsContent value="business">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default RegisterTabs;
