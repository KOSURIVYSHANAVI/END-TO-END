import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});
  const [chartData, setChartData] = useState({ categories: [], scores: [] });

  useEffect(() => {
    const studentId = localStorage.getItem('student_id');
    
    if (!studentId) {
      navigate('/');
      return;
    }

    fetch(`http://localhost:5003/api/analytics/dashboard/${studentId}`)
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:5003/api/analytics/chart/${studentId}`)
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(err => console.error(err));
  }, [navigate]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff6347', textAlign: 'center' }}>Analytics & Performance Visualization</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Module 3 - Track Your Progress</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#1e90ff', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{dashboardData.total_tests || 0}</h2>
          <p style={{ margin: '10px 0 0 0' }}>Total Tests</p>
        </div>
        <div style={{ backgroundColor: '#28a745', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{dashboardData.average_score?.toFixed(1) || 0}%</h2>
          <p style={{ margin: '10px 0 0 0' }}>Average Score</p>
        </div>
        <div style={{ backgroundColor: '#ffa500', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{dashboardData.highest_score?.toFixed(1) || 0}%</h2>
          <p style={{ margin: '10px 0 0 0' }}>Highest Score</p>
        </div>
        <div style={{ backgroundColor: '#dc3545', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{dashboardData.lowest_score?.toFixed(1) || 0}%</h2>
          <p style={{ margin: '10px 0 0 0' }}>Lowest Score</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#ff6347' }}>📊 Performance by Category</h2>
        {chartData.categories.length === 0 ? (
          <p style={{ color: '#666' }}>No data available. Take some tests first!</p>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {chartData.categories.map((cat, i) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{cat}</span>
                  <span style={{ fontWeight: 'bold', color: chartData.scores[i] >= 60 ? 'green' : 'red' }}>{chartData.scores[i].toFixed(1)}%</span>
                </div>
                <div style={{ width: '100%', height: '30px', backgroundColor: '#e0e0e0', borderRadius: '15px', overflow: 'hidden' }}>
                  <div style={{ width: `${chartData.scores[i]}%`, height: '100%', backgroundColor: chartData.scores[i] >= 60 ? '#28a745' : '#dc3545', transition: 'width 0.5s' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => navigate('/assessment-dashboard')} style={{ padding: '12px 30px', backgroundColor: '#ff6347', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
