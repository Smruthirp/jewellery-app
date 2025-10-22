import { LandingHero } from "@/app/components/landing-hero";
import { ProductsComponent } from "@/app/components/products";
import ringsData from "@/app/mocks/rings-data.json";
import { ProductType } from "@/app/types/products.types";

export default function RingsPage() {
  return (
    <div>
      <LandingHero
        images={["/images/rings-image.jpg", "/images/rings/rings-4.jpg"]}
      />
      <ProductsComponent
        productsData={ringsData as ProductType[]}
        hasFilters={false}
        className="p-12"
      />
    </div>
  );
}
