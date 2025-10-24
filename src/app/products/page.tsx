import { ProductsComponent } from "../components/products-grid";
import products from "@/app/mocks/product-data.json";
import { ProductType } from "../types/products.types";

export const ProductsPage = () => {
  return (
    <main className="p-10">
      <h1 className="mb-4 text-3xl font-bold">All Products</h1>
      <ProductsComponent productsData={products as ProductType[]} />
    </main>
  );
};
