import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Activity, Users, Code, Bookmark, FileCode, Medal, ThumbsUp, MessageCircle } from 'lucide-react';

const UserActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const activities = [
    {
      id: '1',
      user: {
        name: 'Sarah Miller',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'UI/UX Designer'
      },
      type: 'commit',
      action: 'pushed 3 commits to',
      target: 'AI Health Assistant',
      timestamp: '2 hours ago',
      details: [
        'feat: Add patient dashboard layout',
        'fix: Resolve appointment calendar issues',
        'style: Update color scheme per client feedback'
      ],
      icon: <Code className="w-5 h-5 text-purple-500" />,
      color: 'bg-purple-100'
    },
    {
      id: '2',
      user: {
        name: 'David Chen',
        avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
        role: 'Backend Developer'
      },
      type: 'comment',
      action: 'commented on your pull request in',
      target: 'API Integration',
      timestamp: '4 hours ago',
      details: [
        'Great job on the authentication flow! I would suggest adding rate limiting to prevent abuse.'
      ],
      icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
      color: 'bg-blue-100'
    },
    {
      id: '3',
      user: {
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        role: 'Product Manager'
      },
      type: 'project',
      action: 'created a new task for you in',
      target: 'Sprint Planning',
      timestamp: 'Yesterday',
      details: [
        'Implement user onboarding flow - Priority: High, Due: Friday'
      ],
      icon: <FileCode className="w-5 h-5 text-green-500" />,
      color: 'bg-green-100'
    },
    {
      id: '4',
      user: {
        name: 'Team CodeCrafters',
        avatar: null,
        role: 'Hackathon Team'
      },
      type: 'achievement',
      action: 'received award for',
      target: 'Best Technical Innovation',
      timestamp: '2 days ago',
      details: [],
      icon: <Medal className="w-5 h-5 text-yellow-500" />,
      color: 'bg-yellow-100'
    },
    {
      id: '5',
      user: {
        name: 'Michael Park',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        role: 'Data Scientist'
      },
      type: 'like',
      action: 'liked your submission in',
      target: 'Climate Action Hackathon',
      timestamp: '3 days ago',
      details: [],
      icon: <ThumbsUp className="w-5 h-5 text-red-500" />,
      color: 'bg-red-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Activity Feed</h1>
        </div>
        
        {/* Filter Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium">All Activity</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">Mentions</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">Code Updates</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">Team Activity</button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50">Achievements</button>
        </motion.div>
        
        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <p className="text-indigo-100">Stay updated with your team's progress</p>
          </div>
          
          <div className="p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="flex gap-4">
                    <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${activity.color}`}>
                      {activity.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          {activity.user.avatar ? (
                            <img 
                              src={activity.user.avatar} 
                              alt={activity.user.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mr-2 flex items-center justify-center text-white text-xs">
                              {activity.user.name.charAt(0)}
                            </div>
                          )}
                          <h3 className="font-medium text-gray-900">{activity.user.name}</h3>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{activity.user.role}</span>
                        </div>
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                      </div>
                      
                      <p className="mt-1 text-gray-700">
                        {activity.action} <span className="font-medium text-indigo-700">{activity.target}</span>
                      </p>
                      
                      {activity.details && activity.details.length > 0 && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          {activity.details.map((detail, i) => (
                            <div key={i} className="text-sm text-gray-800">{detail}</div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-3 flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Like
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Comment
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs text-gray-600 flex items-center"
                        >
                          <Bookmark className="w-4 h-4 mr-1" />
                          Save
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-2 border border-gray-300 text-gray-700 rounded-lg font-medium flex items-center justify-center"
            >
              Load More Activity
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;