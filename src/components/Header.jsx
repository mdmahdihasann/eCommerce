import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <header className="py-4 px-4 md:px-8 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-3xl font-extrabold tracking-tight">
          SHOP
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[15px] font-medium">
          <a href="#" className="hover:text-gray-600 transition-colors">
            Shop
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            On Sale
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            New Arrivals
          </a>
          <a href="#" className="hover:text-gray-600 transition-colors">
            Brands
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon with Count Badge */}
          <div className="relative cursor-pointer hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {/* Count Badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          </div>

          {/* User Icon */}
          <div className="cursor-pointer hover:text-gray-600 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
