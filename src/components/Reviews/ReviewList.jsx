// src/components/Reviews/ReviewList.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "./ReviewCard";

const REVIEWS = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    date: "Aug 5, 2025",
    rating: 5,
    text: "Absolutely amazing food and service! Highly recommend the steak and dessert. The ambience was perfect and staff were super friendly.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    dish: "Charcoal-Grilled Ribeye",
    location: "New York, USA",
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    date: "Jul 22, 2025",
    rating: 4,
    text: "Cozy atmosphere and delicious dishes. The pasta was al dente and the sauces were rich. Will definitely come back.",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    dish: "Truffle Mushroom Fettuccine",
    location: "Chicago, USA",
  },
  {
    id: "emily-carter",
    name: "Emily Carter",
    date: "Jun 30, 2025",
    rating: 5,
    text: "One of the best dining experiences I've ever had. Everything was perfect from starters to dessert. Service was impeccable.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    dish: "Seared Sea Bass",
    location: "San Francisco, USA",
  },
  {
    id: "li-wei",
    name: "Li Wei",
    date: "Jun 10, 2025",
    rating: 5,
    text: "Beautiful presentation and incredible flavors. The tasting menu is worth every penny!",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    dish: "Chef’s Tasting Menu",
    location: "Seattle, USA",
  },
  {
    id: "amina-youssef",
    name: "Amina Youssef",
    date: "May 25, 2025",
    rating: 4,
    text: "Great vegetarian options and lovely desserts. The staff were attentive and polite.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    dish: "Roasted Cauliflower Steak",
    location: "Austin, USA",
  },
  {
    id: "lucas-martin",
    name: "Lucas Martin",
    date: "May 2, 2025",
    rating: 5,
    text: "Fantastic cocktails and a vibrant vibe. The lamb chops were cooked perfectly.",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    dish: "Herb-Crusted Lamb Chops",
    location: "Boston, USA",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ReviewList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(REVIEWS.length / itemsPerPage);

  const paginatedReviews = REVIEWS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-24 bg-gray-900 mt-0 mb-0">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-400">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Real feedback from diners who’ve enjoyed our food and hospitality.
          </p>
        </div>

        {/* Review Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {paginatedReviews.map((review, idx) => (
              <motion.div key={review.id} variants={item}>
                <ReviewCard review={review} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 gap-3 flex-wrap">
          {/* Prev Page */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 shadow-md font-semibold transition-all duration-300"
          >
            Prev
          </motion.button>

          {/* Numbered Pages */}
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md ${
                  currentPage === page
                    ? "bg-yellow-400 text-gray-900 shadow-lg scale-110"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </motion.button>
            )
          )}

          {/* Next Page */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 shadow-md font-semibold transition-all duration-300"
          >
            Next
          </motion.button>
        </div>
      </div>
    </section>
  );
}
