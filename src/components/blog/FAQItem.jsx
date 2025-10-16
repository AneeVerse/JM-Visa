"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FAQItem = ({ faq, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-6 last:border-b-0">
      <button
        type="button"
        className="flex justify-between items-center w-full text-left text-gray-800 font-medium py-3 hover:text-blue-600 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-lg">{faq.question}</span>
        <span className={`text-blue-500 text-xl transition-transform duration-200 ${isExpanded ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;