import React, { useState, useEffect, useRef, useCallback } from ‘react’;
import { Plus, Music, Calendar, Clock, User, BookOpen, Target, Play, CheckCircle, Trash2, Star, Sparkles, Heart, Trophy, Gift, Upload, Volume2, Pause, Save, FileText, Share2, Mail, Printer, Copy, Award, TrendingUp, BarChart3, Settings, Home, ChevronRight, Timer, Zap, Moon, Sun, Library, Edit, X, Download, Link, Smile, PartyPopper, Rocket, Rainbow, Music2, Flower, Dog, Cat, Bird } from ‘lucide-react’;

const ViolinPracticeTracker = () => {
// Load Suzuki songs from CSV data
const suzukiSongs = [
{ book: 1, number: 1, title: “Twinkle, Twinkle Little Star”, composer: “Shinichi Suzuki” },
{ book: 1, number: 2, title: “Lightly Row”, composer: “Traditional” },
{ book: 1, number: 3, title: “Song of the Wind”, composer: “Traditional” },
{ book: 1, number: 4, title: “Go Tell Aunt Rhody”, composer: “Traditional” },
{ book: 1, number: 5, title: “O Come, Little Children”, composer: “Traditional” },
{ book: 1, number: 6, title: “May Song”, composer: “Traditional” },
{ book: 1, number: 7, title: “Long, Long Ago”, composer: “Thomas Haynes Bayly” },
{ book: 1, number: 8, title: “Allegro”, composer: “Shinichi Suzuki” },
{ book: 1, number: 9, title: “Perpetual Motion”, composer: “Shinichi Suzuki” },
{ book: 1, number: 10, title: “Allegretto”, composer: “Shinichi Suzuki” },
{ book: 1, number: 11, title: “Andantino”, composer: “Shinichi Suzuki” },
{ book: 1, number: 12, title: “Etude”, composer: “Shinichi Suzuki” },
{ book: 1, number: 13, title: “Minuet 1”, composer: “Johann Sebastian Bach” },
{ book: 1, number: 14, title: “Minuet 2”, composer: “Johann Sebastian Bach” },
{ book: 1, number: 15, title: “Minuet 3”, composer: “Johann Sebastian Bach” },
{ book: 1, number: 16, title: “The Happy Farmer”, composer: “Robert Schumann” },
{ book: 1, number: 17, title: “Gavotte”, composer: “François-Joseph Gossec” },
{ book: 2, number: 1, title: “Chorus from Judas Maccabaeus”, composer: “Georg Friedrich Händel” },
{ book: 2, number: 2, title: “Musette”, composer: “Johann Sebastian Bach” },
{ book: 2, number: 3, title: “Hunter’s Chorus”, composer: “Carl Maria von Weber” },
{ book: 2, number: 4, title: “Long, Long Ago and Variation”, composer: “Thomas Haynes Bayly” },
{ book: 2, number: 5, title: “Waltz”, composer: “Johannes Brahms” },
{ book: 2, number: 6, title: “Bourrée”, composer: “Georg Friedrich Händel” },
{ book: 2, number: 7, title: “The Two Grenadiers”, composer: “Robert Schumann” },
{ book: 2, number: 8, title: “Theme from Witches’ Dance”, composer: “Niccolò Paganini” },
{ book: 2, number: 9, title: “Gavotte from Mignon”, composer: “Ambroise Thomas” },
{ book: 2, number: 10, title: “Gavotte”, composer: “Jean-Baptiste Lully / Marin Marais” },
{ book: 2, number: 11, title: “Minuet in G”, composer: “Ludwig van Beethoven” },
{ book: 2, number: 12, title: “Minuet”, composer: “Luigi Boccherini” },
{ book: 3, number: 1, title: “Gavotte”, composer: “Giovanni Battista Martini” },
{ book: 3, number: 2, title: “Minuet”, composer: “Johann Sebastian Bach” },
{ book: 3, number: 3, title: “Gavotte in G Minor”, composer: “Johann Sebastian Bach” },
{ book: 3, number: 4, title: “Humoresque”, composer: “Antonín Dvořák” },
{ book: 3, number: 5, title: “Gavotte”, composer: “Jean Becker” },
{ book: 3, number: 6, title: “Gavotte in D Major”, composer: “Johann Sebastian Bach” },
{ book: 3, number: 7, title: “Bourrée”, composer: “Johann Sebastian Bach” }
];

// State Management
const [activeChild, setActiveChild] = useState(‘violet’);
const [currentView, setCurrentView] = useState(‘dashboard’);
const [showModal, setShowModal] = useState(null);
const [editingIndex, setEditingIndex] = useState(null);
const [celebration, setCelebration] = useState(null);
const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
const [practiceTimer, setPracticeTimer] = useState({ running: false, seconds: 0 });
const timerInterval = useRef(null);
const audioRef = useRef(null);
const fileInputRef = useRef(null);

// Current songs for each child (based on your input)
const currentSongs = {
violet: “Minuet 2”, // Book 1, #14
theo: “Long, Long Ago” // Book 1, #7
};

// Get review pieces for each child (everything before their current song)
const getReviewPieces = (child) => {
const currentSong = currentSongs[child];
const currentIndex = suzukiSongs.findIndex(s => s.title === currentSong);
if (currentIndex === -1) return [];
return suzukiSongs.slice(0, currentIndex);
};

// Initialize lessons with sample data
const [lessons, setLessons] = useState(() => {
const saved = localStorage.getItem(‘violinLessons’);
return saved ? JSON.parse(saved) : {
violet: [],
theo: []
};
});

const [practices, setPractices] = useState(() => {
const saved = localStorage.getItem(‘violinPractices’);
return saved ? JSON.parse(saved) : {
violet: [],
theo: []
};
});

// Song library with versions
const [songLibrary, setSongLibrary] = useState(() => {
const saved = localStorage.getItem(‘violinSongLibrary’);
return saved ? JSON.parse(saved) : {};
});

const [studentVersions, setStudentVersions] = useState(() => {
const saved = localStorage.getItem(‘violinStudentVersions’);
return saved ? JSON.parse(saved) : {
violet: {},
theo: {}
};
});

// Save to localStorage whenever data changes
useEffect(() => {
localStorage.setItem(‘violinLessons’, JSON.stringify(lessons));
}, [lessons]);

useEffect(() => {
localStorage.setItem(‘violinPractices’, JSON.stringify(practices));
}, [practices]);

useEffect(() => {
localStorage.setItem(‘violinSongLibrary’, JSON.stringify(songLibrary));
}, [songLibrary]);

useEffect(() => {
localStorage.setItem(‘violinStudentVersions’, JSON.stringify(studentVersions));
}, [studentVersions]);

// Form state
const [forms, setForms] = useState({
lesson: {
date: new Date().toISOString().split(‘T’)[0],
practiceItems: [{ type: ‘Technique/Skill’, content: ‘’, notes: ‘’, media: null, reviewConfig: null }],
teacherNotes: ‘’
},
practice: {
date: new Date().toISOString().split(‘T’)[0],
duration: ‘’,
completedItems: [],
practiceNotes: ‘’,
basedOnLesson: null,
randomizedReviewSongs: {}
},
reviewConfig: {
numberOfSongs: 3,
availableSongs: [],
randomSelection: true
}
});

const config = {
practiceItemTypes: [‘Technique/Skill’, ‘New Song’, ‘Review Pieces’, ‘Scale/Exercise’, ‘Etude’, ‘Theory Work’, ‘Sight Reading’, ‘Listening’, ‘Bow Exercise’, ‘Intonation Work’],
celebrationAnimations: [
{ icon: Star, animation: ‘stars’, message: “Amazing job!”, color: “text-amber-400” },
{ icon: PartyPopper, animation: ‘confetti’, message: “Party time!”, color: “text-pink-400” },
{ icon: Rocket, animation: ‘rocket’, message: “You’re soaring!”, color: “text-blue-400” },
{ icon: Rainbow, animation: ‘rainbow’, message: “Beautiful!”, color: “text-purple-400” },
{ icon: Dog, animation: ‘dog’, message: “Pawsome work!”, color: “text-amber-600” },
{ icon: Cat, animation: ‘cat’, message: “Purr-fect!”, color: “text-gray-600” },
{ icon: Bird, animation: ‘bird’, message: “Flying high!”, color: “text-sky-400” },
{ icon: Flower, animation: ‘flowers’, message: “Blooming great!”, color: “text-rose-400” },
{ icon: Music2, animation: ‘notes’, message: “Music to my ears!”, color: “text-indigo-400” },
{ icon: Smile, animation: ‘balloons’, message: “All smiles!”, color: “text-yellow-400” }
]
};

// Helper Functions
const getCurrentLesson = useCallback(() => lessons[activeChild]?.[0] || null, [lessons, activeChild]);

const getSongVersions = (songTitle) => songLibrary[songTitle] || [];

const getCurrentVersion = (songTitle) => {
const versions = getSongVersions(songTitle);
const preference = studentVersions[activeChild]?.[songTitle];
return versions.find(v => v.id === preference) || versions[0] || null;
};

const triggerCelebration = () => {
const random = config.celebrationAnimations[Math.floor(Math.random() * config.celebrationAnimations.length)];
setCelebration(random);
setTimeout(() => setCelebration(null), 4000);
};

const playAudio = (songTitle) => {
const version = getCurrentVersion(songTitle);
if (version?.url) {
if (audioRef.current) {
audioRef.current.src = version.url;
audioRef.current.play();
setCurrentlyPlaying(songTitle);
}
}
};

const stopAudio = () => {
if (audioRef.current) {
audioRef.current.pause();
audioRef.current.currentTime = 0;
setCurrentlyPlaying(null);
}
};

const getRandomSongs = (songs, count) => {
if (!songs || songs.length <= count) return songs || [];
return […songs].sort(() => 0.5 - Math.random()).slice(0, count);
};

// Timer Functions
const startTimer = useCallback(() => {
if (!practiceTimer.running) {
setPracticeTimer(prev => ({ …prev, running: true }));
timerInterval.current = setInterval(() => {
setPracticeTimer(prev => ({ …prev, seconds: prev.seconds + 1 }));
}, 1000);
}
}, [practiceTimer.running]);

const pauseTimer = useCallback(() => {
if (timerInterval.current) {
clearInterval(timerInterval.current);
timerInterval.current = null;
setPracticeTimer(prev => ({ …prev, running: false }));
}
}, []);

const resetTimer = useCallback(() => {
pauseTimer();
setPracticeTimer({ running: false, seconds: 0 });
}, [pauseTimer]);

// Form handlers
const updateForm = (formType, field, value) => {
setForms(prev => ({
…prev,
[formType]: { …prev[formType], [field]: value }
}));
};

const updatePracticeItem = (index, field, value) => {
const items = […forms.lesson.practiceItems];
items[index] = { …items[index], [field]: value };
updateForm(‘lesson’, ‘practiceItems’, items);
};

const addPracticeItem = () => {
const newItem = { type: ‘Technique/Skill’, content: ‘’, notes: ‘’, media: null, reviewConfig: null };
updateForm(‘lesson’, ‘practiceItems’, […forms.lesson.practiceItems, newItem]);
};

const removePracticeItem = (index) => {
updateForm(‘lesson’, ‘practiceItems’, forms.lesson.practiceItems.filter((_, i) => i !== index));
};

const saveLesson = () => {
const lesson = {
…forms.lesson,
id: Date.now(),
child: activeChild,
practiceItems: forms.lesson.practiceItems.filter(item => item.content.trim())
};
setLessons(prev => ({ …prev, [activeChild]: [lesson, …(prev[activeChild] || [])] }));
setForms(prev => ({
…prev,
lesson: {
date: new Date().toISOString().split(‘T’)[0],
practiceItems: [{ type: ‘Technique/Skill’, content: ‘’, notes: ‘’, media: null, reviewConfig: null }],
teacherNotes: ‘’
}
}));
setCurrentView(‘dashboard’);
triggerCelebration();
};

const startPractice = () => {
const lesson = getCurrentLesson();
if (!lesson) return;

```
const randomized = {};
lesson.practiceItems.forEach((item, index) => {
  if (item.type === 'Review Pieces' && item.reviewConfig) {
    randomized[index] = item.reviewConfig.randomSelection
      ? getRandomSongs(item.reviewConfig.availableSongs, item.reviewConfig.numberOfSongs)
      : item.reviewConfig.availableSongs.slice(0, item.reviewConfig.numberOfSongs);
  }
});

setForms(prev => ({
  ...prev,
  practice: {
    ...prev.practice,
    basedOnLesson: lesson.id,
    randomizedReviewSongs: randomized,
    completedItems: []
  }
}));
setCurrentView('practice-session');
startTimer();
```

};

const toggleCompleted = (index) => {
const completed = forms.practice.completedItems;
const wasCompleted = completed.includes(index);

```
updateForm('practice', 'completedItems', 
  wasCompleted ? completed.filter(i => i !== index) : [...completed, index]
);

if (!wasCompleted) triggerCelebration();
```

};

const savePractice = () => {
pauseTimer();
const practice = {
…forms.practice,
id: Date.now(),
child: activeChild,
duration: Math.floor(practiceTimer.seconds / 60).toString()
};
setPractices(prev => ({ …prev, [activeChild]: [practice, …(prev[activeChild] || [])] }));
resetTimer();
setCurrentView(‘dashboard’);
triggerCelebration();
};

// File upload handler
const handleFileUpload = (songTitle, file) => {
if (file && file.type.startsWith(‘audio/’)) {
const reader = new FileReader();
reader.onload = (e) => {
const newVersion = {
id: Date.now(),
type: ‘Uploaded’,
url: e.target.result,
fileName: file.name,
isGoogleDrive: false
};

```
    setSongLibrary(prev => ({
      ...prev,
      [songTitle]: [...(prev[songTitle] || []), newVersion]
    }));
    
    // Auto-set as default for current student if no version selected
    if (!studentVersions[activeChild]?.[songTitle]) {
      setStudentVersions(prev => ({
        ...prev,
        [activeChild]: { ...prev[activeChild], [songTitle]: newVersion.id }
      }));
    }
  };
  reader.readAsDataURL(file);
}
```

};

// Google Drive link handler
const handleGoogleDriveLink = (songTitle, link, versionType) => {
const newVersion = {
id: Date.now(),
type: versionType || ‘Google Drive’,
url: link,
fileName: ‘Google Drive Link’,
isGoogleDrive: true
};

```
setSongLibrary(prev => ({
  ...prev,
  [songTitle]: [...(prev[songTitle] || []), newVersion]
}));
```

};

// Sharing Functions
const generateShareReport = () => {
const childPractices = practices[activeChild] || [];
const childLessons = lessons[activeChild] || [];
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

```
const weekPractices = childPractices.filter(p => new Date(p.date) >= lastWeek);
const totalMinutes = weekPractices.reduce((acc, p) => acc + parseInt(p.duration || 0), 0);
const avgMinutes = weekPractices.length > 0 ? Math.round(totalMinutes / weekPractices.length) : 0;

return {
  studentName: activeChild.charAt(0).toUpperCase() + activeChild.slice(1),
  currentSong: currentSongs[activeChild],
  weekStarting: lastWeek.toLocaleDateString(),
  practiceCount: weekPractices.length,
  totalMinutes,
  avgMinutes,
  recentLesson: childLessons[0],
  completionRate: calculateCompletionRate(weekPractices),
  strengths: identifyStrengths(weekPractices),
  areasToImprove: identifyAreasToImprove(weekPractices)
};
```

};

const calculateCompletionRate = (practices) => {
if (practices.length === 0) return 0;
let totalItems = 0;
let completedItems = 0;

```
practices.forEach(practice => {
  const lesson = lessons[activeChild]?.find(l => l.id === practice.basedOnLesson);
  if (lesson) {
    totalItems += lesson.practiceItems.length;
    completedItems += practice.completedItems.length;
  }
});

return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
```

};

const identifyStrengths = (practices) => {
const strengths = [];
if (practices.length >= 5) strengths.push(“Consistent daily practice”);
if (practices.some(p => parseInt(p.duration) >= 30)) strengths.push(“Extended focus sessions”);
if (calculateCompletionRate(practices) >= 80) strengths.push(“High task completion rate”);
return strengths.length > 0 ? strengths : [“Building good practice habits”];
};

const identifyAreasToImprove = (practices) => {
const areas = [];
if (practices.length < 5) areas.push(“Increase practice frequency”);
if (practices.every(p => parseInt(p.duration) < 20)) areas.push(“Extend practice duration”);
if (calculateCompletionRate(practices) < 50) areas.push(“Focus on completing all practice items”);
return areas.length > 0 ? areas : [“Continue current excellent progress”];
};

const shareViaEmail = () => {
const report = generateShareReport();
const subject = `${report.studentName}'s Violin Practice Report - Week of ${report.weekStarting}`;
const body = `
Dear Teacher,

Here is ${report.studentName}’s practice report for the week:

Current Song: ${report.currentSong}
Practice Sessions: ${report.practiceCount}
Total Practice Time: ${report.totalMinutes} minutes
Average Session: ${report.avgMinutes} minutes
Completion Rate: ${report.completionRate}%

Strengths:
${report.strengths.map(s => `- ${s}`).join(’\n’)}

Areas to Focus:
${report.areasToImprove.map(a => `- ${a}`).join(’\n’)}

${report.recentLesson ? `\nMost Recent Lesson Focus:\n${report.recentLesson.practiceItems.map(i => `- ${i.type}: ${i.content}`).join('\n')}` : ‘’}

${report.recentLesson?.teacherNotes ? `\nTeacher's Notes: ${report.recentLesson.teacherNotes}` : ‘’}

Best regards,
${report.studentName}’s Parent
`;

```
window.location.href = `mailto:teacher@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

};

const copyToClipboard = () => {
const report = generateShareReport();
const text = `
${report.studentName}’s Practice Report
Week of ${report.weekStarting}

🎻 Current Song: ${report.currentSong}

📊 Stats:
• Practice Sessions: ${report.practiceCount}
• Total Time: ${report.totalMinutes} minutes
• Average Session: ${report.avgMinutes} minutes
• Completion Rate: ${report.completionRate}%

✨ Strengths:
${report.strengths.map(s => `• ${s}`).join(’\n’)}

🎯 Focus Areas:
${report.areasToImprove.map(a => `• ${a}`).join(’\n’)}
`;

```
navigator.clipboard.writeText(text);
triggerCelebration();
```

};

// Modal handlers
const openReviewSelector = (index) => {
setEditingIndex(index);
const item = forms.lesson.practiceItems[index];
const reviewPieces = getReviewPieces(activeChild);
setForms(prev => ({
…prev,
reviewConfig: item.reviewConfig || {
numberOfSongs: 3,
availableSongs: reviewPieces.slice(-5).map(s => s.title), // Default to last 5 review pieces
randomSelection: true
}
}));
setShowModal(‘review-selector’);
};

const saveReviewConfig = () => {
if (editingIndex !== null) {
updatePracticeItem(editingIndex, ‘reviewConfig’, forms.reviewConfig);
updatePracticeItem(editingIndex, ‘content’,
`${forms.reviewConfig.numberOfSongs} review pieces${forms.reviewConfig.randomSelection ? ' (random)' : ''}`
);
}
setShowModal(null);
setEditingIndex(null);
};

// Components
const CelebrationOverlay = () => {
if (!celebration) return null;
const IconComponent = celebration.icon;

```
const renderAnimation = () => {
  switch(celebration.animation) {
    case 'confetti':
      return [...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '3s',
            background: ['#FFD700', '#FF69B4', '#00CED1', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 5)]
          }}
        />
      ));
    case 'balloons':
      return [...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${10 + i * 10}%`,
            bottom: `-100px`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '3s'
          }}
        >
          🎈
        </div>
      ));
    case 'dog':
      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-6xl animate-bounce">
          🐕
        </div>
      );
    case 'cat':
      return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-6xl animate-pulse">
          🐈
        </div>
      );
    case 'flowers':
      return [...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute text-3xl animate-spin"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '4s'
          }}
        >
          🌸
        </div>
      ));
    case 'notes':
      return [...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {['🎵', '🎶', '🎼'][Math.floor(Math.random() * 3)]}
        </div>
      ));
    default:
      return [...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: '1s'
          }}
        >
          <Star className="w-4 h-4 text-amber-300" />
        </div>
      ));
  }
};

return (
  <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
    <div className="animate-bounce bg-white rounded-full p-8 shadow-2xl border-4 border-amber-200">
      <IconComponent className={`w-20 h-20 ${celebration.color}`} />
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-24">
      <div className="bg-white px-8 py-4 rounded-full shadow-lg border-2 border-amber-200 animate-pulse">
        <p className="text-2xl font-bold text-slate-700">{celebration.message}</p>
      </div>
    </div>
    {renderAnimation()}
  </div>
);
```

};

const Modal = ({ title, children, onClose }) => (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
<div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
<div className="p-6">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-semibold text-slate-700">{title}</h3>
<button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
</div>
{children}
</div>
</div>
</div>
);

const SongLibrary = () => (
<Modal title=“Song Library & Versions” onClose={() => setShowModal(null)}>
<div className="mb-4">
<div className="flex items-center gap-2 mb-2">
<User className="w-4 h-4 text-indigo-500" />
<span className="text-sm font-medium text-slate-600">Managing versions for {activeChild}</span>
</div>
</div>

```
  <div className="space-y-4 max-h-96 overflow-y-auto">
    {suzukiSongs.map(song => {
      const versions = getSongVersions(song.title);
      const currentVersion = getCurrentVersion(song.title);
      const isCurrentSong = currentSongs[activeChild] === song.title;
      const isReviewSong = getReviewPieces(activeChild).some(s => s.title === song.title);

      return (
        <div key={`${song.book}-${song.number}`} className={`border rounded-lg p-4 ${
          isCurrentSong ? 'border-indigo-400 bg-indigo-50' : 
          isReviewSong ? 'border-emerald-300 bg-emerald-50' : 
          'border-slate-200'
        }`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded font-medium">
                  Book {song.book} #{song.number}
                </span>
                {isCurrentSong && (
                  <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded font-medium">
                    Current Song
                  </span>
                )}
                {isReviewSong && (
                  <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded font-medium">
                    Review Piece
                  </span>
                )}
              </div>
              <h4 className="font-medium text-slate-800">{song.title}</h4>
              <p className="text-sm text-slate-500">{song.composer}</p>
            </div>
          </div>

          {versions.length > 0 ? (
            <div className="space-y-2 mt-3">
              <div className="text-sm font-medium text-slate-600">Versions ({versions.length}):</div>
              {versions.map(version => (
                <div key={version.id} className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      currentVersion?.id === version.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {version.type}
                    </span>
                    {version.url && (
                      <button 
                        onClick={() => playAudio(song.title)} 
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        {currentlyPlaying === song.title ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    )}
                    {version.isGoogleDrive && <Link className="w-3 h-3 text-blue-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {currentVersion?.id !== version.id ? (
                      <button
                        onClick={() => setStudentVersions(prev => ({
                          ...prev,
                          [activeChild]: { ...prev[activeChild], [song.title]: version.id }
                        }))}
                        className="text-xs text-indigo-500 hover:text-indigo-700 font-medium"
                      >
                        Set Active
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium">Active</span>
                    )}
                    <button
                      onClick={() => {
                        setSongLibrary(prev => ({
                          ...prev,
                          [song.title]: prev[song.title].filter(v => v.id !== version.id)
                        }));
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500 italic">No versions uploaded</div>
          )}

          <div className="mt-3 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'audio/*';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) handleFileUpload(song.title, file);
                  };
                  input.click();
                }}
                className="inline-flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-700 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload MP3
              </button>
              <button
                onClick={() => {
                  const link = prompt('Enter Google Drive link:');
                  const type = prompt('Version type (e.g., "Full Tempo", "Slow Practice", "Piano Only"):') || 'Google Drive';
                  if (link) handleGoogleDriveLink(song.title, link, type);
                }}
                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
              >
                <Link className="w-4 h-4" />
                Add Google Drive Link
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</Modal>
```

);

const ReviewSelector = () => {
const reviewPieces = getReviewPieces(activeChild);

```
return (
  <Modal title="Configure Review Pieces" onClose={() => setShowModal(null)}>
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-3">Number of songs to review</label>
        <input
          type="range"
          min="1"
          max={Math.min(10, reviewPieces.length)}
          value={forms.reviewConfig.numberOfSongs}
          onChange={(e) => updateForm('reviewConfig', 'numberOfSongs', parseInt(e.target.value))}
          className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1</span>
          <span className="font-medium text-indigo-500">{forms.reviewConfig.numberOfSongs} songs</span>
          <span>{Math.min(10, reviewPieces.length)}</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={forms.reviewConfig.randomSelection}
            onChange={(e) => updateForm('reviewConfig', 'randomSelection', e.target.checked)}
            className="w-4 h-4 text-indigo-500 focus:ring-indigo-400 rounded"
          />
          <span className="text-sm font-medium text-slate-600">Randomly select songs for each practice</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-3">Quick Select</label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => updateForm('reviewConfig', 'availableSongs', reviewPieces.slice(-5).map(s => s.title))}
            className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors font-medium"
          >
            Last 5 Songs
          </button>
          <button
            onClick={() => updateForm('reviewConfig', 'availableSongs', reviewPieces.slice(-10).map(s => s.title))}
            className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors font-medium"
          >
            Last 10 Songs
          </button>
          <button
            onClick={() => updateForm('reviewConfig', 'availableSongs', reviewPieces.map(s => s.title))}
            className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm hover:bg-indigo-100 transition-colors font-medium"
          >
            All Review Songs
          </button>
          <button
            onClick={() => updateForm('reviewConfig', 'availableSongs', [])}
            className="px-3 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm hover:bg-slate-100 transition-colors font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-3">
          Available Songs ({forms.reviewConfig.availableSongs.length} selected) - All songs before {currentSongs[activeChild]}
        </label>
        <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
          {reviewPieces.map(song => (
            <label key={`${song.book}-${song.number}`} className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
              <input
                type="checkbox"
                checked={forms.reviewConfig.availableSongs.includes(song.title)}
                onChange={() => {
                  const songs = forms.reviewConfig.availableSongs;
                  updateForm('reviewConfig', 'availableSongs',
                    songs.includes(song.title)
                      ? songs.filter(s => s !== song.title)
                      : [...songs, song.title]
                  );
                }}
                className="w-4 h-4 text-indigo-500 focus:ring-indigo-400 rounded"
              />
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-medium">Book {song.book}</span>
              <span className="flex-1 text-sm text-slate-700">{song.title}</span>
              {getSongVersions(song.title).length > 0 && <Volume2 className="w-3 h-3 text-emerald-500" />}
            </label>
          ))}
        </div>
      </div>
    </div>

    <div className="flex gap-3 mt-6">
      <button onClick={saveReviewConfig} className="flex-1 bg-indigo-500 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors font-medium">
        Save Configuration
      </button>
      <button onClick={() => setShowModal(null)} className="px-4 py-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
        Cancel
      </button>
    </div>
  </Modal>
);
```

};
