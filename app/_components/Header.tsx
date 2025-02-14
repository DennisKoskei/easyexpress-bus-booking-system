import React from "react";
import Link from "next/link";
import { TbAirBalloon } from "react-icons/tb";
import { navLinks } from "../constants/constants";
import { FaUserCircle } from "react-icons/fa";

const isLoggedIn = false; // Change this to check login status dynamically

const Header = () => {
  return (
    <div className="flex flex-row h-20 px-20 py-4 bg-blue-800">
      {/* LOGO */}
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-rose-500 rounded-full flex flex-col items-center justify-center">
          <TbAirBalloon className="w-6 h-6 text-white" />
        </div>
        <p className=" text-xl md:text-2xl text-white italic font-extrabold ">
          {" "}
          EasyExpress{" "}
        </p>
      </div>
      {/* NAVIGATION LINKS */}
      <div className="flex flex-row ml-auto px-2 gap-1 justify-items-end">
        <div className="flex-row ml-auto px-2 gap-4 justify-items-end">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.URL}
                className="py-2 px-2 rounded-xl items-end justify-end"
              >
                <p className="relative text-white text-base font-medium w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-yellow-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition duration-300 after:origin-right">
                  {" "}
                  {link.text}{" "}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <FaUserCircle className="w-8 h-8 text-white" />
              <p className="text-white text-sm font-medium">John Doe</p>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-2 bg-yellow-400 text-blue-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
