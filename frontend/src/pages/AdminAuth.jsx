import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/admin/login' : '/api/admin/register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const res = await fetch(`http://localhost:5004${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem('admin_id', data.admin_id);
          localStorage.setItem('admin_name', data.name);
          localStorage.setItem('role', 'admin');
          navigate('/admin-dashboard');
        } else {
          setMessage('Registration successful! Please login.');
          setIsLogin(true);
          setName('');
          setEmail('');
          setPassword('');
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Connection failed. Make sure Module 4 backend is running on port 5004');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', width: '400px' }}>
        <h2 style={{ textAlign: 'center', color: '#f5576c', marginBottom: '30px', fontSize: '28px' }}>Admin Portal</h2>
        
        <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '2px solid #f0f0f0' }}>
          <button onClick={() => { setIsLogin(true); setMessage(''); }} style={{ flex: 1, padding: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: isLogin ? '#f5576c' : '#999', borderBottom: isLogin ? '3px solid #f5576c' : 'none', fontWeight: isLogin ? 'bold' : 'normal' }}>Login</button>
          <button onClick={() => { setIsLogin(false); setMessage(''); }} style={{ flex: 1, padding: '15px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: !isLogin ? '#f5576c' : '#999', borderBottom: !isLogin ? '3px solid #f5576c' : 'none', fontWeight: !isLogin ? 'bold' : 'normal' }}>Register</button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
          <button type="submit" style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#f5576c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {message && <p style={{ color: message.includes('successful') ? 'green' : 'red', textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>{message}</p>}
        
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#f5576c', textDecoration: 'none' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminAuth;
