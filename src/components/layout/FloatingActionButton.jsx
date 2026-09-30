"use client";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IoMdChatboxes, IoIosRemove } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountryCodeDropdown from '../common/CountryCodeDropdown';
import useGeoLocation from '../../hooks/useGeoLocation';

const FloatingActionButton = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'phone' | 'whatsapp' | 'email' | null
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const userGeo = useGeoLocation();

  const isModalOpen = Boolean(modalType);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle ESC key and body scroll lock when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Hide on studio pages
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  const handleOpenModal = (type) => {
    setModalType(type);
    setErrors({});
  };

  const handleCloseModal = () => {
    setModalType(null);
    setErrors({});
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'whatsapp':
        return 'Contact Us via WhatsApp';
      case 'email':
        return 'Contact Us via Email';
      case 'phone':
      default:
        return 'Contact Us via Phone';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'phone' ? value.replace(/[^\d\s-+]/g, '') : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleCountryCodeChange = (code) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: code,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = formData.phone.replace(/\D/g, '');

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      newErrors.phone = 'Please enter a valid phone number (7-15 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const cleanPhone = formData.phone.trim();
      const fullPhoneNumber = `${formData.countryCode} ${cleanPhone}`;
      const googleSheetsPhone = `${formData.countryCode.replace('+', '')}${cleanPhone}`;

      const visaType =
        modalType === 'whatsapp'
          ? 'WhatsApp Consultation'
          : modalType === 'email'
          ? 'Email Consultation'
          : 'Phone Consultation';

      const formSource =
        modalType === 'whatsapp'
          ? 'whatsapp-widget'
          : modalType === 'email'
          ? 'email-widget'
          : 'phone-widget';

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: fullPhoneNumber,
          googleSheetsPhone: googleSheetsPhone,
          country: userGeo?.country || 'India',
          visaType: visaType,
          countryCode: formData.countryCode,
          formSource: formSource,
          from: formSource,
          fromCategory: 'floating-action-button',
          pageLink: typeof window !== 'undefined' ? window.location.href : '',
          pageName: typeof document !== 'undefined' ? document.title : 'JM Visa Services',
          userLocation: userGeo
            ? `${userGeo.city || ''}, ${userGeo.region || ''}, ${userGeo.country || ''}`.trim()
            : 'Unknown',
          userPincode: userGeo ? userGeo.pincode : 'Unknown',
          userIp: userGeo ? userGeo.ip : 'Unknown',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit form');
      }

      sessionStorage.setItem('formSubmitted', 'true');
      localStorage.setItem('lastFormSubmit', String(Date.now()));

      if (data.duplicate) {
        toast.info(data.message || 'Form already submitted recently.', {
          containerId: 'widget-toast',
        });
      } else {
        const successMsg =
          modalType === 'whatsapp'
            ? 'Thank you! Redirecting to WhatsApp...'
            : modalType === 'email'
            ? 'Thank you! Opening Email...'
            : 'Thank you! Connecting Call...';

        toast.success(successMsg, {
          containerId: 'widget-toast',
        });
      }

      // Track Google Ads conversion since user is redirected directly to WhatsApp/Phone/Email
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        try {
          window.gtag('event', 'conversion', {
            send_to: 'AW-18482140930/1VfBCMru2IodEIKu_OxE',
            value: 1.0,
            currency: 'INR',
          });
        } catch (gtagErr) {
          console.error('gtag conversion error:', gtagErr);
        }
      }

      const submittedModalType = modalType;
      const applicantName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
      const applicantEmail = formData.email.trim();

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+91',
      });
      setErrors({});

      setTimeout(() => {
        setModalType(null);
        if (submittedModalType === 'whatsapp') {
          const text = encodeURIComponent(
            `Hi JM Visa Services, I am interested in visa consultation. My name is ${applicantName}, Email: ${applicantEmail}`
          );
          window.location.href = `https://wa.me/919321315524?text=${text}`;
        } else if (submittedModalType === 'phone') {
          window.location.href = 'tel:+919321315524';
        } else if (submittedModalType === 'email') {
          const subject = encodeURIComponent('Visa Consultation Request - JM Visa Services');
          const body = encodeURIComponent(
            `Hi JM Visa Services,\n\nI am interested in visa consultation.\nName: ${applicantName}\nPhone: ${fullPhoneNumber}\nEmail: ${applicantEmail}`
          );
          window.location.href = `mailto:info@jmvisaservices.com?subject=${subject}&body=${body}`;
        }
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Failed to submit form. Please try again later.', {
        containerId: 'widget-toast',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.1, rotate: 360 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
        {!open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-3 mb-4"
          >
            <motion.button
              type="button"
              onClick={() => handleOpenModal('whatsapp')}
              className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg border border-blue-600 focus:outline-none cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Contact Us via WhatsApp"
            >
              <FaWhatsapp size={26} />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleOpenModal('email')}
              className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg border border-blue-600 focus:outline-none cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Contact Us via Email"
            >
              <FaEnvelope size={26} />
            </motion.button>

            <motion.button
              type="button"
              onClick={() => handleOpenModal('phone')}
              className="w-14 h-14 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg border border-blue-600 focus:outline-none cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Contact Us via Phone"
            >
              <FaPhone size={26} />
            </motion.button>
          </motion.div>
        )}

        <motion.button
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg focus:outline-none"
          onClick={() => setOpen(!open)}
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          aria-label={open ? 'Close Menu' : 'Open Menu'}
        >
          <div>
            {open ? (
              <div className="self-center">
                <IoMdChatboxes className="self-center h-8 w-8 block" />
                <IoIosRemove className="self-center h-8 w-8 hidden" />
              </div>
            ) : (
              <div className="self-center">
                <IoMdChatboxes className="self-center h-8 w-8 hidden" />
                <IoClose className="self-center h-7 w-7 block" />
              </div>
            )}
          </div>
        </motion.button>
      </div>

      {/* Contact Us Modal (Phone / WhatsApp / Email) */}
      {mounted &&
        createPortal(
          <>
            <ToastContainer
              containerId="widget-toast"
              position="top-right"
              autoClose={5000}
              className="mt-[70px] z-[10000]"
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <AnimatePresence>
              {isModalOpen && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[9999] flex items-center justify-center p-4 overflow-y-auto"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) handleCloseModal();
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-[480px] relative text-left my-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl sm:text-[26px] font-semibold text-gray-800 tracking-tight">
                        {getModalTitle()}
                      </h2>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100 focus:outline-none -mr-1"
                        aria-label="Close"
                      >
                        <IoClose className="w-6 h-6" />
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                      {/* First Name & Last Name */}
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full h-11 px-3.5 text-sm sm:text-base border ${
                              errors.firstName ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full h-11 px-3.5 text-sm sm:text-base border ${
                              errors.lastName ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full h-11 px-3.5 text-sm sm:text-base border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number *
                        </label>
                        <div className="flex">
                          <CountryCodeDropdown
                            value={formData.countryCode}
                            onChange={handleCountryCodeChange}
                            error={Boolean(errors.phone)}
                            height="h-11"
                            borderColor="border-gray-300"
                            bgColor="bg-white"
                            direction="down"
                          />
                          <div className="flex-1">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`w-full h-11 px-3.5 text-sm sm:text-base border border-l-0 ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              } rounded-r-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 sm:gap-4 pt-2">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="flex-1 py-2.5 sm:py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm sm:text-base hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 text-center"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 py-2.5 sm:py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 text-white rounded-lg font-medium text-sm sm:text-base shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-center flex items-center justify-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            'Submit'
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  );
};

export default FloatingActionButton;

