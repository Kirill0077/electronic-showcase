import { Product } from "@/entities/product";

export type CardProduct = Omit<Product, 'rating' | 'category' | 'description' | 'name'>