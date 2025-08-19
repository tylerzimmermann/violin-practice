import React, { useState } from "react";
import students, { getStudentSongs } from "./data/students";
import StudentProfile from "./components/StudentProfile";

function App() {
  const [activeStudent, setActiveStudent] = useState(null);

  if (!activeStudent) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Who’s Practicing?</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          {Object.entries(students).map(([name, { avatar, color }]) => (
            <div
              key={name}
              onClick={() => setActiveStudent(name)}
              style={{
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              <img
                src={avatar}
                alt={name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: `4px solid ${color}`,
                  objectFit: "cover"
                }}
              />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <StudentProfile
      studentName={activeStudent}
      student={students[activeStudent]}
      onSwitch={() => setActiveStudent(null)}
    />
  );
}

export default App;
