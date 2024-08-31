"use client";
import React, { useState, useEffect } from "react";
import { getCourses } from "@/server/queries/queries";
import Loading from "./Loading";
import { course } from "@/types";

type Props = {
  addCourse: (selectedCourses: course[]) => void;
};

const Courses = ({ addCourse }: Props) => {
  const [selectedCourses, setSelectedCourses] = useState<course[]>([]);
  const [classes, setClasses] = useState<course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = () => {
      getCourses()
        .then((data: course[]) => {
          setClasses(data);
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchCourses();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const handleSelectCourse = (course: course) => {
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

      <button
        className="rounded-xl bg-green-500 px-5 py-2 hover:opacity-90"
        onClick={handleSubmit}
      >
        Add Classes
      </button>
    </div>
  );
};

export default Courses;
