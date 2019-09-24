import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: true,

    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index")
      }
    ]
  },

  {
    path: "/example",
    component: Layout,
    redirect: "/example/table",
    name: "Example",
    meta: { title: "轮播图添加", icon: "example" },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/table/index"),
        meta: { title: "首页Banner", icon: "table" }
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/tree/index"),
        meta: { title: "产品中心Banner", icon: "tree" }
      }
    ]
  },

  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "加盟信息表", icon: "form" }
      }
    ]
  },

  {
    path: "/news",
    component: Layout,
    redirect: "/news/list",
    name: "News",
    meta: {
      title: "新闻编辑",
      icon: "nested"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/news/list/index"), // Parent router-view
        name: "List",
        meta: { title: "新闻列表" }
      },
      {
        path: "menu1",
        component: () => import("@/views/news/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "新闻添加" }
      }
    ]
  },

  {
    path: "external-link",
    component: Layout,
    name: "Link",
    meta: {
      title: "官网外链",
      icon: "link"
    },
    children: [
      {
        path: "http://www.ifepay.com",
        meta: { title: "官网外链", icon: "link" }
      },
      {
        path: "http://www.ifepay.com/admin",
        meta: { title: "管理系统", icon: "link" }
      },
      {
        path: "http://www.ifepay.com/merchant",
        meta: { title: "B端", icon: "link" }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
