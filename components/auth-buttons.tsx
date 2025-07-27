"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function AuthButtons() {
  const auth = useAuth();

  if (auth?.currentUser) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-white">{auth.currentUser.email}</span>
        <button className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md hover:bg-gray-800">
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Login
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/register"
                className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Signup
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
