export const fetchBarberShop = async (id: number) => {
  const response = await fetch(`/api/barber-shop?id=${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Barber Shop");
  }

  return await response.json();
};

export const fetchBarberShopsByCity = async (city: string) => {
  const response = await fetch(`/api/barber-shops?city=${city}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Barber Shops");
  }

  return await response.json();
};
