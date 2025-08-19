import React, { useState } from 'react';
import Confetti from 'react-confetti';
import LessonForm from './components/LessonForm';
import PracticeSession from './components/PracticeSession';
import { suzukiSongs } from './data/songs';

export default function App() {
  const [lessons, setLessons] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const addLesson = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  const celebrate = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  return (
    <div className="app">
      <h1>🎻 Violin Practice Tracker</h1>
      <LessonForm addLesson={addLesson} />
      {lessons.map((lesson, idx) => (
        <PracticeSession
          key={idx}
          lesson={lesson}
          songs={suzukiSongs}
          onComplete={celebrate}
        />
      ))}
      {confetti && <Confetti />}
    </div>
  );
}
