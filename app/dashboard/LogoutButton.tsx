"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(ROUTES.login);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-sm text-gray-500 hover:text-gray-700"
    >
      Salir
    </button>
  );
}
