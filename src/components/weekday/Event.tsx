"use client";
import {
  LiaCheckDoubleSolid,
  LiaCheckSolid,
  LiaTimesSolid,
} from "react-icons/lia";

const Event = ({ event }) => {
  return (
    <div className="flex h-full flex-col justify-between py-1">
      <p className="m-0 whitespace-nowrap">
        {/* {!event.allDay &&
          new Date(event.start).toLocaleTimeString(navigator.language, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        &nbsp; */}
        {event.title}
      </p>
      <p>{event.location}</p>
    </div>
  );
};

export default Event;
