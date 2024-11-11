import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from './Card';
import { Event } from '@/types';
interface data{
  events?: Event[]
}

const HomePageCoursel = ({events}:data) => {
  
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full"
    >
      <CarouselContent>
        {events ? (
          events.map((eventDetail, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card eventDetail={eventDetail} />
              </div>
            </CarouselItem>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomePageCoursel;
