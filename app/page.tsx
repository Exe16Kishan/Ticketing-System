import Card from "@/components/Card";
import Crousel from "@/components/Crousel";

export default function Home() {
  return (
    <div className="bg-gray-200" >
      <Crousel/>

      {/* for testing purpose  */}
      <div className=" mt-3 flex justify-center flex-wrap">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      </div>
    
    </div>
  );
}
