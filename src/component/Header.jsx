import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginSignup, setLoginSignup] = useState("LogIn");

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-12 object-contain"
            src="https://hungryforever.net/wp-content/uploads/2016/04/first-eat-logo.jpg"
            alt="logo"
          />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-8 font-semibold text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-orange-500"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-orange-500"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-orange-500" : "hover:text-orange-500"
            }
          >
            Contact
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative hover:text-orange-500"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </NavLink>

          {/* Login Button */}
          <button
            onClick={() =>
              setLoginSignup(loginSignup === "LogIn" ? "SignUp" : "LogIn")
            }
            className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600
             transition"
          >
            {loginSignup}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
