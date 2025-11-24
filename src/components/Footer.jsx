import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-6 px-4 mt-[30px]">
      <div className="max-w-[1260px] mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo + Tagline */}
        <div className="text-center md:text-left mb-3 md:mb-0">
          <a href="#" className="text-xl font-bold text-gray-900">LWS.SHOP</a>
          <p className="text-gray-700 text-sm mt-1">
            Stylish clothes for everyone
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6 text-gray-700 text-sm mb-3 md:mb-0">
          <a href="#" className="hover:text-gray-900 transition">Home</a>
          <a href="#" className="hover:text-gray-900 transition">Shop</a>
          <a href="#" className="hover:text-gray-900 transition">Contact</a>
        </div>

        {/* Copyright */}
        <div className="text-gray-600 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} LWS.SHOP. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
