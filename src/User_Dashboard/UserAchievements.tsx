import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Medal, Trophy, Star, Badge, Gift, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const UserAchievements = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const achievementCategories = [
    {
      title: "Hackathon Awards",
      achievements: [
        {
          title: "First Place",
          description: "AI Innovation Challenge 2024",
          icon: <Trophy className="w-6 h-6 text-yellow-500" />,
          date: "Jan 15, 2024",
          color: "bg-yellow-50 border-yellow-200",
          iconBg: "bg-yellow-100"
        },
        {
          title: "Best UI/UX Design",
          description: "Mobile App Sprint 2023",
          icon: <Medal className="w-6 h-6 text-blue-500" />,
          date: "Nov 10, 2023",
          color: "bg-blue-50 border-blue-200",
          iconBg: "bg-blue-100"
        }
      ]
    },
    {
      title: "Skill Badges",
      achievements: [
        {
          title: "React Master",
          description: "Completed advanced React techniques assessment",
          icon: <Badge className="w-6 h-6 text-indigo-500" />,
          date: "Feb 8, 2024",
          color: "bg-indigo-50 border-indigo-200",
          iconBg: "bg-indigo-100"
        },
        {
          title: "API Architect",
          description: "Built a comprehensive RESTful API",
          icon: <Badge className="w-6 h-6 text-green-500" />,
          date: "Dec 20, 2023",
          color: "bg-green-50 border-green-200",
          iconBg: "bg-green-100"
        },
        {
          title: "Database Wizard",
          description: "Completed database optimization challenge",
          icon: <Badge className="w-6 h-6 text-purple-500" />,
          date: "Oct 5, 2023",
          color: "bg-purple-50 border-purple-200",
          iconBg: "bg-purple-100"
        }
      ]
    },
    {
      title: "Participation",
      achievements: [
        {
          title: "Team Player",
          description: "Collaborated on 5+ team projects",
          icon: <Star className="w-6 h-6 text-orange-500" />,
          date: "Ongoing",
          color: "bg-orange-50 border-orange-200",
          iconBg: "bg-orange-100"
        },
        {
          title: "Hackathon Enthusiast",
          description: "Participated in 10+ hackathon events",
          icon: <Award className="w-6 h-6 text-pink-500" />,
          date: "Ongoing",
          color: "bg-pink-50 border-pink-200",
          iconBg: "bg-pink-100"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Your Achievements</h1>
        </div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold opacity-90 mb-1">Total Achievements</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold opacity-90 mb-1">Skill Badges</h3>
            <p className="text-3xl font-bold">7</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold opacity-90 mb-1">Hackathon Awards</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Recently Earned</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                  <Gift className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Problem Solver Badge</h3>
                  <p className="text-gray-600 text-sm">Solved 3 complex algorithmic challenges</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  3 days ago
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 text-center text-indigo-600 font-medium text-sm"
            >
              View all recent achievements
            </motion.button>
          </div>
        </motion.div>

        {/* Achievement Categories */}
        {achievementCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className={`flex rounded-lg border p-4 ${achievement.color}`}
                  >
                    <div className={`${achievement.iconBg} p-3 rounded-lg mr-4 self-start`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {achievement.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserAchievements;