import { useDispatch, useSelector } from "react-redux";
import {
  cartItemsDelete,
  getCartItems,
} from "../../../features/product-cart/productCartSlice";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const isLoading = useSelector((state) => state.cart.isLoading);
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const subtotal = cartItems.length > 0 
  ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) 
  : 0;


  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getCartItems(auth.user.id));
    }
  }, [dispatch, auth]);

  const handleCartDelete = (cartId) => {
    dispatch(cartItemsDelete(cartId));
  };
  if (isLoading) {
    return <div>data Loading....</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 font-outfit">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold mb-12 text-gray-900 text-center">
          Your Shopping Cart
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <CartItems
              handleCartDelete={handleCartDelete}
              cartItems={cartItems}
            />
          ) : (
            <div className="lg:w-2/3 min-h-[300px] flex items-center justify-center text-center border rounded-3xl font-semibold text-2xl">
              No Cart Data
            </div>
          )}

          {/* Summary */}
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
