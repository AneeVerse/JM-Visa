const PromoSection = () => {
    return (
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                src="/images/profile.webp" // Replace with your actual image
                alt="Passport Holder"
                className="rounded-xl shadow-2xl max-w-full object-cover"
              />
            </div>
  
            {/* Right Content */}
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
                Simplify Your <span className="text-primary">Travel Experience</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At JM Visa, we provide expert guidance and personalized assistance
                to make your visa and immigration process stress-free. Let us
                handle the complexities while you focus on planning your dream journey.
              </p>
              <button className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-accent hover:scale-105 transition-transform duration-300">
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
           
          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 bg-primary text-white py-10 px-8 rounded-xl shadow-xl">
            <div className="text-center">
              <h3 className="text-4xl font-extrabold">10k+</h3>
              <p className="mt-2 text-sm font-medium">Completed Projects</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold">20+</h3>
              <p className="mt-2 text-sm font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold">5k+</h3>
              <p className="mt-2 text-sm font-medium">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold">100+</h3>
              <p className="mt-2 text-sm font-medium">Winning Awards</p>
            </div>
          </div> </div>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default PromoSection;
  