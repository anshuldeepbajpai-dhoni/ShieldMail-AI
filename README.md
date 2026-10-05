#  ShieldMail AI — Spam Email & Message Classifier

An intelligent **Machine Learning-based Spam Detection System** that classifies emails and text messages as **SPAM** or **NOT SPAM** using Natural Language Processing (NLP), TF-IDF feature extraction, and a Linear Support Vector Machine (SVM).

The project also includes a professional **Flask web application** with an interactive dashboard-style interface for real-time message analysis.

---

##  Features

-  Machine Learning-based spam classification
-  Email and SMS message analysis
-  TF-IDF text feature extraction
-  Linear SVM (`LinearSVC`) classifier
-  Text normalization and preprocessing
-  URL detection
-  Email address detection
-  Number detection
-  Message statistics
-  Spam risk score
-  NOT SPAM / SPAM classification
-  Professional Flask web interface
-  Responsive UI
-  Sample message testing
-  Analyze multiple messages without refreshing the page
-  Jupyter Notebook for EDA and model development
-  Ready for deployment with Gunicorn

---

#  How It Works

The system follows the following pipeline:

User Message
     │
     ▼
Text Preprocessing
     │
     ├── Lowercase conversion
     ├── URL normalization
     ├── Email normalization
     ├── Number normalization
     └── Whitespace normalization
     │
     ▼
TF-IDF Vectorization
     │
     ▼
Linear SVM Classifier
     │
     ▼
Prediction
     │
     ├── 🚨 SPAM
     │
     └── 🛡️ NOT SPAM
     │
     ▼
Risk Score + Message Statistics

###  Machine Learning Model

The project uses:

TF-IDF

Term Frequency–Inverse Document Frequency (TF-IDF) converts text into numerical features based on the importance of words within the dataset.

The model also uses:

Unigrams
Bigrams
Maximum feature limit
Text preprocessing
Linear SVM

The classifier is based on:

LinearSVC()

Linear SVM is effective for high-dimensional text classification problems and works well with sparse TF-IDF features.

###  Dataset

The project uses a labeled dataset containing messages classified into:

Label	Meaning
ham	Legitimate message
spam	Spam message

The dataset is stored at:

data/sample_emails.csv

Expected columns:

Category
Message

### Project Structure
Spam_email_Filter/
│
├── data/
│   └── sample_emails.csv
│
├── models/
│   ├── .gitkeep
│   └── spam_classifier_best.joblib
│
├── notebooks/
│   └── Spam_Email_Classification_Improved.ipynb
│
├── static/
│   ├── app.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── .gitignore
├── app.py
├── Procfile
├── README.md
└── requirements.txt

### Technologies Used

Programming Language
Python
Machine Learning
Scikit-learn
TF-IDF
Linear SVM
Data Processing
Pandas
NumPy
Visualization & Analysis
Matplotlib
Seaborn
Jupyter Notebook
Backend
Flask
Frontend
HTML5
CSS3
JavaScript
Model Serialization
Joblib
Deployment
Gunicorn
Render

### Installation
#### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Spam_email_Filter.git

Move into the project directory:

cd Spam_email_Filter
#### 2. Create a Virtual Environment
Windows
py -m venv .venv

Activate it:

.\.venv\Scripts\Activate.ps1

You should see:

(.venv)

before your terminal path.

Linux / macOS
python3 -m venv .venv
source .venv/bin/activate

#### 3. Install Dependencies
pip install -r requirements.txt

#### 4. Train the Model

The trained model is stored in:

models/spam_classifier_best.joblib

If you want to retrain the model, open:

notebooks/Spam_Email_Classification_Improved.ipynb

Run the notebook cells in order.

The notebook performs:

Dataset loading
Data inspection
Data cleaning
Exploratory Data Analysis
Text preprocessing
Train/test splitting
TF-IDF feature extraction
Model training
Model evaluation
Model comparison
Best model selection
Model serialization

#### 5. Run the Flask Application

Start the application:

python app.py

You should see:

* Running on http://127.0.0.1:5000

Open your browser:

http://127.0.0.1:5000
🖥️ Web Application

The web application provides a professional interface called:

#### ShieldMail AI

Users can:

Enter an email or message
Use a sample spam message
Analyze the message
View SPAM / NOT SPAM prediction
View spam risk score
View message statistics
Analyze another message
Message Analytics

The application displays:

Character count
Word count
URL count
Email count
Number count
Exclamation count

#### Flask API

The application exposes a prediction endpoint:

POST /predict

Example request:

email=Congratulations! You have won a prize!

Example response:

{
    "prediction": "SPAM",
    "is_spam": true,
    "confidence": 94.52,
    "spam_score": 97.21,
    "message": "Congratulations! You have won a prize!",
    "stats": {
        "characters": 39,
        "words": 7,
        "urls": 0,
        "emails": 0,
        "digits": 0,
        "exclamations": 1
    }
}
#### Health Check

The application also provides:

GET /health

Example:

http://127.0.0.1:5000/health

This can be used to verify whether the trained model has loaded correctly.

#### Example Messages
Spam Example
Congratulations! You have won $1,000.
Click the link now to claim your prize!!!

Expected:

1. SPAM
Legitimate Example
Hi Rahul, are we still meeting tomorrow at 10 AM?
Please bring the project report.

Expected:
2. NOT SPAM

Predictions depend on the trained model and dataset. They should not be treated as guaranteed classifications.

#### Model Evaluation

The notebook evaluates the classifier using standard classification metrics:

Accuracy
Precision
Recall
F1-score
Confusion Matrix

The evaluation is performed on a held-out test set.

#### Privacy

The application processes the submitted message for prediction.

The Flask application does not intentionally persist submitted messages to a database.

However, users should avoid entering highly sensitive or confidential information when testing a locally or publicly deployed application.

#### Deployment

The application can be deployed using a WSGI server such as Gunicorn.

Production start command:

gunicorn app:app

For platforms such as Render, configure the service to use:

gunicorn app:app

#### Future Improvements

Potential improvements include:

📧 Gmail integration
📬 Email inbox scanning
🧠 Transformer-based spam detection
🤖 BERT/RoBERTa classification
📊 Advanced analytics dashboard
🔐 User authentication
💾 Prediction history
🗄️ Database integration
📈 Model monitoring
🔄 Automated model retraining
🌍 Multi-language spam detection
🔍 Explainable AI for predictions

#### Author

Anshul Deep Bajpai

B.Tech — Computer Science Engineering
Artificial Intelligence & Machine Learning

#### License

This project is created for educational, academic, and portfolio purposes.