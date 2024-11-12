"use client";

import { useState } from "react";

const EventFilter = ({ filterEvent }: { filterEvent: Function }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div style={{ alignItems: "end" }} className="bg-white text-black rounded-lg p-6 shadow-lg flex flex-wrap gap-4 justify-center items-center w-full max-w-3xl">
        {/* Location */}
        <div className="w-full sm:w-auto">
          <label className="block font-bold mb-1">Location</label>
          <input
            type="text"
            placeholder="Search by place"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Date */}
        <div className="w-full sm:w-auto">
          <label className="block font-bold mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Type */}
        <div className="w-full sm:w-auto">
          <label className="block font-bold mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            <option value="">Event Type</option>
            <option value="concert">CONCERT</option>
            <option value="art">ART</option>
            <option value="culture">CULTURE</option>
            <option value="music">MUSIC</option>
            <option value="seminar">SEMINAR</option>
            <option value="hackathon">HACKATHON</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => filterEvent({ location, type, date })}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 transition"
          >
            Search Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
