export const students = [
  {
    name: "Violet",
    color: "#A8D0E6",
    currentSong: "Minuet 2",
    avatar: "/avatars/violet.png", // put this file in your public/avatars folder
    media: {
      mp3: [],
      photos: [],
      videos: [],
    },
  },
  {
    name: "Theo",
    color: "#FBC490",
    currentSong: "Long, Long Ago",
    avatar: "/avatars/theo.png", // put this file in your public/avatars folder
    media: {
      mp3: [],
      photos: [],
      videos: [],
    },
  },
];

// Utility function to get media for a specific student
export function getStudentSongs(studentName) {
  const student = students.find((s) => s.name === studentName);
  return student ? student.media : { mp3: [], photos: [], videos: [] };
}
