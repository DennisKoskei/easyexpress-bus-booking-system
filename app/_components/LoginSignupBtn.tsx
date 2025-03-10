"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";

const LoginSignupBtn = () => {
  const { data: session } = useSession();

  return (
    <div className="ml-auto flex items-center gap-4">
      {session ? (
        <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-600 text-white shadow-md">
          {/* User Avatar */}
          {session.user?.image ? (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="User Avatar"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-white" />
          )}
          {/* User Name */}
          <p className="text-sm font-medium">{session.user?.name || "User"}</p>
        </div>
      ) : (
        <Link href="/login">
          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
            Login / Sign Up
          </button>
        </Link>
      )}
    </div>
  );
};

export default LoginSignupBtn;
