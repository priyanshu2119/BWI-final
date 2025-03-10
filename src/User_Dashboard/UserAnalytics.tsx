import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BarChart2, TrendingUp, Calendar, Award, Users, Code, 
  Activity, Clock, Zap, Download, RefreshCcw, Filter
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const UserAnalytics = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  // Date range state
  const [dateRange, setDateRange] = React.useState('last6Months');
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="last30Days">Last 30 Days</option>
              <option value="last3Months">Last 3 Months</option>
              <option value="last6Months">Last 6 Months</option>
              <option value="lastYear">Last Year</option>
              <option value="allTime">All Time</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg border border-gray-300 bg-white"
            >
              <RefreshCcw className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg border border-gray-300 bg-white"
            >
              <Download className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                +28%
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Points</h3>
            <p className="text-3xl font-bold text-gray-900">1,284</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                +12%
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Hackathons</h3>
            <p className="text-3xl font-bold text-gray-900">8</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-purple-100">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                +4%
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Team Collaborations</h3>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-500 text-sm font-semibold flex items-center">
                +35%
                <TrendingUp className="w-4 h-4 ml-1" />
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Projects Completed</h3>
            <p className="text-3xl font-bold text-gray-900">9</p>
          </div>
        </motion.div>
        
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 rounded-lg border border-gray-300 bg-white text-sm flex items-center"
              >
                <Filter className="w-4 h-4 text-gray-600 mr-1" />
                Filter
              </motion.button>
            </div>
          </div>
          
          <div className="h-[300px] w-full flex items-center justify-center">
            {/* Chart would go here - for demo purposes using a placeholder */}
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200"></div>
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200"></div>
              
              {/* Mock bar chart */}
              <div className="absolute bottom-0 w-full h-full flex items-end justify-between px-4">
                {[65, 40, 85, 50, 75, 90, 45, 50, 70, 65, 80, 55].map((height, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className={`w-6 rounded-t-md ${i % 2 === 0 ? 'bg-indigo-500' : 'bg-purple-500'}`} 
                      style={{ height: `${height}%` }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{i + 1}</span>
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2 text-xs text-gray-500">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm text-gray-600">Hackathon Performance</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-gray-600">Skill Development</span>
            </div>
          </div>
        </motion.div>
        
        {/* Secondary Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Skill Progress</h2>
            </div>
            
            <div className="space-y-4">
              {/* Skill progress bars */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">React</span>
                  <span className="text-sm text-gray-500">85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{width: "85%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Node.js</span>
                  <span className="text-sm text-gray-500">70%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{width: "70%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">TypeScript</span>
                  <span className="text-sm text-gray-500">65%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{width: "65%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">MongoDB</span>
                  <span className="text-sm text-gray-500">60%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{width: "60%"}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">GraphQL</span>
                  <span className="text-sm text-gray-500">40%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-indigo-500 rounded-full" style={{width: "40%"}}></div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Activity Distribution</h2>
            </div>
            
            {/* Pie chart placeholder */}
            <div className="h-[200px] flex items-center justify-center">
              <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
                <div className="absolute inset-0 bg-purple-500" style={{ clipPath: 'polygon(50% 50%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute inset-0 bg-blue-500" style={{ clipPath: 'polygon(50% 50%, 0% 100%, 0% 0%, 50% 0%)' }}></div>
                <div className="absolute inset-0 w-[120px] h-[120px] bg-white rounded-full m-auto"></div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-xs text-gray-600">Coding (40%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-600">Planning (35%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">Learning (25%)</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Recent Activity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Project Submission</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Hackathon</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 16, 2023</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">+200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Skill Assessment</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Learning</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 10, 2023</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">+50</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Team Formation</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Collaboration</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 5, 2023</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">+75</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">GitHub Commits</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Development</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">May 3, 2023</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">+25</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Hackathon Registration</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Event</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">April 28, 2023</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">+10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAnalytics;