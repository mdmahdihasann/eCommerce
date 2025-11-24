import { useContext } from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { CartContext } from "../../context/CartContext";

const CartSection = ({ onHandleDelete }) => {
  const { cart, setCart } = useContext(CartContext);

  function handleInCriment(itemId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
  function handleDriment(itemId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  }

  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subTotal * 0.8;
  const total = subTotal - discount;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">YOUR CART</h2>

        {/* <!-- Cart Item 1 --> */}
        {cart.length > 0
          ? cart.map((item) => (
              <CartItems
                item={item}
                key={item.id}
                onHandleDelete={onHandleDelete}
                onInriment={handleInCriment}
                ondriment={handleDriment}
              />
            ))
          : " Not Found Data"}

        {/* <!-- Order Summary --> */}
        <OrderSummary subTotal={subTotal} discount={discount} total={total} />
      </div>
    </div>
  );
};

export default CartSection;
