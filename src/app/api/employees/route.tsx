import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { getEmployeesForBusiness } from "services/employees/get";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("barber_shop_id");

    const employees = await getEmployeesForBusiness(Number(id));

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
