import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900 to-gray-800 text-gray-200 pt-12 pb-6 mt-0 mb-0">
      {/* Top Decorative Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1f2937"
            fillOpacity="1"
            d="M0,64L48,85.3C96,107,192,149,288,144C384,139,480,85,576,69.3C672,53,768,75,864,112C960,149,1056,203,1152,202.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are a modern restaurant bringing together traditional flavors and
            contemporary culinary art. Enjoy fresh, hand-crafted dishes in a
            cozy and elegant atmosphere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">
              <a href="/">Home</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/menu">Menu</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/reservations">Reservations</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/events">Events</a>
            </li>
            <li className="hover:text-white transition">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-gray-400 text-sm mb-2">
            📍 123 Gourmet Street, Addis Ababa, Ethiopia
          </p>
          <p className="text-gray-400 text-sm mb-2">📞 +251 911 123 456</p>
          <p className="text-gray-400 text-sm">✉️ info@myrestaurant.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              className="p-2 bg-yellow-500 rounded-full hover:scale-110 transition transform text-black"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-yellow-500 rounded-full hover:scale-110 transition transform text-black"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-yellow-500 rounded-full hover:scale-110 transition transform text-black"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-yellow-500 rounded-full hover:scale-110 transition transform text-black"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 text-center text-gray-500 text-sm relative z-10">
        &copy; {new Date().getFullYear()} My Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
