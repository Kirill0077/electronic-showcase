import { createApp } from "vue";
import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { router } from "./providers";
import { definePreset } from "@primevue/themes";
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'


const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{red.50}",
            100: "{red.100}",
            200: "{red.200}",
            300: "{red.300}",
            400: "{red.400}",
            500: "{red.500}",
            600: "{red.600}",
            700: "{red.700}",
            800: "{red.800}",
            900: "{red.900}",
            950: "{red.950}",
        },
    },
});

export const app = createApp(App)
    .use(createPinia())
    .use(PrimeVue, {
        ripple: true, 
        theme: {
            preset: MyPreset,
            options: {
                darkModeSelector: false || "none",
                cssLayer: {
                  name: 'primevue',
                  order: 'tailwind-base, primevue, tailwind-utilities'
              }
            },
        },
    })
    .use(ToastService)
    .use(createHead())
    .use(router);
