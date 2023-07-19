"use client";

import * as React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

const styles = {
  tabs_container: "w-[500px] flex items-center flex-col",
};

const RegisterTabs = () => {
  return (
    <Tabs defaultValue="client" className={styles.tabs_container}>
      <TabsList>
        <TabsTrigger value="client">Client</TabsTrigger>
        <TabsTrigger value="business">Barber Shop</TabsTrigger>
      </TabsList>
      <TabsContent value="client">
        <p className="text-white">CLIENT</p>
      </TabsContent>
      <TabsContent value="business">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default RegisterTabs;
