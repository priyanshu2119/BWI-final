import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Trophy, Users, Code2 } from 'lucide-react';

const UserDashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Hey {user?.name}! 👋
              </h1>
              <p className="text-indigo-100 max-w-lg">
                {new Date().getHours() < 12 ? "Good morning" : 
                 new Date().getHours() < 18 ? "Good afternoon" : "Good evening"}.
                Ready to continue your hackathon journey today?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-white text-indigo-700 px-5 py-2 rounded-full font-medium inline-flex items-center"
              >
                View Your Roadmap
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            <div className="hidden md:block">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                  y: [0, -5, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl"
              >
                <span className="text-5xl">💻</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Upcoming Hackathons",
                value: "3",
                gradient: "from-indigo-500 to-purple-500",
                shadowColor: "rgba(99, 102, 241, 0.4)"
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "Achievements",
                value: "12",
                gradient: "from-pink-500 to-red-500",
                shadowColor: "rgba(236, 72, 153, 0.4)"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team Members",
                value: "4",
                gradient: "from-green-500 to-teal-500",
                shadowColor: "rgba(16, 185, 129, 0.4)"
              },
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Projects",
                value: "6",
                gradient: "from-orange-500 to-yellow-500",
                shadowColor: "rgba(249, 115, 22, 0.4)"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  y: -8, 
                  boxShadow: `0 15px 30px -5px ${card.shadowColor}`,
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 } 
                }}
                className={`bg-gradient-to-br ${card.gradient} p-6 rounded-lg text-white backdrop-blur-sm relative overflow-hidden cursor-pointer`}
              >
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10 z-0"></div>
                <div className="relative z-10">
                  <div className="mb-4 transform transition-transform">{card.icon}</div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="text-indigo-600 mr-2">⚡</span> 
                Current Hackathon Progress
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: "Project Completion", value: 75, color: "indigo" },
                  { label: "Team Tasks", value: 60, color: "purple" },
                  { label: "Backend Development", value: 85, color: "blue" },
                  { label: "Frontend Design", value: 40, color: "pink" }
                ].map((progress, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{progress.label}</span>
                      <span className="font-bold text-gray-900">{progress.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.value}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className={`bg-${progress.color}-600 h-3 rounded-full relative`}
                      >
                        <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-white border-2 border-indigo-600"></span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-indigo-600 font-medium text-sm flex items-center"
                >
                  View detailed analytics
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6 relative"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <span className="text-purple-600 mr-2">📅</span>
                Upcoming Events
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: <Calendar className="w-6 h-6 text-indigo-600" />,
                    title: "Team Meeting",
                    time: "Today at 3:00 PM",
                    status: "urgent",
                    bgColor: "indigo"
                  },
                  {
                    icon: <Users className="w-6 h-6 text-purple-600" />,
                    title: "Mentor Session",
                    time: "Tomorrow at 2:00 PM",
                    status: "upcoming",
                    bgColor: "purple"
                  },
                  {
                    icon: <Code2 className="w-6 h-6 text-pink-600" />,
                    title: "Code Review",
                    time: "Friday at 11:00 AM",
                    status: "scheduled",
                    bgColor: "pink"
                  }
                ].map((event, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-all relative overflow-hidden"
                  >
                    <div className={`bg-${event.bgColor}-100 p-3 rounded-lg`}>
                      {event.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.time}</p>
                    </div>
                    <div className={`
                      px-2 py-1 rounded-full text-xs font-semibold
                      ${event.status === 'urgent' ? 'bg-red-100 text-red-800' : 
                        event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}
                    `}>
                      {event.status === 'urgent' ? 'Soon' : 
                        event.status === 'upcoming' ? 'Tomorrow' : 'Scheduled'}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Event
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6 mt-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-600 mr-2">👥</span>
              Friend Activity
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  avatar: "https://i.pravatar.cc/100?img=1",
                  name: "Alex Kim",
                  action: "submitted a project",
                  project: "AI Voice Assistant",
                  time: "1 hour ago",
                  color: "blue"
                },
                {
                  avatar: "https://i.pravatar.cc/100?img=2",
                  name: "Emma Watson",
                  action: "joined hackathon",
                  project: "Climate Tech Challenge",
                  time: "3 hours ago",
                  color: "green"
                },
                {
                  avatar: "https://i.pravatar.cc/100?img=3",
                  name: "Jason Lee",
                  action: "earned badge",
                  project: "10x Contributor",
                  time: "Yesterday",
                  color: "yellow"
                }
              ].map((activity, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="relative">
                    <img src={activity.avatar} alt={activity.name} className="w-10 h-10 rounded-full mr-4" />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-${activity.color}-400 border-2 border-white`}></div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm">
                      <span className="font-semibold text-gray-900">{activity.name}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium text-indigo-600">{activity.project}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <button className="text-gray-400 hover:text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-indigo-600 font-medium text-sm"
              >
                View all activity
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: "💻", label: "Create Project" },
                  { icon: "👥", label: "Form Team" },
                  { icon: "🔍", label: "Find Hackathon" },
                  { icon: "📝", label: "Submit Project" },
                  { icon: "📊", label: "My Progress" },
                  { icon: "🏆", label: "Leaderboard" }
                ].map((action, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, backgroundColor: "#f5f3ff" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills & Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Skills Progress</h2>
              <div className="space-y-4">
                {[
                  { skill: "React", progress: 85, color: "cyan" },
                  { skill: "Node.js", progress: 70, color: "green" },
                  { skill: "UI/UX Design", progress: 60, color: "purple" },
                  { skill: "Data Science", progress: 40, color: "yellow" },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-xs font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        Level {Math.ceil(skill.progress/20)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className={`bg-${skill.color}-500 h-2.5 rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-6 w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium"
              >
                Take Skill Assessment
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;