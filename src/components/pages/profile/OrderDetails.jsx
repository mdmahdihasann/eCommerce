import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import { getOrder } from "../../../features/product-cart/productCartSlice";

const OrderDetails = ({ activeTab }) => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const orderData = useSelector((state) => state.cart.orders);
  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getOrder(auth?.user?.id));
    }
  }, [auth?.user?.id, dispatch]);

  return (
    <>
      {activeTab === "order-details" && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Orders
          </h2>
          {orderData?.length > 0
            ? orderData?.map((data) => (
                <div className="space-y-4 mb-4">
                  {/* Single Order */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="font-medium text-gray-800">
                      Order ID: {data?.id}
                    </p>
                    <p className="text-gray-600">Placed on: {new Date(data?.createdAt).toLocaleString()}</p>
                    <p className="mt-1 font-semibold text-gray-800">
                      Total: ${data?.totalAmount}
                    </p>
                    <p className={`${data?.status === "complete" ? "text-green-700" : "text-yellow-300" } font-semibold mt-1 capitalize`}>
                      Status: {data?.status}
                    </p>
                  </div>
                </div>
              ))
            : "data Not found"}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
