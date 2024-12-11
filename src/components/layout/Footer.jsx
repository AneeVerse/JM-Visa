"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Countries", href: "/country" },
    { name: "Contact Us", href: "/contact" },
  ];

  const servicesLinks = [
    { name: "Student Visa", href: "#" },
    { name: "Family Visa", href: "#" },
    { name: "Business Visa", href: "#" },
    { name: "Travel Visa", href: "#" },
    { name: "Work Visa", href: "#" },
    { name: "Immigration Assistance", href: "#" },
  ];

  const footerLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  return (
    <footer className="relative  text-gray-200 py-16 px-3 sm:px-6">
      {/* Glassmorphism Container */}
      <div className="container mx-auto  md:px-12 bg-white/10 backdrop-blur-md border border-gray-200/20 rounded-3xl py-10 px-4 sm:px-10 shadow-lg">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <Link href={"/"} className="flex flex-row items-center gap-2">
              <Image src={"/logo/logo.png"} alt="JM Visa Logo" width={50} height={50} />
            <h2 className="text-3xl font-bold text-white">JM Visa</h2>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-gray-300">
              Simplify your immigration journey with our expert assistance for
              student, family, and business visas.
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">Call Us</p>
              <a
                href="tel:+919321315524"
                className="text-blue-50 font-medium hover:text-blue-100 transition"
              >
                +91 9321315524
              </a>
              <br />
              <a
                href="tel:+918591070718"
                className="text-blue-50 font-medium hover:text-blue-100 transition"
              >
                +91 8591070718
              </a>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-white">Email Us</p>
              <a
                href="mailto:info@jmvisaservices.com"
                className="text-blue-50 font-medium hover:text-blue-100 transition"
              >
               info@jmvisaservices.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Working Hours
            </h3>
            <ul className="text-sm space-y-3 text-white">
              <li>
                Mon - Fri:{" "}
                <span className="text-gray-100">9 AM - 6 PM</span>
              </li>
              <li>
                Sat: <span className="text-gray-100">10 AM - 3 PM</span>
              </li>
              <li>
                Sun: <span className="text-gray-100">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-100">
            Copyright © {new Date().getFullYear()} JM Visa. All rights reserved.
          </p>
          <ul className="flex space-x-6 mt-3 sm:mt-0">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-400 text-gray-100 transition-colors text-sm"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 sm:mt-1 md:mt-0">Design & Managed by <Link href={"https://aneeverse.com/"} target="_blank" className=" hover:underline inline-flex flex-row items-center gap-2 min-h-fit" >
          
         <span>Aneeverse</span>
          <Image src={"/logo/aneeverse-logo.png"} alt="Aneeverse Logo" width={20} height={20} className="inline-block" />
          </Link></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
