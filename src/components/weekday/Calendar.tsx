"use client";

import { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event from "./Event";
import CustomToolbar from "./Toolbar";
import Modal from "./Modal";
const mLocalizer = momentLocalizer(moment);

export const mockEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2024, 8, 16, 9, 0), // January 2, 2023, 9:00 AM
    end: new Date(2024, 8, 16, 10, 0), // January 2, 2023, 10:00 AM
    state: {
      preferred: true,
      available: false,
      unavailable: false,
    },
  },
  {
    id: 2,
    title: "Project Review",
    start: new Date(2024, 8, 16, 11, 0), // January 3, 2023, 11:00 AM
    end: new Date(2024, 8, 16, 12, 30), // January 3, 2023, 12:30 PM
    state: {
      preferred: false,
      available: true,
      unavailable: false,
    },
  },
  {
    id: 3,
    title: "Code Review",
    start: new Date(2024, 8, 18, 14, 0), // January 4, 2023, 2:00 PM
    end: new Date(2024, 8, 18, 15, 0), // January 4, 2023, 3:00 PM
    state: {
      preferred: false,
      available: false,
      unavailable: true,
    },
  },
];
const CalendarEvents = () => {
  const [eventStates, setEventStates] = useState({});
  const [modalEvent, setModalEvent] = useState(null);
  const [currentCourse, setCurrentCourse] = useState("CS009A");

  return (
    <section className="my-[6vh] flex w-full flex-col items-center justify-center">
      <div className="flex w-11/12 items-center justify-center">
        <div className="relative h-[90vh] w-full">
          <Calendar
            className="m-0 w-full p-0"
            events={mockEvents}
            localizer={mLocalizer}
            defaultDate={new Date(2024, 8, 16)} // Update to a valid default date
            defaultView={"week"}
            views={["day", "week"]}
            min={new Date(0, 0, 0, 8, 0, 0)}
            max={new Date(0, 0, 0, 22, 0, 0)}
            dayLayoutAlgorithm={"no-overlap"}
            components={{
              toolbar: (props) => (
                <CustomToolbar
                  {...props}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                  userSelection={eventStates}
                  setModalEvent={setModalEvent}
                />
              ),
              event: Event, // Ensure you are using the Event component correctly
            }}
            formats={{
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, "dddd", culture),
            }}
            onSelectEvent={(event) => {
              setModalEvent(event);
            }}
          />
        </div>
        {modalEvent && (
          <Modal
            event={modalEvent}
            setEvent={setModalEvent}
            course={currentCourse}
          />
        )}
      </div>
    </section>
  );
};

export default CalendarEvents;
