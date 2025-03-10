import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, BarChart2, TrendingUp, Calendar, Award, Users, 
  Activity, Clock, Filter, Download, ChevronDown, 
  Map, Globe, BookOpen, Brain, Eye, Zap, MessageSquare 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const HackathonAnalytics = () => {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last7Days');
  const [hackathon, setHackathon] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate fetching hackathon data
    setTimeout(() => {
      setHackathon({
        id: hackathonId || '1',
        title: 'AI Innovation Challenge',
        dates: 'March 15-17, 2024',
        registrations: 524,
        completedProjects: 87,
        activeParticipants: 426,
        averageTeamSize: 3.2,
        projectedSubmissions: 112,
        registrationTrend: '+12%',
        participationTrend: '+8%',
        submissionTrend: '+15%',
        topSkills: ['Machine Learning', 'Python', 'TensorFlow', 'Data Analysis', 'React'],
        topCategories: ['Healthcare AI', 'NLP Solutions', 'Computer Vision', 'Predictive Analytics'],
        demographics: {
          students: 65,
          professionals: 32,
          other: 3
        },
        engagement: {
          chat: 86,
          forum: 72,
          mentorSessions: 58,
          workshopAttendance: 78
        },
        submissions: [
          { day: 'Day 1', count: 5 },
          { day: 'Day 2', count: 18 },
          { day: 'Day 3', count: 64 }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [hackathonId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{hackathon.title} - Analytics</h1>
              <p className="text-gray-600">{hackathon.dates}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="last24Hours">Last 24 Hours</option>
              <option value="last7Days">Last 7 Days</option>
              <option value="last30Days">Last 30 Days</option>
              <option value="allTime">All Time</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export Data
            </motion.button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex border-b">
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'participants' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('participants')}
            >
              Participants
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'projects' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('projects')}
            >
              Projects
            </button>
            <button 
              className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                activeTab === 'engagement' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('engagement')}
            >
              Engagement
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                {hackathon.registrationTrend}
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Registrations</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.registrations}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                {hackathon.participationTrend}
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Participants</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.activeParticipants}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                {hackathon.submissionTrend}
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Project Submissions</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.completedProjects}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-amber-100">
                <BarChart2 className="w-6 h-6 text-amber-600" />
              </div>
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Projected
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Expected Submissions</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.projectedSubmissions}</p>
          </motion.div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-gray-700 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                Registration & Submission Trends
              </h3>
              <button className="text-sm text-gray-500 flex items-center">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </button>
            </div>
            
            {/* Mock chart - in a real app, use a charting library like recharts or Chart.js */}
            <div className="h-64 relative">
              {/* X and Y axes */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gray-200"></div>
              
              {/* Mock bars - registrations */}
              <div className="flex h-full items-end justify-around gap-2 pt-5 pb-5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={`reg-${i}`} className="flex flex-col items-center w-10">
                    <div 
                      className="w-8 bg-indigo-500 rounded-t-sm" 
                      style={{ height: `${20 + Math.random() * 50}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">Day {i+1}</div>
                  </div>
                ))}
              </div>
              
              {/* Overlay line chart for submissions */}
              <div className="absolute inset-0 flex items-end px-6 py-5">
                <svg className="w-full h-full overflow-visible">
                  <path
                    d={`M 20 ${150 - 120 * Math.random()} C 70 ${150 - 90 * Math.random()}, 120 ${150 - 100 * Math.random()}, 170 ${150 - 80 * Math.random()} S 270 ${150 - 60 * Math.random()}, 320 ${150 - 90 * Math.random()}`}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm text-gray-600">Registrations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Submissions</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-indigo-600" />
              Participant Demographics
            </h3>
            
            {/* Mock pie chart */}
            <div className="flex justify-center my-6">
              <div className="relative w-[160px] h-[160px]">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500" style={{ clipPath: 'polygon(50% 50%, 100% 0%, 100% 100%)' }}></div>
                  <div className="absolute inset-0 bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%)' }}></div>
                  <div className="absolute inset-0 bg-purple-500" style={{ clipPath: 'polygon(50% 50%, 0% 100%, 0% 0%, 50% 0%)' }}></div>
                  <div className="absolute inset-0 w-[80px] h-[80px] bg-white rounded-full m-auto"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm text-gray-600 flex-1">Students</span>
                <span className="text-sm font-medium">{hackathon.demographics.students}%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600 flex-1">Professionals</span>
                <span className="text-sm font-medium">{hackathon.demographics.professionals}%</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600 flex-1">Other</span>
                <span className="text-sm font-medium">{hackathon.demographics.other}%</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Skills and Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-indigo-600" />
              Top Skills
            </h3>
            
            <div className="space-y-4">
              {hackathon.topSkills.map((skill: string, index: number) => (
                <div key={skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill}</span>
                    <span className="text-sm text-gray-500">{90 - index * 10}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-indigo-500 rounded-full" 
                      style={{ width: `${90 - index * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <h3 className="font-medium text-gray-700 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
              Project Categories
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {hackathon.topCategories.map((category: string, index: number) => (
                <motion.div 
                  key={category}
                  whileHover={{ y: -3 }}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${index === 0 ? 'bg-purple-100 text-purple-600' :
                      index === 1 ? 'bg-blue-100 text-blue-600' :
                      index === 2 ? 'bg-green-100 text-green-600' :
                      'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {index === 0 ? <Brain className="w-5 h-5" /> :
                     index === 1 ? <MessageSquare className="w-5 h-5" /> :
                     index === 2 ? <Eye className="w-5 h-5" /> :
                     <Zap className="w-5 h-5" />}
                  </div>
                  <span className="text-sm text-center font-medium text-gray-700">{category}</span>
                  <span className="text-xs text-gray-500 mt-1">
                    {Math.floor(Math.random() * 30) + 10} projects
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Engagement Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-gray-700 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              Engagement Metrics
            </h3>
            <button className="text-sm text-indigo-600 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 rounded-full p-3 mb-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{hackathon.engagement.chat}%</span>
              <span className="text-sm text-gray-500">Chat Activity</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 rounded-full p-3 mb-2">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{hackathon.engagement.forum}%</span>
              <span className="text-sm text-gray-500">Forum Engagement</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-amber-100 rounded-full p-3 mb-2">
                <Brain className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{hackathon.engagement.mentorSessions}%</span>
              <span className="text-sm text-gray-500">Mentor Sessions</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 rounded-full p-3 mb-2">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{hackathon.engagement.workshopAttendance}%</span>
              <span className="text-sm text-gray-500">Workshop Attendance</span>
            </div>
          </div>
        </motion.div>
        
        {/* Submission Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h3 className="font-medium text-gray-700 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            Submission Timeline
          </h3>
          
          <div className="relative pt-8 pb-4">
            <div className="absolute left-6 top-8 bottom-0 w-1 bg-gray-200 rounded-full"></div>
            
            {hackathon.submissions.map((item: any, index: number) => (
              <div key={item.day} className="mb-6 relative">
                <div className="flex items-center ml-6">
                  <div className={`absolute -left-3 w-7 h-7 rounded-full flex items-center justify-center ${
                    index === hackathon.submissions.length - 1 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                  }`}>
                    <span className="text-white text-xs font-medium">{index + 1}</span>
                  </div>
                  <div className="ml-6">
                    <h4 className="text-lg font-medium text-gray-800">{item.day}</h4>
                    <div className="flex items-center mt-1">
                      <Award className="w-4 h-4 text-indigo-500 mr-2" />
                      <span className="text-gray-600">{item.count} project submissions</span>
                    </div>
                    {index === hackathon.submissions.length - 1 && (
                      <div className="mt-2 flex items-center text-green-600 text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1" />
                        Final submissions recorded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HackathonAnalytics;