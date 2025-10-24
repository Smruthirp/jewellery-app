import products from "@/app/mocks/product-data.json";
import earringsData from "@/app/mocks/earrings-data.json";
import ringsData from "@/app/mocks/rings-data.json";
import { Product } from "@/app/components/product";
import NotFound from "@/app/not-found";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const allProducts = [...products, ...earringsData, ...ringsData];

  const product = allProducts.find((product) => product.id.toString() === id);

  return (
    <main className="p-10">
      {product ? (
        <Product
          id={product.id}
          imageUrl={product.imageUrl}
          hoverImageUrl={product.hoverImageUrl}
          title={product.title}
          price={product.price}
          offerPrice={product.offerPrice}
          category={product.category}
        />
      ) : (
        <NotFound />
      )}
    </main>
  );
}
