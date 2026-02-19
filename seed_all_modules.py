from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Module 1 Database - Questions
module1_db = client['placement_readiness_module1']
questions_collection = module1_db['questions']

# Module 2 Database - Roadmaps
module2_db = client['placement_readiness_module2']
roadmaps_collection = module2_db['roadmaps']
company_eligibility_collection = module2_db['company_eligibility']

# Clear existing data
questions_collection.delete_many({})
roadmaps_collection.delete_many({})
company_eligibility_collection.delete_many({})

# Sample Questions
questions = [
    # Quantitative
    {'category': 'quant', 'question_text': 'What is 15% of 200?', 'option_a': '20', 'option_b': '30', 'option_c': '40', 'option_d': '50', 'correct_answer': 'B'},
    {'category': 'quant', 'question_text': 'If x + 5 = 12, what is x?', 'option_a': '5', 'option_b': '6', 'option_c': '7', 'option_d': '8', 'correct_answer': 'C'},
    {'category': 'quant', 'question_text': 'What is the average of 10, 20, 30?', 'option_a': '15', 'option_b': '20', 'option_c': '25', 'option_d': '30', 'correct_answer': 'B'},
    {'category': 'quant', 'question_text': 'What is 2^5?', 'option_a': '16', 'option_b': '32', 'option_c': '64', 'option_d': '128', 'correct_answer': 'B'},
    {'category': 'quant', 'question_text': 'If a train travels 60 km in 1 hour, how far in 3 hours?', 'option_a': '120 km', 'option_b': '150 km', 'option_c': '180 km', 'option_d': '200 km', 'correct_answer': 'C'},
    # Reasoning
    {'category': 'reasoning', 'question_text': 'Complete: 2, 4, 8, 16, __', 'option_a': '20', 'option_b': '24', 'option_c': '32', 'option_d': '64', 'correct_answer': 'C'},
    {'category': 'reasoning', 'question_text': 'Which is odd one out: Apple, Banana, Carrot, Mango?', 'option_a': 'Apple', 'option_b': 'Banana', 'option_c': 'Carrot', 'option_d': 'Mango', 'correct_answer': 'C'},
    {'category': 'reasoning', 'question_text': 'If Monday is 2 days after yesterday, what day is today?', 'option_a': 'Saturday', 'option_b': 'Sunday', 'option_c': 'Monday', 'option_d': 'Tuesday', 'correct_answer': 'A'},
    # Verbal
    {'category': 'verbal', 'question_text': 'Synonym of Happy:', 'option_a': 'Sad', 'option_b': 'Joyful', 'option_c': 'Angry', 'option_d': 'Tired', 'correct_answer': 'B'},
    {'category': 'verbal', 'question_text': 'Antonym of Ancient:', 'option_a': 'Old', 'option_b': 'Modern', 'option_c': 'Historic', 'option_d': 'Traditional', 'correct_answer': 'B'},
    {'category': 'verbal', 'question_text': 'Choose correct spelling:', 'option_a': 'Accomodate', 'option_b': 'Accommodate', 'option_c': 'Acomodate', 'option_d': 'Acommodate', 'correct_answer': 'B'},
    # DBMS
    {'category': 'dbms', 'question_text': 'What does SQL stand for?', 'option_a': 'Structured Query Language', 'option_b': 'Simple Query Language', 'option_c': 'Standard Query Language', 'option_d': 'System Query Language', 'correct_answer': 'A'},
    {'category': 'dbms', 'question_text': 'Which is NOT a type of database key?', 'option_a': 'Primary Key', 'option_b': 'Foreign Key', 'option_c': 'Composite Key', 'option_d': 'Random Key', 'correct_answer': 'D'},
    {'category': 'dbms', 'question_text': 'Which command is used to retrieve data?', 'option_a': 'INSERT', 'option_b': 'SELECT', 'option_c': 'UPDATE', 'option_d': 'DELETE', 'correct_answer': 'B'},
    # Computer Networks
    {'category': 'cn', 'question_text': 'What does IP stand for?', 'option_a': 'Internet Protocol', 'option_b': 'Internal Protocol', 'option_c': 'Internet Process', 'option_d': 'Internal Process', 'correct_answer': 'A'},
    {'category': 'cn', 'question_text': 'What is the default port for HTTP?', 'option_a': '21', 'option_b': '22', 'option_c': '80', 'option_d': '443', 'correct_answer': 'C'},
    {'category': 'cn', 'question_text': 'TCP is a connection-oriented protocol.', 'option_a': 'True', 'option_b': 'False', 'option_c': 'Sometimes', 'option_d': 'Depends', 'correct_answer': 'A'},
    # Operating Systems
    {'category': 'os', 'question_text': 'What is a process?', 'option_a': 'Program in execution', 'option_b': 'Stored program', 'option_c': 'Hardware component', 'option_d': 'Network connection', 'correct_answer': 'A'},
    {'category': 'os', 'question_text': 'Which scheduling algorithm is non-preemptive?', 'option_a': 'Round Robin', 'option_b': 'FCFS', 'option_c': 'Priority', 'option_d': 'Multilevel Queue', 'correct_answer': 'B'},
    {'category': 'os', 'question_text': 'Virtual memory uses hard disk as extended RAM.', 'option_a': 'True', 'option_b': 'False', 'option_c': 'Sometimes', 'option_d': 'Never', 'correct_answer': 'A'},
    # Coding
    {'category': 'coding', 'question_text': 'What is time complexity of binary search?', 'option_a': 'O(n)', 'option_b': 'O(log n)', 'option_c': 'O(n^2)', 'option_d': 'O(1)', 'correct_answer': 'B'},
    {'category': 'coding', 'question_text': 'Which data structure uses LIFO?', 'option_a': 'Queue', 'option_b': 'Stack', 'option_c': 'Tree', 'option_d': 'Graph', 'correct_answer': 'B'},
    {'category': 'coding', 'question_text': 'What does OOP stand for?', 'option_a': 'Object Oriented Programming', 'option_b': 'Only One Program', 'option_c': 'Open Output Process', 'option_d': 'Optimal Operation Protocol', 'correct_answer': 'A'},
]

