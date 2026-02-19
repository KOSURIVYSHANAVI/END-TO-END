from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['placement_readiness_module2']
roadmaps_collection = db['roadmaps']
job_roles_collection = db['job_roles']
company_eligibility_collection = db['company_eligibility']

# Module 1 DB for reading test results
module1_db = MongoClient('mongodb://localhost:27017/')['placement_readiness_module1']
test_results_collection = module1_db['test_results']

# Get Personalized Roadmap based on skill gaps
@app.route('/api/guidance/roadmap/<student_id>', methods=['GET'])
def get_personalized_roadmap(student_id):
    results = list(test_results_collection.find({'student_id': student_id}))
    
    weak_areas = []
    for result in results:
        if result['percentage'] < 60:
            weak_areas.append(result['category'])
    
    if not weak_areas:
        return jsonify({'message': 'Great! No weak areas found', 'roadmaps': []})
    
    roadmaps = list(roadmaps_collection.find({'category': {'$in': weak_areas}}))
    
    return jsonify({
        'weak_areas': weak_areas,
        'roadmaps': [{
            'id': str(r['_id']),
            'category': r['category'],
            'title': r['title'],
            'description': r['description'],
            'resources': r['resources'],
            'duration': r['duration'],
            'learning_path': r.get('learning_path', [])
        } for r in roadmaps]
    })

# Map skills to job roles
@app.route('/api/guidance/job-roles/<student_id>', methods=['GET'])
def get_suitable_job_roles(student_id):
    results = list(test_results_collection.find({'student_id': student_id}))
    
    strong_skills = []
    for result in results:
        if result['percentage'] >= 70:
            strong_skills.append(result['category'])
    
    if not strong_skills:
        return jsonify({'message': 'Complete more assessments', 'job_roles': []})
    
    job_roles = list(job_roles_collection.find({'required_skills': {'$in': strong_skills}}))
    
    return jsonify({
        'strong_skills': strong_skills,
        'job_roles': [{
            'id': str(j['_id']),
            'title': j['title'],
            'description': j['description'],
            'required_skills': j['required_skills'],
            'salary_range': j.get('salary_range', 'Not specified')
        } for j in job_roles]
    })

# Company Eligibility Simulation
@app.route('/api/guidance/company-eligibility/<student_id>', methods=['GET'])
def check_company_eligibility(student_id):
    results = list(test_results_collection.find({'student_id': student_id}))
    
    if not results:
        return jsonify({'message': 'No test results found', 'eligible_companies': []})
    
    avg_score = sum([r['percentage'] for r in results]) / len(results)
    
    companies = list(company_eligibility_collection.find())
    eligible_companies = []
    
    for company in companies:
        if avg_score >= company['min_score']:
            eligible_companies.append({
                'name': company['name'],
                'min_score': company['min_score'],
                'roles': company.get('roles', []),
                'package': company.get('package', 'Not specified')
            })
    
    return jsonify({
        'average_score': avg_score,
        'eligible_companies': eligible_companies,
        'total_eligible': len(eligible_companies)
    })

# Add Roadmap (Admin function)
@app.route('/api/guidance/roadmap/add', methods=['POST'])
def add_roadmap():
    data = request.json
    roadmap = {
        'category': data['category'],
        'title': data['title'],
        'description': data['description'],
        'resources': data['resources'],
        'duration': data['duration'],
        'learning_path': data.get('learning_path', []),
        'created_at': datetime.utcnow()
    }
    roadmaps_collection.insert_one(roadmap)
    return jsonify({'message': 'Roadmap added successfully'}), 201

# Add Job Role
@app.route('/api/guidance/job-role/add', methods=['POST'])
def add_job_role():
    data = request.json
    job_role = {
        'title': data['title'],
        'description': data['description'],
        'required_skills': data['required_skills'],
        'salary_range': data.get('salary_range', ''),
        'created_at': datetime.utcnow()
    }
    job_roles_collection.insert_one(job_role)
    return jsonify({'message': 'Job role added successfully'}), 201

# Add Company Eligibility
@app.route('/api/guidance/company/add', methods=['POST'])
def add_company():
    data = request.json
    company = {
        'name': data['name'],
        'min_score': data['min_score'],
        'roles': data.get('roles', []),
        'package': data.get('package', ''),
        'created_at': datetime.utcnow()
    }
    company_eligibility_collection.insert_one(company)
    return jsonify({'message': 'Company added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5002)
