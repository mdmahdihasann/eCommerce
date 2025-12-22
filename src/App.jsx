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
import UserProfile from "./components/pages/UserProfile";


function App() {
  
  

  return (
    <>
    <Routes>
      <Route element={<Frontend/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<ShopPage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/order-details" element={<OrderDetails/>}/>
        <Route path="/user-profile" element={<UserProfile/>}/>
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
    </>
  );
}

export default App;
