import { AppointmentPayload, UserPayload } from "types/common";

import { NextResponse } from "next/server";
import createAppointment from "services/appointment/create";

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
