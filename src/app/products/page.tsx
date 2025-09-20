import { ProductsComponent } from "../components/products";
import products from "@/app/mocks/product-data.json";
import { ProductType } from "../types/products.types";

export default function ProductsPage() {
  return (
    <main className="p-10">
      <h1 className="mb-4 text-3xl font-bold">All Products</h1>
      <ProductsComponent productsData={products as ProductType[]} />
    </main>
  );
}
