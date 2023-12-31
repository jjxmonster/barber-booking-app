"use client";
import React, { FunctionComponent } from "react";

import { Employee } from "@prisma/client";
import EmployeeCard from "./employee-card";

import { getBarberShopByID } from "services/barber/get";
import { useQuery } from "@tanstack/react-query";

interface EmployeesProps {
  barberShopId: number;
}

const Employees: FunctionComponent<EmployeesProps> = ({ barberShopId }) => {
  const { data } = useQuery(["barberShop", barberShopId], () =>
    getBarberShopByID(barberShopId)
  );

  const { employees } = data ?? { employees: [] };

  if (!employees.length) {
    return (
      <div className="w-full h-20 text-gray-400 flex items-center justify-center">
        <span>No employees yet, add your first now!</span>
      </div>
    );
  }

  const renderEmployees = employees.map(({ avatarUrl, id, name }: Employee) => (
    <EmployeeCard key={id} image={avatarUrl} name={name} />
  ));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {renderEmployees}
    </div>
  );
};

export default Employees;
