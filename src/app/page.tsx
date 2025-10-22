import { FillerSection } from "./components/filler-component";
import { LandingHero } from "./components/landing-hero";
import { ProductsComponent } from "./components/products";
import products from "@/app/mocks/product-data.json";
import { ProductType } from "./types/products.types";
import { ScrollingBanner } from "./components/banner/scrolling-banner";
import { HeroCarousel } from "./components/hero-carousel";
import { USP_ITEMS } from "./components/landing-hero/landing-hero.constants";
const slides = [
  {
    imageSrc: "/images/hero-3.avif",
    videoSrc: "/videos/video.mp4",
    title: "Welcome to Our Store",
    subtitle:
      "Discover our curated collection of fine jewellery, designed to celebrate every moment",
    buttonText: "Shop Now",
    buttonLink: "/products",
  },
  {
    imageSrc: "/images/bangles-2.avif",
    subtitle: "Customize your own piece for a truly personal touch.",
    title: "Customize Your Dream Jewellery",
    buttonText: "Customize Now",
    buttonLink: "/customize",
  },
  {
    imageSrc: "/images/hero-2.avif",
    title: "Limited Offers",
    subtitle: "Shop Before It's Gone",
  },
];

export default function Home() {
  return (
    <div className="">
      <main className="bg-[#f5eee6]">
        <HeroCarousel slides={slides} autoPlay={true} autoPlayInterval={5000} />
        <FillerSection />
        <ScrollingBanner
          content={[
            { type: "text", value: "Dont miss out on our exclusive offers!" },
            { type: "button", label: "Shop Now", href: "/products" },
          ]}
          speed={10}
        />
        <LandingHero
          subItems={USP_ITEMS}
          images={["/images/rings-image.jpg", "/images/earrings.jpg"]}
        />
        <ProductsComponent
          productsData={products as ProductType[]}
          className="p-16"
        />
      </main>
    </div>
  );
}
