import products from "@/app/mocks/product-data.json";
import { ProductsComponent } from "../products-grid";
import { ProductType } from "@/app/types/products.types";

export const AlsoLike = () => {
  const alsoLikeProducts = products.slice(0, 4);
  return (
    <div className="flex w-full flex-col">
      <h2 className="mb-6 text-2xl font-semibold">You May Also Like</h2>

      <ProductsComponent
        productsData={alsoLikeProducts as ProductType[]}
        hasFilters={false}
      />
    </div>
  );
};
