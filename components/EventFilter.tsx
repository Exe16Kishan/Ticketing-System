"use client"

import { useState } from 'react';

const EventFilter = () => {
  
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [organizer, setOrganizer] = useState('');

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="bg-white text-black rounded-lg p-4 shadow-lg flex flex-wrap gap-4 justify-center items-center">
        {/* location */}
        <div>
          <label className="block font-bold mb-1">Location</label>
          <input
            type="text"
            placeholder="Search by city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        
        {/* price*/}
        <div>
          <label className="block font-bold mb-1">Price</label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">$ - $$$</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>
        </div>
        
        {/* date*/}
        <div>
          <label className="block font-bold mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        
        {/* type */}
        <div>
          <label className="block font-bold mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="concert">Concert</option>
            <option value="festival">Festival</option>
            <option value="party">Party</option>
          </select>
        </div>
        
        {/* organizer */}
        <div>
          <label className="block font-bold mb-1">Organizer</label>
          <select
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">Select Any</option>
            <option value="org1">Organizer 1</option>
            <option value="org2">Organizer 2</option>
          </select>
        </div>
        
        {/* search */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Search Events
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
