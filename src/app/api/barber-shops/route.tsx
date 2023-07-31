import { getBarberShops, getBarberShopsByCity } from "services/barber/get";

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const city = searchParams.get("city");
    let barber_shops;

    if (city) {
      barber_shops = await getBarberShopsByCity(city as string);
    } else {
      barber_shops = await getBarberShops();
    }

    return NextResponse.json({ barber_shops }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
