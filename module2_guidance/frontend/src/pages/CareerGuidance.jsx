import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CareerGuidance() {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);
  const [eligibleCompanies, setEligibleCompanies] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [strongSkills, setStrongSkills] = useState([]);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const studentId = localStorage.getItem('student_id');
    
    if (!studentId) {
      navigate('/');
      return;
    }

    // Fetch personalized roadmap
    fetch(`http://localhost:5002/api/guidance/roadmap/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setWeakAreas(data.weak_areas || []);
        setRoadmaps(data.roadmaps || []);
      });

    // Fetch suitable job roles
    fetch(`http://localhost:5002/api/guidance/job-roles/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setStrongSkills(data.strong_skills || []);
        setJobRoles(data.job_roles || []);
      });

    // Fetch company eligibility
    fetch(`http://localhost:5002/api/guidance/company-eligibility/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setAvgScore(data.average_score || 0);
        setEligibleCompanies(data.eligible_companies || []);
      });
  }, [navigate]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#764ba2', textAlign: 'center' }}>Career Guidance & Recommendations</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Module 2 - Personalized Career Path</p>

      {/* Improvement Roadmap */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#764ba2' }}>📚 Your Improvement Roadmap</h2>
        {weakAreas.length > 0 && (
          <p style={{ color: '#666', marginBottom: '20px' }}>Weak Areas: <strong>{weakAreas.join(', ')}</strong></p>
        )}
        {roadmaps.length === 0 ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>🎉 Great job! You're performing well in all areas!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {roadmaps.map(roadmap => (
              <div key={roadmap.id} style={{ border: '2px solid #764ba2', padding: '20px', borderRadius: '10px', backgroundColor: '#faf5ff' }}>
                <h3 style={{ color: '#764ba2' }}>{roadmap.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Category: <strong>{roadmap.category}</strong></p>
                <p style={{ marginTop: '15px' }}>{roadmap.description}</p>
                {roadmap.duration && <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#764ba2' }}>⏱ Duration: {roadmap.duration}</p>}
                {roadmap.resources && (
                  <div style={{ marginTop: '15px' }}>
                    <strong>📖 Resources:</strong>
                    <p style={{ whiteSpace: 'pre-line', marginTop: '5px', fontSize: '14px' }}>{roadmap.resources}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suitable Job Roles */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#764ba2' }}>💼 Suitable Job Roles for You</h2>
        {strongSkills.length > 0 && (
          <p style={{ color: '#666', marginBottom: '20px' }}>Your Strong Skills: <strong>{strongSkills.join(', ')}</strong></p>
        )}
        {jobRoles.length === 0 ? (
          <p style={{ color: '#666' }}>Complete more assessments to see job role recommendations</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {jobRoles.map(role => (
              <div key={role.id} style={{ border: '2px solid #28a745', padding: '20px', borderRadius: '10px', backgroundColor: '#f0fff4' }}>
                <h3 style={{ color: '#28a745' }}>{role.title}</h3>
                <p style={{ marginTop: '10px' }}>{role.description}</p>
                <p style={{ marginTop: '10px', fontSize: '14px' }}><strong>Required Skills:</strong> {role.required_skills.join(', ')}</p>
                <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#28a745' }}>💰 {role.salary_range}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Company Eligibility */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#764ba2' }}>🏢 Company Eligibility Simulation</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Your Average Score: <strong style={{ color: avgScore >= 70 ? 'green' : avgScore >= 50 ? 'orange' : 'red', fontSize: '20px' }}>{avgScore.toFixed(2)}%</strong></p>
        {eligibleCompanies.length === 0 ? (
          <p style={{ color: '#666' }}>Complete assessments to check company eligibility</p>
        ) : (
          <div>
            <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '20px' }}>✅ You are eligible for {eligibleCompanies.length} companies!</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {eligibleCompanies.map((company, i) => (
                <div key={i} style={{ border: '2px solid #1e90ff', padding: '20px', borderRadius: '10px', backgroundColor: '#f0f8ff' }}>
                  <h3 style={{ color: '#1e90ff' }}>{company.name}</h3>
                  <p style={{ marginTop: '10px' }}>Min Score Required: <strong>{company.min_score}%</strong></p>
                  <p style={{ marginTop: '10px' }}>Roles: {company.roles.join(', ')}</p>
                  <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#1e90ff' }}>💰 Package: {company.package}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={() => navigate('/assessment-dashboard')} style={{ padding: '12px 30px', backgroundColor: '#764ba2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default CareerGuidance;
