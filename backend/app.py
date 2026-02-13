from flask import Flask, jsonify
from flask_cors import CORS  # Allow React frontend to access Flask

app = Flask(__name__)
CORS(app)  # This is very important for React requests

@app.route("/")
def home():
    return jsonify({"message": "Backend Connected Successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
