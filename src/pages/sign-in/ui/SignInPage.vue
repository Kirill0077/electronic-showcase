<script setup lang="ts">
import { ref } from "vue";
import { validateEmail } from "../lib/validate";
import Logo from "@/shared/assets/icons/Logo.vue";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "../model/store";
import { useRouter } from "vue-router";
const router = useRouter()
const authStore = useAuthStore()

const email = ref();
const password = ref();

const isValidEmail = ref(true);
const isValidPassword = ref(true);

const toast = useToast();
const showError = () => {
	toast.add({
		severity: "error",
		summary: "Неверно введены данные",
		life: 3000,
	});
};

function onSignIn() {
	isValidPassword.value = (password.value == undefined || password.value.length == 0)
			? false
			: true;

	isValidEmail.value = validateEmail(email.value)
			? true 
			: false;

	if (!isValidEmail.value || !isValidPassword.value) {
		console.log("Please enter");
		showError();
	} else {
		authStore.$patch({
			isLoggedIn:true
		})
		router.push('/')
	}
}
</script>

<template>
	<Toast />
	<main class="flex items-center justify-center w-svw h-svh p-4">
		<section
			class="flex flex-col py-2 px-8 lg:p-8 items-center justify-center lg:gap-6 gap-4 w-[30rem] rounded-lg shadow-lg shadow-red-300"
		>
			<div class="flex flex-row text-center">
				<Logo :size="96" />
				<span class="text-wrap text-surface-700 text-3xl">
					Вход в электронную витрину
				</span>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="email" class="font-bold">Почта</label>
				<InputText
					id="email"
					v-model="email"
					aria-describedby="email-help"
					placeholder="Введите почту"
					:invalid="!isValidEmail"
				/>
				<small
					id="email"
					class="text-orange-500"
					v-show="!isValidEmail"
				>
					Email должен состоять из двух частей: локальной части (до
					знака @) и домена (после знака @), например,
					user@example.com.
				</small>
			</div>
			<div class="flex flex-col gap-2 w-full">
				<label for="password" class="font-bold">Пароль</label>
				<Password
					id="password"
					class="flex-col"
					v-model="password"
					:feedback="false"
					toggleMask
					placeholder="Введите пароль"
					:invalid="!isValidPassword"
				/>
				<small
					id="password"
					class="text-orange-500"
					v-show="!isValidPassword"
					>Пароль не может быть пустым</small
				>
			</div>
			<div class="flex justify-end w-full">
				<Button label="Войти" class="w-44" @click="onSignIn" />
			</div>
		</section>
	</main>
</template>



<style scoped>
</style>