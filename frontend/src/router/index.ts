import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cabinet from "../views/Cabinet.vue";
import Partner from "../views/PartnerCabinet.vue";
import Admin from "../views/AdminCabinet.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/cabinet",
    name: "Cabinet",
    component: Cabinet
  },
  {
    path: "/partner",
    name: "Partner",
    component: Partner
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
