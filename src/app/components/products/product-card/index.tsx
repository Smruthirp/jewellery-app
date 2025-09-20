import { cn } from "@/app/lib/tailwind";
import Image from "next/image";

type Props = {
  imageUrl: string;
  hoverImageUrl: string;
  title: string;
  price: number;
  offerPrice?: number;
};

export const ProductCard = ({
  imageUrl,
  hoverImageUrl = "/images/rings-image.jpg",
  title,
  price,
  offerPrice,
}: Props) => {
  return (
    <div className="group flex cursor-pointer flex-col items-center rounded-lg border border-[#18392b] p-4 shadow-md transition-all hover:border-2 hover:p-3">
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-md object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={hoverImageUrl}
          alt={`${title} hover`}
          fill
          className="absolute inset-0 translate-x-full transform rounded-md object-cover transition-transform duration-500 ease-in-out group-hover:translate-x-0"
        />
      </div>

      <h2 className="text-center font-medium">{title}</h2>

      <p className="mt-1 text-[#18392b]">
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
    </div>
  );
};
