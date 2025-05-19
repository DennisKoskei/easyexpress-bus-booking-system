"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TbAirBalloon } from "react-icons/tb";
import { navLinks } from "@constants/constants";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AVATAR_URL } from "@constants/constants";

const Header = () => {
  const { data: session } = useSession(); // NextAuth session
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dafaultAvatarUrl = AVATAR_URL;

  // Define routes where we want the transparent-to-colored scroll effect
  const scrollHeaderRoutes = ["/", "/login", "/about"];
  const shouldScrollEffect = scrollHeaderRoutes.includes(pathname);
  const [isScrolled, setIsScrolled] = useState(() =>
    shouldScrollEffect ? false : true,
  );

  useEffect(() => {
    // Fetch user avatar only if session exists
    if (session?.user?.id) {
      const fetchAvatar = async () => {
        try {
          const response = await fetch("/api/user/profile");
          if (!response.ok) throw new Error("Failed to fetch avatar");
          const data = await response.json();
          const { avatarUrl } = data;
          setAvatar(avatarUrl ?? dafaultAvatarUrl);
        } catch (error) {
          console.error("Error fetching avatar:", error);
          setAvatar(null);
        }
      };
      fetchAvatar();
    }

    if (shouldScrollEffect) {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [session?.user?.id, shouldScrollEffect]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-blue-800 shadow-md" : "bg-transparent"} ${!shouldScrollEffect ? "bg-blue-900 shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 sm:h-20">
        {/* LOGO */}
        <div className="flex w-1/2 items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
              <TbAirBalloon className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl md:text-2xl font-extrabold italic">
              EasyExpress
            </span>
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="flex w-1/2 items-center justify-end">
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
          <nav className="hidden md:flex space-x-6 items-center mx-4">
            {navLinks.map((link) => (
              <Link key={link.id} href={link.URL}>
                <p className="relative text-white font-medium after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                  {link.text}
                </p>
              </Link>
            ))}
          </nav>
          <p className="px-2 font-thin text-xl text-white"> | </p>

          {/* AUTH / PROFILE */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div
                className="relative flex items-center gap-3 p-2 rounded-lg bg-blue-600 text-white shadow-md cursor-pointer hover:bg-blue-700 transition"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {avatar ? (
                  <Image
                    src={avatar}
                    width={40}
                    height={40}
                    className="w-5 h-5 sm:w-10 sm:h-10 rounded-full border-0.5 border-white"
                    alt="User Avatar"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-white" />
                )}
                <p className="text-sm font-medium">
                  {session.user?.name || "User"}
                </p>
              </div>
            ) : (
              <Link href="/login">
                <div className="flex items-center gap-x-2 text-white p-4 rounded-lg hover:bg-white/5 hover:backdrop-blur-sm transition-all duration-300 ease-in-out cursor-pointer hover:scale-105">
                  <FaUserCircle className="text-xl" />
                  <span className="text-sm font-medium">Signup / Login</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

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
            <div className="mt-6 space-y-6 flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.URL}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="flex flex-row py-4">
                    <span className="relative text-white font-medium after:block after:content-[''] after:absolute after:h-[2px] after:bg-yellow-300 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
                      {link.text}
                    </span>
                  </div>
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
