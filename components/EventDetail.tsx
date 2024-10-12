import { CiHeart } from "react-icons/ci";
import EventQuidelines from "./EventQuidelines";
import FrequentlyAskedQuestion from "./FrequentlyAskedQuestion";

function EventDetail() {
  return (
    <div className="bg-gray-200">
      <div className="relative mb-6">
        <img
          src="/hero_event.jpg"
          className="w-full h-96 object-cover"
          alt="Event"
        />
        <CiHeart className="absolute p-1 text-5xl -bottom-6 right-16 z-10 bg-red-200 text-purple-600 rounded-full shadow-md hover:bg-purple-100 transition duration-200" />
      </div>

      {/*Info */}
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl bg-gray-100 p-3 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            An Imaginary Night with Imagine Dragons in LA
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600">by</p>
            <p className="text-blue-700 font-semibold">The World Organizer</p>
          </div>
          <p className="text-gray-700 mb-6">
            Join us for an unforgettable evening with Imagine Dragons at one of Los
            Angeles' most iconic venues. Immerse yourself in an electrifying atmosphere
            as the band performs their biggest hits and latest tracks, all set against a
            backdrop of dazzling lights and incredible visuals. This is more than just a 
            concert—it's an experience that will leave you singing and dancing all night long.
            Expect an exhilarating performance filled with powerful vocals, energetic beats, 
            and the signature anthems that have made Imagine Dragons one of the world’s
            most beloved bands. Whether you’re a longtime fan or new to their music, 
            this is a night you won’t want to miss</p>

          {/* Event Guidelines */}
          <div className="mb-6">
            <EventQuidelines />
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <FrequentlyAskedQuestion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
