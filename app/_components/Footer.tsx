import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-10 px-8 md:px-20">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between pb-20 border-b border-gray-700">
        {/* Company Info */}
        <div className="md:w-1/3 space-y-3">
          <h3 className="text-2xl font-bold text-blue-400">EasyExpress</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            EasyExpress is the world&apos;s largest online bus ticket booking
            service trusted by over 5 million happy customers countrywide.
            EasyExpress offers bus ticket booking through its website, iOS and
            Android mobile apps for all major routes.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap md:flex-nowrap gap-x-14 mt-6 md:mt-0">
          <div>
            <h2 className="text-lg font-semibold pb-2">Info</h2>
            <ul className="text-gray-400 space-y-1">
              <li className="hover:text-blue-400 cursor-pointer">T&C</li>
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
            <h2 className="text-lg font-semibold pb-2">Explore</h2>
            <ul className="text-gray-400 space-y-1">
              <li className="hover:text-blue-400 cursor-pointer">
                Popular Routes
              </li>
              <li className="hover:text-blue-400 cursor-pointer">
                Bus Operators
              </li>
              <li className="hover:text-blue-400 cursor-pointer">Careers</li>
              <li className="hover:text-blue-400 cursor-pointer">Blog</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold pb-2">Legal</h2>
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
      <div className="flex flex-col md:flex-row justify-between items-center pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <p className="text-gray-400 text-sm">
            © 2025 EasyExpress-Coaches - All Rights Reserved.
          </p>
          <p className="text-gray-400 text-sm underline">
            <Link
              href={
                "https:www.github.com/DennisKoskei/easyexpress-bus-booking.git"
              }
            >
              View this Project on Github
            </Link>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebook className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          <FaXTwitter className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-500 transition" />
          <FaInstagram className="w-6 h-6 text-gray-400 hover:text-pink-500 transition" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
