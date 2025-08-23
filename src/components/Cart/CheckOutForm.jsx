import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cartStore";

export default function CheckoutForm({ setCheckout }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());
  const clearCart = useCartStore((state) => state.clear);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Thank you ${name}! Your order of ${
        items.length
      } item(s) ($${total.toFixed(2)}) will be delivered to ${address}.`
    );
    clearCart(); // empty cart after order
    setCheckout(false); // go back to cart view
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto mt-10 p-8 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700"
    >
      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">
        🛍️ Checkout
      </h2>

      {/* Order Summary */}
      <div className="mb-6 bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-yellow-400 mb-3">
          Order Summary
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-700 p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="text-gray-200 font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    ${item.price.toFixed(2)} × {item.qty}
                  </p>
                </div>
              </div>
              <p className="text-yellow-400 font-semibold">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between font-bold text-yellow-400 text-lg">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Name Field */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-700 px-4 py-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
        />
      </div>

      {/* Address Field */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-300">
          Delivery Address
        </label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
          className="w-full border border-gray-700 px-4 py-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
        />
      </div>

      {/* Buttons */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        type="submit"
        className="w-full bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
      >
        ✅ Place Order
      </motion.button>

      <button
        type="button"
        onClick={() => setCheckout(false)}
        className="w-full mt-4 bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
      >
        🔙 Back to Cart
      </button>
    </motion.form>
  );
}
