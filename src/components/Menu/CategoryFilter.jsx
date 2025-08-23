import React from "react";
import { motion } from "framer-motion";

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {["All", ...categories].map((c, idx) => (
        <motion.button
          key={`${c}-${idx}`} // unique key
          onClick={() => onChange(c)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-4xl font-semibold shadow-lg transition-all duration-300
            ${
              active === c
                ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-300 text-gray-900"
                : "bg-gray-700 text-yellow-100 hover:bg-gradient-to-r hover:from-yellow-400 hover:via-yellow-400 hover:to-amber-300 hover:text-gray-900"
            }`}
        >
          {c}
        </motion.button>
      ))}
    </div>
  );
}
