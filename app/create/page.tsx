"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CalendarIcon, MapPinIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { formSchema } from "@/lib/zod";
import { createEvent } from "../actions/userActions";

export default function CreateEventPage() {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      price:0,
      type: "MUSIC",
      seats: 20,
      organizerId: session.data?.user?.id ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const combinedDateTime = new Date(
        `${values.date}T${values.time}:00Z`
      ).toISOString();
      const updatedValues = { ...values, date: combinedDateTime }; // Replace date with full datetime

      const result = await createEvent(updatedValues);
      if (result?.success) {
        toast({
          title: "Success",
          description: result?.message,
        });
        router.push("/"); // Redirect to events main page
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>
            Fill in the details to create a new event.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Other form fields for title, description, location, etc. */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a catchy title for your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Event Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your event"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about your event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Seats</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the number of seats available"
                        {...field}
                        min="20"
                      />
                    </FormControl>
                    <FormDescription>
                      Specify how many seats are available for the event.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          className="pl-10"
                          placeholder="Event location"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Where will the event take place?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full border p-2 rounded-md"
                        {...field}
                      >
                        <option value="MUSIC">Music</option>
                        <option value="CONCERT">Concert</option>
                        <option value="ART">Art</option>
                        <option value="CULTURE">Culture</option>
                        <option value="HACKATHON">Hackathon</option>
                        <option value="SEMINAR">Seminar</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      choose the type of event
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the price of event"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the price of the Ticket.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              
              />

              {/* Date field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time field */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
