import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem('name');
    const userId = localStorage.getItem('user_id');
    
    if (!userName) {
      navigate('/student/login');
      return;
    }
    
    setName(userName);
    
    fetch(`http://localhost:5000/api/assessment/results/${userId}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const categories = [
    { name: 'Quantitative', key: 'quant', color: '#1e90ff' },
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
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e90ff' }}>Welcome, {name}!</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <h2>Select Test Category</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {categories.map(cat => (
          <div key={cat.key} style={{ border: `2px solid ${cat.color}`, padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(`/test/${cat.key}`)}>
            <h3 style={{ color: cat.color }}>{cat.name}</h3>
            <button style={{ padding: '10px 20px', backgroundColor: cat.color, color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Start Test</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px' }}>
        <h2>Your Results</h2>
        {results.length === 0 ? (
          <p>No tests taken yet</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Category</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Score</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Percentage</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{r.category}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{r.score}/{r.total}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', color: r.percentage >= 60 ? 'green' : 'red' }}>{r.percentage.toFixed(2)}%</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button onClick={() => navigate('/roadmap')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Personalized Roadmap</button>
      </div>
    </div>
  );
}

export default Dashboard;
