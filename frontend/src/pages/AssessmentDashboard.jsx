import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssessmentDashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const studentName = localStorage.getItem('student_name');
    const studentId = localStorage.getItem('student_id');
    
    if (!studentName) {
      navigate('/student-auth');
      return;
    }
    
    setName(studentName);
    
    fetch(`http://localhost:5001/api/results/${studentId}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const categories = [
    { name: 'Quantitative', key: 'quant', color: '#667eea' },
    { name: 'Reasoning', key: 'reasoning', color: '#28a745' },
    { name: 'Verbal', key: 'verbal', color: '#ffa500' },
    { name: 'DBMS', key: 'dbms', color: '#ff6347' },
    { name: 'Computer Networks', key: 'cn', color: '#9370db' },
    { name: 'Operating Systems', key: 'os', color: '#20b2aa' },
    { name: 'Coding', key: 'coding', color: '#ff1493' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#667eea', margin: 0 }}>Assessment Dashboard</h1>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Module 1 - Welcome, {name}!</p>
        </div>
        <div>
          <button onClick={() => navigate('/career-guidance')} style={{ padding: '10px 20px', backgroundColor: '#764ba2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Career Guidance</button>
          <button onClick={() => navigate('/analytics')} style={{ padding: '10px 20px', backgroundColor: '#ff6347', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Analytics</button>
          <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <h2 style={{ color: '#333', marginTop: '20px' }}>Select Test Category</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {categories.map(cat => (
          <div key={cat.key} style={{ border: `3px solid ${cat.color}`, padding: '25px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', backgroundColor: 'white', transition: 'transform 0.2s' }} onClick={() => navigate(`/assessment-test/${cat.key}`)} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <h3 style={{ color: cat.color, margin: 0, marginBottom: '15px' }}>{cat.name}</h3>
            <button style={{ padding: '12px 25px', backgroundColor: cat.color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Start Test</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333' }}>Your Test Results</h2>
        {results.length === 0 ? (
          <p style={{ color: '#666' }}>No tests taken yet. Start your first assessment above!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#667eea', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Percentage</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Readiness Score</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}>{r.category}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{r.score}/{r.total}</td>
                  <td style={{ padding: '12px', textAlign: 'center', color: r.percentage >= 60 ? 'green' : 'red', fontWeight: 'bold' }}>{r.percentage.toFixed(2)}%</td>
                  <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{r.readiness_score.toFixed(2)}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AssessmentDashboard;
