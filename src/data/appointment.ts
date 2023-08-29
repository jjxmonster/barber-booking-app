import { UseFormReturn } from "react-hook-form";

export const createAppointmentRequest = async (
  barberShopId: number,
  clientEmail: string,
  serviceId: number,
  form: UseFormReturn
) => {
  const { date, employee, time } = form.getValues();

  const res = await fetch(`/api/appointment`, {
    method: "POST",
    body: JSON.stringify({
      date,
      employeeId: employee,
      appointmentTime: time,
      serviceId,
      barberShopId,
      clientEmail,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create an appointment");
  }

  return await res.json();
};

export const fetchAppointmentByEmail = async (email: string) => {
  const response = await fetch(`/api/appointment?email=${email}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};
