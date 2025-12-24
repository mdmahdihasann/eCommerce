import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  orderStatusUpdated,
} from "../features/product-cart/productCartSlice";
import OrderCustomerDetails from "./OrderCustomerDetails";

const Orders = () => {
  const [detailsPopup, setDetailsPopup] = useState(false);
  const [customerData, setCustomerData] = useState();
  const orderData = useSelector((state) => state.cart.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  const handleStatusChage = (orderId, statusVal) => {
    dispatch(orderStatusUpdated({ orderId, status: statusVal }));
  };

  const handleCustomerDetails = (CustomerData) => {
    setCustomerData(CustomerData);
    setDetailsPopup(true);
  };

  return (
    <div>
      <aside className="w-[100%] flex justify-between items-center px-6 min-h-[73px] bg-white border-l border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
      </aside>

      <div className="m-6 rounded-lg bg-white overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Order ID</th>
              <th className="px-6 py-3 text-center text-gray-600">Customer</th>
              <th className="px-6 py-3 text-center text-gray-600">Items</th>
              <th className="px-6 py-3 text-center text-gray-600">Amount</th>
              <th className="px-6 py-3 text-center text-gray-600">Payment</th>
              <th className="px-6 py-3 text-center text-gray-600">Status</th>
              <th className="px-6 py-3 text-center text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderData?.length > 0 ? (
              orderData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">#{data.id}</td>
                  <td className="px-6 py-3 text-center font-medium">
                    {data?.customer?.name}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {data?.items?.length}
                  </td>
                  <td className="px-6 py-3 text-center font-medium">
                    ${data?.totalAmount}
                  </td>
                  <td className="px-6 py-3 text-center uppercase">
                    {data?.paymentMethod}
                  </td>
                  <td className="px-6 py-3 text-center capitalize">
                    <select
                      value={data?.status}
                      onChange={(e) =>
                        handleStatusChage(data.id, e.target.value)
                      }
                      className={`rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    >
                      <option value="pending">Pending</option>
                      <option value="complete">Complete</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleCustomerDetails(data?.customer)}
                      className="text-blue-600 hover:text-blue-700 transition p-[7px] w-[30px] h-[30px] text-center rounded-md bg-blue-200 hover:bg-blue-300"
                    >
                      <FaRegEye size={17} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Data Not Found</div>
            )}
          </tbody>
        </table>
      </div>
      {detailsPopup && (
        <OrderCustomerDetails
          customerData={customerData}
          popupFunc={setDetailsPopup}
        />
      )}
    </div>
  );
};

export default Orders;
