import type { Metadata } from "next";

import "./globals.css";
import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import AuthButtons from "@/components/auth-buttons";
import { AuthProvider } from "@/context/auth";
import { HomeIcon } from "lucide-react";
import {Poppins} from "next/font/google"

const poppins = Poppins({
  subsets:["latin"],
  weight:["100","200","300","400","500","600","700","800"]
})



export const metadata: Metadata = {
  title: "Next-Homes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {/* <nav className="bg-black text-white p-3 h-24 flex items-center justify-between rounded-2xl m-2">
          <Link href="/">Next Homes</Link>
          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/register">Signup</Link>
            </li>
          </ul>
        </nav> */}

        <AuthProvider>
          <nav className="bg-black text-white py-2 px-4  flex items-center justify-between rounded-2xl m-1">
            <Link
              href="/"
              className="text-white font-bold text-xl hover:text-gray-300 transition-colors flex gap-2 items-center"
            >
              <HomeIcon/>
              <span> Next Homes</span>
            </Link>

            <div className="flex items-center space-x-6">
              <ul>
                <li>
                  <Link className=" hover:bg-gray-800 p-2 rounded-lg" href="/propert-search"> Property-search </Link>
                </li>
              </ul>
              <AuthButtons />
            </div>
          </nav>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
