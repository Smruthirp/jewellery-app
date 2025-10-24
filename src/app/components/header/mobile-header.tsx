"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/app/lib/tailwind";
import { SITE_TITLE } from "../../constants/global";
import { LEFT_NAV_ITEMS, RIGHT_NAV_ITEMS } from "./header.constants";
import { ScrollingBanner } from "../banner/scrolling-banner";
import { motion } from "framer-motion";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  subnav?: NavSubItem[];
}

export const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const allNavItems: NavItem[] = [...LEFT_NAV_ITEMS, ...RIGHT_NAV_ITEMS];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedSubmenu(null);
  }, [pathname]);

  const toggleSubmenu = (label: string) => {
    setExpandedSubmenu(expandedSubmenu === label ? null : label);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setExpandedSubmenu(null);
  };

  return (
    <>
      <header
        className={cn("z-50 w-full transition-all duration-300 md:hidden", {
          "fixed top-0": isHomePage,
          relative: !isHomePage,
        })}
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isMenuOpen ? 0 : 1 }}
        >
          {isHomePage && !isScrolled && (
            <ScrollingBanner
              bannerText="Gold price today: 12000/g | Silver price today: 150/g"
              classname="py-1 text-sm text-white/80"
            />
          )}
        </motion.div>

        <div
          className={cn("flex w-full items-center justify-between px-6 py-4", {
            "bg-white text-[#18392b] shadow-md": isMenuOpen,
            "border-b border-white/50 bg-[#18392b]/50 text-white":
              isHomePage && !isScrolled && !isMenuOpen,
            "bg-[#18392b] text-white shadow-md":
              (isHomePage && isScrolled && !isMenuOpen) ||
              (!isHomePage && !isMenuOpen),
          })}
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
            onClick={handleNavClick}
          >
            {SITE_TITLE}
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
              {
                "hover:bg-[#18392b]/10": isMenuOpen,
                "hover:bg-white/20": !isMenuOpen,
              },
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "z-50 w-full transform bg-white transition-all duration-300 ease-in-out md:hidden",
          {
            "h-fit opacity-100": isMenuOpen,
            "h-0 overflow-hidden opacity-0": !isMenuOpen,
          },
          isHomePage ? "fixed top-28" : "relative", // Position relative to header (banner + nav)
        )}
      >
        {/* Navigation Items */}
        <nav className="h-full overflow-y-auto px-6 py-4">
          <ul className="space-y-2">
            {allNavItems.map((item, index) => (
              <li key={item.href ?? index}>
                {item.subnav ? (
                  // Item with submenu
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-[#18392b] transition-colors duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <span className="font-medium">{item.label}</span>
                      {expandedSubmenu === item.label ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    {/* Submenu */}
                    {expandedSubmenu === item.label && (
                      <ul className="mt-1 ml-4 space-y-1 border-l-2 border-[#18392b]/20 pl-4">
                        {item.subnav.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={handleNavClick}
                              className="block rounded-md px-3 py-2 text-sm text-[#18392b]/80 transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-[#18392b]"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular navigation item
                  <Link
                    href={item.href ?? ""}
                    onClick={handleNavClick}
                    className="block rounded-md px-3 py-3 font-medium text-[#18392b] transition-colors hover:bg-gray-100"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
