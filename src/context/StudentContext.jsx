import React, { createContext, useContext, useState } from "react";
import { students } from "../data/students";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [activeStudent, setActiveStudent] = useState(students[0]); // default Violet

  return (
    <StudentContext.Provider value={{ activeStudent, setActiveStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
