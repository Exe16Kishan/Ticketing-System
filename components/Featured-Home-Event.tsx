import React from 'react'
import Card from './Card'

const data = [1,2,3,4]

const FeaturedHomeEvent = () => {
  return (
    <div className="max-w-7xl mx-auto ">
    <h1 className="text-4xl font-bold ">
      {" "}
      <span className="text-[#6A38C2]">Featured</span> Events
    </h1>
    <div className="grid grid-cols-2 gap-2 my">
      {data.map( (index) => (
        <div key={index}>
        <Card />
        </div>
      ))}
    </div>
  </div>
  )
}

export default FeaturedHomeEvent