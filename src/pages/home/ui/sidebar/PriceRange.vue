<script setup lang="ts">
import {  ref, watch } from "vue";
import { useProductsStore } from "../../model/store";

const productsStore = useProductsStore();
const minPrice = ref(productsStore.pricerange.min );
const maxPrice = ref(productsStore.pricerange.max )

watch([minPrice, maxPrice], () => {
	if (minPrice.value > maxPrice.value) {
		[minPrice.value, maxPrice.value] = [maxPrice.value, minPrice.value];
	}
	productsStore.$patch({
		pricerange: {
			min: minPrice.value,
			max: maxPrice.value,
		},
	});
});
</script>

<template>
	<section class="flex flex-col gap-3">
		<h1>
			<span class="text-lg"> Цена товара </span>
		</h1>
		<div class="flex flex-col sm:flex-row gap-3">
			<div>
				<label
					for="min_price"
					class="font-bold text-slate-500 block mb-2"
				>
					От:
				</label>
				<InputNumber
					v-model="minPrice"
					inputId="min_price"
					showButtons
					:min="0"
					:minFractionDigits="2"
					:maxFractionDigits="2"
					suffix=" ₽"
					fluid
				/>
			</div>
			<div>
				<label
					for="max_price"
					class="text-slate-500 font-bold block mb-2"
				>
					До:
				</label>
				<InputNumber
					v-model="maxPrice"
					inputId="max_price"
					showButtons
					:minFractionDigits="2"
					:maxFractionDigits="2"
					suffix=" ₽"
					fluid
				/>
			</div>
		</div>
	</section>
</template>