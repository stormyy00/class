
"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { course } from "@/types";

interface SelectedCoursesContextType {
  selectedCourses: course[];
  setSelectedCourses: (courses: course[]) => void;
}

const SelectedCoursesContext = createContext<SelectedCoursesContextType | undefined>(undefined);

export const useSelectedCourses = () => {
  const context = useContext(SelectedCoursesContext);
  if (!context) {
    throw new Error("useSelectedCourses must be used within a SelectedCoursesProvider");
  }
  return context;
};

export const SelectedCoursesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCourses, setSelectedCourses] = useState<course[]>([]);

  return (
    <SelectedCoursesContext.Provider value={{ selectedCourses, setSelectedCourses }}>
      {children}
    </SelectedCoursesContext.Provider>
  );
};
