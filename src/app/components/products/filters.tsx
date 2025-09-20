"use client";

import React, { useState } from "react";
import { Button } from "@/app/ui/button";

const categories = ["All", "Earrings", "Rings", "Necklaces", "Bracelets"];

export const Filters: React.FC<{
  onApply: (filters: {
    category: string;
    price: [number, number];
    sort: "asc" | "desc";
  }) => void;
}> = ({ onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [price, setPrice] = useState<[number, number]>([0, 250]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  return (
    <div className="col-span-full mb-8 flex w-full flex-col items-center gap-6 md:flex-row">
      {/* Categories */}
      <div className="flex items-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`rounded px-3 py-1 font-semibold text-[#18392b] transition-colors duration-200 ${selectedCategory === cat ? "bg-green-100" : "hover:bg-green-50"}`}
            onClick={() => setSelectedCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Price Range */}
      <div className="flex w-60 flex-col items-center gap-2">
        <label className="font-semibold text-[#18392b]">Price Range</label>
        <input
          type="range"
          min={0}
          max={250}
          value={price[1]}
          onChange={(e) => setPrice([0, Number(e.target.value)])}
          className="w-full accent-[#18392b]"
        />
        <div className="flex w-full justify-between text-sm text-[#18392b]">
          <span>${price[0]}</span>
          <span>${price[1]}</span>
        </div>
      </div>
      {/* Sort & Apply */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-[#18392b] text-[#18392b] hover:bg-green-50"
          onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
        >
          Sort by Price: {sort === "asc" ? "Low to High" : "High to Low"}
        </Button>
        <Button
          className="bg-[#18392b] text-white hover:bg-green-800"
          onClick={() => onApply({ category: selectedCategory, price, sort })}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
