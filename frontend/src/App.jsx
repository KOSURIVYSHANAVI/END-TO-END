import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Placement Readiness Dashboard</h1>

      {students.map((student) => (
        <div key={student.id} style={{ marginBottom: "20px" }}>
          <h3>{student.name}</h3>

          <div
            style={{
              width: "300px",
              backgroundColor: "#ddd",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: `${student.progress}%`,
                backgroundColor: "green",
                padding: "5px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center",
              }}
            >
              {student.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
