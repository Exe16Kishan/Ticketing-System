"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { TicketIcon } from "lucide-react"


const Navbar = () => {
  const { data: session, status } = useSession();
  

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div >
            <Link href="/"><img src="/image.png" className="object-contain h-44 w-44"/></Link>       
        </div>
        <div className="flex items-center gap-6 lg:gap-12">
          <ul className="hidden sm:flex  font-semibold items-center gap-4 lg:gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {status == "authenticated" && (
              <li>
                <Link href="/create">Create</Link>
              </li>
            )}
          </ul>

          {/* Check if the user is authenticated */}
          {status !== "authenticated" ? (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Sign up
                </Button>
              </Link>
            </div>
          ) : (
            // Display the user's profile popover
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer h-12 w-12">
                  <AvatarImage 
                    src={session.user?.image || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 sm:w-80">
                <div className="flex gap-3 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        session.user?.image || "https://github.com/shadcn.png"
                      }
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{session.user?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-500 my-2">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <TicketIcon />
                    <Button variant="link">
                      <Link href={`/ticket/user/${session.user?.id}`}>Bookings</Link>
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={() => signOut({ redirectTo: "/" })}>
                      Log out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
