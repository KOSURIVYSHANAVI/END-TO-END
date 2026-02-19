import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnalyticsDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({});
  const [progressData, setProgressData] = useState([]);
  const [chartData, setChartData] = useState({ categories: [], scores: [] });
  const [timeline, setTimeline] = useState([]);
  const [comparison, setComparison] = useState({});

  useEffect(() => {
    const studentId = localStorage.getItem('student_id');
    
    if (!studentId) {
      navigate('/');
      return;
    }

    // Fetch dashboard analytics
    fetch(`http://localhost:5003/api/analytics/dashboard/${studentId}`)
      .then(res => res.json())
      .then(data => setDashboardData(data));

    // Fetch progress data
    fetch(`http://localhost:5003/api/analytics/progress/${studentId}`)
      .then(res => res.json())
      .then(data => setProgressData(data.progress_data || []));

    // Fetch chart data
    fetch(`http://localhost:5003/api/analytics/chart/${studentId}`)
      .then(res => res.json())
      .then(data => setChartData(data));

    // Fetch timeline
    fetch(`http://localhost:5003/api/analytics/timeline/${studentId}`)
      .then(res => res.json())
      .then(data => setTimeline(data.timeline || []));

    // Fetch comparison
    fetch(`http://localhost:5003/api/analytics/comparison/${studentId}`)
      .then(res => res.json())
      .then(data => setComparison(data.comparisons || {}));
  }, [navigate]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#ff6347', textAlign: 'center' }}>Analytics & Performance Visualization</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Module 3 - Track Your Progress</p>

      {/* Summary Cards */}
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

      {/* Performance Chart */}
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

      {/* Progress Timeline */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#ff6347' }}>📈 Readiness Improvement Timeline</h2>
        {timeline.length === 0 ? (
          <p style={{ color: '#666' }}>No timeline data available</p>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid #ff6347' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{item.category.toUpperCase()}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>{item.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: item.percentage >= 60 ? 'green' : 'red' }}>{item.percentage.toFixed(1)}%</p>
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>Readiness: {item.readiness_score.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Score Comparison */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#ff6347' }}>🔄 Current vs Previous Performance</h2>
        {Object.keys(comparison).length === 0 ? (
          <p style={{ color: '#666' }}>Take multiple tests in same category to see comparison</p>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {Object.keys(comparison).map((cat, i) => (
              <div key={i} style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 15px 0', textTransform: 'uppercase', color: '#333' }}>{cat}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Current</p>
                    <p style={{ margin: '5px 0', fontSize: '28px', fontWeight: 'bold', color: '#1e90ff' }}>{comparison[cat].current.toFixed(1)}%</p>
                  </div>
                  <div style={{ fontSize: '30px' }}>→</div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Previous</p>
                    <p style={{ margin: '5px 0', fontSize: '28px', fontWeight: 'bold', color: '#999' }}>{comparison[cat].previous ? comparison[cat].previous.toFixed(1) + '%' : 'N/A'}</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Improvement</p>
                    <p style={{ margin: '5px 0', fontSize: '28px', fontWeight: 'bold', color: comparison[cat].improvement >= 0 ? 'green' : 'red' }}>
                      {comparison[cat].improvement >= 0 ? '+' : ''}{comparison[cat].improvement.toFixed(1)}%
                    </p>
                  </div>
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
