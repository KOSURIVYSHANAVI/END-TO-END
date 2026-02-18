from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# -----------------------
# Database Configuration
# -----------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///placement.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -----------------------
# Database Models
# -----------------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question_text = db.Column(db.String(500))
    correct_answer = db.Column(db.String(100))

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    score = db.Column(db.Integer)

# -----------------------
# Routes
# -----------------------

@app.route("/")
def home():
    return jsonify({"message": "Backend Connected Successfully!"})

@app.route("/init-db")
def init_db():
    db.create_all()
    return "Database Created!"

# -----------------------
# Register API
# -----------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"})

# -----------------------
# Login API
# -----------------------

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user_id": user.id,
        "name": user.name
    })

# -----------------------
# -----------------------
# Add Question API (for testing)
# -----------------------
@app.route("/add-question", methods=["POST"])
def add_question():
    data = request.get_json()

    question_text = data.get("question_text")
    correct_answer = data.get("correct_answer")

    new_question = Question(
        question_text=question_text,
        correct_answer=correct_answer
    )

    db.session.add(new_question)
    db.session.commit()

    return jsonify({"message": "Question added successfully!"})


# -----------------------
# Get All Questions API
# -----------------------
@app.route("/questions", methods=["GET"])
def get_questions():
    questions = Question.query.all()

    output = []
    for q in questions:
        output.append({
            "id": q.id,
            "question_text": q.question_text
        })

    return jsonify(output)


# -----------------------
# Submit Test API
# -----------------------
@app.route("/submit-test", methods=["POST"])
def submit_test():
    data = request.get_json()

    user_id = data.get("user_id")
    answers = data.get("answers")  # list of {question_id, answer}

    score = 0

    for item in answers:
        question = Question.query.get(item["question_id"])
        if question and question.correct_answer == item["answer"]:
            score += 1

    new_score = Score(user_id=user_id, score=score)
    db.session.add(new_score)
    db.session.commit()

    return jsonify({
        "message": "Test submitted successfully!",
        "score": score
    })

# -----------------------
# Students Dashboard API
# -----------------------
@app.route("/students", methods=["GET"])
def get_students():
    users = User.query.all()
    output = []

    for user in users:
        # Get latest score of user
        score = Score.query.filter_by(user_id=user.id).order_by(Score.id.desc()).first()

        progress = score.score * 20 if score else 0   # Example progress logic

        output.append({
            "id": user.id,
            "name": user.name,
            "progress": progress
        })

    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
