import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserLogin from './pages/auth/UserLogin';
import OrganizerLogin from './pages/auth/OrganizerLogin';
import AdminLogin from './pages/auth/AdminLogin';
import UserDashboard from './pages/dashboard/UserDashboard';
import OrganizerDashboard from './pages/dashboard/OrganizerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import HackathonDetails from './pages/HackathonDetails';
import Hackathons from './pages/Hackathons';
import Teams from './pages/Teams';
import Mentors from './pages/Mentors';
import Projects from './pages/Projects';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/authStore';
import UserRoadmap from './User_Dashboard/UserRoadmap';
import UserAchievements from './User_Dashboard/UserAchievements';
import UserTeams from './User_Dashboard/UserTeams';
import UserAnalytics from './User_Dashboard/UserAnalytics';
import UserEventDetails from './User_Dashboard/UserEventDetails';
import UserActivity from './User_Dashboard/UserActivity';
import UserProgress from './User_Dashboard/UserProgress';
import SkillAssessment from './User_Dashboard/SkillAssessment';
import CreateProject from './User_Dashboard/CreateProject';
import CreateTeam from './User_Dashboard/CreateTeam';
import SubmitProject from './User_Dashboard/SubmitProject';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/organizer/login" element={<OrganizerLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/hackathon/:id" element={<HackathonDetails />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/projects" element={<Projects />} />
          
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/organizer"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/user/roadmap" element={<UserRoadmap />} />
          <Route path="/dashboard/user/achievements" element={<UserAchievements />} />
          <Route path="/dashboard/user/teams" element={<UserTeams />} />
          <Route path="/dashboard/user/analytics" element={<UserAnalytics />} />
          <Route path="/dashboard/user/event" element={<UserEventDetails />} />
          <Route path="/dashboard/user/activity" element={<UserActivity />} />
          <Route path="/dashboard/user/progress" element={<UserProgress />} />
          <Route path="/dashboard/user/skills/assessment" element={<SkillAssessment />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/teams/new" element={<CreateTeam />} />
          <Route path="/projects/submit" element={<SubmitProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;