# Sample Roadmaps
roadmaps = [
    {'category': 'quant', 'title': 'Master Quantitative Aptitude', 'description': 'Build strong foundation in mathematics and problem-solving', 'resources': 'Khan Academy, Indiabix Aptitude', 'duration': '3 weeks'},
    {'category': 'reasoning', 'title': 'Logical Reasoning Mastery', 'description': 'Improve analytical and logical thinking skills', 'resources': 'RS Aggarwal, Puzzles and riddles', 'duration': '2 weeks'},
    {'category': 'verbal', 'title': 'English Proficiency', 'description': 'Enhance vocabulary and grammar skills', 'resources': 'Wren & Martin, Word Power Made Easy', 'duration': '4 weeks'},
    {'category': 'dbms', 'title': 'Database Fundamentals', 'description': 'Learn SQL, normalization, and database design', 'resources': 'GeeksforGeeks DBMS, W3Schools SQL', 'duration': '3 weeks'},
    {'category': 'cn', 'title': 'Computer Networks Basics', 'description': 'Understand networking concepts and protocols', 'resources': 'Kurose & Ross, Cisco Networking', 'duration': '4 weeks'},
    {'category': 'os', 'title': 'Operating Systems Concepts', 'description': 'Master process management and memory concepts', 'resources': 'Galvin OS book, Tutorialspoint', 'duration': '3 weeks'},
    {'category': 'coding', 'title': 'Data Structures & Algorithms', 'description': 'Practice coding problems and algorithms', 'resources': 'LeetCode, HackerRank, Striver SDE Sheet', 'duration': '8 weeks'},
]

# Sample Companies
companies = [
    {'name': 'TCS', 'min_score': 60, 'roles': ['Software Engineer', 'System Engineer'], 'package': '3.5-7 LPA'},
    {'name': 'Infosys', 'min_score': 65, 'roles': ['Software Developer', 'System Engineer'], 'package': '4-8 LPA'},
    {'name': 'Wipro', 'min_score': 60, 'roles': ['Project Engineer', 'Developer'], 'package': '3.5-7 LPA'},
    {'name': 'Cognizant', 'min_score': 70, 'roles': ['Programmer Analyst', 'Developer'], 'package': '4-8 LPA'},
    {'name': 'Accenture', 'min_score': 70, 'roles': ['Application Developer', 'Analyst'], 'package': '4.5-9 LPA'},
    {'name': 'Amazon', 'min_score': 80, 'roles': ['SDE-1', 'Software Engineer'], 'package': '15-30 LPA'},
    {'name': 'Google', 'min_score': 85, 'roles': ['Software Engineer', 'SDE'], 'package': '20-40 LPA'},
]

# Insert data
questions_collection.insert_many(questions)
roadmaps_collection.insert_many(roadmaps)
company_eligibility_collection.insert_many(companies)

print(f"✅ Added {len(questions)} questions to Module 1 database")
print(f"✅ Added {len(roadmaps)} roadmaps to Module 2 database")
print(f"✅ Added {len(companies)} companies to Module 2 database")
print("\n🎉 Database seeded successfully!")
print("\nNow you can:")
print("1. Take tests as student")
print("2. View career guidance")
print("3. Check analytics")
print("4. See company eligibility")
