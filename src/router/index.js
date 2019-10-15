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
    path: "/banner",
    component: Layout,
    redirect: "/banner/homePage",
    name: "Banner",
    meta: { title: "首页模块", icon: "example" },
    children: [
      {
        path: "banner",
        name: "banner",
        component: () => import("@/views/banner/banner"),
        meta: { title: "Banner图", icon: "table" }
      },
      {
        path: "otherImg",
        name: "otherImg",
        component: () => import("@/views/banner/otherImg"),
        meta: { title: "其他图片", icon: "tree" }
      },
      {
        path: "home-buttom",
        name: "HomeButtom",
        component: () => import("@/views/banner/HomeButtom"),
        meta: { title: "底部内容", icon: "table" }
      },
      {
        path: "company-profile",
        name: "CompanyProfile",
        component: () => import("@/views/banner/CompanyProfile"),
        meta: { title: "公司简介", icon: "tree" }
      },
      {
        path: "Notify",
        name: "Notify",
        component: () => import("@/views/banner/Notify"),
        meta: { title: "通知公告", icon: "tree" }
      }
    ]
  },

  {
    path: "/jion",
    component: Layout,
    redirect: "/jion/form-list",
    name: "Banner",
    meta: { title: "加盟", icon: "example" },
    children: [
      {
        path: "form-list",
        name: "FormList",
        component: () => import("@/views/jionUs/JionList"),
        meta: { title: "加盟信息表", icon: "form" }
      },
      {
        path: "applicants",
        name: "Applicants",
        component: () => import("@/views/jionUs/Applicants"),
        meta: { title: "我要报考", icon: "user" }
      },
      {
        path: "online-registration",
        name: "OnlineRegistration",
        component: () => import("@/views/jionUs/OnlineRegistration"),
        meta: { title: "在线报名", icon: "user" }
      }
    ]
  },

  {
    path: "/news",
    component: Layout,
    redirect: "/news/list",
    name: "News",
    meta: {
      title: "图文",
      icon: "nested"
    },
    children: [
      {
        path: "list",
        component: () => import("@/views/news/list/index"), // Parent router-view
        name: "List",
        meta: { title: "图文列表" }
      },
      {
        path: "menu1",
        component: () => import("@/views/news/menu1/index"), // Parent router-view
        name: "Menu1",
        meta: { title: "图文添加" }
      }
    ]
  },
  {
    path: "/sever",
    component: Layout,
    redirect: "/sever/sever-center",
    name: "Jion",
    meta: { title: "服务", icon: "example" },
    children: [
      {
        path: "sever-center",
        name: "SeverCenter",
        component: () => import("@/views/severcenter/SeverCenter"),
        meta: { title: "服务中心", icon: "form" }
      },
      {
        path: "service-point",
        name: "ServicePoint",
        component: () => import("@/views/severcenter/ServicePoint"),
        meta: { title: "服务点", icon: "user" }
      }
    ]
  },
  {
    path: "/learn",
    component: Layout,
    redirect: "/learn/LearningCenter",
    name: "LearningCenter",
    meta: { title: "学习资料平台", icon: "example" },
    children: [
      {
        path: "learning-center",
        name: "LearningCenter",
        component: () => import("@/views/learningcenter/LearningCenter"),
        meta: { title: "学习中心", icon: "form" }
      },
      {
        path: "data-center",
        name: "DataCenter",
        component: () => import("@/views/learningcenter/DataCenter"),
        meta: { title: "资料下载", icon: "user" }
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
