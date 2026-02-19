import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('questions');
  const [students, setStudents] = useState([]);
  const [analytics, setAnalytics] = useState({});
  
  const [questionForm, setQuestionForm] = useState({
    category: 'quant',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    difficulty: 'medium'
  });

  const [roadmapForm, setRoadmapForm] = useState({
    category: 'quant',
    title: '',
    description: '',
    resources: '',
    duration: ''
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    fetch('http://localhost:5000/api/admin/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/admin/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => console.error(err));
  }, [navigate]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionForm)
      });
      if (res.ok) {
        alert('Question added successfully!');
        setQuestionForm({ category: 'quant', question_text: '', option_a: '', option_b: '', option_c: '', option_d: '', correct_answer: 'A', difficulty: 'medium' });
      }
    } catch (error) {
      alert('Error adding question');
    }
  };

  const handleAddRoadmap = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/roadmaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roadmapForm)
      });
      if (res.ok) {
        alert('Roadmap added successfully!');
        setRoadmapForm({ category: 'quant', title: '', description: '', resources: '', duration: '' });
      }
    } catch (error) {
      alert('Error adding roadmap');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#ff6347' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: '#1e90ff', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2>{analytics.total_students || 0}</h2>
          <p>Total Students</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#28a745', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2>{analytics.total_tests || 0}</h2>
          <p>Total Tests</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#ffa500', color: 'white', borderRadius: '10px', textAlign: 'center' }}>
          <h2>{analytics.avg_performance || 0}%</h2>
          <p>Avg Performance</p>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('questions')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'questions' ? '#1e90ff' : '#ddd', color: activeTab === 'questions' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Questions</button>
        <button onClick={() => setActiveTab('roadmaps')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: activeTab === 'roadmaps' ? '#1e90ff' : '#ddd', color: activeTab === 'roadmaps' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Roadmaps</button>
        <button onClick={() => setActiveTab('students')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'students' ? '#1e90ff' : '#ddd', color: activeTab === 'students' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View Students</button>
      </div>

      {activeTab === 'questions' && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
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

      {activeTab === 'roadmaps' && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
          <h2>Add New Roadmap</h2>
          <form onSubmit={handleAddRoadmap}>
            <select value={roadmapForm.category} onChange={(e) => setRoadmapForm({ ...roadmapForm, category: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
              <option value="quant">Quantitative</option>
              <option value="reasoning">Reasoning</option>
              <option value="verbal">Verbal</option>
              <option value="dbms">DBMS</option>
              <option value="cn">Computer Networks</option>
              <option value="os">Operating Systems</option>
              <option value="coding">Coding</option>
            </select>
            <input type="text" placeholder="Title" value={roadmapForm.title} onChange={(e) => setRoadmapForm({ ...roadmapForm, title: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <textarea placeholder="Description" value={roadmapForm.description} onChange={(e) => setRoadmapForm({ ...roadmapForm, description: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' }} />
            <textarea placeholder="Resources (links, books, etc.)" value={roadmapForm.resources} onChange={(e) => setRoadmapForm({ ...roadmapForm, resources: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', minHeight: '60px' }} />
            <input type="text" placeholder="Duration (e.g., 2 weeks)" value={roadmapForm.duration} onChange={(e) => setRoadmapForm({ ...roadmapForm, duration: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Roadmap</button>
          </form>
        </div>
      )}

      {activeTab === 'students' && (
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
          <h2>Registered Students</h2>
          {students.length === 0 ? (
            <p>No students registered yet</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '10px', border: '1px solid #ddd' }}>Registered</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.registered_at}</td>
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

export default AdminDashboard;
