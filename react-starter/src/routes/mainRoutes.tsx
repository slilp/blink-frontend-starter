import { lazy } from "react";

const Landing = lazy(() => import("pages/Landing"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const Home = lazy(() => import("pages/Home"));

const routes = {
  landing: {
    path: "/landing",
    name: "Landing Page",
    component: Landing,
  },
  login: {
    path: "/login",
    name: "Login",
    component: Login,
  },
  register: {
    path: "/register",
    name: "Register",
    component: Register,
  },
  home: {
    path: "/",
    name: "Home",
    component: Home,
    permission: "HOME",
  },
};

const guestRoute = {
  routes: [routes.login, routes.register, routes.landing],
  redirect: {
    ...routes.login,
  },
};

const userRoute = {
  routes: [routes.home],
  redirect: {
    ...routes.home,
  },
};

const permissionRoutes = {
  guestRoute,
  userRoute,
};

export default permissionRoutes;
