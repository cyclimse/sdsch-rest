import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Appliances",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: About,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  base: import.meta.env.BASE_URL,
  mode: "history",
  routes,
});

export default router;
