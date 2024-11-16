"use client";

import { useState } from "react";
import { createOrder } from "../api/payment";

function Page() {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const handlePayment = async () => {
    try {
      const order = await createOrder(500); // Call the server action and get order details

      if (order) {
        const razorpayOptions = {
          key: process.env.RAZORPAY_KEY!, // Replace with your Razorpay key
          amount: 500 * 100,
          currency: "INR",
          order_id: order.order_ID, // Pass the received order ID
          handler: async (response: any) => {
            console.log("Payment successful", response);
            // Optionally, call another server action to verify the payment
          },
          prefill: {
            name: "kishan", // Prefill details
            email: "kishan@example.com",
            contact: "555555",
          },
        };

        const rzp = new (window as any).Razorpay(razorpayOptions);
        rzp.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={!razorpayLoaded}>
        Pay Now
      </button>
    </div>
  );
}

export default Page;
