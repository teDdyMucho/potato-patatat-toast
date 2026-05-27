"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  Handshake,
  House,
  LogOut,
  Menu,
  Newspaper,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";

const links = [
  { label: "Overview", href: "/", value: "home", icon: House },
  { label: "About", href: "/about", value: "about", icon: UserRound },
  {
    label: "Services",
    href: "/services",
    value: "services",
    icon: BriefcaseBusiness,
  },
  { label: "Partners", href: "/partners", value: "partners", icon: Handshake },
  { label: "AI Tools", href: "/ai-tools", value: "ai-tools", icon: Bot },
  { label: "Blog", href: "/blog", value: "blog", icon: Newspaper },
];

function activeValue(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/partners")) return "partners";
  if (pathname.startsWith("/ai-tools")) return "ai-tools";
  if (pathname.startsWith("/blog")) return "blog";
  return "";
}

export default function Nav() {
  const pathname = usePathname();
  const { user, ready, isAdmin, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const current = activeValue(pathname);

  // Close the user dropdown when clicking outside it.
  useEffect(() => {
    if (!userMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [userMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      if (current <= 10) {
        setVisible(true);
      } else if (current < lastScrollY.current - 4) {
        setVisible(true);
      } else if (current > lastScrollY.current + 8) {
        setVisible(false);
        setOpen(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0c]/90 shadow-[0_1px_0_0_rgba(255,255,255,0.02)] backdrop-blur-md"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav className="flex h-[72px] w-full items-center justify-between gap-8 pl-5 pr-4 sm:pl-8 sm:pr-6 lg:pl-12 lg:pr-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="AKT homepage"
        >
          <Image
            src="/image/akt_logo.png"
            alt="AKT logo"
            width={421}
            height={377}
            priority
            className="h-10 w-auto sm:h-11"
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-syne text-[15px] font-extrabold tracking-wide text-white">
              AKT
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Virtual Assistance Services
            </span>
          </span>
        </Link>

        <Tabs value={current} className="hidden md:block">
          <TabsList className="h-auto items-stretch gap-2 rounded-none bg-transparent p-0 lg:gap-5">
            {links.map((link) => {
              const Icon = link.icon;

              return (
              <TabsTrigger
                key={link.value}
                value={link.value}
                asChild
                className="group relative flex-col px-4 py-2.5 text-xs font-medium text-white/45 transition duration-200 after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-transparent hover:text-white hover:[text-shadow:0_0_12px_rgba(255,255,255,0.55)] data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:after:bg-[#0ABFA3] lg:px-5"
              >
                <Link href={link.href} className="flex flex-col items-center">
                  <Icon
                    className="mb-1.5 opacity-70 transition duration-200 group-hover:opacity-100 group-hover:drop-shadow-[0_0_7px_rgba(255,255,255,0.65)]"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          {ready && isAdmin && (
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 rounded-md border border-[#0ABFA3]/40 px-3.5 py-2.5 text-sm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10 sm:inline-flex"
            >
              <ShieldCheck size={15} />
              Admin
            </Link>
          )}
          {ready &&
            (user ? (
              <div ref={userMenuRef} className="relative hidden sm:block">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  className="flex items-center gap-2 rounded-md border border-white/15 px-3.5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  <UserRound size={15} className="text-white/55" />
                  {user.name.split(" ")[0]}
                  <ChevronDown
                    size={14}
                    className={`text-white/50 transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-lg border border-white/10 bg-[#141416] shadow-xl shadow-black/40"
                  >
                    <div className="border-b border-white/10 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                      <p className="truncate text-xs text-white/50">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <LogOut size={15} />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-md border border-white/15 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white sm:inline-flex"
              >
                Log in
              </Link>
            ))}
          <button
            className="rounded-md border border-white/15 p-2 text-white/70 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#1f1f22] px-5 py-4 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <Link
                key={link.value}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  current === link.value
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {ready && isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-[#0ABFA3] transition-colors hover:bg-[#0ABFA3]/10"
              >
                <ShieldCheck size={15} />
                Admin
              </Link>
            )}
            {ready &&
              (user ? (
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Log out ({user.name.split(" ")[0]})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Log in
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}
