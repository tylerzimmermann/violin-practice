import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function LessonForm({ addLesson }) {
  const [date, setDate] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { id: uuidv4(), text: '', type: 'skill' }]);
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const saveLesson = () => {
    addLesson({ date, items });
    setDate('');
    setItems([]);
  };

  return (
    <div className="lesson-form">
      <h2>Create Lesson</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      {items.map(item => (
        <div key={item.id}>
          <input
            type="text"
            placeholder="Skill or Song"
            value={item.text}
            onChange={e => updateItem(item.id, 'text', e.target.value)}
          />
          <select
            value={item.type}
            onChange={e => updateItem(item.id, 'type', e.target.value)}
          >
            <option value="skill">Skill</option>
            <option value="song">Song</option>
            <option value="review">Review</option>
          </select>
        </div>
      ))}
      <button onClick={addItem}>+ Add Item</button>
      <button onClick={saveLesson}>Save Lesson</button>
    </div>
  );
}
