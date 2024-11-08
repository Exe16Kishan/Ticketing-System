import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-700">About Our Event Management System</h1>
        <Separator className="my-4" />
        <p className="text-lg text-gray-600">
          Our platform is designed to bring organizers and attendees together, providing seamless management and unforgettable event experiences.
        </p>
      </div>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-gray-800">Key Features</h2>
        <Separator />
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Event Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Find events across multiple categories, including Music, Arts, Seminars, and more. Each listing provides all the details you need to make informed decisions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Easy Registration and Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Effortlessly register and book your spot for any event. Our user-friendly interface makes it easy to browse and secure tickets.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Get event suggestions based on your interests and past attendance, ensuring you never miss out on events you’ll love.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us</h2>
        <Separator />
        <p className="text-gray-600">
          Our platform is built with both organizers and attendees in mind, streamlining event planning and enhancing the attendee experience.
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600">
          <li>Hassle-free ticketing and seat reservation system</li>
          <li>Real-time updates and notifications for upcoming events</li>
          <li>Detailed insights and analytics for organizers</li>
          <li>Seamless event management tools for any type of event</li>
        </ul>
      </section>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-blue-700">Ready to Dive In?</h2>
        <p className="text-gray-600">Join us today and explore events that inspire, entertain, and educate.</p>
        <Link href="/"><Button variant={"default"} size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
          Browse Events
        </Button></Link>
      </div>
    </div>
  );
};

export default About;
