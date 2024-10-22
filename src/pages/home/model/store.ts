import { Product } from "@/entities/product";
import { defineStore } from "pinia";
import {
    getAllCategories,
    getAllProgucts,
    getProductByCategory,
} from "../api/api";

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [] as Product[],
        dollarRate: 95,
        activeCategory: ["Всe категории", "all-categories"],
        pricerange: {
            min: 0,
            max: 100000,
        },
        categories: new Map<string, string>([
            ["Всe категории", "all-categories"],
        ]),
        isReset: false,
    }),
    actions: {
        async loadProducts() {
            const result = await getAllProgucts();
            this.products = result;
        },
        async loadCategories() {
            const categories = await getAllCategories();
            categories.map((category) => {
                this.categories.set(
                    category.charAt(0).toUpperCase() + category.slice(1),
                    category
                );
            });
        },
        async getProductsByFilter() {
            const result = await getProductByCategory(this.activeCategory[1]);
            const fulterProducts = [] as Product[];
            result.forEach((p) => {
                if (
                    p.price >= this.pricerange.min / this.dollarRate &&
                    p.price <= this.pricerange.max / this.dollarRate
                ) {
                    fulterProducts.push(p);
                }
            });
            this.products = fulterProducts;
        },
        resetSidebar() {
            this.pricerange.min = 0;
            this.pricerange.max = 100000;
            this.activeCategory =  ["Всe категории", "all-categories"],
            this.loadProducts();
        },
    },
});

export const useShowSide = defineStore("show-side", {
    state: () => ({
        isShow: true,
    }),
    actions: {
        toggleSideBar() {
            this.isShow = !this.isShow;
        },
    },
});
