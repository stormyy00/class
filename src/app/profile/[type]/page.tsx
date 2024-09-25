"use client";
import Protected from "@/components/Protected";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Week from "@/components/weekday/Week";

const page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // For accessing query parameters
  const [schedule, setSchedule] = useState([]);
  const scheduleName = decodeURIComponent(pathname.split("/").pop()!);

  useEffect(() => {
    const scheduleData = searchParams.get("schedule");
    if (scheduleData) {
      // Parse the passed schedule data from the query
      setSchedule(JSON.parse(scheduleData));
    }
  }, [searchParams]);

  return (
    <div>
      <Protected>
        <h1 className="my-10 flex justify-center text-3xl font-bold">
          {scheduleName}
        </h1>
        <Week data={schedule} />
        {/* Render the schedule details */}
        {/* <div className="mt-5">
        {schedule.length > 0 ? (
          schedule.map(
            ({ classId, courseName, classDayOfWeek, classStartTime, classEndTime, classLocation }) => (
              <div key={classId} className="mb-5 border border-gray-300 p-3">
                <h2 className="text-xl font-semibold">{courseName}</h2>
                <p>
                  {classDayOfWeek} from {classStartTime} to {classEndTime}
                </p>
                <p>Location: {classLocation}</p>
              </div>
            )
          )
        ) : (
          <p>No classes available for this schedule.</p>
        )}
      </div> */}
      </Protected>
    </div>
  );
};

export default page;
