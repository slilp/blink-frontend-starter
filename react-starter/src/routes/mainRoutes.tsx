import { lazy } from "react";

const Landing = lazy(() => import("pages/Landing"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));
const Home = lazy(() => import("pages/Home"));
const Covid = lazy(() => import("pages/Covid"));
const CovidWithThunk = lazy(() => import("pages/CovidWithThunk"));
const MyUi = lazy(() => import("pages/MyUi"));
const Zustand = lazy(() => import("pages/Zustand"));

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
  },
  myui: {
    path: "/my-ui",
    name: "My UI",
    component: MyUi,
  },
  covid: {
    path: "/covid",
    name: "Covid",
    component: Covid,
  },
  covidWithThunk: {
    path: "/covid-thunk",
    name: "CovidWithThunk",
    component: CovidWithThunk,
  },
  zustand: {
    path: "/zustand",
    name: "Zustand",
    component: Zustand,
  },
};

const guestRoute = {
  routes: [
    routes.login,
    routes.register,
    routes.landing,
    routes.myui,
    routes.covid,
    routes.covidWithThunk,
    routes.zustand,
  ],
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
