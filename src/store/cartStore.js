import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, qty: item.qty || 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQty: (id, qty) => {
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
        });
      },

      clear: () => set({ items: [] }),

      // Instead of getter, define them as functions
      getItemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: "restaurant-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);