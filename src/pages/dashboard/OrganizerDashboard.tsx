import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Users, Calendar, Trophy, BarChart2 } from 'lucide-react';

const OrganizerDashboard = () => {
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
            Welcome, Organizer {user?.name}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg text-white"
            >
              <Users className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Total Participants</h3>
              <p className="text-2xl font-bold">1,234</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-lg text-white"
            >
              <Calendar className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Active Hackathons</h3>
              <p className="text-2xl font-bold">3</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-lg text-white"
            >
              <Trophy className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Projects Submitted</h3>
              <p className="text-2xl font-bold">156</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-lg text-white"
            >
              <BarChart2 className="w-8 h-8 mb-4" />
              <h3 className="text-lg font-semibold">Total Prize Pool</h3>
              <p className="text-2xl font-bold">$25,000</p>
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">New Team Registration</h3>
                    <p className="text-sm text-gray-500">Team Alpha joined AI Challenge</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Project Submission</h3>
                    <p className="text-sm text-gray-500">15 new projects submitted</p>
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

export default OrganizerDashboard;