import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Users, Calendar, Trophy, BarChart2 } from 'lucide-react';

const OrganizerDashboard = () => {
  const user = useAuthStore((state) => state.user);
  // Add state for section collapse
  const [sectionsState, setSectionsState] = useState({
    hackathons: true,
    analytics: true,
  });

  // Toggle function
  interface SectionsState {
    hackathons: boolean;
    analytics: boolean;
    [key: string]: boolean; // To allow for future sections
  }

  const toggleSection = (section: keyof SectionsState): void => {
    setSectionsState((prev: SectionsState) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center flex-col lg:flex-row">
            <div className="flex items-center mb-4 lg:mb-0">
              <div className="relative mr-4">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 flex items-center justify-center text-white">
                  <span className="text-xl font-semibold">{user?.name?.[0] || 'O'}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 mr-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'Organizer'}
                  </h1>
                  <div className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                    Admin
                  </div>
                </div>
                <p className="text-gray-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-600">3 Hackathons Active</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#4f46e5' }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center shadow-md"
              >
                <span className="mr-2">Create Event</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, Organizer {user?.name}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Participant Metrics",
                primaryValue: "1,234",
                primaryLabel: "Total Registered",
                secondaryValue: "865",
                secondaryLabel: "Active Users",
                trend: "+12.5%",
                trendUp: true,
                description: "vs previous month",
                color: "indigo"
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Event Status",
                primaryValue: "3",
                primaryLabel: "Active Hackathons",
                secondaryValue: "2",
                secondaryLabel: "In Planning",
                trend: "0%",
                trendUp: false,
                trendNeutral: true,
                description: "unchanged",
                color: "blue"
              },
              {
                icon: <Trophy className="w-6 h-6" />,
                title: "Submission Data",
                primaryValue: "156",
                primaryLabel: "Total Submissions",
                secondaryValue: "42",
                secondaryLabel: "Finalists",
                trend: "+24%",
                trendUp: true,
                description: "vs previous event",
                color: "green"
              },
              {
                icon: <BarChart2 className="w-6 h-6" />,
                title: "Financial Overview",
                primaryValue: "$25,000",
                primaryLabel: "Prize Pool",
                secondaryValue: "$8,500",
                secondaryLabel: "Sponsor Funds",
                trend: "+5%",
                trendUp: true,
                description: "vs last quarter",
                color: "amber"
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -4, 
                  boxShadow: "0 12px 20px -8px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative overflow-hidden"
              >
                {/* Very subtle gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-50/40 to-white pointer-events-none`}></div>
                
                <div className="flex justify-between items-start mb-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-50/70`}>
                    <div className={`text-${metric.color}-700`}>{metric.icon}</div>
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trendNeutral ? 'text-gray-500' :
                    metric.trendUp ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{metric.trend}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-3 h-3 ml-0.5 ${metric.trendNeutral ? 'hidden' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={metric.trendUp ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
                  <div className="flex flex-col space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metric.primaryValue}</p>
                      <p className="text-xs text-gray-500 -mt-1">{metric.primaryLabel}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-800">{metric.secondaryValue}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">{metric.secondaryLabel}</p>
                        <p className="text-xs text-gray-400">{metric.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Hackathon Overview</h2>
                <div className="flex items-center">
                  <select className="text-sm border-gray-200 rounded-lg mr-2 p-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>All time</option>
                  </select>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Simulated chart - in a real application, use a chart library */}
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 mb-4">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Participation Graph</p>
                  <div className="flex space-x-1">
                    {[40, 25, 35, 30, 45, 35, 65, 75, 55, 60, 75, 65].map((height, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}px` }}
                        transition={{ duration: 1, delay: i * 0.05 }}
                        className={`w-4 bg-indigo-${300 + (i % 3) * 100} rounded-t-sm`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Registration Completion</p>
                  <p className="text-lg font-semibold">86.2%</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '86.2%' }}
                      transition={{ duration: 1 }}
                      className="h-1.5 bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Team Formation</p>
                  <p className="text-lg font-semibold">72.5%</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '72.5%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-1.5 bg-blue-500 rounded-full"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Project Submission</p>
                  <p className="text-lg font-semibold">45.8%</p>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '45.8%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-1.5 bg-green-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
                >
                  View detailed analytics
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              {/* Section tabs for different action categories */}
              <div className="flex border-b border-gray-100 mb-4">
                <button className="px-4 py-2 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600">
                  Quick Actions
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600">
                  Team Management
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600">
                  Settings
                </button>
              </div>
              
              {/* Main quick actions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Management</h2>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: '#4338ca' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-between shadow-sm"
                  >
                    <span className="font-medium">Create New Hackathon</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: '#1e40af' }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full px-4 py-3 bg-blue-700 text-white rounded-lg flex items-center justify-between shadow-sm"
                  >
                    <span className="font-medium">Review Submissions</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* Team management section */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Management</h2>
                
                {/* Team members with permissions */}
                <div className="space-y-3 mb-4">
                  {[
                    { name: "Sarah Johnson", role: "Co-Organizer", access: "Full Access", avatar: "SJ", color: "bg-purple-500" },
                    { name: "David Chen", role: "Judge Manager", access: "Limited Access", avatar: "DC", color: "bg-blue-500" },
                    { name: "Maria Rodriguez", role: "Content Creator", access: "Limited Access", avatar: "MR", color: "bg-green-500" }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${member.color} text-white flex items-center justify-center mr-3 text-xs font-medium`}>
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role} • {member.access}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </motion.button>
                    </div>
                  ))}
                </div>
                
                {/* Team actions */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Member
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Team Chat
                  </motion.button>
                </div>
                
                {/* Recent team activity */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-medium text-gray-500">RECENT COMMUNICATION</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      View All
                    </motion.button>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { user: "Sarah", action: "shared a document", time: "2h ago" },
                      { user: "You", action: "assigned a task to David", time: "Yesterday" },
                      { user: "Maria", action: "commented on submission #28", time: "2 days ago" }
                    ].map((activity, index) => (
                      <div key={index} className="text-xs text-gray-600 py-1 px-2 rounded hover:bg-gray-50">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="text-gray-400">• {activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Hackathon Management</h2>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Create New Hackathon
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Manage Submissions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  View Analytics
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Active Hackathon Management</h2>
              <div className="flex items-center gap-3">
                <select className="text-sm border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 py-1.5 px-3">
                  <option>All Hackathons</option>
                  <option>AI Innovation Challenge</option>
                  <option>Web3 Builders Hackathon</option>
                  <option>Mobile App Sprint</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm bg-indigo-50 text-indigo-600 py-1.5 px-3 rounded-md font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Hackathon
                </motion.button>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  name: "AI Innovation Challenge",
                  status: "Live",
                  statusColor: "green",
                  dateRange: "Mar 15 - Mar 30, 2025",
                  participants: 328,
                  submissions: 42,
                  progressValue: 60,
                  daysLeft: 8,
                  logo: "🤖"
                },
                {
                  name: "Web3 Builders Hackathon",
                  status: "Registration",
                  statusColor: "amber",
                  dateRange: "Apr 5 - Apr 20, 2025",
                  participants: 156,
                  submissions: 0,
                  progressValue: 20,
                  daysLeft: 26,
                  logo: "🔗"
                },
                {
                  name: "Mobile App Sprint",
                  status: "Planning",
                  statusColor: "blue",
                  dateRange: "May 10 - May 24, 2025",
                  participants: 0,
                  submissions: 0,
                  progressValue: 10,
                  daysLeft: 52,
                  logo: "📱"
                }
              ].map((hackathon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-3xl mr-3 bg-gray-50 w-10 h-10 rounded-lg flex items-center justify-center">
                        {hackathon.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">{hackathon.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-${hackathon.statusColor}-100 text-${hackathon.statusColor}-800`}>
                            {hackathon.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{hackathon.dateRange}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <div className="text-center px-3 py-1">
                        <p className="text-xs text-gray-500">Participants</p>
                        <p className="font-semibold">{hackathon.participants}</p>
                      </div>
                      <div className="text-center px-3 py-1">
                        <p className="text-xs text-gray-500">Submissions</p>
                        <p className="font-semibold">{hackathon.submissions}</p>
                      </div>
                      <div className="text-center px-3 py-1">
                        <p className="text-xs text-gray-500">Days Left</p>
                        <p className="font-semibold">{hackathon.daysLeft}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{hackathon.progressValue}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${hackathon.progressValue}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        className={`h-1.5 rounded-full bg-${hackathon.statusColor}-500`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm border border-gray-200 rounded-lg py-2 px-1 flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Participants
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm border border-gray-200 rounded-lg py-2 px-1 flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Submissions
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm border border-gray-200 rounded-lg py-2 px-1 flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                      Judges
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                      whileTap={{ scale: 0.98 }}
                      className="text-sm border border-gray-200 rounded-lg py-2 px-1 flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Real-time Analytics</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-1 text-indigo-600 text-sm font-medium"
              >
                <span>Full Report</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-medium text-indigo-600 mb-1">Active Users</p>
                    <h4 className="text-2xl font-bold">1,243</h4>
                  </div>
                  <div className="p-2 bg-indigo-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    12%
                  </span>
                  <span className="ml-2 text-xs text-gray-500">vs last week</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-medium text-blue-600 mb-1">Team Registration</p>
                    <h4 className="text-2xl font-bold">85</h4>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    24%
                  </span>
                  <span className="ml-2 text-xs text-gray-500">vs last event</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-1">Mentor Hours</p>
                    <h4 className="text-2xl font-bold">523</h4>
                  </div>
                  <div className="p-2 bg-green-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    8%
                  </span>
                  <span className="ml-2 text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-lg border border-purple-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-medium text-purple-600 mb-1">Sponsor ROI</p>
                    <h4 className="text-2xl font-bold">134%</h4>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-green-600 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    18%
                  </span>
                  <span className="ml-2 text-xs text-gray-500">vs last year</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;