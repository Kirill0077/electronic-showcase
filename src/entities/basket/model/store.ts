import { defineStore } from "pinia";
import { ItemBasket } from "./types";

export const useBasketStore = defineStore("basket", {
    state: () => ({
        items: [] as ItemBasket[],
    }),
    getters: {
        totalQuantity: (state) => {
            return state.items.reduce((sum, item) => sum + item.quantity, 0);
        },
    },
    actions: {
        addProduct(_item: ItemBasket) {
            const item = this.items.find((i) => i.id === _item.id);
            if (item) {
                item.quantity++;
                item.totalPrice += item.price;
            } else {
                this.items.push(_item);
            }
        },
        icrementProduct(itemId: number) {
            const item = this.items.find((i) => i.id === itemId)!;
            item.quantity++;
            item.totalPrice += item.price;
        },
        decrementProduct(itemId: number) {
            const item = this.items.find((i) => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity--;
                item.totalPrice -= item.price;
            } else {
                this.items = this.items.filter((i) => i.id !== itemId);
            }
        },
        clearBasket(){
            this.items = [] as ItemBasket[];
        }
    },
});
