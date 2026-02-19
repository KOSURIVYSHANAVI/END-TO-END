import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '10px', fontWeight: 'bold' }}>Placement Readiness System</h1>
        <p style={{ fontSize: '20px', marginBottom: '60px', opacity: 0.9 }}>4-Module Integrated System</p>
        
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center' }}>
          <div onClick={() => navigate('/student-auth')} style={{ backgroundColor: 'white', padding: '50px 60px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', minWidth: '280px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎓</div>
            <h2 style={{ color: '#667eea', fontSize: '32px', marginBottom: '15px' }}>Student</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Take assessments and track progress</p>
          </div>

          <div onClick={() => navigate('/admin-auth')} style={{ backgroundColor: 'white', padding: '50px 60px', borderRadius: '20px', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', minWidth: '280px' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>👨‍💼</div>
            <h2 style={{ color: '#764ba2', fontSize: '32px', marginBottom: '15px' }}>Admin</h2>
            <p style={{ color: '#666', fontSize: '16px' }}>Manage system and students</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
