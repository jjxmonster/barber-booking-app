import React, { FunctionComponent } from "react";

import { Employee } from "@prisma/client";
import EmployeeCard from "./employee-card";
import LoadingIndicator from "components/shared/loading-indicator";
import QueryErrorComponent from "components/shared/query-error-component";
import useEmployees from "hooks/use-employees";

interface EmployeesProps {
  barberShopId: number;
}

const Employees: FunctionComponent<EmployeesProps> = ({ barberShopId }) => {
  const { data, isError, isLoading } = useEmployees(barberShopId);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <QueryErrorComponent />;
  }

  const { employees } = data || { employees: [] };

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

  return <div className="grid gap-6 grid-cols-4">{renderEmployees}</div>;
};

export default Employees;
