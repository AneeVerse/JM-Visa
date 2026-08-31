"use client";

import { useState, useEffect } from 'react';
import { BiSupport, BiCheckShield } from 'react-icons/bi';
import { FiArrowRight } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, usePathname } from 'next/navigation';
import CountryCodeDropdown from './CountryCodeDropdown';
import useGeoLocation from '../../hooks/useGeoLocation';

const FormComponent = ({ from, fromCategory, redirectPath, compact = false }) => {
  const userGeo = useGeoLocation();
  const params = useParams();
  const pathname = usePathname();
  const slug = params?.slug || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    country: '',
    visaType: '',
    formSource: 'ads-visa'
  });
  const [formMeta, setFormMeta] = useState({
    from: 'ads-visa',
    pageLabel: 'ads-visa landing page',
    pageLink: ''
  });
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    if (slug) {
      const formatted = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
      setCountryName(formatted);
      setFormData(prev => ({
        ...prev,
        country: formatted
      }));
    }
  }, [slug]);

  useEffect(() => {
    if (!pathname) return;
    const fullUrl = typeof window !== 'undefined' ? window.location.href : pathname;
    const meta = {
      from: 'ads-visa',
      pageLabel: 'ads-visa landing page',
      pageLink: fullUrl
    };
    setFormMeta(meta);
  }, [pathname]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState(true);

  const visaTypes = [
    "Tourist Visa",
    "Business Visa",
    "End-to-End Visa Assistance",
    "Dummy Hotel Booking",
    "Dummy Flight Booking"
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "Indonesia", "Iran",
    "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
  ];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    if (!formData.visaType) {
      newErrors.visaType = 'Please select a visa type';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCountryCodeChange = (code) => {
    setFormData({
      ...formData,
      countryCode: code
    });
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
      const googleSheetsPhone = `${formData.countryCode.replace('+', '')}${formData.phone}`;

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: fullPhoneNumber,
          googleSheetsPhone: googleSheetsPhone,
          country: formData.country,
          visaType: formData.visaType,
          from: from || "ads-visa",
          fromCategory: fromCategory || "ads-visa",
          pageLink: formMeta.pageLink,
          pageName: formMeta.pageLabel,
          userLocation: userGeo ? `${userGeo.city}, ${userGeo.region}, ${userGeo.country}` : 'Unknown',
          userPincode: userGeo ? userGeo.pincode : 'Unknown',
          userIp: userGeo ? userGeo.ip : 'Unknown'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      sessionStorage.setItem('formSubmitted', 'true');
      localStorage.setItem('lastFormSubmit', String(Date.now()));

      window.location.href = redirectPath || '/ads-visa-thankyou';

    } catch (error) {
      toast.error(error.message || 'Failed to submit form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        className={"mt-[70px]"}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
        {/* Form Header with Gradient and Circles */}
        <div className={`bg-gradient-to-r from-blue-600 to-blue-500 ${compact ? 'p-2.5 px-3' : 'p-5'} relative text-white`}>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/5 rounded-full"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className={`bg-white/20 rounded-full flex-shrink-0 ${compact ? 'p-1' : 'p-2.5'}`}>
              <BiSupport className={compact ? "text-base" : "text-2xl"} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold leading-tight ${compact ? 'text-sm whitespace-nowrap truncate' : 'text-xl'}`}>
                Free Visa Consultation
              </h3>
              <p className={`opacity-90 leading-tight ${compact ? 'text-[10px] mt-0.5' : 'text-sm mt-1 text-blue-100'}`}>
                Get expert advice for your visa application
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className={compact ? "p-3" : "p-5"}>
          <form onSubmit={handleSubmit} className={compact ? "space-y-2" : "space-y-4"}>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border rounded-lg ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="First Name*"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border rounded-lg ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Last Name*"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Email Address*"
              />
              {errors.email && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <div className="flex">
                <CountryCodeDropdown
                  value={formData.countryCode}
                  onChange={handleCountryCodeChange}
                  error={errors.phone}
                  height={compact ? "h-8" : "h-[42px]"}
                  borderColor="border-gray-300"
                />
                <div className="flex-1">
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border border-l-0 rounded-r-lg ${errors.phone ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                    placeholder="Phone Number*"
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-[11px] mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Visa Type Field */}
            <div>
              <div className="relative">
                <select
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border rounded-lg appearance-none ${errors.visaType ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                >
                  <option value="" disabled hidden>Visa Type*</option>
                  {visaTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.visaType && (
                <p className="text-red-500 text-[11px] mt-1">{errors.visaType}</p>
              )}
            </div>

            {/* Country Field */}
            <div>
              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'} border rounded-lg appearance-none ${errors.country ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                >
                  <option value="" disabled hidden>Destination Country*</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              {errors.country && (
                <p className="text-red-500 text-[11px] mt-1">{errors.country}</p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center space-x-1.5 pt-0.5">
              <input
                type="checkbox"
                id="terms"
                checked={isAccepted}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer">
                <BiCheckShield className="text-blue-500 flex-shrink-0 text-sm" />
                <span>I agreed to the</span>
                <a href="/terms-and-condition" className="text-blue-600 hover:underline">
                  terms and conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isAccepted}
              className={`w-full py-3 text-sm font-semibold text-white rounded-lg flex items-center justify-center space-x-2 ${
                isLoading || !isAccepted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              } transition-all duration-200`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Get Free Consultation</span>
                  <FiArrowRight className="text-base" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormComponent;
