"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    FiArrowRight,
    FiBriefcase,
    FiGlobe,
    FiUsers,
    FiCheckCircle,
    FiSend,
    FiBookOpen,
    FiAward,
    FiHeart,
    FiCode,
    FiTrendingUp,
    FiCoffee,
    FiActivity,
    FiDollarSign,
    FiHome,
    FiStar,
} from "react-icons/fi";
import { MdLocalPhone, MdSupportAgent } from "react-icons/md";

const destinations = [
    {
        name: "Japan",
        city: "Tokyo, Osaka & more",
        image: "/images/internship/japan.png",
        color: "from-rose-500 to-pink-600",
    },
    {
        name: "South Korea",
        city: "Seoul, Busan & more",
        image: "/images/internship/south-korea.png",
        color: "from-sky-500 to-blue-600",
    },
    {
        name: "Australia",
        city: "Sydney, Melbourne & more",
        image: "/images/internship/australia.png",
        color: "from-amber-500 to-orange-600",
    },
    {
        name: "Canada",
        city: "Toronto, Vancouver & more",
        image: "/images/internship/canada.png",
        color: "from-red-500 to-rose-600",
    },
    {
        name: "United Kingdom",
        city: "London, Manchester & more",
        image: "/images/internship/uk.png",
        color: "from-indigo-500 to-purple-600",
    },
    {
        name: "Germany",
        city: "Berlin, Munich & more",
        image: "/images/internship/germany.png",
        color: "from-emerald-500 to-teal-600",
    },
];

const industries = [
    { name: "Business Development", icon: FiBriefcase, desc: "Strategy, operations & growth" },
    { name: "Marketing & PR", icon: FiTrendingUp, desc: "Digital marketing & communications" },
    { name: "Information Technology", icon: FiCode, desc: "Software, data & cloud computing" },
    { name: "Engineering", icon: FiStar, desc: "Mechanical, civil & electrical" },
    { name: "Finance & Accounting", icon: FiDollarSign, desc: "Banking, auditing & fintech" },
    { name: "Hospitality & Tourism", icon: FiCoffee, desc: "Hotels, events & travel" },
    { name: "Healthcare & Medical", icon: FiActivity, desc: "Clinical, pharma & research" },
    { name: "Education & Training", icon: FiBookOpen, desc: "Teaching, EdTech & mentoring" },
];

const steps = [
    {
        step: "01",
        title: "Apply Online",
        desc: "Fill out our simple application form with your interests and preferred destination.",
        icon: FiSend,
    },
    {
        step: "02",
        title: "Get Matched",
        desc: "Our team matches you with the ideal company based on your profile and career goals.",
        icon: FiUsers,
    },
    {
        step: "03",
        title: "Visa & Preparation",
        desc: "We handle your visa application, accommodation, and pre-departure orientation.",
        icon: FiGlobe,
    },
    {
        step: "04",
        title: "Start Interning",
        desc: "Begin your international internship adventure with ongoing support from our team.",
        icon: FiCheckCircle,
    },
];

