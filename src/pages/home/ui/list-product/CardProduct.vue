<script setup lang="ts">
import { computed } from "vue";
import { useProductsStore } from "../../model/store";
import { CardProduct } from "../../model/types";
import { useBasketStore } from "@/entities/basket";
import { ItemBasket } from "@/entities/basket/model/types";

const prooducntsStore = useProductsStore();
const basketSore = useBasketStore();

const props = defineProps<{
	product: CardProduct;
}>();

function addToBasket() {
	const productItem: ItemBasket = {
		id: props.product.id,
		price: parseFloat(price.value),
		quantity: 1,
		image: props.product.image,
		name: props.product.title,
		totalPrice: parseFloat(price.value),
	};
	basketSore.addProduct(productItem);
}

const price = computed(() =>
	(props.product.price * prooducntsStore.dollarRate).toFixed(2)
);
</script>

<template>
	<section
		class="grid grid-rows-8 gap-2 rounded-lg shadow-md p-3 w-full h-64 justify-items-center"
	>
		<img
			alt="product header"
			:src="props.product.image"
			class="row-span-4 h-full"
		/>
		<span class="text-lg font-bold w-full text-start text-surface-700">
			{{ price }} ₽
		</span>

		<span class="row-span-2 line-clamp-2 w-full text-start text-wrap">
			{{ product.title }}
		</span>
		<Button label="В корзину" @click="addToBasket()" class="py-3 w-full" />
	</section>
</template>



<style scoped>
</style>