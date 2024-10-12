"use client";

import { useState } from "react";

function EventQuidelines() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGuidelines = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" p-4">
      <h2 className="text-xl font-semibold mb-4">
        Event Guidelines and Policies
      </h2>
      <ol className="list-decimal list-inside" >
        <li>
          <strong>Code of Conduct:</strong> All attendees, speakers, and staff
          must follow the event's code of conduct to create a safe and
          respectful environment for everyone. Harassment or discrimination of
          any kind will not be tolerated.
        </li>
        <li>
          <strong>Age Restrictions:</strong> Certain events may have age
          restrictions. Please verify your age during the registration process
          if required. Attendees must present a valid ID upon entry.
        </li>
      </ol>

      {isOpen && (
        <div className="mt-4 text-gray-700">
          <ol className="list-decimal list-inside" start={3}>
            <li>
              <strong>Ticket Policy:</strong> All tickets are non-refundable,
              unless the event is canceled or rescheduled by the organizers.
              Tickets are transferable but must be transferred through the
              event's official platform.
            </li>
            <li>
              <strong>Health and Safety Measures:</strong> Attendees are
              required to follow health and safety guidelines, including wearing
              masks if mandated and maintaining physical distance. Sanitization
              stations will be available throughout the venue.
            </li>
            <li>
              <strong>Entry and Exit Policy:</strong> Attendees must adhere to
              designated entry and exit times. Re-entry may not be allowed
              without a valid stamp or pass.
            </li>
            <li>
              <strong>Photography and Recording:</strong> Photography and video
              recording may occur during the event. By attending, you consent to
              your image being captured and used for promotional purposes by the
              event organizers.
            </li>
            <li>
              <strong>Prohibited Items:</strong> The following items are
              prohibited at the event: weapons, illegal substances, outside food
              and beverages, and any other items deemed unsafe by security
              personnel.
            </li>
            <li>
              <strong>Emergency Procedures:</strong> In the event of an
              emergency, follow instructions provided by event staff and
              emergency personnel. Evacuation routes will be clearly marked.
            </li>
            <li>
              <strong>Accessibility:</strong> The venue is accessible to people
              with disabilities. If you require special accommodations, please
              contact the event organizers at least 48 hours in advance.
            </li>
            <li>
              <strong>Contact Information:</strong> For any questions or
              concerns before or during the event, please reach out to our
              support team at support@example.com or visit the information desk
              at the event venue.
            </li>
          </ol>
        </div>
      )}
      <button
        onClick={toggleGuidelines}
        className="text-blue-500 hover:underline mb-3"
      >
        {isOpen ? "Hide Details" : "View Guidelines"}
      </button>
    </div>
  );
}

export default EventQuidelines;
