import axios from "axios";
import type { Product } from "@/entities/product";
const instance = axios.create({
    baseURL: "https://fakestoreapi.com/products",
    timeout: 10000,
});

export async function getAllProgucts(): Promise<Product[]> {
    try {
        const response = await instance.get("");
        return response.data as Promise<Product[]>;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw new Error(error);
    }
}

export async function getProductByCategory(
    category: string
): Promise<Product[]> {
    try {
        let url = `category/${category}`;
        if (category == "all-categories") {
            url = "";
        }
        const response = await instance.get(url);
        return response.data as Promise<Product[]>;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw new Error(error);
    }
}

export async function getAllCategories(): Promise<string[]> {
    try {
        const response = await instance.get("/categories");
        return response.data as Promise<string[]>;
    } catch (error: any) {
        console.error("Error fetching products:", error);
        throw new Error(error);
    }
}

export async function getProductById(id: number): Promise<Product> {
    try {
        const response = await instance.get(`/${id}`);
        return response.data as Promise<Product>;
    } catch (error: any) {
        console.error("Error fetching product:", error);
        throw new Error(error);
    }
}
