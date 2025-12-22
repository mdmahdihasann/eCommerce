import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../../features/product-cart/productCartSlice";
import { useAuth } from "../../../../hooks/useAuth";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const orderData = useSelector((state) => state.cart.orders);

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getOrder(auth?.user?.id));
    }
  }, [auth?.user?.id, dispatch]);

  const latestOrder =
    orderData?.orders && orderData.orders.length > 0
      ? orderData.orders[orderData.orders.length - 1]
      : null;

  return (
    <div className="min-h-screen py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Order Details
        </h1>

        {latestOrder ? (
          <div className="bg-white rounded-xl p-6 border border-gray-300">
            {/* Order Header */}
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
              <p className="font-medium text-gray-800">
                Order ID: {latestOrder.id}
              </p>
              <p className="text-gray-600">
                Placed on: {new Date(latestOrder.createdAt).toLocaleString()}
              </p>
              <p className="mt-1">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    latestOrder.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {latestOrder.status}
                </span>
              </p>
              <p className="mt-1 font-semibold text-gray-800">
                Total: ${latestOrder.totalAmount}
              </p>
            </div>

            {/* Customer Information */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {latestOrder.customer?.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {latestOrder.customer?.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {latestOrder.customer?.city_select || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {latestOrder.customer?.fullAddress || "N/A"}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Order Items
              </h2>
              <div className="space-y-3">
                {latestOrder.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center p-3 bg-white rounded-md border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${item.cover}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${item.totalPrice}
                      </p>
                      <p className="text-gray-500 text-sm">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gray-100 rounded-md">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Summary
              </h2>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-800 font-medium">
                  ${latestOrder.subtotal}
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-800 font-medium">
                  ${latestOrder.shipping}
                </span>
              </div>
              <div className="flex justify-between mt-2 font-semibold text-gray-900 text-lg">
                <span>Total</span>
                <span>${latestOrder.totalAmount}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 font-medium">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