const benefits = [
    {
        title: "Visa Support",
        desc: "End-to-end visa processing and documentation assistance for a smooth experience.",
        icon: FiGlobe,
    },
    {
        title: "Accommodation Help",
        desc: "We arrange safe, affordable accommodation near your internship workplace.",
        icon: FiHome,
    },
    {
        title: "24/7 Support",
        desc: "Round-the-clock assistance throughout your internship journey abroad.",
        icon: MdSupportAgent,
    },
    {
        title: "Career Mentoring",
        desc: "Guidance from industry professionals to maximize your internship experience.",
        icon: FiAward,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
    }),
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const InternshipPage = () => {
    return (
        <div className="relative mt-[80px] bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen overflow-hidden">
            {/* ── HERO SECTION ── */}
            <section className="relative py-20 px-6 sm:px-12 overflow-hidden">
                {/* Decorative blurs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl -z-10" />

                <motion.div
                    className="container mx-auto flex flex-col lg:flex-row items-center gap-12"
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                >
                    {/* Left Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <motion.div
                            className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md"
                            variants={fadeUp}
                        >
                            🌏 International Internship Program
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
                            variants={fadeUp}
                        >
                            Internships{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                with a Purpose
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-gray-600 max-w-lg"
                            variants={fadeUp}
                        >
                            Launch your global career with JM Visa&apos;s curated internship
                            program. Gain real-world experience in culturally diverse
                            destinations across Asia, Europe, and beyond.
                        </motion.p>

                        <motion.div className="flex flex-wrap gap-4" variants={fadeUp}>
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                Apply Now <FiArrowRight />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-3.5 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                            >
                                <MdLocalPhone /> Have Questions?
                            </Link>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            className="flex items-center gap-6 pt-4"
                            variants={fadeUp}
                        >
                            {[
                                { val: "500+", label: "Interns Placed" },
                                { val: "20+", label: "Countries" },
                                { val: "98%", label: "Satisfaction" },
                            ].map((b) => (
                                <div key={b.label} className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">{b.val}</p>
                                    <p className="text-xs text-gray-500">{b.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Hero Image Collage */}
                    <motion.div
                        className="lg:w-1/2 relative"
                        variants={fadeUp}
                        custom={0.3}
                    >
                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/40">
                            <Image
                                src="/images/internship/japan.png"
                                alt="Internship Abroad"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
                                    <p className="text-white font-bold text-lg">
                                        Your Global Career Starts Here
                                    </p>
                                    <p className="text-white/80 text-sm">
                                        Customized internships across 20+ countries
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-400 to-pink-500 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-sm rotate-6">
                            Apply Now! 🚀
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── DESTINATIONS ── */}
            <section className="py-20 px-6 sm:px-12">
                <motion.div
                    className="container mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="text-center mb-14" variants={fadeUp}>
                        <span className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md mb-4">
                            🗺️ Popular Destinations
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Where Do You Want to{" "}
                            <span className="text-blue-600">Intern Abroad?</span>
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            From bustling metropolises to serene historical towns — your
                            adventure awaits in one of our exciting destinations.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={dest.name}
                                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -8 }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div
                                        className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${dest.color} mb-2`}
                                    >
                                        {dest.city}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                                </div>
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-blue-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                                    <span className="text-white font-bold text-lg flex items-center gap-2">
                                        Explore Internships <FiArrowRight />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="text-center mt-10" variants={fadeUp}>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                            View All Destinations <FiArrowRight />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── INTERNSHIP FIELDS ── */}
            <section className="py-20 px-6 sm:px-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

                <motion.div
                    className="container mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="text-center mb-14" variants={fadeUp}>
                        <span className="inline-block px-4 py-2 bg-white/10 text-blue-200 font-medium rounded-full backdrop-blur-lg shadow-md mb-4">
                            💼 Find Your Field
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                            Your Ideal{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                                Internship
                            </span>
                        </h2>
                        <p className="mt-3 text-blue-200 max-w-2xl mx-auto">
                            We partner with leading companies and organizations across
                            industries, ensuring the perfect fit for your career goals.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((ind, i) => (
                            <motion.div
                                key={ind.name}
                                className="group p-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 cursor-pointer"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <ind.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                    {ind.name}
                                </h3>
                                <p className="text-blue-300 text-sm">{ind.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="text-center mt-10" variants={fadeUp}>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Explore All Fields <FiArrowRight />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="py-20 px-6 sm:px-12">
                <motion.div
                    className="container mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="text-center mb-14" variants={fadeUp}>
                        <span className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md mb-4">
                            ⚙️ Simple Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            How Does Our{" "}
                            <span className="text-blue-600">Program Work?</span>
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            Four simple steps to launch your international career journey with
                            JM Visa Services.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.step}
                                className="relative p-8 bg-white/40 border border-white/30 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -5 }}
                            >
                                {/* Step number */}
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                    {s.step}
                                </div>
                                <div className="w-16 h-16 mx-auto mt-4 mb-5 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                                    <s.icon className="text-blue-600 text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {s.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{s.desc}</p>

                                {/* Connector line (not on last) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-blue-300" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── WHY CHOOSE JM VISA ── */}
            <section className="py-20 px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <motion.div
                    className="container mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.div className="text-center mb-14" variants={fadeUp}>
                        <span className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md mb-4">
                            ❤️ Why JM Visa
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                            Why Choose{" "}
                            <span className="text-blue-600">JM Visa Services?</span>
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            We don&apos;t just arrange internships — we craft complete
                            international experiences with end-to-end support.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                className="relative p-7 bg-white/60 border border-white/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                                variants={fadeUp}
                                custom={i}
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 blur-2xl rounded-full -z-10 group-hover:bg-blue-300/40 transition-colors" />
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <b.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {b.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── UNIVERSITY & EMPLOYER PARTNERSHIP ── */}
            <section className="py-16 px-6 sm:px-12">
                <motion.div
                    className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    {/* University Partnership */}
                    <motion.div
                        className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl text-white overflow-hidden relative"
                        variants={fadeUp}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <FiBookOpen className="text-4xl mb-4 text-blue-200" />
                        <h3 className="text-2xl font-bold mb-3">University Partnership</h3>
                        <p className="text-blue-100 mb-6">
                            Is your university seeking a high-quality international internship
                            program for students? Let&apos;s connect and build the future
                            together.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300"
                        >
                            Contact Us <FiArrowRight />
                        </Link>
                    </motion.div>

                    {/* Hire Interns */}
                    <motion.div
                        className="p-8 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl shadow-xl text-white overflow-hidden relative"
                        variants={fadeUp}
                        custom={1}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                        <FiUsers className="text-4xl mb-4 text-orange-200" />
                        <h3 className="text-2xl font-bold mb-3">Hire Interns</h3>
                        <p className="text-orange-100 mb-6">
                            Are you an employer looking for talented, motivated interns for
                            your business? We connect you with the best candidates worldwide.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300"
                        >
                            Contact Us <FiArrowRight />
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="py-20 px-6 sm:px-12">
                <motion.div
                    className="container mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                >
                    <div className="relative p-12 sm:p-16 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                                    Ready to Start Your
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
                                        Internship Journey?
                                    </span>
                                </h2>
                                <p className="mt-4 text-blue-200 max-w-lg">
                                    Ignite your global career with JM Visa Services and embark on
                                    an unforgettable professional adventure abroad.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="px-10 py-4 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    Apply Now <FiArrowRight />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="px-10 py-4 border-2 border-white/40 text-white rounded-full font-bold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                                >
                                    Talk to Us <MdLocalPhone />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default InternshipPage;
