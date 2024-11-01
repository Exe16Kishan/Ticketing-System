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

const Navbar = () => {
  const { data: session, status } = useSession();

  return (  
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#2f4cf3]">Book Event</span>{" "}
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/events'>Events</Link></li>
            <li><Link href='/about'>About</Link></li>
          </ul>

          {/* Check if the user is authenticated */}
          {status !== "authenticated" ? (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin"><Button variant="outline">Login</Button></Link>
              <Link href="/auth/signup"><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Sign up</Button></Link>
            </div>
          ) : (
            // Display the user's profile popover
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session.user?.image || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="W-80">
                <div className="flex gap-3 items-center">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={session.user?.image || "https://github.com/shadcn.png"} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{session.user?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-300 my-2">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User />
                    <Button variant="link"><Link href='/profile'>View Profile</Link></Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={() => signOut()}>Log out</Button>
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
