import React, { useState } from 'react';

export default function PracticeSession({ lesson, songs, onComplete }) {
  const [completed, setCompleted] = useState([]);

  const toggleComplete = (id) => {
    const newCompleted = completed.includes(id)
      ? completed.filter(c => c !== id)
      : [...completed, id];
    setCompleted(newCompleted);

    if (newCompleted.length === lesson.items.length) {
      onComplete();
    }
  };

  return (
    <div className="practice-session">
      <h3>Practice from {lesson.date}</h3>
      {lesson.items.map(item => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={completed.includes(item.id)}
              onChange={() => toggleComplete(item.id)}
            />
            {item.text} ({item.type})
          </label>
        </div>
      ))}
    </div>
  );
}
