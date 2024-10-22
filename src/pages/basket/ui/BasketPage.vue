<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { useBasketStore } from "../../../entities/basket/model/store";
import EmptyBasketViewer from "./EmptyBasketViewer.vue";
import { useRouter } from "vue-router";

const basketStore = useBasketStore();
const router = useRouter();

const products = toRef(() => basketStore.items);
const visibleDialog = ref(false);
const basketIsEmpty = computed(() => basketStore.totalQuantity < 1);
const priceBakset = computed(
	() =>
		basketStore.items
			.reduce((sum, item) => sum + item.totalPrice, 0)
			.toFixed(2) + " ₽"
);

function incrementProduct(idProduct: number) {
	basketStore.icrementProduct(idProduct);
}

function decrementProduct(idProduct: number) {
	basketStore.decrementProduct(idProduct);
}

function onCloseDialog(){
    visibleDialog.value = false;
    basketStore.clearBasket();
    router.push("/");
}
</script>

<template>
	<EmptyBasketViewer v-if="basketIsEmpty" />
	<main class="flex-1 overflow-y-auto" v-else>
		<DataTable
			class="m-4"
			:value="products"
			dataKey="id"
            scrollable 
            scrollHeight="80svh"
			:paginator="true"
			:rows="5"
			showGridlines
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
			:rowsPerPageOptions="[5, 10, 25]"
			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
		>
			<template #header>
				<h4 class="font-semibold text-4xl p-3">Корзина товаров</h4>
			</template>

			<Column
				header="№"
				class="text-center"
				style="min-width: 1rem; max-width: 2rem; text-align: center"
			>
				<template #body="slotProps">
					<span>{{ slotProps.index + 1 }}</span>
				</template>
			</Column>
			<Column
				header="Наименование товара"
				style="min-width: 12rem; max-width: 15rem; text-align: center"
			>
				<template #body="slotProps">
					<div
						class="grid grid-cols-3 gap-3 items-center justify-items-center"
					>
						<img
							:src="slotProps.data.image"
							class="rounded"
							style="height: 86px"
						/>
						<span
							class="col-span-2 line-clamp-2 w-full text-start text-wrap"
						>
							{{ slotProps.data.name }}
						</span>
					</div>
				</template>
			</Column>
			<Column
				header="Количество"
				sortable
				style="min-width: 8rem; text-align: center"
			>
				<template #body="slotProps">
					<div class="flex justify-center items-center gap-3">
						<Button
							icon="pi pi-plus"
							text
							@click="incrementProduct(slotProps.data.id)"
						/>
						<span>{{ slotProps.data.quantity }}</span>
						<Button
							icon="pi pi-minus"
							text
							@click="decrementProduct(slotProps.data.id)"
						/>
					</div>
				</template>
			</Column>
			<Column
				field="price"
				header="Цена за ед."
				sortable
				style="min-width: 8rem; text-align: center"
				><template #body="slotProps">
					<div class="flex justify-center items-center">
						<span>{{ slotProps.data.price.toFixed(2) }} ₽</span>
					</div>
				</template></Column
			>
			<Column
				field="totalPrice"
				header="Итого"
				sortable
				style="min-width: 10rem; text-align: center"
			>
				<template #body="slotProps">
					<div class="flex justify-center items-center font-semibold">
						<span
							>{{ slotProps.data.totalPrice.toFixed(2) }} ₽</span
						>
					</div>
				</template></Column
			>
		</DataTable>
		<section class="flex px-5 sm:px-10 py-8 flex-row justify-between items-center">
			<span class="text-lg sm:text-3xl font-semibold">
				Всего {{ basketStore.totalQuantity }} товаров на сумму
				{{ priceBakset }}
			</span>
			<Button
				label="Оформить заказ"
				@click="visibleDialog = true"
				size="large"
				raised
			/>
		</section>
	</main>
	<Dialog
		v-model:visible="visibleDialog"
		class="w-96"
		modal
		header="Заказ №123"
        @after-hide="onCloseDialog"
	>
		<div class="flex gap-6 flex-col">
			<div class="flex w-full h-full text-center">
				<span class="text-3xl font-semibold">
					Ваш заказ успешно оформлен!
				</span>
			</div>
			<div class="flex w-full justify-end">
				<Button icon="pi pi-times" label="Закрыть" @click="onCloseDialog" />
			</div>
		</div>
	</Dialog>
</template>
<style>
.p-datatable-column-header-content {
	justify-content: center;
}
</style>




