import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const linkHover = { scale: 1.1, color: "#f87171" }; // Tailwind red-400

  return (
    <nav className="fixed w-full z-50  bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-white font-extrabold text-2xl">
          MyRestaurant
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-white font-medium">
          {["Home", "Menu", "Reservations", "Events", "Reviews", "Contact"].map(
            (item) => (
              <motion.li
                key={item}
                whileHover={linkHover}
                className="cursor-pointer"
              >
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </motion.li>
            )
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 right-0 w-3/4 h-full bg-gray-800 shadow-lg z-40 flex flex-col p-8"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col gap-6 mt-12 text-white font-semibold text-lg">
              {[
                "Home",
                "Menu",
                "Reservations",
                "Events",
                "Reviews",
                "Contact",
              ].map((item) => (
                <motion.li
                  key={item}
                  whileHover={linkHover}
                  onClick={toggleMenu}
                  className="cursor-pointer"
                >
                  <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
