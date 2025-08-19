// src/data/songs.js

// Master Suzuki Book 1 Song List
// Each song has a unique id, book number, order, and title.
// You can later add Book 2+ manually.

export const songs = [
  { id: 1, book: 1, order: 1, title: "Twinkle, Twinkle Little Star Variations (A–E)", composer: "Folk / arr. Suzuki" },
  { id: 2, book: 1, order: 2, title: "Lightly Row", composer: "Folk / arr. Suzuki" },
  { id: 3, book: 1, order: 3, title: "Song of the Wind", composer: "Folk / arr. Suzuki" },
  { id: 4, book: 1, order: 4, title: "Go Tell Aunt Rhody", composer: "Folk / arr. Suzuki" },
  { id: 5, book: 1, order: 5, title: "O Come, Little Children", composer: "Folk / arr. Suzuki" },
  { id: 6, book: 1, order: 6, title: "May Song", composer: "Folk / arr. Suzuki" },
  { id: 7, book: 1, order: 7, title: "Long, Long Ago", composer: "Bayly" },
  { id: 8, book: 1, order: 8, title: "Allegro", composer: "Suzuki" },
  { id: 9, book: 1, order: 9, title: "Perpetual Motion", composer: "Suzuki" },
  { id: 10, book: 1, order: 10, title: "Allegretto", composer: "Suzuki" },
  { id: 11, book: 1, order: 11, title: "Andantino", composer: "Suzuki" },
  { id: 12, book: 1, order: 12, title: "Etude", composer: "Suzuki" },
  { id: 13, book: 1, order: 13, title: "Minuet 1", composer: "J.S. Bach" },
  { id: 14, book: 1, order: 14, title: "Minuet 2", composer: "J.S. Bach" },
  { id: 15, book: 1, order: 15, title: "Minuet 3", composer: "J.S. Bach" },
  { id: 16, book: 1, order: 16, title: "The Happy Farmer", composer: "Schumann" },
  { id: 17, book: 1, order: 17, title: "Gavotte", composer: "Gossec" }
];

// Student-specific versions of songs
// Example: Violet and Theo can each have their own versions (slow practice, performance, etc.)
// Add new versions here as needed.

export const studentSongVersions = [
  // Example entries:
  // {
  //   id: "violet-twinkle-performance",
  //   student: "Violet",
  //   baseSongId: 1, // Links to songs.id
  //   versionName: "Performance Tempo",
  //   fileUrl: "/uploads/violet-twinkle-performance.mp3",
  //   notes: "Use this for recital prep"
  // },
  // {
  //   id: "theo-twinkle-slow",
  //   student: "Theo",
  //   baseSongId: 1,
  //   versionName: "Slow Practice",
  //   fileUrl: "/uploads/theo-twinkle-slow.mp3",
  //   notes: "Focus on intonation"
  // }
];
