import { cn } from "@/app/lib/tailwind";
import { ProductType } from "@/app/types/products.types";
import { Button } from "@/app/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
  id,
  imageUrl,
  title,
  price,
  offerPrice,
}: ProductType) => {
  return (
    <Link
      href={`/products/${id}`}
      className="group flex cursor-pointer flex-col items-center rounded-xl border border-[#18392b]/60 p-2 shadow-xl transition-all hover:border-3 md:p-4 md:hover:p-3"
    >
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-md object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex translate-x-full transform flex-col items-center justify-center gap-2 rounded-md bg-black/40 object-cover p-4 text-center text-white transition-transform duration-500 ease-in-out group-hover:translate-x-0">
          <p>Don&apos;t like the design? Customize to your liking</p>
          <Button
            variant={"white"}
            className="z-100"
            onClick={() => (window.location.href = `/customize`)}
          >
            Customize
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </div>

      <h2 className="text-center text-xs font-medium md:text-sm">{title}</h2>

      <p className="mt-1 flex flex-col text-xs text-[#18392b] md:flex-row md:text-sm">
        <span
          className={cn("pr-2", {
            "text-gray-400 line-through": offerPrice,
          })}
        >
          ₹{price.toFixed(2)}
        </span>
        {offerPrice && (
          <span className="font-semibold text-[#18392b]">
            ₹{offerPrice.toFixed(2)}
          </span>
        )}
      </p>
    </Link>
  );
};
