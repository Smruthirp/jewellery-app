import { CategoryType } from "./categories.types";

export type ProductType = {
  imageUrl: string;
  hoverImageUrl: string;
  title: string;
  price: number;
  offerPrice: number;
  category: CategoryType;
};
