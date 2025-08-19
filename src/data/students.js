// Song + media data per student
const students = {
  Violet: {
    color: "#a2c8ff", // soft blue
    avatar: "/media/avatars/violet.png", // put this in /public/media/avatars
    songs: [
      {
        id: 1,
        title: "Twinkle Twinkle Little Star",
        mp3: "/media/violet/twinkle.mp3",
        videos: ["/media/violet/twinkle1.mp4"],
        photos: ["/media/violet/twinkle1.jpg"]
      },
      {
        id: 2,
        title: "Lightly Row",
        mp3: "/media/violet/lightly-row.mp3",
        videos: [],
        photos: []
      }
    ]
  },
  Theo: {
    color: "#ffd6a2", // soft orange
    avatar: "/media/avatars/theo.png",
    songs: [
      {
        id: 1,
        title: "Song of the Wind",
        mp3: "/media/theo/song-of-the-wind.mp3",
        videos: [],
        photos: []
      }
    ]
  }
};

export default students;

// Utility function for fetching songs per student
export const getStudentSongs = (name) => {
  return students[name]?.songs || [];
};
