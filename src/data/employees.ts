export const fetchEmployeesForBarberShop = async (barberShopId: number) => {
  const response = await fetch(`/api/employees?id=${barberShopId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Employees");
  }

  return await response.json();
};
