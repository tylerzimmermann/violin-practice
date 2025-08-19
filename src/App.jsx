import { useState } from "react";
import StudentSwitcher from "./components/StudentSwitcher";
import PracticeList from "./components/PracticeList";
import { getStudentSongs } from "./utils/getStudentSongs";

function App() {
  const [student, setStudent] = useState(null);

  return (
    <div>
      {!student ? (
        <StudentSwitcher onSelect={setStudent} />
      ) : (
        <PracticeList songs={getStudentSongs(student.name)} student={student} />
      )}
    </div>
  );
}

export default App;
