const PromoSection = () => {
    return (
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src="/images/profile.webp" // Replace with your actual image
                alt="Passport Holder"
                className="rounded-lg h-[320px] shadow-lg max-w-full"
              />
            </div>
            {/* Right Content */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Simplify Your Travel Experience
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At JM Visa, we offer expert guidance and assistance to make your
                visa and immigration process seamless. Let us help you plan your
                journey with exclusive offers and the best services in the
                industry.
              </p>
              <button className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-accent transition">
                Contact Us
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
  
          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 bg-primary text-white py-8 px-6 rounded-lg shadow-lg">
            <div className="text-center">
              <h3 className="text-3xl font-bold">10k+</h3>
              <p className="mt-2 text-sm">Completed Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">20+</h3>
              <p className="mt-2 text-sm">Team Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">5k+</h3>
              <p className="mt-2 text-sm">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="mt-2 text-sm">Winning Awards</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default PromoSection;
  