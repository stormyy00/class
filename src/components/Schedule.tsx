"use client";
import { useState } from "react";
import { createClass, createSchedule } from "@/server/queries/insert";
import Form from "./Form";
import { course, class_ } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Input from "./Input";
import { useSelectedCourses } from "./Context";
import { getSession } from "next-auth/react";
// interface Props {
//   courses: course[];
// }
const Schedule = () => {
  //   console.log("Schedule", courses);
  const { selectedCourses } = useSelectedCourses();
  console.log("incoming", selectedCourses);
  const { toast } = useToast();
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

          const session = await getSession();

          if (session && session.user) {
            await createSchedule({
              classId,
              scheduleName: name,
            });
            toast({ title: "✅ Schedule created successfully!" });
          } else {
            toast({ title: "❌ You must be signed in to add a schedule" });
          }
        }),
      );
    }
  };

  return (
    <>
      <form
        className="my-3 flex w-full flex-col items-center gap-2"
        onSubmit={handleScheduleSubmit}
      >
        {/* <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter schedule name"
          className="border-2 border-black placeholder:bg-gray-100 placeholder:text-black/85"
          required
        /> */}

        <Input
          label="search"
          classes="w-1/5"
          placeholder="Schedule Name"
          showLabel={false}
          maxLength={100}
          clear={true}
          value={name}
          onChangeFn={(e) => setName(e.target.value)}
          clearFn={() => setName("")}
        />
        {selectedCourses.length != 0 && (
          <div>
            <label
              className="bg-gradient-to-r from-gray-600 to-blue-500 bg-clip-text text-4xl text-transparent"
              htmlFor="course"
            >
              Selected Courses
            </label>
            <div className="flex flex-col">
              {selectedCourses.map((course) => (
                <div key={course.id} className="my-.5 border-2 border-black">
                  {course.name} ({course.code})
                  <Form
                    onSubmit={(data) => handleClassSubmit(course.id, data)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
