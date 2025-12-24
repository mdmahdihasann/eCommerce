const OrderCustomerDetails = ({ customerData, popupFunc }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-100 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-6 text-center">
            Customer Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-medium">Name:</span> {customerData?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {customerData?.phone}
            </p>
            <p>
              <span className="font-medium">City:</span>{" "}
              {customerData?.city_select},
            </p>
            <p>
              <span className="font-medium">Shipping Address:</span>{" "}
              {customerData?.fullAddress},
            </p>
          </div>
          <div className="pt-8 text-center">
            <button
              onClick={() => popupFunc(false)}
              className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCustomerDetails;
