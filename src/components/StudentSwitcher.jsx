import { useState } from "react";
import { students } from "../data/students";

export default function StudentSwitcher({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h2>Who's practicing today?</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {students.map(student => (
          <div
            key={student.name}
            onClick={() => {
              setSelected(student.name);
              onSelect(student);
            }}
            style={{
              cursor: "pointer",
              border: selected === student.name ? `5px solid ${student.color}` : "3px solid transparent",
              borderRadius: "50%",
              padding: "5px"
            }}
          >
            <img
              src={student.avatar}
              alt={student.name}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <p>{student.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
