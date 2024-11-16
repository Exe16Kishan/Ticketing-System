"use client";
import { createBooking } from "@/app/actions/bookTicket";
import { eventDetail } from "@/app/actions/events";
import { createOrder, verifyPayment } from "@/app/api/payment";
import EventCasteCard from "@/components/event-caste";
import EventQuidelines from "@/components/EventQuidelines";
import FrequentlyAskedQuestion from "@/components/FrequentlyAskedQuestion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function EventDetail({ params }: any) {
  const session = useSession();
  const router = useRouter();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);

  // api approach
  // const createOrderId = async () => {
  //   try {
  //     const response = await fetch("/api/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount: eventData?.price! * 100,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data.orderId);
  //     return data.orderId;
  //   } catch (error) {
  //     console.error("There was a problem with your fetch operation:", error);
  //   }
  // };

  // const processPayment = async () => {
  //   try {
  //     const orderId: string = await createOrderId();
  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  //       amount: eventData?.price! * 100,
  //       currency: "INR",
  //       name: "name",
  //       description: "description",
  //       order_id: orderId,
  //       handler: async function (response: any) {
  //         const data = {
  //           orderCreationId: orderId,
  //           razorpayPaymentId: response.razorpay_payment_id,
  //           razorpayOrderId: response.razorpay_order_id,
  //           razorpaySignature: response.razorpay_signature,
  //         };

  //         const result = await fetch("/api/verify", {
  //           method: "POST",
  //           body: JSON.stringify(data),
  //           headers: { "Content-Type": "application/json" },
  //         });
  //         const res = await result.json();
  //         if (res.isOk) alert("payment succeed");
  //         else {
  //           alert(res.message);
  //         }
  //       },
  //       prefill: {
  //         name: "kishan",
  //         email: "kishan@gmail.com",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };
  //     const paymentObject = new (window as any).Razorpay(options);
  //     paymentObject.on("payment.failed", function (response: any) {
  //       alert(response.error.description);
  //     });
  //     paymentObject.open();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handlePayment = async () => {
  //   try {
  //     const order = await createOrder(eventData?.price!); // create order

  //     if (order?.success) {
  //       const razorpayOptions = {
  //         key: process.env.RAZORPAY_KEY!,
  //         amount: order.amount ,
  //         currency: 'INR',
  //         order_id: order.order_ID,
  //         handler: async (response:PaymentResponse ) => {
  //           console.log(response)
  //           try {
  //             // Verify the payment first
  //             const data = {
  //               orderCreationId: order.order_ID,
  //               razorpayPaymentId: response.razorpay_payment_id,
  //               razorpayOrderId: response.razorpay_order_id,
  //               razorpaySignature: response.razorpay_signature,
  //             };
  //             const verify = await verifyPayment(data);

  //             if (verify.success) {
  //               // Call handleSubmit
  //               handleSubmit();
  //             } else {
  //               console.error('Payment verification failed.');
  //             }
  //           } catch (error) {
  //             console.error('Error verifying payment:', error);
  //           }

  //         },
  //         prefill: {
  //           name: "kishan",
  //           email: "kishan@example.com",
  //           contact: "555555",
  //         },
  //       };

  //       const rzp = new (window as any).Razorpay(razorpayOptions);
  //       rzp.open();
  //     } else {
  //       console.error('Razorpay SDK not loaded');
  //     }
  //   } catch (error) {
  //     console.error('Error creating order', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await eventDetail(params.eventId);
        if (data?.success) {
          setEventData(data.eventDetail);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchData();
  }, [params.eventId]);

  if (!eventData) return <div>Loading...</div>;

 const handlePayment = async () => {
    try {
      const order = await createOrder(eventData?.price!); // create order
      
      if (order?.success) {
        const razorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
          amount: order.amount , 
          currency: 'INR',
          order_id: order.order_ID,
          handler: async (response:PaymentResponse ) => {
            console.log(response)
            try {
              // Verify the payment first
              const data = {
                orderCreationId: order.order_ID,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              };
              const verify = await verifyPayment(data);
  
              if (verify.success) {
                // Call handleSubmit 
                handleSubmit();
              } else {
                console.error('Payment verification failed.');
              }
            } catch (error) {
              console.error('Error verifying payment:', error);
            }
           
            
          },
          prefill: {
            name: "kishan",
            email: "kishan@example.com",
            contact: "555555",
          },
        };
  
        const rzp = new (window as any).Razorpay(razorpayOptions);
        rzp.open();
      } else {
        console.error('Razorpay SDK not loaded');
      }
    } catch (error) {
      console.error('Error creating order', error);
    }
  };

  const handleSubmit = async () => {
      // fix the code about
      const data = {
        eventId: eventData?.id,
        userId: session.data?.user?.id,
        price: eventData?.price,
        title: eventData.title,
        location: eventData.location,
      };

      const result = await createBooking(data);
      if (result?.success) {
        setTicketId(result.ticketId)
      }

  };

  return (
    <div className="bg-gray-200">
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[66vh] mb-10"
        style={{ backgroundImage: `url('/event.jpg')` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Components centered */}
        <div className="relative z-10 flex justify-center items-center h-full max-w-7xl mx-auto px-4 gap-5">
          {/* Left part - 1/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <Image
              className="border-4 rounded-xl"
              src={"/event.jpg"}
              height={540}
              width={540}
              alt="QR Code or Event Image"
            />
          </div>

          {/* Right part - 2/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <h1 className="text-white text-4xl font-bold">
              {eventData?.title}
            </h1>
            <p className="text-white">{eventData?.description}</p>

            <button
              onClick={handlePayment}
              className="mt-8 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Buy Tickets
            </button>
            {ticketId && (
              <Button
                variant="outline"
                onClick={() => router.push(`/ticket/${ticketId}`)}
                className="mt-4"
              >
                View Ticket
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl bg-gray-100 p-3 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {eventData?.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600">by</p>
            <p className="text-blue-700 font-semibold">
              {eventData?.organizer.name}
            </p>
          </div>
          <p className="text-gray-700 mb-6">{eventData?.detailDescription}</p>

          <Separator />
          {/* Event Guidelines */}
          <div className="mb-6">
            <EventQuidelines />
          </div>
          <Separator />

          {/* Event castes */}
          <div className="my-10 h-fit">
            <h1 className="font-bold text-2xl mx-4 my-4">Caste</h1>
            <div className="grid grid-cols-5 gap-4 mx-4">
              {eventData?.caste.map((item, index) => (
                <div key={index}>
                  <EventCasteCard i={item} />
                </div>
              ))}
            </div>
          </div>
          <Separator />

          {/* Frequently Asked Questions */}
          <div className="mb-12">
            <FrequentlyAskedQuestion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
