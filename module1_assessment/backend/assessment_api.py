from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['placement_readiness_module1']
students_collection = db['students']
questions_collection = db['questions']
test_results_collection = db['test_results']

# Student Authentication
@app.route('/api/student/register', methods=['POST'])
def register_student():
    data = request.json
    if students_collection.find_one({'email': data['email']}):
        return jsonify({'message': 'Email already exists'}), 400
    
    student = {
        'name': data['name'],
        'email': data['email'],
        'password': generate_password_hash(data['password']),
        'created_at': datetime.utcnow()
    }
    result = students_collection.insert_one(student)
    return jsonify({'message': 'Student registered successfully', 'student_id': str(result.inserted_id)}), 201

@app.route('/api/student/login', methods=['POST'])
def login_student():
    data = request.json
    student = students_collection.find_one({'email': data['email']})
    
    if student and check_password_hash(student['password'], data['password']):
        return jsonify({
            'message': 'Login successful',
            'student_id': str(student['_id']),
            'name': student['name']
        }), 200
    return jsonify({'message': 'Invalid credentials'}), 401

# Get Questions by Category
@app.route('/api/questions/<category>', methods=['GET'])
def get_questions(category):
    questions = list(questions_collection.find({'category': category}))
    return jsonify([{
        'id': str(q['_id']),
        'question_text': q['question_text'],
        'option_a': q['option_a'],
        'option_b': q['option_b'],
        'option_c': q['option_c'],
        'option_d': q['option_d']
    } for q in questions])

# Submit Test and Calculate Score
@app.route('/api/test/submit', methods=['POST'])
def submit_test():
    data = request.json
    student_id = data['student_id']
    category = data['category']
    answers = data['answers']
    
    score = 0
    total = len(answers)
    skill_gaps = []
    
    for ans in answers:
        question = questions_collection.find_one({'_id': ObjectId(ans['question_id'])})
        if question and question['correct_answer'] == ans['selected_answer']:
            score += 1
    
    percentage = (score / total * 100) if total > 0 else 0
    
    # Identify skill gaps
    if percentage < 60:
        skill_gaps.append(category)
    
    # Calculate readiness score (0-100)
    readiness_score = percentage
    
    result = {
        'student_id': student_id,
        'category': category,
        'score': score,
        'total_questions': total,
        'percentage': percentage,
        'readiness_score': readiness_score,
        'skill_gaps': skill_gaps,
        'completed_at': datetime.utcnow()
    }
    
    test_results_collection.insert_one(result)
    
    return jsonify({
        'message': 'Test submitted successfully',
        'score': score,
        'total': total,
        'percentage': percentage,
        'readiness_score': readiness_score,
        'skill_gaps': skill_gaps
    }), 201

# Get Student Results
@app.route('/api/results/<student_id>', methods=['GET'])
def get_results(student_id):
    results = list(test_results_collection.find({'student_id': student_id}))
    return jsonify([{
        'category': r['category'],
        'score': r['score'],
        'total': r['total_questions'],
        'percentage': r['percentage'],
        'readiness_score': r['readiness_score'],
        'skill_gaps': r.get('skill_gaps', []),
        'date': r['completed_at'].strftime('%Y-%m-%d')
    } for r in results])

# Add Question (for testing)
@app.route('/api/questions/add', methods=['POST'])
def add_question():
    data = request.json
    question = {
        'category': data['category'],
        'question_text': data['question_text'],
        'option_a': data['option_a'],
        'option_b': data['option_b'],
        'option_c': data['option_c'],
        'option_d': data['option_d'],
        'correct_answer': data['correct_answer'],
        'created_at': datetime.utcnow()
    }
    questions_collection.insert_one(question)
    return jsonify({'message': 'Question added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5001)
