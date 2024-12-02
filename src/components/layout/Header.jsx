"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Container from "./Container"; // Assuming the Container component is already created

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
    <header className="fixed top-0 left-0 w-full h-[90px] bg-gradient-to-r from-primary via-secondary to-primary text-white shadow-lg z-50">
      <Container className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide">JM VISA</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-lg font-medium hover:text-accent transition duration-300">
                {link.name}
            </Link>
          ))}
          {/* CTA Button */}
          <Link href="/get-started" className="px-6 py-2 bg-accent text-black rounded-lg font-semibold hover:bg-white transition duration-300 shadow-md">
              Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
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
        className="fixed top-0 left-0 w-[250px] h-full bg-secondary bg-opacity-80 backdrop-blur-md shadow-lg z-40 flex flex-col items-start pt-20 px-6 space-y-6"
      >
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}
              className="text-lg font-medium text-white hover:text-accent transition duration-300"
              onClick={toggleSidebar}
            >
              {link.name}
           
          </Link>
        ))}
        <Link href="/get-started" 
            className="mt-4 px-6 py-2 bg-accent text-black rounded-lg font-semibold hover:bg-white transition duration-300 shadow-md"
            onClick={toggleSidebar}
          >
            Get Started
        </Link>
      </motion.div>
    </header>
  );
};

export default Header;
