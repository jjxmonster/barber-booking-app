import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  session ? redirect("/dashboard") : redirect("/login");
}
