"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const PromoSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true }); // Hook to detect when section comes into view
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    { value: 500, label: "Visas Approved" },
    { value: 4, label: "Years of Experience" },
    { value: 200, label: "Happy Clients" },
    { value: 7, label: "Awards Won" },
  ];

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        const duration = 1500; // Duration in ms
        const interval = 30; // Update interval in ms
        const increment = Math.ceil(stat.value / (duration / interval));

        let count = 0;
        const timer = setInterval(() => {
          count += increment;
          setCounters((prev) => {
            const newCounters = [...prev];
            newCounters[index] = Math.min(count, stat.value);
            return newCounters;
          });

          if (count >= stat.value) {
            clearInterval(timer);
          }
        }, interval);
      });
    }
  }, [inView]);

  return (
    <section
      ref={ref}
      className="relative pb-16 sm:pb-20 sm:py-10 "
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-4 sm:p-6 bg-white bg-opacity-10 border-gray-200 border-[1px] backdrop-blur-lg shadow-lg rounded-xl text-center hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {counters[index]}{(index === 0 || index == 2 )?<sup className="text-md">+</sup> : ""}
              </h3>
              <p className="mt-2 text-gray-100 text-sm sm:text-lg font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
