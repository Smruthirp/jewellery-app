"use client";

import { Button } from "@/app/ui/button";
import { CategoryCard } from "../category/category-card";
import { ArrowRight } from "lucide-react";

const Categories = [
  {
    imageUrl: "/images/earrings.jpg",
    title: "Elegant Earrings",
    href: "/categories/earrings",
  },
  {
    imageUrl: "/images/rings.avif",
    title: "Classic Ring",
    href: "/categories/rings",
  },
  {
    imageUrl: "/images/bracelet.avif",
    title: "Chic Bracelet",
    href: "/categories/bracelet",
  },
  {
    imageUrl: "/images/everyday.avif",
    title: "Everyday Jewellery",
    href: "/categories/necklaces",
  },
];

export const FillerSection = () => {
  return (
    <section className="flex flex-col items-center gap-8 overflow-x-auto bg-white p-6 md:flex-row md:p-10 md:pl-20">
      <Button
        size="lg"
        iconPosition="right"
        icon={<ArrowRight className="size-5" />}
        variant="outline"
      >
        Categories
      </Button>
      <div className="grid grid-cols-4 gap-6 md:flex md:flex-row">
        {Categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
};
