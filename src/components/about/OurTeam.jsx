"use client";

import React from "react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

const teamMembers = [
  {
    name: "Jayesh More",
    role: "Co-Founder & CEO",
    image: "/images/team1.jpeg", // Replace with your image paths
    bio: "I am the co-founder of JM Visa and we’ve pushed our limits to make it successful.",
    linkedin: "https://www.linkedin.com/in/jayesh-jaywant-more-156360292",
    twitter: "#",
    email: "mailto:harsh@example.com",
  },
  {
    name: "Alexa Kimberly",
    role: "Lead Designer",
    image: "/images/profile.webp", // Replace with your image paths
    bio: "I’ve been lead designer since the beginning and enjoyed every bit.",
    linkedin: "https://linkedin.com/in/alexa",
    twitter: "https://twitter.com/alexa",
    email: "mailto:alexa@example.com",
  },
];

const OurTeamSection = () => {
  return (
    <section className="pt-16 pb-6">
      <div className="container mx-auto px-3 sm:px-12">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We provide all the expertise to simplify your visa and travel support without any hassle.
          </p>
        </div>

        {/* Team Members */}
        <div className="flex flex-row flex-wrap gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-row flex-1 min-w-[300px] sm:flex-row items-center p-3 md:p-5 gap-6  transition"
            >
              {/* Image Section */}
              <div className="w-32 h-full flex-shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Details Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-500 text-sm font-medium">{member.role}</p>
                <hr className="w-full border-b-[1px] border-gray-200 my-2" />
                <p className="text-gray-600 mt-4 text-sm">{member.bio}</p>

                {/* Social Links */}
                <div className="mt-4 flex gap-4">
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href={member.email}
                    className="text-gray-500 hover:text-blue-500 transition"
                  >
                    <FaEnvelope size={20} />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition"
                  >
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
