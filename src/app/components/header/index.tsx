"use client";
import Link from "next/link";

import { SITE_TITLE } from "../../constants/global";
import { NAV_ITEMS } from "./header.constants";
import { cn } from "@/app/lib/tailwind";
import { useState } from "react";

export default function Header() {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  return (
    <header className="relative z-50 flex w-full items-center justify-between bg-[#18392b] px-8 py-5 text-white shadow-md">
      <Link
        href="/"
        className="cursor-pointer text-2xl font-bold tracking-wide"
      >
        {SITE_TITLE}
      </Link>
      <nav className="relative">
        <ul className="flex gap-8 text-lg font-medium">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.href ?? index} className="group relative">
              <Link
                href={item.href ?? ""}
                {...(item.subnav && {
                  onClick: () => setIsSubmenuOpen(!isSubmenuOpen),
                })}
                className="relative transition-colors duration-300 hover:text-[#f5eee6]"
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] w-0 bg-[#f5eee6] transition-all duration-300 group-hover:w-full",
                    {
                      "w-full": isSubmenuOpen && item.subnav,
                    },
                  )}
                  aria-hidden="true"
                />
              </Link>

              {/* Submenu */}
              {item.subnav && (
                <div
                  className={cn(
                    "pointer-events-none fixed top-18 left-0 z-50 w-full bg-[#18392bcc] py-4 text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100",
                    {
                      "pointer-events-auto opacity-100": isSubmenuOpen,
                    },
                  )}
                >
                  <div className="mx-auto flex max-w-screen-xl gap-6 px-8">
                    {item.subnav.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="hover:text-[#f5eee6]] px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:border-b"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
