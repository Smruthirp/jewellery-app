import { LandingHero } from "@/app/components/landing-hero";
import { ProductsComponent } from "@/app/components/products-grid";
import earringsData from "@/app/mocks/earrings-data.json";
import { ProductType } from "@/app/types/products.types";

export default function EarringsPage() {
  return (
    <div>
      <LandingHero
        images={[
          "/images/earrings/earrings-5.avif",
          "/images/earrings/earrings-hover.jpg",
        ]}
      />
      <ProductsComponent
        productsData={earringsData as ProductType[]}
        hasFilters={false}
        className="p-6 md:p-12"
      />
    </div>
  );
}
