"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import AnimatedMenu from "./AnimatedMenu";

export default function Header({ isLight }) {
  // State for toggle menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Effect to disable/enable scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <header className="absolute top-0 left-0 w-full bg-transparent backdrop-opacity-0 z-[999]">
      <div className="p-8 flex flex-row justify-between">
        <Link href="/">
          <span className={isLight ? "logo-light" : "logo-dark"}>COCONUT.</span>
        </Link>

        {/* Toggle button */}
        <button
          onClick={toggleMenu}
          className="p-2 text-white fixed top-4 right-4 z-[1001]"
        >
          {isMenuOpen ? (
            <IoClose size={50} color="black" />
          ) : (
            <IoMenuSharp size={50} color="black" />
          )}
        </button>
      </div>

      {/* Conditionally render the ToggleMenu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-1/2 bg-[#243642] z-[1000]"
          >
            <AnimatedMenu />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
