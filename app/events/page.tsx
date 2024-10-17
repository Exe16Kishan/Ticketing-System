import Card from '@/components/Card';
import Crousel from '@/components/Crousel';
import EventFilter from '@/components/EventFilter';
import React from 'react';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Events = () => {
  return (
    <div>
      <Crousel />
      <div className="grid grid-cols-4  max-w-7xl mx-auto"> {/* Move grid here */}
        {data.map((item, index) => (
          <Card key={index} /> 
        ))}
      </div>
    </div>
  );
};

export default Events;
