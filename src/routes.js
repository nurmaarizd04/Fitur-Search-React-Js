import { AddProduct, Home } from "./pages";

const Routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/add",
    exact: false,
    component: AddProduct,
  },
];

export default Routes;
