<script setup lang="ts">
import { computed } from "vue";
import { useProductsStore } from "../../model/store";

const productsStore = useProductsStore();

const cities = computed(() => {
	return Array.from(productsStore.categories.entries(), ([k, v]) => ({
		name: k,
		code: v,
	}));
});

const selectedCategory = computed({
	get: () => productsStore.activeCategory[0],
    set: (value:any) => {
        productsStore.activeCategory = [value.name, value.code ];
    },
});
</script>

<template>
	<section class="flex flex-col w-1/3 lg:w-full gap-8">
		<h1>
			<span class="sm:text-lg"> Категория товара </span>
		</h1>
		<FloatLabel class="w-full">
			<Select
				v-model="selectedCategory"
				class="w-full sm:text-lg"
				editable
				inputId="select_product_label"
				:options="cities"
				optionLabel="name"
			/>
			<label for="select_product_label">Выберите товар</label>
		</FloatLabel>
	</section>
</template>


<style scoped>
</style>