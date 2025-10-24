"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE_TITLE } from "../../constants/global";
import { LEFT_NAV_ITEMS, RIGHT_NAV_ITEMS } from "./header.constants";
import { cn } from "@/app/lib/tailwind";
import { useState, useEffect } from "react";
import { NavBar } from "./nav-bar";
import { MobileHeader } from "./mobile-header";
import { ScrollingBanner } from "../banner/scrolling-banner";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (window && window.scrollY > 50) {
      setIsScrolled(true);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Header */}
      <header
        className={cn(
          "z-50 hidden w-full transition-all duration-300 md:block",
          {
            "fixed top-0 right-0 left-0": isHomePage, // Add left-0 right-0 for proper width handling
            relative: !isHomePage,
          },
        )}
        style={isHomePage ? { width: "100vw" } : undefined} // Ensure full viewport width when fixed
      >
        <AnimatePresence>
          {isHomePage && !isScrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <ScrollingBanner
                bannerText="Gold price today: 12000/g | Silver price today: 150/g"
                classname={cn("py-1 text-sm text-white/80")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "grid w-full grid-cols-3 items-center px-12 py-5 text-white lg:px-20",
            {
              "border-b border-white/50 bg-[#18392b]/50":
                isHomePage && !isScrolled,
              "bg-[#18392b] shadow-md":
                (isHomePage && isScrolled) || !isHomePage,
            },
          )}
        >
          <NavBar
            navItems={LEFT_NAV_ITEMS}
            isSubmenuOpen={isSubmenuOpen}
            setIsSubmenuOpen={setIsSubmenuOpen}
            className="justify-start"
          />

          <Link
            href="/"
            className="cursor-pointer text-center text-3xl font-bold tracking-wide"
          >
            {SITE_TITLE}
          </Link>

          <NavBar
            navItems={RIGHT_NAV_ITEMS}
            isSubmenuOpen={isSubmenuOpen}
            setIsSubmenuOpen={setIsSubmenuOpen}
            className="justify-self-end"
          />
        </div>
      </header>
    </>
  );
};
