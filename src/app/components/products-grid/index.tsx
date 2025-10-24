"use client";

import { ProductType } from "@/app/types/products.types";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { cn } from "@/app/lib/tailwind";

export const ProductsComponent = ({
  productsData,
  hasFilters = true,
  className = "",
}: {
  productsData: ProductType[];
  hasFilters?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 bg-white p-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4",
        className,
      )}
    >
      {hasFilters && (
        <Filters
          onApply={(filters) => {
            // handle filter application here
            // e.g., you can filter productsData or trigger a callback
            console.log("Applied filters:", filters);
          }}
        />
      )}
      {productsData.map((product, index) => (
        <ProductCard key={`${product.title}-${index}`} {...product} />
      ))}
    </div>
  );
};
