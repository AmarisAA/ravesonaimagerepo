import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Ravesona p.png";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#070311] text-white">

      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src={logo}
          alt="Ravesona Logo"
          className="w-12 h-12 rounded-full border border-white/20"
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Ravesona
        </span>
      </Link>

      {/* Center: Main Buttons */}
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90">
          Build my Card
        </button>

        <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10">
          Dashboard
        </button>

        <button className="px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400/10">
          Log Out
        </button>
      </div>

      {/* Right: Cart */}
      <Link
        to="/mycart"
        className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10"
      >
        Cart
      </Link>

    </nav>
  );
};

export default Navbar;