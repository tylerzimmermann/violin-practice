import React from "react";
import { students } from "../data/students";
import { useStudent } from "../context/StudentContext";

const StudentSwitcher = () => {
  const { activeStudent, setActiveStudent } = useStudent();

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", margin: "1rem" }}>
      {students.map(s => (
        <div
          key={s.id}
          onClick={() => setActiveStudent(s)}
          style={{
            cursor: "pointer",
            border: activeStudent.id === s.id ? `3px solid ${s.color}` : "2px solid gray",
            borderRadius: "50%",
            padding: "0.25rem",
          }}
        >
          <img src={s.avatar} alt={s.name} width="60" style={{ borderRadius: "50%" }} />
          <p style={{ textAlign: "center", margin: 0 }}>{s.name}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentSwitcher;
