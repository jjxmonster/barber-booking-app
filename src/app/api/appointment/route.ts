import { AppointmentPayload, UserPayload } from "types/common";

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import createAppointment from "services/appointment/create";
import { getAppointmentForUser } from "services/appointment/get";

export async function POST(req: Request, _res: NextResponse) {
  try {
    const payload: AppointmentPayload = await req.json();
    const appointment = await createAppointment(payload);

    return NextResponse.json(
      { status: "created", appointment },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "not_created", error: error.message },
      { status: 400 }
    );
  }
}

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const email = searchParams.get("email");

    const appointment = await getAppointmentForUser(email ?? "");

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
