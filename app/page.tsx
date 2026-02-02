import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

export default async function Home() {
  const user = await getSession();
  if (user) redirect(ROUTES.dashboard);
  redirect(ROUTES.login);
}
