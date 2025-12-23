import { useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { BsArchive } from "react-icons/bs";
import { MdReceiptLong } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { PiArrowFatLinesLeftFill } from "react-icons/pi";
import { PiArrowFatLinesRightFill } from "react-icons/pi";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 ">
      {/* Sidebar */}
      <aside
        className={`bg-white flex flex-col transition-all duration-300 shadow-lg h-screen ${
          sidebarOpen ? "w-[260px]" : "w-[80px]"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          {sidebarOpen ? (
            <h1 className="text-2xl font-bold text-gray-800">SHOP</h1>
          ) : <h1 className="text-2xl font-bold text-gray-800">SP</h1>}
         
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-5">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `p-3 w-full rounded-md font-medium transition-colors
     flex items-center gap-2 leading-none ${
       isActive
         ? "bg-blue-600 text-white"
         : "bg-white text-gray-700 hover:bg-blue-100"
     }`
                }
              >
                <RxDashboard className="shrink-0" size={18} />
                {sidebarOpen && (
                  <span className="flex items-center">Dashboard</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/product"
                className={({ isActive }) =>
                  `p-3 w-full rounded-md font-medium transition-colors
     flex items-center gap-2 leading-none ${
       isActive
         ? "bg-blue-600 text-white"
         : "bg-white text-gray-700 hover:bg-blue-100"
     }`
                }
              >
                <BsArchive className="shrink-0" size={18} />
                {sidebarOpen && (
                  <span className="flex items-center">Product</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `p-3 w-full rounded-md font-medium transition-colors
     flex items-center gap-2 leading-none ${
       isActive
         ? "bg-blue-600 text-white"
         : "bg-white text-gray-700 hover:bg-blue-100"
     }`
                }
              >
                <MdReceiptLong className="shrink-0" size={18} />
                {sidebarOpen && (
                  <span className="flex items-center">Order</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `p-3 w-full rounded-md font-medium transition-colors
     flex items-center gap-2 leading-none ${
       isActive
         ? "bg-blue-600 text-white"
         : "bg-white text-gray-700 hover:bg-blue-100"
     }`
                }
              >
                <FaRegUser className="shrink-0" size={18} />
                {sidebarOpen && (
                  <span className="flex items-center">Customer</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-gray-200 mt-auto">
          <button onClick={toggleSidebar}
            className="w-full flex items-center justify-center gap-3 p-3 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition"
          
          >
            
            {sidebarOpen ? <PiArrowFatLinesLeftFill/> : <PiArrowFatLinesRightFill/> }
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
