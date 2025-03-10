import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Hackathons from './pages/Hackathons';
import HackathonDetails from './pages/HackathonDetails';
import OrganizerDashboard from './pages/dashboard/OrganizerDashboard';
import CreateHackathon from './pages/dashboard/CreateHackathon';
import ManageSubmissions from './pages/dashboard/ManageSubmissions';
import HackathonAnalytics from './pages/dashboard/HackathonAnalytics';
import HackathonSettings from './pages/dashboard/HackathonSettings';
import TeamManagement from './pages/dashboard/TeamManagement';
import ParticipantManagement from './pages/dashboard/ParticipantManagement';
import JudgeManagement from './pages/dashboard/JudgeManagement';
import UserLogin from './pages/auth/UserLogin';
import OrganizerLogin from './pages/auth/OrganizerLogin';
import AdminLogin from './pages/auth/AdminLogin';
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Teams from './pages/Teams';
import Mentors from './pages/Mentors';
import Projects from './pages/Projects';
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
import Support from './pages/Support';

// Replace the current ProtectedRoute implementation with this
const ProtectedRoute = ({ children, role, isAllowed }: { children: React.ReactNode; role?: string; isAllowed?: boolean }) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const userRole = user?.role;
  
  useEffect(() => {
    // If explicit isAllowed is provided, check that first
    if (isAllowed === false) {
      navigate('/user/login');
      return;
    }
    
    // Otherwise check authentication status
    if (!isAuthenticated) {
      navigate('/user/login');
      return;
    }
    
    // If a specific role is required, verify it
    if (role && userRole !== role) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, userRole, role, isAllowed, navigate]);
  
  return children;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/organizer/login" element={<OrganizerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/hackathon/:id" element={<HackathonDetails />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/support" element={<Support />} />
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard/user" element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/roadmap" element={
          <ProtectedRoute role="user">
            <UserRoadmap />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/achievements" element={
          <ProtectedRoute role="user">
            <UserAchievements />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/teams" element={
          <ProtectedRoute role="user">
            <UserTeams />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/analytics" element={
          <ProtectedRoute role="user">
            <UserAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/event" element={
          <ProtectedRoute role="user">
            <UserEventDetails />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/activity" element={
          <ProtectedRoute role="user">
            <UserActivity />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/progress" element={
          <ProtectedRoute role="user">
            <UserProgress />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user/skills/assessment" element={
          <ProtectedRoute role="user">
            <SkillAssessment />
          </ProtectedRoute>
        } />
        <Route path="/projects/new" element={
          <ProtectedRoute role="user">
            <CreateProject />
          </ProtectedRoute>
        } />
        <Route path="/teams/new" element={
          <ProtectedRoute role="user">
            <CreateTeam />
          </ProtectedRoute>
        } />
        <Route path="/projects/submit" element={
          <ProtectedRoute role="user">
            <SubmitProject />
          </ProtectedRoute>
        } />

        {/* Organizer Dashboard Routes */}
        <Route path="/dashboard/organizer" element={
          <ProtectedRoute role="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/organizer/create-hackathon" element={
          <ProtectedRoute role="organizer">
            <CreateHackathon />
          </ProtectedRoute>
        } />
        <Route path="/organizer/manage-submissions/:hackathonId?" element={
          <ProtectedRoute role="organizer">
            <ManageSubmissions />
          </ProtectedRoute>
        } />
        <Route path="/organizer/analytics/:hackathonId?" element={
          <ProtectedRoute role="organizer">
            <HackathonAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/organizer/settings/:hackathonId?" element={
          <ProtectedRoute role="organizer">
            <HackathonSettings />
          </ProtectedRoute>
        } />
        <Route path="/organizer/team-management" element={
          <ProtectedRoute role="organizer">
            <TeamManagement />
          </ProtectedRoute>
        } />
        <Route path="/organizer/participants/:hackathonId?" element={
          <ProtectedRoute role="organizer">
            <ParticipantManagement />
          </ProtectedRoute>
        } />
        <Route path="/organizer/judges/:hackathonId?" element={
          <ProtectedRoute role="organizer">
            <JudgeManagement />
          </ProtectedRoute>
        } />

        {/* Admin Dashboard Routes */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;