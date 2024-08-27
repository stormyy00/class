"use client";
import React, { useState, useEffect } from "react";
import { getCourses } from "@/server/queries/queries";
import Loading from "./Loading";

type Course = {
  id: number;
  name: string;
};
type Props = {
  addCourse: (selectedCourses: Course[]) => void;
};

const Courses = ({ addCourse }: Props) => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [classes, setClasses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const handleSelectCourse = (course: any) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(course)
        ? prevSelected.filter((item) => item !== course)
        : [...prevSelected, course],
    );
  };

  const handleSubmit = () => {
    addCourse(selectedCourses);
  };

  return (
    <div className="flex w-full flex-col items-center">
      {classes.map((course) => (
        <div
          key={course.id}
          className="my-1 flex w-fit justify-center bg-blue-100"
        >
          <button
            onClick={() => handleSelectCourse(course)}
            className={selectedCourses.includes(course) ? "bg-blue-300" : ""}
          >
            {course.name}
          </button>
        </div>
      ))}

      <button onClick={handleSubmit}>Add Classes</button>
    </div>
  );
};

export default Courses;
