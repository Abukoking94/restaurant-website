import React, { useEffect, useState } from "react";
import MenuItemCard from "../components/Menu/MenuItemCard";
import CategoryFilter from "../components/Menu/CategoryFilter";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cartStore";


export default function Menu() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [quickViewMeal, setQuickViewMeal] = useState(null);
  const [mealPrices, setMealPrices] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const addItem = useCartStore((state) => state.addItem);

  // Fetch meals
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const data = await res.json();
        if (data.categories)
          setCategories(data.categories.map((cat) => cat.strCategory));
      } catch (err) {
        console.error(err);
      }
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

  if (loading)
    return (
      <p className="text-center py-10 text-lg text-yellow-400">
        Loading menu...
      </p>
    );

  if (!meals.length)
    return (
      <p className="text-center py-10 text-lg text-yellow-400">
        No meals found.
      </p>
    );

  return (
    <section className="px-4 md:px-8 lg:px-16 py-12 bg-gray-900 text-gray-100 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
        Our Menu
      </h1>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedMeals.map((meal) => (
          <motion.div
            key={meal.idMeal}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl overflow-hidden shadow-lg bg-gray-800/80 backdrop-blur-md transition-all"
          >
            <MenuItemCard
              meal={{ ...meal, price: mealPrices[meal.idMeal] }}
              onAddToCart={() => handleAddToCart(meal)}
              onQuickView={() => setQuickViewMeal(meal)}
            />
          </motion.div>
        ))}
      </div>

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
                      ? "bg-yellow-500 text-gray-900 shadow-lg scale-105"
                      : "bg-gray-700 hover:bg-yellow-400 text-yellow-100"
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
        {quickViewMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setQuickViewMeal(null)} // close when clicking outside
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gray-800 text-gray-100 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
            >
              <button
                onClick={() => setQuickViewMeal(null)}
                className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-400 text-2xl font-bold"
              >
                &times;
              </button>
              <img
                src={quickViewMeal.strMealThumb}
                alt={quickViewMeal.strMeal}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <div className="p-6 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">{quickViewMeal.strMeal}</h2>
                <p className="text-gray-400">{quickViewMeal.strCategory}</p>
                <p className="text-gray-200">
                  {quickViewMeal.strInstructions.substring(0, 300)}...
                </p>
                <p className="text-emerald-400 font-bold">
                  ${mealPrices[quickViewMeal.idMeal]}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 via-yellow-400 to-amber-300 text-gray-900 py-3 px-8 rounded-4xl shadow-lg font-semibold transition-all hover:opacity-90"
                  onClick={() => {
                    handleAddToCart(quickViewMeal);
                    setQuickViewMeal(null);
                  }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}