import { create } from "zustand";

export const useReservationStore = create((set) => ({
  reservations: [],
  addReservation: (res) =>
    set((state) => ({ reservations: [...state.reservations, res] })),
}));
