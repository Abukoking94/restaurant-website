import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-400 flex items-center gap-2 animate-pulse"
        >
          🍽️ GOLDEN EATS
        </Link>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden lg:flex text-gray-200 font-medium">
          {["Home", "Menu", "Reservations", "Events", "Reviews", "Contact"].map(
            (nav, idx) => (
              <Link
                key={idx}
                to={nav === "Home" ? "/" : `/${nav.toLowerCase()}`}
                className="hover:text-yellow-400 transition-colors duration-300"
              >
                {nav}
              </Link>
            )
          )}
        </nav>

        {/* Right Side: Cart & Hamburger */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative inline-flex items-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all duration-300 lg:inline-flex"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-1" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-yellow-400 rounded-full px-2 text-xs font-bold animate-bounce">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile/Tablet Hamburger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-200" />
          </button>
        </div>
      </div>

      {/* Side Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sliding Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-gray-200 z-50 shadow-xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-700"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-200" />
                </button>
              </div>

              {[
                "Home",
                "Menu",
                "Reservations",
                "Events",
                "Reviews",
                "Contact",
              ].map((nav, idx) => (
                <Link
                  key={idx}
                  to={nav === "Home" ? "/" : `/${nav.toLowerCase()}`}
                  className="py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
