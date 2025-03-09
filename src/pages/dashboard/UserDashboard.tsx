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
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-lg text-white"
            >
              <Calendar className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Upcoming Hackathons</h3>
              <p className="text-2xl font-bold">3</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-lg text-white"
            >
              <Trophy className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-2xl font-bold">12</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-lg text-white"
            >
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Team Members</h3>
              <p className="text-2xl font-bold">4</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-500 to-yellow-500 p-6 rounded-lg text-white"
            >
              <Code2 className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Projects</h3>
              <p className="text-2xl font-bold">6</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Current Hackathon Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Project Completion</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Team Tasks</span>
                    <span>60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Meeting</h3>
                    <p className="text-sm text-gray-500">Today at 3:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mentor Session</h3>
                    <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;