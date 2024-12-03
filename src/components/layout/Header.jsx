"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Container from "./Container"; // Assuming the Container component exists

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg  shadow-lg z-50">
      <div className="bg-gradient-to-r absolute top-0 w-full h-[80px] from-gray-700 to-gray-900 opacity-80 -z-20"></div>
      <Container className="flex items-center justify-between h-[80px]">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-white">
          JM VISA
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-gray-200 hover:text-blue-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          {/* CTA Button */}
          <Link
            href="/get-started"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </Container>

      {/* Sidebar for Mobile */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 min-h-screen left-0 w-[250px] bg-gray-950 bg-opacity-90 h-full shadow-lg z-50 flex flex-col items-start pt-20 px-6 space-y-6"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-white hover:text-blue-400 transition-colors duration-300"
            onClick={toggleSidebar}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/get-started"
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
          onClick={toggleSidebar}
        >
          Get Started
        </Link>
      </motion.div>
    </header>
  );
};

export default Header;
