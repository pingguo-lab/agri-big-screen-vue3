import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/navigation", //把error改成fengNav
  },
  {
    path: "/error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/navigation",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/export",
    component: () => import("../views/ExportPage/ExportPage.vue"),
  },
  {
    path: "/jinggang",
    component: () => import("../views/JgMountain/ScreenPage.vue"),
  },
  {
    path: "/xinjianExp",
    component: () => import("../views/XinjianExp/ScreenPage.vue"),
  },
  {
    path: "/xinjianEco",
    component: () => import("../views/XinjianEco/ScreenPage.vue"),
  },
  {
    path: "/pingshan",
    component: () => import("../views/Pingshan/ScreenPage.vue"),
  },
  {
    path: "/yongxin",
    component: () => import("../views/Yongxin/ScreenPage.vue"),
  },
  {
    path: "/ganzhou",
    component: () => import("../views/Ganzhou/ScreenPage.vue"),
  },
  {
    path: "/shanggao",
    component: () => import("../views/Shanggao/ScreenPage.vue"),
  },
  {
    path: "/fengxin",
    component: () => import("../views/Fengxin/ScreenPage.vue"),
  },
  {
    path: "/fish",
    component: () => import("../views/fish/ScreenPage.vue"),
  },
  {
    path: "/yuganFish",
    component: () => import("../views/YuganFish/ScreenPage.vue"),
  },
  {
    path: "/yuganAqua",
    component: () => import("../views/YuganAqua/ScreenPage.vue"),
  },
  {
    path: "/xiaofuchaye",
    component: () => import("../views/Xiaofuchaye/ScreenPage.vue"),
  },
  {
    path: "/fishIndex",
    component: () => import("../views/FinshIndex/ScreenPage.vue"),
  },
  {
    path: "/mushRoom",
    component: () => import("../views/Mushroom/ScreenPage.vue"),
  },

  //这是奉新猕猴桃综合页面中监控页面的路由
  {
    path: "/monitor",
    component: () => import("../views/Fengxin/cpn/Monitor2.vue"),
  },

  //奉新猕猴桃总页面的路由，需要的时候再打开
  {
    path: "/fengNav",
    component: () => import("../views/Fengxin/nav/navView.vue"),
  },

  //这是奉新猕猴桃综合页面中冷库的路由
  {
    path: "/clodStorage",
    component: () => import("../views/Fengxin/coldStorage/ScreenPage.vue"),
  },

  {
    path: "/mjy",
    component: () => import("../views/Mjy/ScreenPage.vue"),
  },
];

// Vue 2: new VueRouter({ mode: "hash", routes })
// Vue 3: createRouter + createWebHashHistory
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    // 如果路由未找到，则跳转到错误页面
    next(to.path === "/error" ? false : "/error");
  } else {
    // 路由存在，继续导航
    next();
  }
});

export default router;
