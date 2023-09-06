import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {
  getAppointmentForUser,
  getAppointmentsForBarberShop,
} from "services/appointment/get";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const barberShopId = searchParams.get("barberShopId");

    const appointments = await getAppointmentsForBarberShop(
      Number(barberShopId) ?? 0
    );

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
