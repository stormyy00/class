"use client";
import { useState } from "react";
import Schedule from "./Schedule";
import Courses from "./Courses";
// import { course } from "@/types";
import Dashboard from "./table/Dashboard";
import { COLUMNS } from "@/data/Column";
import { SelectedCoursesProvider } from "./Context";

const Body = () => {
  // const courseList = await db.select().from(courses);
  // const [selectedCourses, setSelectedCourses] = useState<course[]>([]);

  // const handleAddCourse = (courses: course[]) => {
  //   setSelectedCourses(courses);
  // };

  return (
    <SelectedCoursesProvider>
      <div className="flex w-full flex-col items-center">
        <Schedule />
        {/* <Courses addCourse={handleAddCourse} /> */}
        <Dashboard
          title="Courses"
          columns={COLUMNS}
          page=""
          tags={[]}
          Dropdown={null}
          empty="No data available."
        />
      </div>
    </SelectedCoursesProvider>
  );
};

export default Body;
