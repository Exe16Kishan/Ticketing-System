import Card from "@/components/Card";
import Crousel from "@/components/Crousel";
import EventDetail from "@/components/EventDetail";
import FeaturedHomeEvent from "@/components/Featured-Home-Event";
import FeatureOrganiser from "@/components/Feature-Organiser";
import { Separator } from "@/components/ui/separator";
import HomePageCoursel from "@/components/Home-Page-Coursel";
import Footer from "@/components/shared/Footer";
export default function Home() {
  return (
    <>
      <Crousel/>
      <div className="max-w-7xl mx-auto my-20">
        {/* <div className="hero flex gap-4 justify-around ">
          <div className="flex-1/3">
            <FeatureOrganiser />
          </div> 

          <div className="flex-2/3">
            <FeaturedHomeEvent />
          </div>
        </div> */}
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Music And Consert</h1>
          <Separator />
          <HomePageCoursel />
        </div>
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Art And Culture</h1>
          <Separator />
          <HomePageCoursel />
        </div>
        <div className="Music">
          <h1 className="font-bold text-3xl text-blue-700 my-4">Seminars And Hackathons</h1>
          <Separator />
          <HomePageCoursel />
        </div>


      </div>
     
      
    </>
  );
}
