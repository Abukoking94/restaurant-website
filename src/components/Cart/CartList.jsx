import React, { useState } from "react";
import { useCartStore } from "../../store/cartStore";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";
import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartList() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const total = useCartStore((state) => state.getTotal());
  const [checkout, setCheckout] = useState(false);

  if (items.length === 0 && !checkout) {
    return (
      <div className="flex flex-col items-center mt-20 text-gray-400">
        <ShoppingCartIcon className="w-16 h-16 mb-4 text-gray-600" />
        <p className="text-lg font-medium">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-10 p-8 bg-gray-900 shadow-2xl rounded-3xl border border-gray-700"
    >
      {!checkout ? (
        <>
          <h2 className="text-3xl font-extrabold mb-6 text-yellow-400 flex items-center gap-2">
            🛒 Your Cart
          </h2>

          {/* Mini Order Summary */}
          <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700 flex justify-between items-center">
            <p className="text-gray-300 font-medium">Items: {items.length}</p>
            <p className="text-yellow-400 font-bold text-lg">
              Subtotal: ${total.toFixed(2)}
            </p>
          </div>

          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Total & Actions */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-xl bg-gray-800 border border-gray-700">
            <span className="text-2xl font-bold text-yellow-400">
              Total: ${total.toFixed(2)}
            </span>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-5 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setCheckout(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <CheckoutForm setCheckout={setCheckout} />
      )}
    </motion.div>
  );
}
