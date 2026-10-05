from flask import Flask, request, render_template, jsonify
from pathlib import Path
import re
import joblib


# ============================================================
# APP CONFIG
# ============================================================

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "models" / "spam_classifier_best.joblib"


# ============================================================
# TEXT PREPROCESSING
# IMPORTANT:
# This function must exist before loading the saved model.
# ============================================================

def clean_text(text):
    text = str(text).lower()

    text = re.sub(
        r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b",
        " email ",
        text
    )

    text = re.sub(
        r"https?://\S+|www\.\S+",
        " url ",
        text
    )

    text = re.sub(
        r"\b\d+(?:[.,]\d+)?\b",
        " number ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    return text


# ============================================================
# LOAD MODEL
# ============================================================

try:

    model = joblib.load(MODEL_PATH)

    print("✅ Model loaded successfully!")

except Exception as e:

    model = None

    print(f"❌ Error loading model: {e}")


# ============================================================
# MESSAGE STATISTICS
# ============================================================

def get_message_stats(text):

    return {
        "characters": len(text),

        "words": len(text.split()),

        "urls": len(
            re.findall(
                r"https?://\S+|www\.\S+",
                text,
                flags=re.IGNORECASE
            )
        ),

        "emails": len(
            re.findall(
                r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b",
                text
            )
        ),

        "digits": len(
            re.findall(
                r"\d",
                text
            )
        ),

        "exclamations": text.count("!")
    }


# ============================================================
# ANALYZE MESSAGE
# ============================================================

def analyze_message(text):

    if model is None:

        raise RuntimeError(
            "Model is not loaded."
        )

    prediction = int(
        model.predict([text])[0]
    )

    if prediction == 1:

        label = "SPAM"

        is_spam = True

    else:

        label = "NOT SPAM"

        is_spam = False


    # --------------------------------------------------------
    # Spam score
    # --------------------------------------------------------

    spam_score = 0.0
    confidence = 0.0

    if hasattr(model, "decision_function"):

        decision = float(
            model.decision_function([text])[0]
        )

        # Convert decision score to an approximate
        # 0-100 spam risk score.

        spam_score = (
            1 / (1 + pow(2.71828, -decision))
        ) * 100

        confidence = abs(
            spam_score - 50
        ) * 2

    elif hasattr(model, "predict_proba"):

        probabilities = model.predict_proba(
            [text]
        )[0]

        spam_score = (
            probabilities[1] * 100
        )

        confidence = (
            max(probabilities) * 100
        )


    return {

        "prediction": label,

        "is_spam": is_spam,

        "confidence": round(
            confidence,
            2
        ),

        "spam_score": round(
            spam_score,
            2
        ),

        "message": text,

        "stats": get_message_stats(text)

    }


# ============================================================
# HOME
# ============================================================

@app.route("/")
def home():

    return render_template(
        "index.html",
        model_ready=model is not None
    )


# ============================================================
# PREDICT
# ============================================================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    try:

        email = request.form.get(
            "email",
            ""
        ).strip()


        if not email:

            return jsonify({
                "error":
                    "Please enter a message."
            }), 400


        result = analyze_message(
            email
        )


        return jsonify(result)


    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ============================================================
# HEALTH CHECK
# ============================================================

@app.route("/health")
def health():

    return jsonify({

        "status":
            "healthy"
            if model is not None
            else "model_error",

        "model":
            MODEL_PATH.name

    })


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )