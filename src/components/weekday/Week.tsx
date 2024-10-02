"use client";

import { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Event from "./Event";
import CustomToolbar from "./Toolbar";
import Modal from "./Modal";
import { getCourses } from "@/server/queries/queries";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

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
    //   start: new Date(2024, 8, 18, 14, 0), // January 4, 2023, 2:00 PM
    //   end: new Date(2024, 8, 18, 15, 0),   // January 4, 2023, 3:00 PM
    state: {
      preferred: false,
      available: false,
      unavailable: true,
    },
  },
];

const Week = ({ data }) => {
  const [schedule, setSchedule] = useState(data);
  const [date, setDate] = useState(new Date());
  const [modalEvent, setModalEvent] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [eventStates, setEventStates] = useState({});
  const courseList = [];

  console.log("Schedule", schedule);

  const handleEventClick = (e, id, status) => {
    console.log(`Event ${id} status changed to ${status}`);
  };
  const getMockDayOfWeekDate = (dayOfWeek, startTime, endTime) => {
    const mockDates = {
      mon: "2024-09-23",
      tue: "2024-09-24",
      wed: "2024-09-25",
      thu: "2024-09-26",
      fri: "2024-09-27",
      tuth: "2024-09-24",
    };

    const startDate = mockDates[dayOfWeek] || "2024-09-23";
    return {
      start: moment(startDate + "T" + startTime).toDate(),
      end: moment(startDate + "T" + endTime).toDate(),
    };
  };

  const mappedEvents = schedule.map((item) => {
    const { start, end } = getMockDayOfWeekDate(
      item.classDayOfWeek,
      item.classStartTime,
      item.classEndTime,
    );
    return {
      title: `${item.courseCode} - ${item.courseName}`,
      start: start,
      end: end,
      location: item.classLocation,
      id: item.classId,
    };
  });

  return (
    <section className="my-[6vh] flex w-full flex-col items-center justify-center">
      <div className="flex w-11/12 items-center justify-center">
        <div className="relative h-[90vh] w-full">
          <Calendar
            className="m-0 w-full p-0"
            events={mappedEvents}
            localizer={mLocalizer}
            defaultDate={new Date()}
            dayLayoutAlgorithm={"no-overlap"}
            defaultView="work_week"
            views={["work_week", "day"]}
            min={new Date(0, 0, 0, 8, 0, 0)}
            max={new Date(0, 0, 0, 22, 0, 0)}
            components={{
              event: ({ event }) => <Event event={event} />,

              toolbar: (props) => (
                <CustomToolbar
                  {...props}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                  userSelection={eventStates}
                  setModalEvent={setModalEvent}
                />
              ),
            }}
            onSelectEvent={(event) => {
              setModalEvent(event);
            }}
          />
        </div>

        {modalEvent && <Modal event={modalEvent} setEvent={setModalEvent} />}
      </div>
    </section>
  );
};

export default Week;
