"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TbAirBalloon } from "react-icons/tb";
import { navLinks } from "@constants/constants";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { verifySession } from "@utils/02-stateless-session";

// Function to fetch user avatar from API
const fetchUserAvatar = async (userId: string) => {
  try {
    const response = await fetch(`/api/user/avatar?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch avatar");
    const data = await response.json();
    return data.avatarUrl;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null;
  }
};

const Header = () => {
  const { data: session } = useSession(); // NextAuth session
  const [userId, setUserId] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Fetch user session & avatar on mount
  useEffect(() => {
    const getSessionData = async () => {
      try {
        const id = await verifySession();
        if (id) {
          setUserId(id);
          const avatarUrl = await fetchUserAvatar(id);
          setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    getSessionData();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-blue-800 shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
            <TbAirBalloon className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xl md:text-2xl font-extrabold italic">
            EasyExpress
          </span>
        </Link>

        {/* MOBILE HAMBURGER */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.URL}>
              <span className="relative text-white text-base font-medium after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                {link.text}
              </span>
            </Link>
          ))}
        </nav>

        {/* AUTH / PROFILE */}
        <div className="flex items-center space-x-4">
          {session ? (
            <div
              className="relative flex items-center gap-3 p-2 rounded-lg bg-blue-600 text-white shadow-md cursor-pointer hover:bg-blue-700 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {/* User Avatar */}
              {avatar ? (
                <Image
                  src={avatar}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="User Avatar"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-white" />
              )}
              {/* User Name */}
              <p className="text-sm font-medium">
                {session.user?.name || "User"}
              </p>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-5 py-2 text-white font-semibold rounded-lg border-2 border-white bg-transparent hover:bg-white hover:text-blue-600 hover:border-4 hover:scale-105 transition-all duration-300 ease-in-out">
                Login | Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Dropdown Menu (when menuOpen is true) */}
      {menuOpen && session && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}

      {/* MOBILE MENU WITH SLIDE-IN AND OVERLAY */}
      {menuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Slide-In Mobile Menu */}
          <div className="fixed top-0 right-0 w-3/4 sm:w-1/2 bg-blue-800 p-6 z-50 transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <span className="text-white text-xl font-semibold">Menu</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="mt-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.URL}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-white text-lg">{link.text}</span>
                </Link>
              ))}

              {/* AUTH / PROFILE */}
              <div className="mt-6">
                {!session ? (
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <button className="text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-800 transition duration-300 w-full">
                      Sign In
                    </button>
                  </Link>
                ) : (
                  <div
                    className="flex items-center space-x-2 text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {avatar ? (
                      <Image
                        src={avatar}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-white"
                        alt="User Avatar"
                      />
                    ) : (
                      <FaUserCircle className="w-10 h-10 text-white" />
                    )}
                    <span className="text-sm font-medium">
                      {session.user?.name || "User"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
