import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Roadmap() {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    
    fetch(`http://localhost:5000/api/guidance/roadmap/${userId}`)
      .then(res => res.json())
      .then(data => setRoadmaps(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1e90ff', textAlign: 'center' }}>Your Personalized Learning Roadmap</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Based on your test performance, here are recommended learning paths</p>

      {roadmaps.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <p>Great job! You're performing well in all areas.</p>
          <p>Complete more tests to get personalized recommendations.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {roadmaps.map(roadmap => (
            <div key={roadmap.id} style={{ border: '2px solid #1e90ff', padding: '20px', borderRadius: '10px' }}>
              <h3 style={{ color: '#1e90ff' }}>{roadmap.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Category: {roadmap.category}</p>
              <p style={{ marginTop: '15px' }}>{roadmap.description}</p>
              {roadmap.duration && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Duration: {roadmap.duration}</p>}
              {roadmap.resources && (
                <div style={{ marginTop: '15px' }}>
                  <strong>Resources:</strong>
                  <p style={{ whiteSpace: 'pre-line', marginTop: '5px' }}>{roadmap.resources}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Roadmap;
