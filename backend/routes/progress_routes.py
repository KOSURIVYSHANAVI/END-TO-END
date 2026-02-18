from flask import Blueprint, jsonify

progress_bp = Blueprint('progress', __name__)

@progress_bp.route("/status", methods=["GET"])
def get_progress():
    return jsonify({
        "aptitude_score": 75,
        "coding_score": 82,
        "communication_score": 68,
        "overall_readiness": "Good"
    })
