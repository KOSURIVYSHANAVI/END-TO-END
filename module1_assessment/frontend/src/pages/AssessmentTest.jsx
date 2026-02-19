import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AssessmentTest() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5001/api/questions/${category}`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const studentId = localStorage.getItem('student_id');
    const formattedAnswers = Object.keys(answers).map(qId => ({
      question_id: qId,
      selected_answer: answers[qId]
    }));

    try {
      const res = await fetch('http://localhost:5001/api/test/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          category: category,
          answers: formattedAnswers
        })
      });
      const data = await res.json();
      alert(`Test Submitted!\nScore: ${data.score}/${data.total}\nPercentage: ${data.percentage.toFixed(2)}%\nReadiness Score: ${data.readiness_score.toFixed(2)}`);
      navigate('/assessment-dashboard');
    } catch (error) {
      alert('Error submitting test');
    }
  };

  if (loading) return <div style={{ padding: '30px' }}>Loading questions...</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#667eea', textAlign: 'center' }}>{category.toUpperCase()} Assessment</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Module 1 - Assessment & Core Logic</p>
      
      {questions.length === 0 ? (
        <p>No questions available for this category.</p>
      ) : (
        <div>
          {questions.map((q, index) => (
            <div key={q.id} style={{ marginBottom: '30px', padding: '20px', border: '2px solid #667eea', borderRadius: '10px', backgroundColor: '#f9f9ff' }}>
              <h3 style={{ color: '#333' }}>Q{index + 1}. {q.question_text}</h3>
              <div style={{ marginTop: '15px' }}>
                {['A', 'B', 'C', 'D'].map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer', padding: '10px', backgroundColor: answers[q.id] === option ? '#667eea' : 'white', color: answers[q.id] === option ? 'white' : 'black', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleAnswer(q.id, option)}
                      style={{ marginRight: '10px' }}
                    />
                    {option}. {q[`option_${option.toLowerCase()}`]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={handleSubmit} style={{ padding: '15px 40px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Submit Test</button>
            <button onClick={() => navigate('/assessment-dashboard')} style={{ marginLeft: '15px', padding: '15px 40px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentTest;
