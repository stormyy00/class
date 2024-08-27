"use client"
import {useState} from 'react'
import Schedule from './Schedule'
import Courses from './Courses'

const Body = ()=> {
  // const courseList = await db.select().from(courses);
  const [selectedCourses, setSelectedCourses] = useState([]);


  const handleAddCourse = (courses) => {
    setSelectedCourses(courses);
  };

  return (
    <div>
      <Schedule courses={selectedCourses} />
      <Courses addCourse={handleAddCourse} />
    </div>
  );
};

export default Body
