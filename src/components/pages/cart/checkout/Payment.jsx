import { useDispatch, useSelector } from "react-redux";
import { productCheckout } from "../../../../features/product-cart/productCartSlice";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect } from "react";

const Payment = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const checkoutData = useSelector((state) => state.cart.items);
  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(productCheckout(auth?.user?.id));
    }
  }, [auth?.user?.id, dispatch]);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Payment</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          {/* Order Summary */}
          <div className="space-y-2 mb-6">
            <div className="max-w-2xl mx-auto mb-5">
              {/* Cart Header */}
              <div className="flex justify-between items-center px-2 py-2 bg-gray-100 border-b font-semibold text-gray-800">
                <span>Product Name</span>
                <span className="text-end">Price</span>
              </div>

              {/* Cart Item 1 */}
              {checkoutData?.items?.length > 0 ? (
                checkoutData?.items?.map((data) => (
                  <div className="flex justify-between items-start gap-3 py-4 border-b">
                    {/* Product Image and Info */}
                    <div className="flex items-start gap-3 w-full">
                      <img
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${data.cover}`}
                        alt="Product"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate mb-1">
                          {data?.title}
                        </h3>
                        <p className="text-gray-500 text-sm truncate">
                          Qunatity: {data?.quantity}
                        </p>
                      </div>
                    </div>
                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between text-end">
                      <span className="font-semibold text-gray-800 mb-1">
                        ${data?.price * data?.quantity}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 text-lg p-0"
                        aria-label="Remove"
                      >
                        <i className="fa-regular fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>Cart Not Found</div>
              )}
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${checkoutData?.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700 pb-3">
              <span>Shipping</span>
              <span>${checkoutData?.shipping}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-4">
              <span>Total</span>
              <span>${checkoutData?.total}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked
                className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Place Order Button */}
          <button type="submit"
            onClick={() =>
              document.getElementById("checkoutFrom").requestSubmit()
            }
            className="w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
