import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Test() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/assessment/questions/${category}`)
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
    const userId = localStorage.getItem('user_id');
    const formattedAnswers = Object.keys(answers).map(qId => ({
      question_id: parseInt(qId),
      selected_answer: answers[qId]
    }));

    try {
      const res = await fetch('http://localhost:5000/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: userId,
          category: category,
          answers: formattedAnswers
        })
      });
      const data = await res.json();
      alert(`Test submitted! Score: ${data.score}/${data.total} (${data.percentage.toFixed(2)}%)`);
      navigate('/dashboard');
    } catch (error) {
      alert('Error submitting test');
    }
  };

  if (loading) return <div style={{ padding: '30px' }}>Loading questions...</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1e90ff', textAlign: 'center' }}>{category.toUpperCase()} Test</h1>
      
      {questions.length === 0 ? (
        <p>No questions available for this category yet.</p>
      ) : (
        <div>
          {questions.map((q, index) => (
            <div key={q.id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
              <h3>Q{index + 1}. {q.question_text}</h3>
              <div style={{ marginTop: '15px' }}>
                {['A', 'B', 'C', 'D'].map(option => (
                  <label key={option} style={{ display: 'block', marginBottom: '10px', cursor: 'pointer' }}>
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
            <button onClick={handleSubmit} style={{ padding: '15px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Submit Test</button>
            <button onClick={() => navigate('/dashboard')} style={{ marginLeft: '15px', padding: '15px 30px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
