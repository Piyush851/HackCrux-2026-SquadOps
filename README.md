# AI-Powered Intelligent Triage & Decision Support System 🏥

**Team SquadOps** | **HackCrux - Problem Statement 2**

## 🚀 Overview
Healthcare professionals continuously manage massive volumes of unstructured and fragmented patient data, including intake descriptions, consultation notes, and diagnostic reports

This project is a clinical information assistant that instantly converts unstructured text and audio into concise, structured summaries. It extracts medically relevant entities and automatically highlights urgency indicators to support workflow efficiency. By structuring fragmented data, our system allows healthcare providers to instantly understand patient context, prioritize attention effectively, and reduce documentation fatigue without replacing human medical judgment.

## 💻 Tech Stack
* **Frontend:** React.js (MERN stack) for a responsive dashboard displaying case priority and workflow status.
* **Backend:** Python (Flask/Django) to handle complex NLP pipelines and routing.
* **AI/ML:** LLM summarization pipelines, Named Entity Recognition (NER), text classification models for urgency prediction, and Speech-to-text APIs.

## 🛠️ Local Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <YOUR_REPOSITORY_URL>
cd squadops-triage-system
\`\`\`

### 2. Frontend Setup (React)
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

### 3. Backend Setup (Python)
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Or 'flask run' / 'python manage.py runserver'
\`\`\`

## 👥 Team Members
* Piyush Saini (Team Leader)
* Kumkum Dadhich
* Mudit Tak
* Aditya Tyagi