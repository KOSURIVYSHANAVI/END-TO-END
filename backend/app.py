from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {"id": 1, "name": "Vyshanavi", "progress": 60},
    {"id": 2, "name": "Teja", "progress": 40},
    {"id": 3, "name": "Rahul", "progress": 80}
]

@app.route("/")
def home():
    return jsonify({"message": "Backend Connected Successfully!"})

@app.route("/students")
def get_students():
    return jsonify(students)

if __name__ == "__main__":
    app.run(debug=True)
