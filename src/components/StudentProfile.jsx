import React from "react";

function StudentProfile({ studentName, student, onSwitch }) {
  return (
    <div style={{ padding: "1rem", background: student.color, minHeight: "100vh" }}>
      <button onClick={onSwitch} style={{ marginBottom: "1rem" }}>
        🔙 Switch Student
      </button>
      <h2>{studentName}’s Practice List</h2>
      <ul>
        {student.songs.map((song) => (
          <li key={song.id} style={{ marginBottom: "1rem" }}>
            <h3>{song.title}</h3>

            {/* MP3 playback */}
            {song.mp3 && (
              <audio controls src={song.mp3} style={{ display: "block", marginTop: "0.5rem" }} />
            )}

            {/* Videos */}
            {song.videos &&
              song.videos.map((vid, i) => (
                <video
                  key={i}
                  src={vid}
                  controls
                  style={{ display: "block", marginTop: "0.5rem", maxWidth: "300px" }}
                />
              ))}

            {/* Photos */}
            {song.photos &&
              song.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`${song.title} photo ${i + 1}`}
                  style={{ display: "block", marginTop: "0.5rem", maxWidth: "300px" }}
                />
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentProfile;
