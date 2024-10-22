<script setup lang="ts">
import Logo from "@/shared/assets/icons/Logo.vue";
import { useBasketStore } from "@/entities/basket";
import { onMounted, onUnmounted, toRef } from "vue";
import { useAuthStore } from "@/pages/sign-in";
import { watch } from "vue";
import { useProductsStore, useShowSide } from "../../pages/home/model/store";

const basketStore = useBasketStore();
const authStore = useAuthStore();
const productsStore = useProductsStore();
const showSidebar = useShowSide();
const isLoggedIn = toRef(() => authStore.isLoggedIn);
const numPurchasedProduct = toRef(() => basketStore.totalQuantity);

watch(isLoggedIn, async () => {
	if (isLoggedIn.value) {
		await productsStore.loadCategories();
		await productsStore.loadProducts();
	}
});

const updateScreenWidth = () => {
	if (window.innerWidth >= 1024) {
		showSidebar.$patch({ isShow: true });
	}
};

onMounted(() => {
	window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
	window.removeEventListener("resize", updateScreenWidth);
});
</script>
<template>
	<div class="flex flex-col fixed w-full h-svh">
		<header
			v-if="isLoggedIn"
			class="flex items-cemter min-h-14 p-3 justify-between duration-100 ease-in-out shadow-lg shadow-red-300"
		>
			<RouterLink to="/">
				<Logo :size="32" />
			</RouterLink>
			<div class="flex gap-6">
				<Button
					icon="pi pi-sliders-h"
					class="visible lg:hidden"
					@click="showSidebar.toggleSideBar"
					text
				/>
				<RouterLink
					class="hover:text-surface-400 mt-2 mr-10"
					to="/basket"
				>
					<OverlayBadge :value="numPurchasedProduct" size="small">
						<i
							class="pi pi-shopping-cart"
							style="font-size: 24px"
						/>
					</OverlayBadge>
				</RouterLink>
			</div>
		</header>
		<RouterView />
	</div>
</template>

