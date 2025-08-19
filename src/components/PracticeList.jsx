import { useState } from "react";
import Confetti from "react-confetti";

export default function PracticeList({ songs, student }) {
  const [completed, setCompleted] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleComplete = (id) => {
    if (completed.includes(id)) return;
    setCompleted([...completed, id]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div style={{ padding: "20px" }}>
      {showConfetti && <Confetti />}
      <h2 style={{ color: student.color }}>{student.name}'s Practice</h2>
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            style={{
              margin: "15px 0",
              padding: "10px",
              border: `2px solid ${student.color}`,
              borderRadius: "10px",
              background: completed.includes(song.id) ? "#d1ffd1" : "white",
              cursor: "pointer"
            }}
            onClick={() => toggleComplete(song.id)}
          >
            <h3>{song.title}</h3>

            {song.version.mp3 && (
              <audio controls>
                <source src={song.version.mp3} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}

            {song.version.videos?.map((video, i) => (
              <video key={i} controls width="300" style={{ display: "block", marginTop: "10px" }}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video element.
              </video>
            ))}

            {song.version.photos?.map((photo, i) => (
              <img key={i} src={photo} alt="practice" style={{ width: "200px", marginTop: "10px" }} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
