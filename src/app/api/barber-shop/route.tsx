import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getBarberShopByID } from "services/barber/get";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    const barber_shop = await getBarberShopByID(Number(id));

    return NextResponse.json({ barber_shop }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
