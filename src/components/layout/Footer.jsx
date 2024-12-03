"use client";

const Footer = () => {
  const quickLinks = [
    { name: "Our History", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "About Us", href: "#" },
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
    { name: "Legal", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-900 via-blue-900 to-black text-gray-200 py-16 px-6">
      {/* Glassmorphism Container */}
      <div className="container mx-auto px-6 md:px-12 bg-white/10 backdrop-blur-md border border-gray-200/20 rounded-3xl p-10 shadow-lg">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-bold text-white">JM Visa</h2>
            <p className="mt-6 text-sm leading-relaxed text-gray-300">
              Simplify your immigration journey with our expert assistance for
              student, family, and business visas.
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">Call Us</p>
              <a
                href="tel:+1232567890"
                className="text-blue-400 font-medium hover:text-blue-300 transition"
              >
                +1 (123) 256 7890
              </a>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-white">Email Us</p>
              <a
                href="mailto:info@jmvisa.com"
                className="text-blue-400 font-medium hover:text-blue-300 transition"
              >
                info@jmvisa.com
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
            <ul className="text-sm space-y-3 text-gray-300">
              <li>
                Mon - Fri:{" "}
                <span className="text-gray-400">9 AM - 6 PM</span>
              </li>
              <li>
                Sat: <span className="text-gray-400">10 AM - 3 PM</span>
              </li>
              <li>
                Sun: <span className="text-gray-400">Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} JM Visa. All rights reserved.
          </p>
          <ul className="flex space-x-6 mt-4 sm:mt-0">
            {footerLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-blue-400 transition-colors text-sm"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
