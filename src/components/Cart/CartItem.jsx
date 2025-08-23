import React from "react";
import { useCartStore } from "../../store/cartStore";
import { motion } from "framer-motion";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function CartItem({ item }) {
  const updateQty = useCartStore((state) => state.updateQty);
  const removeItem = useCartStore((state) => state.removeItem);

  const increment = () => updateQty(item.id, item.qty + 1);
  const decrement = () => {
    if (item.qty > 1) updateQty(item.id, item.qty - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
      className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-4 rounded-2xl shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-xl mb-3 sm:mb-0 sm:mr-4 shadow-md"
      />

      {/* Product Info */}
      <div className="flex-1 px-2 text-center sm:text-left">
        <h2 className="text-lg font-bold text-yellow-400">{item.name}</h2>
        <p className="text-gray-300 mt-1">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex items-center space-x-3 mt-3 sm:mt-0">
        <button
          onClick={decrement}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          <MinusIcon className="w-4 h-4 text-white" />
        </button>

        <span className="px-4 py-1 rounded-lg bg-gray-900 text-yellow-400 font-semibold">
          {item.qty}
        </span>

        <button
          onClick={increment}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          <PlusIcon className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={() => removeItem(item.id)}
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition"
        >
          <TrashIcon className="w-5 h-5 text-white" />
        </button>
      </div>
    </motion.div>
  );
}
