import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Dashboard from "./Component/Dashboard/Dashboard";
import Login from "./Component/UserOnboarding/Login";
import CreateProducts from "./Component/Product/CreateProducts";
import Header from "./Common/Header";
import Registration from "./Component/UserOnboarding/Registration";
import ProductList from "./Component/Product/ProductList";
import ProductDetails from "./Component/Product/ProductDetails";
import BuyNow from "./Component/Buy/BuyNow";
import Cart from "./Component/Cart/Cart";
import Orders from "./Component/Orders/Orders";
import Track from "./Component/Tracking/Track";

function App() {
  let user = localStorage.getItem("user")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/create-product",
      element: user ? <CreateProducts /> : <Navigate to={'/'} />,
    },
    {
      path: "/registration",
      element: user ? <Navigate to={'/'} /> : <Registration />,
    },
    {
      path: "/product-list/:category",
      element: <ProductList />,
    },
    {
      path: "/product-details/:id",
      element: <ProductDetails />,
    },
    {
      path: "/buy/:productId",
      element: <BuyNow />,
    },
    {
      path: "/cart",
      element: user ? <Cart /> : <Navigate to={'/'} />,
    },
    {
      path: "/orders",
      element: user ? <Orders /> : <Navigate to={'/'} />,
    },
    {
      path: "/track",
      element: user ? <Track /> : <Navigate to={'/'} />,
    },
    {
      path: "/login",
      element: user ? <Navigate to={'/'} /> : <Login />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
