import React, { FunctionComponent } from "react";

import EmployeeCard from "./employee-card";
import { useQuery } from "@tanstack/react-query";

interface EmployeesProps {
  barberShopId: number;
}

const Employees: FunctionComponent<EmployeesProps> = ({ barberShopId }) => {
  const { data } = useQuery(["employees"], () =>
    fetch(`/api/employees?id=${barberShopId}`).then(res => res.json())
  );

  return (
    <div className="grid gap-6 grid-cols-4">
      <EmployeeCard
        name="Jake Paul"
        image="https://xsgames.co/randomusers/assets/avatars/male/76.jpg"
      />
    </div>
  );
};

export default Employees;
