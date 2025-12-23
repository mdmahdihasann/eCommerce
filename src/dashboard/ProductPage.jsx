import { FaBars, FaSignOutAlt, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import ProductTable from "./ProductTable";
import { useState } from "react";
import CreateFrom from "./CreateFrom";
const ProductPage = () => {
  const [isEditMode, setIsEditMode] = useState(null);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const handleProductEdit = (productEdit) => {
    setIsEditMode(productEdit);
    setIsProductPopupOpen(true);
  };
  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-center px-6 min-h-[73px] bg-white border-b border-l">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button
          onClick={() => {
            setIsEditMode(null);
            setIsProductPopupOpen(true);
          }}
          className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 shadow transition"
        >
          <FaPlus />
          Add Product
        </button>
      </header>

      {/* Table Section */}
      <main className="p-6 overflow-auto flex-1">
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <ProductTable
            setIsProductPopupOpen={setIsProductPopupOpen}
            onProductEdit={handleProductEdit}
          />
        </div>
      </main>
      {/* Add Product Popup */}
      {isProductPopupOpen && (
        <CreateFrom
          setIsProductPopupOpen={setIsProductPopupOpen}
          onEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default ProductPage;
