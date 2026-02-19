# Placement Readiness System - Modular Architecture

A comprehensive 4-module placement readiness assessment system with separate frontend, backend, and database for each module.

## 📁 Project Structure

```
placement-readiness-system/
├── module1_assessment/          # Member 1 - Assessment & Core Logic
│   ├── backend/
│   │   ├── assessment_api.py
│   │   └── requirements.txt
│   └── frontend/src/pages/
│       ├── AssessmentTest.jsx
│       └── AssessmentDashboard.jsx
│
├── module2_guidance/            # Member 2 - Career Guidance
│   ├── backend/
│   │   ├── guidance_api.py
│   │   └── requirements.txt
│   └── frontend/src/pages/
│       └── CareerGuidance.jsx
│
├── module3_analytics/           # Member 3 - Analytics & Visualization
│   ├── backend/
│   │   ├── analytics_api.py
│   │   └── requirements.txt
│   └── frontend/src/pages/
│       └── AnalyticsDashboard.jsx
│
└── module4_admin/               # Member 4 - Admin & Management
    ├── backend/
    │   ├── admin_api.py
    │   └── requirements.txt
    └── frontend/src/pages/
        └── AdminManagement.jsx
```

---

## 👥 Module Responsibilities

### MODULE 1 - Assessment & Core Logic (Member 1)
**Port: 5001** | **Database: placement_readiness_module1**

#### Responsibilities:
- Student registration and authentication
- Question management
- Test execution (start test, submit test)
- Score calculation logic
- Placement readiness score generation
- Skill gap identification
- Store assessment results

#### API Endpoints:
- `POST /api/student/register` - Register student
- `POST /api/student/login` - Student login
- `GET /api/questions/<category>` - Get questions by category
- `POST /api/test/submit` - Submit test and calculate score
- `GET /api/results/<student_id>` - Get student results
- `POST /api/questions/add` - Add new question

#### Database Collections:
- `students` - Student accounts
- `questions` - Test questions
- `test_results` - Test scores and readiness data

#### Setup:
```bash
cd module1_assessment/backend
pip install -r requirements.txt
python assessment_api.py
```

---

### MODULE 2 - Career Guidance & Recommendations (Member 2)
**Port: 5002** | **Database: placement_readiness_module2**

#### Responsibilities:
- Analyze assessment results from Module 1
- Create personalized improvement roadmaps
- Map skills to suitable job roles
- Implement learning recommendations
- Company eligibility simulation
- Display career guidance on UI

#### API Endpoints:
- `GET /api/guidance/roadmap/<student_id>` - Get personalized roadmap
- `GET /api/guidance/job-roles/<student_id>` - Get suitable job roles
- `GET /api/guidance/company-eligibility/<student_id>` - Check company eligibility
- `POST /api/guidance/roadmap/add` - Add roadmap
- `POST /api/guidance/job-role/add` - Add job role
- `POST /api/guidance/company/add` - Add company

#### Database Collections:
- `roadmaps` - Learning roadmaps
- `job_roles` - Job role mappings
- `company_eligibility` - Company criteria

#### Setup:
```bash
cd module2_guidance/backend
pip install -r requirements.txt
python guidance_api.py
```

---

### MODULE 3 - Analytics & Visualization (Member 3)
**Port: 5003** | **Database: Reads from module1**

#### Responsibilities:
- Track student performance over time
- Build progress tracking system
- Create charts and graphs
- Compare current vs previous scores
- Display analytics dashboards
- Readiness improvement timeline

#### API Endpoints:
- `GET /api/analytics/progress/<student_id>` - Get progress over time
- `GET /api/analytics/comparison/<student_id>` - Compare scores
- `GET /api/analytics/chart/<student_id>` - Get chart data
- `GET /api/analytics/dashboard/<student_id>` - Get analytics dashboard
- `GET /api/analytics/timeline/<student_id>` - Get readiness timeline

#### Features:
- Performance bar charts
- Progress timeline
- Score comparison
- Summary statistics

#### Setup:
```bash
cd module3_analytics/backend
pip install -r requirements.txt
python analytics_api.py
```

---

### MODULE 4 - Admin, Management & Deployment (Member 4)
**Port: 5004** | **Database: placement_readiness_module4 + reads all modules**

#### Responsibilities:
- Admin authentication
- Monitor student readiness
- Manage assessments and eligibility criteria
- Generate placement readiness reports
- System analytics
- Integration of all modules
- Deployment management

