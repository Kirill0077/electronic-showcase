<script setup lang="ts">
</script>

<template>
	<main class="flex flex-1 flex-col items-center justify-center gap-6">
		<span class="text-5xl text-slate-700"> Корзина пуста </span>
		<RouterLink
			to="/"
			class="flex flex-row gap-3 items-center text-red-500 duration-100 ease-in-out hover:text-red-300 "
		>
			<i class="pi pi-cart-arrow-down" style="font-size: 1.8rem"/>
			<span class="text-lg font-semibold"> Вернутся к покупкам </span>
		</RouterLink>
	</main>
</template>