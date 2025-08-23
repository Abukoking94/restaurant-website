import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import MenuPage from "./Pages/Menu";
import ReservationsPage from "./Pages/Reservations";
import EventsPage from "./Pages/Events";
import ReviewsPage from "./Pages/Reviews";
import ContactPage from "./Pages/Contact";
import "./index.css";
import Cart from "./Pages/Cart";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
