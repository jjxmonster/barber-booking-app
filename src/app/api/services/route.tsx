import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";
import createService from "services/services/create";
import deleteService from "services/services/delete";
import getServicesForBusiness from "services/services/get";
import updateService from "services/services/update";

export async function GET(req: NextApiRequest, _res: Response) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    const services = await getServicesForBusiness(Number(id));

    return NextResponse.json({ services }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, _res: NextApiResponse) {
  try {
    const url = new URL(req.url as string);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get("id");

    const deleted_service = await deleteService(Number(id));

    return NextResponse.json({ deleted_service }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request, _res: NextApiResponse) {
  try {
    const { id, name, price } = await req.json();
    const updated_service = await updateService(id, name, price);

    return NextResponse.json({ updated_service }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { name, price, barberShopId } = await req.json();
    const service = await createService(name, price, barberShopId);

    return NextResponse.json({ service }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
