import { AddProduct, EditProduct, Home } from "./pages";

const Routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/produk/add",
    exact: false,
    component: AddProduct,
  },
  {
    path: "/produk/edit/:id",
    exact: false,
    component: EditProduct,
  },
];

export default Routes;
