"use client";
import Protected from "@/components/Protected";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Week from "@/components/weekday/Week";

const page = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [schedule, setSchedule] = useState([]);
  const scheduleName = decodeURIComponent(pathname.split("/").pop()!);

  useEffect(() => {
    const scheduleData = searchParams.get("schedule");
    if (scheduleData) {
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
      </Protected>
    </div>
  );
};

export default page;
