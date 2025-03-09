import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Users, Settings, Shield, Database } from 'lucide-react';

const AdminDashboard = () => {
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
            Admin Dashboard - {user?.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Admin dashboard cards can go here */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center gap-4">
              <Users className="text-blue-500" />
              <div>
                <h3 className="font-medium">User Management</h3>
                <p className="text-sm text-gray-600">Manage system users</p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex items-center gap-4">
              <Database className="text-green-500" />
              <div>
                <h3 className="font-medium">Content Management</h3>
                <p className="text-sm text-gray-600">Manage website content</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;