"use client";

import { useAuth } from "@/context/auth";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

export default function AuthButtons() {
  // using it from firebase
  const auth = useAuth();

  if (auth?.currentUser) {
    return (
      // <div className="flex items-center space-x-4">
      //   <span className="text-white">{auth.currentUser.email}</span>
      //   <button className="text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800" onClick={()=>{auth.logout()}}>
      //     Logout
      //   </button>
      // </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            {!!auth.currentUser.photoURL && (
              <Image
                src={auth.currentUser.photoURL}
                alt="user profile"
                width={70}
                height={70}
              />
            )}

            <AvatarFallback>
              {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div>{auth.currentUser.displayName}</div>

            <div className="font-normal text-xs">{auth.currentUser.email}</div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/account"> My account</Link>
            </DropdownMenuItem>

            {!!auth.customClaims?.admin && (
              <DropdownMenuItem asChild>
                <Link href="/admin-dashboard"> Admin dashboard</Link>
              </DropdownMenuItem>
            )}

            {!auth.customClaims?.admin && (
              <DropdownMenuItem asChild>
                <Link href="/account/my-favourites"> My favourites</Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={async () => {
                await auth.logout();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
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
