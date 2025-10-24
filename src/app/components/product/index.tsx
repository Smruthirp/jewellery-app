"use client";
import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/ui/accordion";
import { AlsoLike } from "./also-like";

interface ProductProps {
  id: number;
  imageUrl: string;
  hoverImageUrl: string;
  title: string;
  price: number;
  offerPrice: number;
  category: string;
}

export const Product: FC<ProductProps> = ({
  id,
  imageUrl,
  hoverImageUrl,
  title,
  price,
  offerPrice,
  category,
}) => {
  const imageOptions = useMemo(
    () =>
      [
        { id: `${id}-primary`, src: imageUrl, alt: `${title} primary view` },
        {
          id: `${id}-alternate`,
          src: hoverImageUrl,
          alt: `${title} alternate view`,
        },
      ].filter(
        (option, index, self) =>
          option.src &&
          self.findIndex((item) => item.src === option.src) === index,
      ),
    [hoverImageUrl, id, imageUrl, title],
  );

  const [selectedImage, setSelectedImage] = useState(
    () => imageOptions[0]?.src ?? imageUrl,
  );

  useEffect(() => {
    if (!imageOptions.some((option) => option.src === selectedImage)) {
      setSelectedImage(imageOptions[0]?.src ?? imageUrl);
    }
  }, [imageOptions, imageUrl, selectedImage]);

  return (
    <section className="flex w-full flex-col p-6 md:p-10">
      <div className="flex h-screen w-full flex-col gap-10 md:flex-row">
        <Image
          src={selectedImage}
          alt={title}
          width={700}
          height={700}
          className="h-[80%] rounded-xl object-cover transition-all duration-300"
        />

        <div className="flex w-full flex-col gap-4">
          <h1 className="mb-4 text-3xl font-bold text-[#2e5a45]">{title}</h1>

          {imageOptions.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-3">
              {imageOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedImage(option.src)}
                  className={`rounded-lg border-2 p-1 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2e5a45] ${selectedImage === option.src ? "border-[#2e5a45]" : "border-transparent"}`}
                  aria-label={`View ${title}`}
                  aria-pressed={selectedImage === option.src}
                >
                  <Image
                    src={option.src}
                    alt={option.alt}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>Product Details</AccordionTrigger>
              <AccordionContent>
                <div className="md:text-md flex flex-col gap-3 lg:text-lg">
                  <p>
                    Discover timeless elegance with our exquisite collection of
                    handcrafted jewelry. Each piece is meticulously designed to
                    celebrate life&apos;s precious moments and express your
                    unique style.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <strong>Category:</strong> {category}
                    </div>
                    <div>
                      <strong>Material:</strong> Premium Gold
                    </div>
                    <div>
                      <strong>Craftsmanship:</strong> Handcrafted
                    </div>
                    <div>
                      <strong>Warranty:</strong> 1 Year
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Made with premium materials and attention to detail, our
                    jewelry combines traditional craftsmanship with contemporary
                    design to create stunning pieces that will be treasured for
                    generations.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <p className="text-xl">
                    <span className="text-gray-500 line-through">
                      ₹{price.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-3xl font-semibold text-[#2e5a45]">
                    ₹{offerPrice.toLocaleString()}
                  </p>
                  <p className="text-lg text-gray-600">
                    You save ₹{(price - offerPrice).toLocaleString()}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="customize">
              <AccordionTrigger>Customize</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3">
                  <p>
                    Perfect for gifting or treating yourself, our jewelry is
                    designed to complement your individuality and enhance your
                    natural beauty.
                  </p>
                  <div className="flex flex-col gap-2">
                    <h4 className="font-medium">Customization Options:</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      <li>Size adjustments available</li>
                      <li>Engraving services</li>
                      <li>Gemstone color options</li>
                      <li>Metal finish choices</li>
                    </ul>
                  </div>
                  <button className="mt-2 rounded-md bg-[#18392b] px-4 py-2 text-white transition-colors hover:bg-[#18392b]/90">
                    Start Customization
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <AlsoLike />
    </section>
  );
};
