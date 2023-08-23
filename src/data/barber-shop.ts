export const fetchBarberShop = async (id: number) => {
  const response = await fetch(`/api/barber-shop?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Barber Shop");
  }

  return await response.json();
};
