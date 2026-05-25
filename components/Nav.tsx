"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Handshake,
  House,
  Menu,
  Newspaper,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const current = activeValue(pathname);

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
      className="fixed left-0 right-0 top-0 z-50 border-t border-white/10 bg-transparent"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6">
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
          <TabsList className="h-auto rounded-none border-b border-white/10 bg-transparent p-0">
            {links.map((link) => {
              const Icon = link.icon;

              return (
              <TabsTrigger
                key={link.value}
                value={link.value}
                asChild
                className="relative flex-col rounded-none px-5 py-2.5 text-xs font-medium text-white/45 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent hover:text-white/75 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:after:bg-white"
              >
                <Link href={link.href} className="flex flex-col items-center">
                  <Icon
                    className="mb-1.5 opacity-70"
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
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#0abfa3] hover:text-black sm:inline-flex"
          >
            Book Call
            <ArrowUpRight size={15} />
          </Link>
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
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-white px-3 py-2.5 text-center text-sm font-bold text-black"
            >
              Book Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
