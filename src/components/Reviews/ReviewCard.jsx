import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative bg-gray-900 text-gray-100 rounded-2xl shadow-lg p-6 flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:shadow-2xl"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 via-yellow-400 to-amber-300 opacity-10 pointer-events-none rounded-2xl"></div>

      <div className="relative z-10">
        {/* Reviewer Info */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
          />
          <div>
            <h3 className="text-lg font-bold text-yellow-400">{review.name}</h3>
            {review.location && (
              <p className="text-sm text-gray-400">{review.location}</p>
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <StarIcon
              key={idx}
              className={`h-5 w-5 ${
                idx < review.rating ? "text-yellow-400" : "text-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-200 mb-5 line-clamp-5">{review.text}</p>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-3 mt-auto">
          <span>{review.dish || "Dish not specified"}</span>
          <span>{review.date}</span>
        </div>
      </div>
    </motion.div>
  );
}