#### API Endpoints:
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/students` - Get all students with readiness status
- `GET /api/admin/analytics` - System-wide analytics
- `POST /api/admin/questions` - Add question
- `POST /api/admin/roadmaps` - Add roadmap
- `POST /api/admin/companies` - Add company
- `GET /api/admin/reports/placement-readiness` - Generate report

#### Database Collections:
- `admins` - Admin accounts
- Reads from all other module databases

#### Setup:
```bash
cd module4_admin/backend
pip install -r requirements.txt
python admin_api.py
```

---

## 🚀 Complete Setup Instructions

### Prerequisites
- Python 3.8+
- MongoDB (local or Atlas)
- Node.js 16+

### 1. Install MongoDB
- **Local**: Download from https://www.mongodb.com/try/download/community
- **Cloud**: Create free cluster at https://www.mongodb.com/cloud/atlas

### 2. Start All Backend Modules

Open 4 separate terminals:

**Terminal 1 - Module 1:**
```bash
cd module1_assessment/backend
pip install -r requirements.txt
python assessment_api.py
```

**Terminal 2 - Module 2:**
```bash
cd module2_guidance/backend
pip install -r requirements.txt
python guidance_api.py
```

**Terminal 3 - Module 3:**
```bash
cd module3_analytics/backend
pip install -r requirements.txt
python analytics_api.py
```

**Terminal 4 - Module 4:**
```bash
cd module4_admin/backend
pip install -r requirements.txt
python admin_api.py
```

### 3. Setup Frontend (Integrated)

Use the existing frontend from the main project and update routes to connect to all modules.

---

## 🗄️ Database Architecture

### Module 1 Database: `placement_readiness_module1`
- `students` - Student authentication and profiles
- `questions` - Assessment questions (all categories)
- `test_results` - Test scores, percentages, readiness scores

### Module 2 Database: `placement_readiness_module2`
- `roadmaps` - Learning paths for skill improvement
- `job_roles` - Job role recommendations
- `company_eligibility` - Company criteria and packages

### Module 3 Database: (Reads from Module 1)
- No separate collections
- Analyzes data from Module 1

### Module 4 Database: `placement_readiness_module4`
- `admins` - Admin authentication
- Reads from all other modules for management

---

## 📊 Data Flow

1. **Student Registration** → Module 1 → Stores in module1 DB
2. **Take Test** → Module 1 → Calculates score → Stores results
3. **Career Guidance** → Module 2 → Reads Module 1 results → Generates roadmap
4. **Analytics** → Module 3 → Reads Module 1 results → Displays charts
5. **Admin Management** → Module 4 → Reads all modules → Generates reports

---

## 🎯 Testing the System

### As Student:
1. Register via Module 1 API
2. Login and take tests (Module 1)
3. View career guidance (Module 2)
4. Check analytics (Module 3)

### As Admin:
1. Register via Module 4 API
2. Add questions, roadmaps, companies
3. Monitor student readiness
4. Generate placement reports

---

## 🔗 API Integration

All modules run independently on different ports:
- Module 1: `http://localhost:5001`
- Module 2: `http://localhost:5002`
- Module 3: `http://localhost:5003`
- Module 4: `http://localhost:5004`

Frontend makes API calls to respective module endpoints.

---

## 📝 Member Contributions

### Member 1 (Assessment):
- `module1_assessment/` folder
- Assessment logic and scoring
- Question management
- Student authentication

### Member 2 (Guidance):
- `module2_guidance/` folder
- Career roadmaps
- Job role mapping
- Company eligibility

### Member 3 (Analytics):
- `module3_analytics/` folder
- Charts and visualizations
- Progress tracking
- Performance comparison

### Member 4 (Admin):
- `module4_admin/` folder
- Admin dashboard
- System management
- Report generation
- Deployment and integration

---

## 🚢 Deployment

Each module can be deployed separately:
- Module 1: Render/Heroku (Port 5001)
- Module 2: Render/Heroku (Port 5002)
- Module 3: Render/Heroku (Port 5003)
- Module 4: Render/Heroku (Port 5004)
- Frontend: Vercel/Netlify

---

## 📧 Support

Each member is responsible for their module's maintenance and bug fixes.

---

## ✅ Project Checklist

- [x] Module 1 - Assessment & Core Logic
- [x] Module 2 - Career Guidance
- [x] Module 3 - Analytics & Visualization
- [x] Module 4 - Admin & Management
- [x] MongoDB Integration
- [x] Separate APIs for each module
- [x] Modular architecture
- [ ] Frontend integration (update routes)
- [ ] Deployment

---

**Built with:** Flask, MongoDB, React, Python
