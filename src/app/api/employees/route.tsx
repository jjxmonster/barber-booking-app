import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import { createEmployee } from "services/employees/create";
import getEmployeesForBusiness from "services/employees/get";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    const employees = await getEmployeesForBusiness(Number(id));

    return NextResponse.json({ employees }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { name, barberShopId } = await req.json();
    const employee = await createEmployee(name);

    return NextResponse.json({ employee }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
