import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuItemCard({ meal, onAddToCart, onQuickView }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(meal);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-gray-900 text-gray-100 shadow-lg rounded-3xl overflow-hidden flex flex-col"
    >
      {/* Meal Image */}
      <div
        className="relative cursor-pointer"
        onClick={() => onQuickView(meal)}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-52 object-cover rounded-t-3xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center text-white font-semibold text-lg rounded-t-3xl">
          Quick View
        </div>
      </div>

      {/* Meal Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-yellow-400">
            {meal.strMeal}
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Category: {meal.strCategory} | Area: {meal.strArea}
          </p>
          {meal.strTags && (
            <p className="text-gray-300 text-xs mt-1">
              Tags: {meal.strTags.split(",").join(", ")}
            </p>
          )}
          <p className="text-white-400 font-bold mt-2 text-lg">
            ${meal.price}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className="mt-4 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 text-gray-900 py-2 px-6 rounded-3xl hover:from-pink-500 hover:via-yellow-500 hover:to-amber-400 shadow-lg font-semibold transition-all"
        >
          Add to Cart
        </button>

        {/* "+1 Added" Animation */}
        <AnimatePresence>
          {added && (
            <motion.span
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{ opacity: 1, y: -30, scale: 1.2 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="absolute top-0 right-0 text-green-500 font-bold text-sm"
            >
              +1 Added
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
