import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP } from "react-icons/fa";

const LandingPageFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#home" className="hover:text-blue-500 transition">Home</a></li>
            <li><a href="#services" className="hover:text-blue-500 transition">Services</a></li>
            <li><a href="#story" className="hover:text-blue-500 transition">Our Story</a></li>
            <li><a href="#blog" className="hover:text-blue-500 transition">Blog</a></li>
            <li><a href="#event" className="hover:text-blue-500 transition">Event</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-500 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Returns & Refunds</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 transition">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Don’t Miss Out!</h3>
          <p className="text-sm text-gray-400 mb-4">
            Sign up for email updates from Mountain & Hiking
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Email Address..."
              className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
            />
            <button className="bg-blue-500 px-5 py-2 rounded-r-md hover:bg-blue-600 transition">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MountDive. All Rights Reserved</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/mastercard.png" alt="MasterCard" className="h-6" />
          <img src="/paypal.png" alt="PayPal" className="h-6" />
          <img src="/applepay.png" alt="ApplePay" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
