<script setup lang="ts">
import SidebarViewer from "./sidebar/SidebarViewer.vue";
import ListProductsViewer from "./list-product/ListProductsViewer.vue";
import { useShowSide } from "../model/store";

const showSide = useShowSide()
</script>

<template>
	<div class="flex flex-col lg:flex-row w-full h-full">
		<SidebarViewer v-show="showSide.isShow"/>
		<ListProductsViewer />
	</div>
</template>

<style scoped>
</style>