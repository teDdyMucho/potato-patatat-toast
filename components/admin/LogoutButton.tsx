"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

/** Client logout control used inside server-rendered admin screens. */
export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-border py-3 text-[15px] font-dm font-semibold text-body transition-colors hover:bg-white/5"
    >
      <LogOut size={16} />
      Log out
    </button>
  );
}
