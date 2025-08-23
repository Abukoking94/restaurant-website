import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function Specials() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSpecials = async () => {
    setLoading(true);
    try {
      // Pick a few random letters to fetch meals
      const letters = ["a", "b", "c", "d", "e", "f", "g"];
      const allMeals = [];

      for (const letter of letters) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = await res.json();
        if (data.meals) allMeals.push(...data.meals);
      }

      // Pick 3 random meals as specials
      const shuffled = allMeals.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3).map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        price: `$${(Math.random() * 15 + 5).toFixed(2)}`,
      }));

      setSpecials(selected);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecials();
  }, []);

  if (loading)
    return (
      <p className="text-center py-12 text-yellow-400 text-lg">
        Loading specials...
      </p>
    );

  return (
    <ScrollReveal>
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
            Today’s Specials
          </h2>
          <button
            onClick={fetchSpecials}
            className="mb-10 px-6 py-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Refresh Specials
          </button>
          <div className="grid md:grid-cols-3 gap-8">
            {specials.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-yellow-400">
                    {item.name}
                  </h3>
                  <p className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 font-bold mt-2">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
