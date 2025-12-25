import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getCartItems } from "../features/product-cart/productCartSlice";
import ProfileIcon from "../assets/profile/person.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const { auth } = useAuth();
  const dispatch = useDispatch();

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
  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(getCartItems(auth?.user?.id));
    }
  }, [auth?.user?.id, dispatch]);
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
          <Link
            to="#"
            className="hover:text-gray-600 transition-colors"
          >
            {" "}
            New Arrivals{" "}
          </Link>{" "}
          <Link
            to="#"
            className="hover:text-gray-600 transition-colors"
          >
            {" "}
            Brands{" "}
          </Link>{" "}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-10">
          {/* User Icon */}
          {auth?.authToken ? (
            <Link to='user-profile'>
              <div className="flex gap-3">
                <div className="border-2 rounded-full px-[10px] py-[10px] w-[48px]">
                  <img src={ProfileIcon} className="w-7" />
                </div>
                <div>
                  <h4 className="text-[#868686] text-[14px]">
                    {auth?.user?.firstName} {auth?.user?.lastName}
                  </h4>
                  <span className="text-[#202020] text-[16px]">
                    {auth?.user?.email}
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="hover:text-gray-700 transition">
              <div className="flex gap-3">
                <div className="border-2 rounded-full px-[10px] py-[10px] w-[48px]">
                  <img src={ProfileIcon} className="w-7" />
                </div>
                <div>
                  <h4 className="text-[#868686] text-[14px]">
                    Sign In
                  </h4>
                  <span className="text-[#202020] text-[16px]">
                    Your Account
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Cart Icon + Badge */}
          <Link
            to={!auth?.user?.id ? "/login" : "/cart"}
            className="relative cursor-pointer hover:text-gray-700 transition"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.48626 20.5H14.8341C17.9004 20.5 20.2528 19.3924 19.5847 14.9348L18.8066 8.89359C18.3947 6.66934 16.976 5.81808 15.7311 5.81808H5.55262C4.28946 5.81808 2.95308 6.73341 2.4771 8.89359L1.69907 14.9348C1.13157 18.889 3.4199 20.5 6.48626 20.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6.34902 5.5984C6.34902 3.21232 8.28331 1.27803 10.6694 1.27803V1.27803C11.8184 1.27316 12.922 1.72619 13.7362 2.53695C14.5504 3.3477 15.0081 4.44939 15.0081 5.5984V5.5984"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.70365 10.1018H7.74942"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M13.5343 10.1018H13.5801"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-[#fb4b6d] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
              {cartItems ? cartItems?.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
