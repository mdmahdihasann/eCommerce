import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./page/LoginPage";
import Frontend from "./components/Frontend";
import RegisterPage from "./page/RegisterPage";
import Dashboard from "./dashboard/Dashboard";
import ShopPage from "./components/pages/ShopPage";
import CartPage from "./components/pages/cart/CartPage";
import Checkout from "./components/pages/cart/checkout/Checkout";
import OrderDetails from "./components/pages/cart/orders/OrderDetails";
import UserProfile from "./components/pages/profile/UserProfile";
import Home from "./dashboard/Home";
import ProductPage from "./dashboard/ProductPage";
import Orders from "./dashboard/Orders";
import Users from "./dashboard/Users";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route element={<Frontend/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-success" element={<OrderDetails/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Route>
      <Route element={<Dashboard/>}>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/user" element={<Users/>}/>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
    </>
  );
}

export default App;
