import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "@/pages/sign-in";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});



router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
	if (!authStore.isLoggedIn) {
		if (to.name !== "sign-in") {
			next("/sign-in");
		} else {
			next();
		}
	} else {
		if (from.name !== "sign-in" && to.name == "sign-in") {
			next(from.path);
		} else {
			next();
		}
	}
});



