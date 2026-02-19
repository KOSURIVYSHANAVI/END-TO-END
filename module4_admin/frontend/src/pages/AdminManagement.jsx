import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState({});
  const [students, setStudents] = useState([]);
  const [report, setReport] = useState(null);
  
  const [questionForm, setQuestionForm] = useState({
    category: 'quant',
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A'
  });

  const [roadmapForm, setRoadmapForm] = useState({
    category: 'quant',
    title: '',
    description: '',
    resources: '',
    duration: ''
  });

  const [companyForm, setCompanyForm] = useState({
    name: '',
    min_score: 60,
    roles: '',
    package: ''
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/admin-auth');
      return;
    }

    // Fetch analytics
    fetch('http://localhost:5004/api/admin/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data));

    // Fetch students
    fetch('http://localhost:5004/api/admin/students')
      .then(res => res.json())
      .then(data => setStudents(data.students || []));
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

  const handleAddRoadmap = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5004/api/admin/roadmaps', {
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

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5004/api/admin/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...companyForm,
          roles: companyForm.roles.split(',').map(r => r.trim())
        })
      });
      if (res.ok) {
        alert('Company added successfully!');
        setCompanyForm({ name: '', min_score: 60, roles: '', package: '' });
      }
    } catch (error) {
      alert('Error adding company');
    }
  };

  const generateReport = async () => {
    try {
      const res = await fetch('http://localhost:5004/api/admin/reports/placement-readiness');
      const data = await res.json();
      setReport(data);
      setActiveTab('reports');
    } catch (error) {
      alert('Error generating report');
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

      {/* Analytics Cards */}
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

      {/* Tabs */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['overview', 'questions', 'roadmaps', 'companies', 'students', 'reports'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', backgroundColor: activeTab === tab ? '#6c757d' : 'white', color: activeTab === tab ? 'white' : 'black', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', textTransform: 'capitalize' }}>{tab}</button>
        ))}
        <button onClick={generateReport} style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Generate Report</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>System Overview</h2>
          <p>Category-wise Performance:</p>
          {analytics.category_stats?.map((stat, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{stat.category}</span>
                <span>{stat.avg_score}% ({stat.attempts} attempts)</span>
              </div>
              <div style={{ width: '100%', height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', marginTop: '5px' }}>
                <div style={{ width: `${stat.avg_score}%`, height: '100%', backgroundColor: '#1e90ff', borderRadius: '10px' }}></div>
              </div>
            </div>
          ))}
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

      {activeTab === 'roadmaps' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
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
            <textarea placeholder="Resources" value={roadmapForm.resources} onChange={(e) => setRoadmapForm({ ...roadmapForm, resources: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd', minHeight: '60px' }} />
            <input type="text" placeholder="Duration (e.g., 2 weeks)" value={roadmapForm.duration} onChange={(e) => setRoadmapForm({ ...roadmapForm, duration: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Roadmap</button>
          </form>
        </div>
      )}

      {activeTab === 'companies' && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Add Company Eligibility</h2>
          <form onSubmit={handleAddCompany}>
            <input type="text" placeholder="Company Name" value={companyForm.name} onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="number" placeholder="Minimum Score (%)" value={companyForm.min_score} onChange={(e) => setCompanyForm({ ...companyForm, min_score: parseInt(e.target.value) })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Roles (comma separated)" value={companyForm.roles} onChange={(e) => setCompanyForm({ ...companyForm, roles: e.target.value })} required style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <input type="text" placeholder="Package (e.g., 5-7 LPA)" value={companyForm.package} onChange={(e) => setCompanyForm({ ...companyForm, package: e.target.value })} style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Company</button>
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

      {activeTab === 'reports' && report && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
          <h2>Placement Readiness Report</h2>
          <p>Report Date: {report.report_date}</p>
          <p>Total Students: {report.total_students} | Ready: {report.ready_students}</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#6c757d', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Student</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Tests</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Avg Score</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Ready</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {report.students.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{s.student_name}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{s.tests_completed}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{s.average_score}%</td>
                  <td style={{ padding: '10px', textAlign: 'center', color: s.placement_ready === 'Yes' ? 'green' : 'red' }}>{s.placement_ready}</td>
                  <td style={{ padding: '10px' }}>{s.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManagement;
