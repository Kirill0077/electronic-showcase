import { defineStore } from "pinia";

export const useAuthStore = defineStore("sign-in",{
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        toggleLogin() {
            this.isLoggedIn =!this.isLoggedIn;
        }
    }
}) 