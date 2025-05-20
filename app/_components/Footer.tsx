import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { SOCIAL_LINKS } from "@constants/constants";
import { STRINGS } from "@constants/strings";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10 px-8 md:px-20">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between pb-28 pt-10 border-b border-gray-700">
        {/* Company Info */}
        <div className="w-full flex flex-wrap sm:flex-nowrap sm:w-full md:w-1/2 space-x-0 sm:space-x-5 flex-row">
          {/* Logo Section */}
          <div className="w-1/2 flex flex-col sm:w-1/3 justify-start mb-4 sm:mb-0">
            <div className="w-24 h-24 md:w-36 md:h-36 relative">
              <Image
                src="/Assets/easyexpress-bus-logo.png"
                alt="EasyExpress Logo"
                width={300}
                height={100}
                className="h-auto w-auto max-w-full object-contain"
              />
            </div>
            <div className="text-gray-500 mt-2 md:mt-5 flex flex-col mr-0 md:-mr-36 mb-0 md:-mb-12 pr-6 md:pr-0 pb-0 md:pb-4">
              <div className="flex flex-row pb-1 md:pb-0 items-center">
                <Phone className="w-4 h-4 mr-2  text-gray-700 group-hover:text-black" />
                <p className="pb-1 md:text-sm text-[11px] ">
                  {" "}
                  {STRINGS.customerSupport.phone}
                </p>
              </div>
              <div className="flex flex-row pb-1 md:pb-0 items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-700 group-hover:text-black" />
                <p className="pb-1 md:text-sm text-[11px] ">
                  {" "}
                  {STRINGS.customerSupport.email}
                </p>
              </div>
              <div className="flex flex-row pb-1 md:pb-0 items-start md:items-center">
                <MapPin className="w-8 md:w-4 h-8 md:h-4 mr-2 text-gray-700 " />
                <p className="pb-1 md:text-sm text-[11px] ">
                  {STRINGS.customerSupport.physicalAddress}
                  {", "}
                  {STRINGS.customerSupport.location}
                </p>
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-1/2 sm:w-2/3 space-y-3 text-left">
            <h3 className="text-2xl font-bold text-blue-400">
              {" "}
              {STRINGS.company.name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {" "}
              {STRINGS.company.info}
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap md:flex-nowrap gap-y-4 md:gap-y-0 gap-x-16 mt-6 md:mt-0 text-sm">
          <div>
            <h2 className="text-lg font-semibold pb-2"> Info </h2>
            <ul className="text-gray-400 space-y-1 ">
              <li className="hover:text-blue-400 cursor-pointer"> T & C </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                User Agreement
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Insurance Partner
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold pb-2"> Explore </h2>
            <ul className="text-gray-400 space-y-1">
              <li className="hover:text-blue-400 cursor-pointer">
                Popular Routes
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Bus Operators
              </li>
              <li className="hover:text-blue-400 cursor-pointer"> Careers </li>
              <li className="hover:text-blue-400 cursor-pointer"> Blog </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold pb-2"> Legal </h2>
            <ul className="text-gray-400 space-y-1">
              <li className="hover:text-blue-400 cursor-pointer">
                Terms of Use
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Cookie Policy
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row text-center sm:text-left justify-between items-center pt-6">
        <div className="flex flex-col md:flex-row md:gap-x-4 items-center md:items-start">
          <p className="text-gray-400 text-sm flex flex-col md:flex-row items-center">
            {STRINGS.copyright.year}
            <span className="md:ml-2">{STRINGS.copyright.text}</span>
          </p>

          <a
            href={SOCIAL_LINKS.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 flex items-center mt-2 md:mt-0 hover:text-blue-600 transition underline underline-offset-3 text-sm"
          >
            <FaGithub className="w-4 h-4 mr-1" />
            View this Project on GitHub
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-10 md:mt-0">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6 text-gray-400 hover:text-pink-500 transition" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
