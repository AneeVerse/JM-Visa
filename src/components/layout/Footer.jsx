const Footer = () => {
  // Define Quick Links, Services, and Footer Links as variables
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
    <footer className="bg-black text-gray-300 py-12 sm:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* JM Visa Logo and Description */}
          <div>
            <h2 className="text-3xl font-bold text-white">JM Visa</h2>
            <p className="mt-6 text-sm leading-relaxed text-gray-400">
              We assist with family-based, employment-based, and
              investment-based immigration. Let us simplify your journey with expert guidance.
            </p>
            <div className="mt-6">
              <p className="font-semibold text-white">Call Our Office</p>
              <a
                href="tel:+1232567890"
                className="text-accent font-semibold hover:underline"
              >
                +1 (123) 256 7890
              </a>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-white">Send a Message</p>
              <a
                href="mailto:info@jmvisa.com"
                className="text-accent font-semibold hover:underline"
              >
                info@jmvisa.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-white">Services</h3>
            <ul className="mt-6 space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-semibold text-white">Working Hours</h3>
            <ul className="mt-6 space-y-3 text-sm">
              <li>Mon - Fri: <span className="text-gray-400">9 AM - 6 PM</span></li>
              <li>Sat: <span className="text-gray-400">10 AM - 3 PM</span></li>
              <li>Sun: <span className="text-gray-400">Closed</span></li>
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
                  className="hover:text-accent transition-colors duration-300 text-sm"
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
