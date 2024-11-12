import EventFilter from "./EventFilter";

function Crousel({ filterEvent }: { filterEvent: Function }) {
  return (
    <>
      <div className="relative">
        <img
          src="/hero_event.jpg"
          alt="hero"
          className="w-full h-96 object-cover brightness-75 md:h-[400px] lg:h-[500px]"
        />
        {/* Event filter position */}
        <div className="absolute inset-0 top-[25%] md:top-[30%] lg:top-[35%] flex justify-center items-center z-10">
          <EventFilter filterEvent={filterEvent} />
        </div>
      </div>

      <div className="flex justify-center gap-8 mt-12 md:mt-16 lg:mt-24 text-lg md:text-xl">
        <span className="cursor-pointer hover:underline">Today</span>
        <span className="cursor-pointer hover:underline">Tomorrow</span>
        <span className="cursor-pointer hover:underline">This Week</span>
      </div>
    </>
  );
}

export default Crousel;
