import { useState } from "react";
import { FaBars, FaSignOutAlt, FaPen, FaTrash, FaPlus } from "react-icons/fa";
import ProductTable from "./ProductTable";
import CreateFrom from "./CreateFrom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(null);
  const { setAuth } = useAuth();
  const Navigate = useNavigate();

  const handleProductEdit = (productEdit) => {
    setIsEditMode(productEdit);
    setIsProductPopupOpen(true);
  };
  const handleLogout = () => {
    setAuth({});
    Navigate("/");
  };
  return (
    <div className="flex h-screen font-sans bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`bg-white flex flex-col transition-all duration-300 shadow-lg ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-green-500 transition"
          >
            <FaBars size={20} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-5">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 max-w-full w-full rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-blue-100" 
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 max-w-full w-full rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white" 
                      : "bg-white text-gray-700 hover:bg-blue-100" 
                  }`
                }
              >
                 <i className="fas fa-table"></i>
                {sidebarOpen && <span>Products</span>}
              </NavLink>
              
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-gray-200 mt-auto">
          <button
            className="w-full flex items-center justify-center gap-3 p-3 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-5 bg-white shadow-md rounded-b-lg">
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
      </div>

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

export default Dashboard;
