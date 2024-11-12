"use client";
import React, { useEffect, useState } from "react";
import Crousel from "@/components/Crousel";
import { Separator } from "@/components/ui/separator";
import HomePageCoursel from "@/components/Home-Page-Coursel";
import { Event } from "@/types";
import { dataFetch } from "@/app/actions/dataFetching";

export default function Home() {

  const [events, setEvents] = useState<Event[] | undefined>();
  const [filterEvent, setFilteredEvents] = useState<Event[] | undefined>()
  const handleFilter = ({ location, type, date }: { location: string; type: string; date: string }) => {
    // convert string date into date  form
    const filterDateObj = date ? new Date(date) : null;

    const filter = events?.filter((event) => {
      const filterLocation = location ? event.location.includes(location) : true;
      const filterType = type ? event.type === type.toUpperCase() : true;

      const filterDate = filterDateObj
        ? event.date instanceof Date && event.date.toDateString() === filterDateObj.toDateString()
        : true;

      return filterLocation && filterType && filterDate;
    });

    setFilteredEvents(filter);
  }
  // console.log(filterEvent)
  const fetchData = async () => {
    const data = await dataFetch();
    setEvents(data);
    setFilteredEvents(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Crousel filterEvent={handleFilter} />
      {
        events !== filterEvent ? (
          <div className="mt-10">
            <Separator />
            <HomePageCoursel events={filterEvent} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Music and Concert Section */}
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-blue-700 my-4">Music And Concert</h1>
              <Separator />
              <HomePageCoursel events={filterEvent?.filter(event => event.type === "MUSIC" || event.type === "CONCERT")} />
            </div>

            {/* Art and Culture Section */}
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-blue-700 my-4">Art And Culture</h1>
              <Separator />
              <HomePageCoursel events={filterEvent?.filter(event => event.type === "ART" || event.type === "CULTURE")} />
            </div>

            {/* Seminars and Hackathons Section */}
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-blue-700 my-4">Seminars And Hackathons</h1>
              <Separator />
              <HomePageCoursel events={filterEvent?.filter(event => event.type === "HACKATHON" || event.type === "SEMINAR")} />
            </div>
          </div>
        )}
    </>
  );
}
