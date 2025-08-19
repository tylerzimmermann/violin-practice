export const students = [
  {
    name: "Violet",
    color: "#A8D0E6", // soft blue
    currentSong: "Minuet 2",
    media: {
      mp3: [],
      photos: [],
      videos: [],
    },
  },
  {
    name: "Theo",
    color: "#FBC490", // soft orange
    currentSong: "Long, Long Ago",
    media: {
      mp3: [],
      photos: [],
      videos: [],
    },
  },
];

// Utility function to get songs per student
export function getStudentSongs(studentName) {
  return students.find((s) => s.name === studentName)?.media || {};
}
