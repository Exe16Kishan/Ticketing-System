"use client";
import React, { useEffect, useState } from "react";
import Crousel from "@/components/Crousel";
import { Separator } from "@/components/ui/separator";
import HomePageCoursel from "@/components/Home-Page-Coursel";
import { Event } from "@/types";
import { dataFetch } from "@/app/actions/dataFetching";

export default function Home() {

  const [events, setEvents] = useState<Event[] | undefined>();

  const fetchData = async () => {
    const data = await dataFetch();
    setEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <Crousel />
      <div className="max-w-7xl mx-auto my-20">
        {/* Optional components */}
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Music And Concert</h1>
          <Separator />
          <HomePageCoursel events={events?.filter(event=>event.type == "MUSIC" || event.type == "CONCERT")} />
        </div>
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Art And Culture</h1>
          <Separator />
          <HomePageCoursel events={events?.filter(event=>event.type == "ART" || event.type == "CULTURE")} />
        </div>
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Seminars And Hackathons</h1>
          <Separator />
          <HomePageCoursel events={events?.filter(event=>event.type == "HACKATHON" || event.type == "SEMINAR")} />
        </div>
      </div>
    </>
  );
}
