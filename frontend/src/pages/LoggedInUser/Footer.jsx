import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3B3B3B] mt-16 text-[#F5F4F0] py-10 flex flex-col items-center space-y-4">
      {/* Social Icons */}
      <div className="flex gap-5">
        <a
          href="https://www.instagram.com/mountdive_"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <img
            src="/SVG/instaabout.svg"
            className="h-5 w-5 cursor-pointer hover:opacity-80 transition"
            alt="Instagram"
          />
        </a>

        <a
          href="https://www.facebook.com/your_facebook_page"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <img
            src="/SVG/faceabout.svg"
            className="h-5 w-5 cursor-pointer hover:opacity-80 transition"
            alt="Facebook"
          />
        </a>

        <a
          href="https://twitter.com/your_x_username"
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
        >
          <img
            src="/SVG/xabout.svg"
            className="h-5 w-5 cursor-pointer hover:opacity-80 transition"
            alt="X"
          />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-xs md:text-sm opacity-80 text-center">
        © 2025 MountTreks. Experience the Himalayas like never before.
      </p>
    </footer>
  );
};

export default Footer;
