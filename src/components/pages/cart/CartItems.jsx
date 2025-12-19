import React from "react";

const CartItems = ({cartItems, handleCartDelete}) => {
  return (
    <div className="lg:w-2/3 space-y-6">
      {cartItems?.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-200"
        >
          <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden">
            <img
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${item.cover}`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h6 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h6>
            <p className="text-gray-500">Price: ${item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 border border-gray-300 rounded-lg">
              -
            </button>
            <input
              type="text"
              className="w-12 text-center border border-gray-300 rounded-lg"
              value="0"
              readOnly
            />
            <button className="px-3 py-1 border border-gray-300 rounded-lg">
              +
            </button>
          </div>

          <div className="w-24 font-bold text-right text-gray-900">
            ${item.price * 1}
          </div>

          <button
            className="text-red-500 text-2xl ml-3"
            onClick={() => handleCartDelete(item.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
