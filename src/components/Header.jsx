import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { auth } = useAuth();

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-white/90 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-700 transition"
        >
          SHOP
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-[17px] font-medium">
          {" "}
          <Link to="/shop" className="hover:text-gray-600 transition-colors">
            {" "}
            Shop{" "}
          </Link>{" "}
          <a href="#" className="hover:text-gray-600 transition-colors">
            {" "}
            On Sale{" "}
          </a>{" "}
          <a href="#" className="hover:text-gray-600 transition-colors">
            {" "}
            New Arrivals{" "}
          </a>{" "}
          <a href="#" className="hover:text-gray-600 transition-colors">
            {" "}
            Brands{" "}
          </a>{" "}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon + Badge */}
          <Link
            to={!auth?.user?.id ? "/login" : "/cart"}
            className="relative cursor-pointer hover:text-gray-700 transition"
          >
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
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {cartItems ? cartItems?.length : 0}
            </span>
          </Link>

          {/* User Icon */}
          {auth?.authToken ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
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
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
