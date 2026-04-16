import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-black text-white text-center">

      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-6 text-xl">
        <span className="cursor-pointer hover:text-purple-400"></span>
        <span className="cursor-pointer hover:text-purple-400"></span>
        <span className="cursor-pointer hover:text-purple-400"></span>
        <span className="cursor-pointer hover:text-purple-400"></span>
      </div>

      {/* Copyright */}
      <p className="text-gray-400 mb-6">
        Copyright © {new Date().getFullYear()} Ravesona - All Rights Reserved.
      </p>

      {/* Links */}
      <div className="flex justify-center gap-8 text-sm tracking-wide">
        <span className="cursor-pointer hover:text-purple-400">HOME</span>
        <span className="cursor-pointer hover:text-purple-400">PRIVACY POLICY</span>
        <span className="cursor-pointer hover:text-purple-400">CONTACT</span>
      </div>

      {/* Divider */}
      <div className="mt-6 flex justify-center">
        <div className="w-10 h-[1px] bg-gray-600"></div>
      </div>

    </footer>
  );
};

export default Footer;