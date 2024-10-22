<script setup lang="ts">
import { useProductsStore } from "../../model/store";
import CardProduct from "./CardProduct.vue";

// "grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 px-3 h-0"
//class="flex flex-wrap "
const productsStore = useProductsStore();
</script>

<template>
	<main class="min-h-0 max-h-[92svh] overflow-y-auto">
		<div
			class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3 p-4 "
		>
			<CardProduct
				v-for="product in productsStore.products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</main>
</template>

<style scoped>


</style>

