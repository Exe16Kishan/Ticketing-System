import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const FeatureOrganiser = () => {
  return (
    <div className="flex flex-col gap-y-4 max-w-xl">
      <Image
        src="/bird-thumbnail.jpg"
        alt="event"
        width={240}
        height={200}
        className="rounded-t-md object-cover mx-auto"
      />
      <h1 className="text-4xl text-center font-bold">The Organiser Name</h1>
      <Button variant={"secondary"} className="hover:bg-blue-400">
        Follow
      </Button>
      <h1 className="text-sm font-bold">About Organiser</h1>
      <p  className="text-sm w-[360px]">
        Organiser Description Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sunt dicta voluptatum vel, distinctio ex quae odit. Beatae,
        accusantium perferendis? Commodi inventore architecto rerum est animi
        quisquam doloremque, perspiciatis ullam illum!
      </p>
      <Separator />
      {/* <Separator /> */}
      <h1 className="text-sm font-bold">Activity</h1>
      <p  className="text-sm w-[360px]">
        Organiser Activity Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Sunt dicta voluptatum vel, distinctio ex quae odit. Beatae,
        accusantium perferendis? Commodi inventore architecto rerum est animi
        quisquam doloremque, perspiciatis ullam illum!
      </p>
      <Separator />
      <Button className="bg-blue-500 text-white hover:bg-blue-400">
        Contact Organiser
      </Button>
      <Button variant="destructive" className="hover:bg-blue-400">
        Report Organiser
      </Button>
    </div>
  );
};

export default FeatureOrganiser;
