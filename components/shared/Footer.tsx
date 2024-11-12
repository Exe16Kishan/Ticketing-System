import React from "react";
import { Separator } from "@/components/ui/separator";
import { FaceIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ForwardIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="p-6 sm:p-10 bg-gray-50">
      <Separator />
      <div style={{ justifyContent: "space-between" }} className="flex flex-col lg:flex-row justify-center pt-6 gap-y-8 lg:gap-y-0 lg:gap-x-6 text-center lg:text-left">
        {/* Logo Section */}
        <div className="logo my-auto">
          <span className="text-4xl font-bold text-blue-500">Book Event</span>
        </div>

        {/* Information Section */}
        <div className="info gap-y-4">
          <span className="font-bold text-xl sm:text-2xl">Information</span>
          <div className="mt-4 flex flex-col items-center lg:items-start gap-y-2">
            <span>About</span>
            <span>Privacy Policy</span>
            <span>Refund Policy</span>
            <span>Terms and conditions</span>
            <span>FAQs</span>
            <span>Contact Us</span>
          </div>
        </div>

        {/* Resource Section */}
        <div className="resource gap-y-4">
          <span className="font-bold text-xl sm:text-2xl">Resource</span>
          <div className="mt-4 flex flex-col items-center lg:items-start gap-y-2">
            <span>Explore Event</span>
            <span>Pricing</span>
            <span>Event Organiser</span>
            <span>Sales Ticket</span>
            <span>Sign in</span>
          </div>
        </div>

        {/* Customer Care Section */}
        <div className="customer gap-y-4">
          <span className="font-bold text-xl sm:text-2xl">Customer Care</span>
          <div className="mt-4 flex flex-col items-center lg:items-start gap-y-2">
            <span className="font-bold">Address</span>
            <span>Lovely Professional University</span>
            <span>Phagwara, Punjab</span>
            <span>+9122312312312</span>
            <span>ems@gmail.com</span>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="follow gap-y-4">
          <span className="font-bold text-xl sm:text-2xl">Follow Us</span>
          <div className="mt-4 flex justify-center lg:justify-start gap-x-4">
            <FaFacebook className="h-5 w-5" />
            <BsYoutube className="h-5 w-5" />
            <TwitterLogoIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="news gap-y-4">
          <span className="font-bold text-xl sm:text-2xl">Newsletter</span>
          <div className="mt-4 flex flex-col items-center lg:items-start text-center lg:text-left gap-y-2">
            <span>Sign up to get updates on</span>
            <span>our newest events and offers</span>
            <div className="flex w-full max-w-sm items-center space-x-2 my-4">
              <Input type="email" placeholder="Email" />
              <Button type="submit">
                <ForwardIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
