import { songs } from "../data/songs";

export function getStudentSongs(studentName) {
  return songs.map(song => ({
    ...song,
    version: song.versions[studentName] || {}
  }));
}
