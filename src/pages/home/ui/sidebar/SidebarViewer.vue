
<script setup lang="ts">
import { ref } from "vue";
import { useProductsStore } from "../../model/store";
import PriceRange from "./PriceRange.vue";
import ProductCategory from "./ProductCategory.vue";
const productsStore = useProductsStore();

const priceComp = ref(1);

async function onClickAplly() {
	await productsStore.getProductsByFilter();
}

function onClickReset() {
	productsStore.resetSidebar();
	priceComp.value++;
}
</script>

<template>
	<aside
		class="flex flex-wrap sm:justify-stretch sm:flex-nowrap sm:flex-0 flex-row w-full lg:flex-col px-3 py-5 gap-6 lg:min-w-80 lg:max-w-80 shadow-[5px_0_10px_rgba(0,0,0,0.25)]"
	>
		<ProductCategory class="w-[45%] sm:w-full" />
		<PriceRange  class="w-[45%] sm:w-full"  :key="priceComp" />
		<section
			class="flex flex-row sm:flex-col lg:flex-row w-full sm:w-60 lg:w-full gap-3 justify-between"
		>
			<Button
				label="Применить"
				@click="onClickAplly()"
				class="flex basis-1/2"
				raised
			/>
			<Button
				label="Сброс"
				class="flex basis-1/2"
				@click="onClickReset"
				text
				raised
			/>
		</section>
	</aside>
</template>