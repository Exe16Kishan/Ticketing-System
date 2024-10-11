import EventFilter from "./EventFilter";

function Crousel() {
  return (
    <>
      <div className="relative">
        <img
          src="/hero_event.jpg"
          alt="hero"
          className="w-full h-96 object-cover brightness-75"
        />
        {/* Event filter position */}
        <div className="absolute inset-0 top-96 flex justify-center items-center z-10">
          <EventFilter />
        </div>
      </div>
      
      <div className="flex justify-center gap-8 mt-24 text-lg">
        <span className="cursor-pointer hover:underline">Today</span>
        <span className="cursor-pointer hover:underline">Tomorrow</span>
        <span className="cursor-pointer hover:underline">This Week</span>
      </div>
      
    </>
  );
}

export default Crousel;
