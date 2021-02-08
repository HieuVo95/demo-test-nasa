import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
        path: "/",
        redirect: { name: "Dashboard" }
    },
    {
        path: "/",
        component: () => import("@/components/layouts/Default.vue"),
        children: [
            {
                path: "dashboard",
                component: () => import("@/views/Dashboard.vue"),
                name: "Dashboard",
                meta: {
                    title: "Dashboard"
                }
            },
            {
                path: "all-data",
                component: () => import("@/views/AllData.vue"),
                name: "All_Data",
                meta: {
                    title: "All Data"
                }
            },
            {
                path: "liked-data",
                component: () => import("@/views/LikedData.vue"),
                name: "Liked_Data",
                meta: {
                    title: "Liked Data"
                }
            },
            {
                path: "removed-data",
                component: () => import("@/views/RemovedData.vue"),
                name: "Removed_Data",
                meta: {
                    title: "Removed Data"
                }
            }
        ]
    },
    {
        path: "/*",
        redirect: { name: "Dashboard" }
    },
  ]
});

export default router;
