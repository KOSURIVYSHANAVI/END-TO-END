import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState({});
  const [students, setStudents] = useState([]);
  
  const [questionForm, setQuestionForm] = useState({
    category: 'quant',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A'
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/admin-auth');
      return;
    }

    fetch('http://localhost:5004/api/admin/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5004/api/admin/students')
      .then(res => res.json())
      .then(data => setStudents(data.students || []))
      .catch(err => console.error(err));
  }, [navigate]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5004/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionForm)
      });
      if (res.ok) {
        alert('Question added successfully!');
        setQuestionForm({ category: 'quant', question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: 'A' });
      }
    } catch (error) {
      alert('Error adding question');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#6c757d', margin: 0 }}>Admin Management Dashboard</h1>
          <p style={{ color: '#666', margin: '5px 0' }}>Module 4 - System Administration</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#1e90ff', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{analytics.total_students || 0}</h2>
          <p style={{ margin: '10px 0 0 0' }}>Total Students</p>
        </div>
        <div style={{ backgroundColor: '#28a745', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{analytics.total_tests || 0}</h2>
          <p style={{ margin: '10px 0 0 0' }}>Total Tests</p>
        </div>
        <div style={{ backgroundColor: '#ffa500', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{analytics.total_questions || 0}</h2>
          <p style={{ margin: '10px 0 0 0' }}>Questions</p>
        </div>
        <div style={{ backgroundColor: '#ff6347', color: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '36px' }}>{analytics.avg_performance || 0}%</h2>
          <p style={{ margin: '10px 0 0 0' }}>Avg Performance</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('overview')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'overview' ? '#6c757d' : 'white', color: activeTab === 'overview' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>Overview</button>
        <button onClick={() => setActiveTab('questions')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'questions' ? '#6c757d' : 'white', color: activeTab === 'questions' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>Add Questions</button>
        <button onClick={() => setActiveTab('students')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'students' ? '#6c757d' : 'white', color: activeTab === 'students' ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer' }}>Students</button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>System Overview</h2>
          <p>All 4 modules are integrated and working!</p>
        </div>
      )}

      {activeTab === 'questions' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Add New Question</h2>
          <form onSubmit={handleAddQuestion}>
            <select value={questionForm.category} onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="quant">Quantitative</option>
              <option value="reasoning">Reasoning</option>
              <option value="verbal">Verbal</option>
              <option value="dbms">DBMS</option>
              <option value="cn">Computer Networks</option>
              <option value="os">Operating Systems</option>
              <option value="coding">Coding</option>
            </select>
            <textarea placeholder="Question Text" value={questionForm.question_text} onChange={(e) => setQuestionForm({ ...questionForm, question_text: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }} />
            <input type="text" placeholder="Option A" value={questionForm.option_a} onChange={(e) => setQuestionForm({ ...questionForm, option_a: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Option B" value={questionForm.option_b} onChange={(e) => setQuestionForm({ ...questionForm, option_b: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Option C" value={questionForm.option_c} onChange={(e) => setQuestionForm({ ...questionForm, option_c: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Option D" value={questionForm.option_d} onChange={(e) => setQuestionForm({ ...questionForm, option_d: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <select value={questionForm.correct_answer} onChange={(e) => setQuestionForm({ ...questionForm, correct_answer: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Question</button>
          </form>
        </div>
      )}

      {activeTab === 'students' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Student Monitoring</h2>
          {students.length === 0 ? (
            <p>No students registered yet</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#6c757d', color: 'white' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Tests</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Avg Score</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{student.name}</td>
                    <td style={{ padding: '10px' }}>{student.email}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{student.tests_taken}</td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: student.average_score >= 70 ? 'green' : 'red' }}>{student.average_score}%</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: student.readiness_status === 'Ready' ? '#d4edda' : '#f8d7da', color: student.readiness_status === 'Ready' ? '#155724' : '#721c24' }}>{student.readiness_status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminManagement;
