// src/data/songs.js
// Base Suzuki Book 1 songs
const baseSongs = [
  { id: 1, title: "Twinkle, Twinkle Little Star Variations" },
  { id: 2, title: "Lightly Row" },
  { id: 3, title: "Song of the Wind" },
  { id: 4, title: "Go Tell Aunt Rhody" },
  { id: 5, title: "O Come, Little Children" },
  { id: 6, title: "May Song" },
  { id: 7, title: "Long, Long Ago" },
  { id: 8, title: "Allegro" },
  { id: 9, title: "Perpetual Motion" },
  { id: 10, title: "Allegretto" },
  { id: 11, title: "Andantino" },
  { id: 12, title: "Etude" },
  { id: 13, title: "Minuet 1" },
  { id: 14, title: "Minuet 2" },
  { id: 15, title: "Minuet 3" },
  { id: 16, title: "The Happy Farmer" },
  { id: 17, title: "Gavotte" },
];

// Student-specific versions
export const songs = [
  {
    id: 1,
    title: "Twinkle, Twinkle Little Star",
    book: 1,
    versions: {
      Violet: {
        mp3: "https://drive.google.com/file/d/19MS4hpzY_8yTYwCZpQEg3JXTv1hV69bg/view?usp=drivesdk", // Google Drive direct link
        videos: [],
        photos: []
      },
      Theo: {
        mp3: "https://drive.google.com/file/d/1ycFFbxdqHYcmX2HrrB-ShfESC1GXZvnh/view?usp=drivesdk",
        videos: [],
        photos: []
      }
    }
  },
  {
    id: 2,
    title: "Lightly Row",
    book: 1,
    versions: {
      Violet: { mp3: "https://drive.google.com/file/d/142njnGLEfHJjN3iMFeoevKz4Yms0-fkL/view?usp=drivesdk", videos: [], photos: [] },
      Theo: { mp3: "https://drive.google.com/file/d/1wMcqP-jB-lEprboHL-nwKVs_s6j0228z/view?usp=drivesdk" , videos: [], photos: [] }
    }
  }
]; 


// Random review song picker
export function getRandomReviewSong(studentId, currentSongId) {
  const songs = getStudentSongs(studentId).filter(s => s.id < currentSongId);
  if (songs.length === 0) return null;
  return songs[Math.floor(Math.random() * songs.length)];
}
