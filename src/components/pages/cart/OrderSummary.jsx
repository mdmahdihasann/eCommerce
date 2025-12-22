import { Link } from "react-router-dom";

const OrderSummary = ({ subtotal }) => {
  const Total = subtotal + 5;
  return (
    <div className="lg:w-1/3 bg-white p-8 rounded-3xl border border-gray-200">
      <h5 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h5>

      <div className="flex justify-between mb-3 text-gray-700">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between mb-3 text-gray-700">
        <span>Shipping</span>
        <span>$5</span>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span>${Total}</span>
      </div>

      <div className="pt-4 text-center">
        <Link
          to="/checkout"
          className="px-5 bg-blue-600 text-white py-3 rounded-3xl font-semibold"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
