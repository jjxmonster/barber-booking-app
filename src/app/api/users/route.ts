import { NextResponse } from "next/server";
import { UserPayload } from "types/common";
import createUser from "services/user/create";

export async function POST(req: Request, _res: NextResponse) {
  try {
    const payload: UserPayload = await req.json();
    const user = await createUser(payload);

    return NextResponse.json({ status: "created", user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "not_created", error: error.message },
      { status: 400 }
    );
  }
}
