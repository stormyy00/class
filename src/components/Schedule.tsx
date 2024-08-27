"use client";
import { useState } from "react";
import { createClass, createSchedule } from "@/server/queries/insert";
import Form from "./Form";
import Button from "./Button";
type Course = {
    id: number;
    name: string;
    code: string;
  };
  
  // Define the structure of class data
  type ClassData = {
    startTime: string;
    endTime: string;
    dayOfWeek: string;
    location: string;
  };
  

  interface Props {
    courses: Course[];
  }
const Schedule = ({ courses }: Props) => {
  console.log("Schedule", courses);
//   const [selectedCourses, setSelectedCourses] = useState([]);
const [name, setName] = useState<string>("");
const [classData, setClassData] = useState<Array<ClassData & { courseId: string }>>([]);


  const handleClassSubmit = (courseId: string, data: ClassData) => {
    setClassData((prevClassData) => [
      ...prevClassData,
      {
        courseId,
        ...data,
      },
    ]);
  };

  const handleScheduleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name && classData.length > 0) {
      for (const data of classData) {
        const classId = await createClass({
          courseId: data.courseId,
          startTime: data.startTime,
          endTime: data.endTime,
          dayOfWeek: data.dayOfWeek,
          location: data.location,
        });
        await createSchedule({
          classId,
          scheduleName: name,
        });
      }
      alert("Schedule created successfully!");
    }
  };

  return (
    <>
      {/* <Courses addCourse={addCourse} /> */}
      <form className="w-full flex flex-col items-center gap-2 my-3" onSubmit={handleScheduleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter schedule name"
        className="border-2 border-black placeholder:bg-gray-100 placeholder:text-black/85"
        required
      />
      <div className="bg-red-200">
        <label htmlFor="course">Selected Courses</label>
        <div className="flex flex-col">
          {courses.map((course) => (
            <div key={course.id} className="border-2 border-black my-.5">
              {course.name} ({course.code})
              <Form
                onSubmit={(data) => handleClassSubmit(course.id, data)}
              />
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="px-4 py-2 rounded-xl hover:opacity-90 bg-blue-600 text-white">Add to Schedule</button>

    </form>
    </>
  );
};

export default Schedule;
