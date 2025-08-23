import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../store/cartStore";
import MenuItemCard from "./MenuItemCard";

export default function MenuList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeMeal, setActiveMeal] = useState(null);
  const [mealPrices, setMealPrices] = useState({}); // store consistent prices
  const modalRef = useRef();

  const itemsPerPage = 12;
  const addItem = useCartStore((state) => state.addItem);

  // Fetch meals and categories
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");
      const allMeals = [];

      for (const letter of letters) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = await res.json();
        if (data.meals) allMeals.push(...data.meals);
      }

      // Assign consistent random prices
      const prices = {};
      allMeals.forEach((meal) => {
        prices[meal.idMeal] = parseFloat((Math.random() * 15 + 5).toFixed(2));
      });
      setMealPrices(prices);

      setMeals(allMeals);
      setLoading(false);
    };

    const fetchCategories = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      if (data.categories)
        setCategories(data.categories.map((cat) => cat.strCategory));
    };

    fetchMeals();
    fetchCategories();
  }, []);

  const filteredMeals =
    activeCategory === "All"
      ? meals
      : meals.filter((meal) => meal.strCategory === activeCategory);

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (meal) => {
    addItem({
      id: meal.idMeal,
      name: meal.strMeal,
      price: mealPrices[meal.idMeal],
      qty: 1,
      image: meal.strMealThumb,
    });
  };

  const handleQuickView = (meal) => {
    setActiveMeal(meal);
    setQuickViewOpen(true);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setQuickViewOpen(false);
      setActiveMeal(null);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setQuickViewOpen(false);
        setActiveMeal(null);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = quickViewOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [quickViewOpen]);

  if (loading)
    return (
      <p className="text-center py-10 text-lg text-gray-200">Loading menu...</p>
    );
  if (!meals.length)
    return (
      <p className="text-center py-10 text-lg text-gray-200">No meals found.</p>
    );

  return (
    <section className="px-4 py-8 bg-gray-900 relative overflow-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-6 text-center drop-shadow-lg">
        Our Menu
      </h1>

      {/* Categories */}
      <div className="mb-6 flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
        {["All", ...categories].map((cat) => (
          <motion.button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 sm:px-5 py-2 rounded-3xl font-semibold transition-all duration-300 text-sm sm:text-base ${
              activeCategory === cat
                ? "bg-gradient-to-r from-emerald-400 via-yellow-400 to-amber-300 text-gray-900 shadow-lg"
                : "bg-gray-800 text-gray-100 hover:bg-gradient-to-r hover:from-emerald-400 hover:via-yellow-400 hover:to-amber-300 hover:text-gray-900 shadow-md"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Meals */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {paginatedMeals.map((meal) => (
          <MenuItemCard
            key={meal.idMeal}
            meal={{ ...meal, price: mealPrices[meal.idMeal] }}
            onAddToCart={() => handleAddToCart(meal)}
            onQuickView={handleQuickView}
          />
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-3xl bg-gray-700 hover:bg-emerald-500 text-yellow-100 font-semibold transition-all disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, idx, arr) => {
            const isEllipsis = idx > 0 && page - arr[idx - 1] > 1;
            return (
              <React.Fragment key={page}>
                {isEllipsis && (
                  <span className="px-2 text-gray-400 font-semibold">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-3xl transition-all font-medium ${
                    currentPage === page
                      ? "bg-emerald-500 text-gray-900 shadow-lg scale-105"
                      : "bg-gray-700 hover:bg-emerald-500 text-yellow-100"
                  }`}
                >
                  {page}
                </button>
              </React.Fragment>
            );
          })}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-3xl bg-gray-700 hover:bg-emerald-500 text-yellow-100 font-semibold transition-all disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && activeMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClickOutside}
            className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden relative"
            >
              <button
                onClick={() => {
                  setQuickViewOpen(false);
                  setActiveMeal(null);
                }}
                className="absolute top-3 right-3 text-white hover:text-yellow-400 text-3xl font-bold z-50 transition-transform duration-200 transform hover:scale-110"
              >
                &times;
              </button>

              <img
                src={activeMeal.strMealThumb}
                alt={activeMeal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between gap-2 max-h-[70vh] overflow-y-auto">
                <div>
                  <h2 className="text-lg font-bold text-yellow-400">
                    {activeMeal.strMeal}
                  </h2>
                  <p className="text-gray-400 text-xs mb-1">
                    Category: {activeMeal.strCategory} | Area:{" "}
                    {activeMeal.strArea}
                  </p>
                  {activeMeal.strTags && (
                    <p className="text-gray-300 text-xs mb-1">
                      Tags: {activeMeal.strTags.split(",").join(", ")}
                    </p>
                  )}
                  <p className="text-gray-200 text-sm whitespace-pre-line mb-2 line-clamp-6">
                    {activeMeal.strInstructions}
                  </p>
                  <p className="text-emerald-400 font-bold text-lg mb-2">
                    Price: ${mealPrices[activeMeal.idMeal]}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleAddToCart(activeMeal);
                    setQuickViewOpen(false);
                    setActiveMeal(null);
                  }}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-300 text-gray-900 py-2 px-4 rounded-2xl text-sm hover:from-emerald-500 hover:via-yellow-500 hover:to-amber-400 shadow-md font-semibold transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
