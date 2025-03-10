import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, UserPlus, Search, Mail, Award,
  Star, Trash2, X, Check, MoreHorizontal, Download,
  Users, Shield, AlertTriangle
} from 'lucide-react';

const JudgeManagement = () => {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [judges, setJudges] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJudgeModal, setShowJudgeModal] = useState(false);
  const [selectedJudge, setSelectedJudge] = useState<any>(null);

  useEffect(() => {
    // Simulate loading judges data
    setTimeout(() => {
      setJudges([
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          title: "AI Research Lead at TechCorp",
          email: "sarah.j@techcorp.com",
          expertise: ["Machine Learning", "Computer Vision", "NLP"],
          status: "active",
          rating: 4.9,
          assignedProjects: 15,
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          id: 2,
          name: "Prof. Michael Chen",
          title: "Professor of Computer Science",
          email: "m.chen@university.edu",
          expertise: ["Cloud Computing", "Systems Architecture", "Blockchain"],
          status: "invited",
          rating: null,
          assignedProjects: 0,
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        }
        // Add more judge data as needed
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleJudgeClick = (judge: any) => {
    setSelectedJudge(judge);
    setShowJudgeModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(`/dashboard/hackathon/${hackathonId}`)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Judge Management</h1>
              <p className="text-gray-600">Manage judges and their assignments</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Judge
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">Active Judges</h3>
            <p className="text-3xl font-bold text-gray-900">
              {judges.filter(j => j.status === 'active').length}
            </p>
          </motion.div>
          
          {/* Add more stat cards */}
        </div>

        {/* Judges Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search judges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judge
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expertise
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {judges.map(judge => (
                <tr 
                  key={judge.id}
                  onClick={() => handleJudgeClick(judge)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {/* Judge details */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={judge.avatar} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{judge.name}</div>
                        <div className="text-sm text-gray-500">{judge.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {judge.expertise.map((exp: string) => (
                        <span key={exp} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                      judge.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {judge.status === 'active' ? 'Active' : 'Invited'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {judge.assignedProjects} projects
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Mail className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JudgeManagement;