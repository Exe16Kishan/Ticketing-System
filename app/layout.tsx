import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Providers from "./provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Book Event",
  description: "Reserve and manage event bookings seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body>
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
