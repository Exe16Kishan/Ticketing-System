
import { prisma } from "@/app/db";
import EventCasteCard from "@/components/event-caste";
import EventCaste from "@/components/event-caste";
import EventQuidelines from "@/components/EventQuidelines";
import FrequentlyAskedQuestion from "@/components/FrequentlyAskedQuestion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";

async function  EventDetail({params}:any) {
  const eventDetail = await prisma.event.findUnique({
    where:{
      id:params.eventId
    },
    include:{
      organizer:{
        select:{
          name:true
        }
      },
      caste:{
        select:{
          performName:true,
          occupation:true,
          image:true
        }
      }
    }
  })
  
  return (
    <div className="bg-gray-200">
      <div
        className="relative bg-cover bg-center bg-no-repeat w-full h-[66vh] mb-10"
        style={{ backgroundImage: `url('/event.jpg')` }}
      >
        {/*overlay for better readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Components centered*/}
        <div className="relative z-10 flex justify-center items-center h-full max-w-7xl mx-auto px-4 gap-5">
          {/* Left part - 1/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <Image className="border-4 rounded-xl"
                src={'/event.jpg'}
                height={540}
                width={540}
                alt="image"
            />
          </div>

          {/* Right part - 2/3 width */}
          <div className="flex flex-col justify-center items-start space-y-4">
            <h1 className="text-white text-4xl font-bold">{eventDetail?.title}</h1>
            <p className="text-white">
          {eventDetail?.description}
            </p>
            <button className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      {/*Info */}
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl bg-gray-100 p-3 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {eventDetail?.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600">by</p>
            <p className="text-blue-700 font-semibold">{eventDetail?.organizer.name}</p>
          </div>
          <p className="text-gray-700 mb-6">
            {eventDetail?.detailDescription}
          </p>

          <Separator />
          {/* Event Guidelines */}
          <div className="mb-6">
            <EventQuidelines />
          </div>
          <Separator />

          {/* event castes */}

          <div className="my-10 h-fit">
            <h1 className="font-bold text-2xl mx-4 my-4">Caste</h1>
            <div className="grid grid-cols-5 gap-4 mx-4">
              {" "}
              {/* Use grid with 3 columns */}
              {eventDetail?.caste.map((item, index) => (
                <div key={index}>
                  <EventCasteCard i={item}/>
                </div>
              ))}
            </div>
          </div>
          <Separator />

          {/* Frequently Asked Questions */}
          <div className="mb-12">
            <FrequentlyAskedQuestion />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
