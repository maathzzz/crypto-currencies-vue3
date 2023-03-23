// Define routing rules
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CryptoPage from "../views/CryptoPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/crypto/:id",
            name: "crypto",
            props: route => ({ state: route.params.state }),
            component: CryptoPage
        },
        {
            path: '/crypto/:id/:state',
            component: CryptoPage,
            props: true,
          },
    ]
})

export default router;