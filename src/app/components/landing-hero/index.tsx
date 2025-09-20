"use client";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/app/ui/button";
import { DESCRIPTION, QUOTE, SUBTITLE } from "./landing-hero.constants";
import { motion } from "framer-motion";

export const LandingHero = ({
  subItems,
  images,
}: {
  images: string[];
  subItems?: {
    label: string;
    href: string;
  }[];
}) => {
  return (
    <section className="flex min-w-screen flex-col items-center justify-between gap-8 rounded-xl bg-[#f5eee6] shadow-lg md:flex-row md:gap-0">
      <div className="flex flex-1 flex-col items-start justify-center p-20">
        <blockquote className="mb-4 text-2xl font-semibold text-[#a67c52] italic md:text-3xl">
          {QUOTE}
        </blockquote>
        <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
          {SUBTITLE}
        </h2>
        <p className="mb-6 text-lg text-gray-700 md:text-xl">{DESCRIPTION}</p>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          {subItems?.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button size={"lg"}>{item.label}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className="relative flex min-h-[220px] min-w-[220px] flex-1 items-center justify-center overflow-hidden md:min-h-[620px] md:min-w-[620px]">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="absolute right-[-120px] bottom-[-120px] z-10 h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-[#e2d3c0] bg-[#f5eee6] shadow-md md:h-[600px] md:w-[600px] xl:h-[700px] xl:w-[700px]"
        >
          {/* <div className="absolute right-[-120px] bottom-[-120px] z-10 h-[200px] w-[200px] overflow-hidden rounded-full border-4 border-[#e2d3c0] bg-[#f5eee6] shadow-md md:h-[600px] md:w-[600px] xl:h-[700px] xl:w-[700px]"> */}
          <Image
            src={images[0] || "/images/hero-image.jpg"}
            alt="Jewellery Hero Big"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="scale-110"
            priority
          />
          {/* </div> */}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="absolute z-20 h-[140px] w-[140px] overflow-hidden rounded-full border-4 border-[#e2d3c0] bg-[#f5eee6] shadow-lg md:right-85 md:bottom-60 md:h-[190px] md:w-[190px] xl:right-100 xl:bottom-80 xl:h-[250px] xl:w-[250px]"
        >
          <Image
            src={images[1] || "/images/hero-image-small.jpg"}
            alt="Jewellery Hero Medium"
            fill
            style={{ objectFit: "cover", objectPosition: "top right" }}
            className="scale-100"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};
