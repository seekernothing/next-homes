"use client";

import Link from "next/link";
import { HomeIcon } from "lucide-react";
import AuthButtons from "@/components/auth-buttons";

export default function Navbar() {
  return (
    <nav className="bg-black text-white py-2 px-3 sm:px-4 flex items-center justify-between rounded-2xl m-1 transition-all">
      <Link
        href="/"
        className="text-white font-bold text-lg sm:text-xl hover:text-gray-300 transition-colors flex gap-2 items-center"
      >
        <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden sm:inline">Next Homes</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-6">
        <ul className="flex items-center">
          <li>
            <Link
              className="hover:bg-gray-800 px-2 py-1.5 sm:p-2 rounded-lg text-xs sm:text-base transition-colors whitespace-nowrap"
              href="/property-search"
            >
              Property-search
            </Link>
          </li>
        </ul>
        <AuthButtons />
      </div>
    </nav>
  );
}
