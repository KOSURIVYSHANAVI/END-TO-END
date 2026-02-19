import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudentAuth from "./pages/StudentAuth";
import AdminAuth from "./pages/AdminAuth";
import AssessmentDashboard from "./pages/AssessmentDashboard";
import AssessmentTest from "./pages/AssessmentTest";
import CareerGuidance from "./pages/CareerGuidance";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AdminManagement from "./pages/AdminManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-auth" element={<StudentAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/assessment-dashboard" element={<AssessmentDashboard />} />
        <Route path="/assessment-test/:category" element={<AssessmentTest />} />
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/admin-dashboard" element={<AdminManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
