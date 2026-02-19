import { useEffect, useState } from "react";

function ProgressDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://127.0.0.1:5000/progress/status")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Progress Dashboard</h1>
      <p>Aptitude: {data.aptitude_score}</p>
      <p>Coding: {data.coding_score}</p>
      <p>Communication: {data.communication_score}</p>
      <p>Overall: {data.overall_readiness}</p>
    </div>
  );
}

export default ProgressDashboard;
