"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hooks must be called unconditionally at the top level
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Conditional return must come after all Hooks are called
  if (!session) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signOut();
    setIsDropdownOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative text-xs text-gray-100 flex gap-2 items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">

      <button
        onClick={toggleDropdown}
        className="flex gap-2 items-center focus:outline-none"
      >
        <Image
          src={session?.user?.image as string}
          alt="userImage"
          width={200}
          height={200}
          className="w-10 rounded-full"
          priority
        />
        <div className="text-left">
          <p className="line-clamp-1">Hello, {session?.user?.name}</p>
          <p className="text-white font-bold text-sm">
            Account & Lists
          </p>
        </div>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute top-full right-[-4px] mt-3 w-48 bg-white text-gray-800 rounded-md shadow-2xl z-50 overflow-hidden 
                     opacity-100 transition-opacity duration-300"
        >
          <a
            href={"/orders"}
            className="w-full block p-3 text-sm font-medium hover:bg-gray-100 transition-colors border-t border-gray-100"
          >
            Your Orders
          </a>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default SignOutButton;
