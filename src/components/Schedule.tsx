"use client";
import { useState } from "react";
import { createClass, createSchedule } from "@/server/queries/insert";
import Form from "./Form";
import { course, class_ } from "@/types";
// import Button from "./Button";

interface Props {
  courses: course[];
}
const Schedule = ({ courses }: Props) => {
  console.log("Schedule", courses);
  //   const [selectedCourses, setSelectedCourses] = useState([]);
  const [name, setName] = useState<string>("");
  const [classData, setClassData] = useState<
    Array<class_ & { courseId: string }>
  >([]);

  const handleClassSubmit = (courseId: string, data: class_) => {
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
      await Promise.all(
        classData.map(async (data) => {
          const classId = await createClass({
            courseId: data.courseId,
            startTime: data.startTime,
            endTime: data.endTime,
            dayOfWeek: data.dayOfWeek,
            location: data.location,
          });
          console.log(classId);
          await createSchedule({
            classId,
            scheduleName: name,
          });
        }),
      );
      alert("Schedule created successfully!");
    }
  };

  return (
    <>
      <form
        className="my-3 flex w-full flex-col items-center gap-2"
        onSubmit={handleScheduleSubmit}
      >
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
              <div key={course.id} className="my-.5 border-2 border-black">
                {course.name} ({course.code})
                <Form onSubmit={(data) => handleClassSubmit(course.id, data)} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:opacity-90"
        >
          Add to Schedule
        </button>
        {/* <Button type="submit" text={"Add to Schedule"} color={"bg-blue-600"} /> */}
      </form>
    </>
  );
};

export default Schedule;
