import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, UserPlus, UserMinus, Search, Filter, 
  CheckCircle, XCircle, MoreHorizontal, MessageSquare, Mail,
  AlertTriangle, Download, UserCheck, Shield, Edit, Trash2, X,
  Clock, Calendar
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const TeamManagement = () => {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<any[]>([]);
  const [hackathon, setHackathon] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, complete, incomplete
  const [showTeamDetailsModal, setShowTeamDetailsModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching teams and hackathon data
    setTimeout(() => {
      setHackathon({
        id: hackathonId || '1',
        title: 'AI Innovation Challenge',
        dates: 'March 15-17, 2024',
        teams: 32,
        participants: 112,
        maxTeamSize: 4,
        teamWithdrawn: 3
      });
      
      // Sample teams data
      setTeams([
        {
          id: 1,
          name: "Neural Navigators",
          members: [
            { id: 101, name: "Sarah Johnson", email: "sarah@example.com", role: "Team Lead", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
            { id: 102, name: "David Chen", email: "david@example.com", role: "Developer", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
            { id: 103, name: "Aisha Patel", email: "aisha@example.com", role: "ML Engineer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
          ],
          size: 3,
          maxSize: 4,
          status: "complete",
          project: {
            name: "NeuralNow",
            description: "Real-time object detection and classification system for visually impaired users",
            submissionDate: "2024-03-16T16:45:00"
          }
        },
        {
          id: 2,
          name: "Quantum Coders",
          members: [
            { id: 201, name: "James Wilson", email: "james@example.com", role: "Team Lead", avatar: "https://randomuser.me/api/portraits/men/64.jpg" },
            { id: 202, name: "Emily Zhang", email: "emily@example.com", role: "Designer", avatar: "https://randomuser.me/api/portraits/women/17.jpg" }
          ],
          size: 2,
          maxSize: 4,
          status: "incomplete",
          project: null
        },
        {
          id: 3,
          name: "DataMinds",
          members: [
            { id: 301, name: "Michael Brown", email: "michael@example.com", role: "Team Lead", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
            { id: 302, name: "Lisa Garcia", email: "lisa@example.com", role: "Data Scientist", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
            { id: 303, name: "Omar Hassan", email: "omar@example.com", role: "Backend Developer", avatar: "https://randomuser.me/api/portraits/men/53.jpg" },
            { id: 304, name: "Nina Patel", email: "nina@example.com", role: "Frontend Developer", avatar: "https://randomuser.me/api/portraits/women/33.jpg" }
          ],
          size: 4,
          maxSize: 4,
          status: "complete",
          project: {
            name: "DataSense",
            description: "AI-powered platform for predictive analytics in healthcare",
            submissionDate: "2024-03-17T11:20:00"
          }
        },
        {
          id: 4,
          name: "Code Wizards",
          members: [
            { id: 401, name: "Alex Johnson", email: "alex@example.com", role: "Team Lead", avatar: "https://randomuser.me/api/portraits/men/91.jpg" },
            { id: 402, name: "Maria Rodriguez", email: "maria@example.com", role: "UX Designer", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
          ],
          size: 2,
          maxSize: 4,
          status: "incomplete",
          project: null
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [hackathonId]);

  const handleTeamClick = (team: any) => {
    setSelectedTeam(team);
    setShowTeamDetailsModal(true);
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          team.members.some((m: any) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'all' || team.status === filter;
    
    return matchesSearch && matchesFilter;
  });

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => navigate(`/dashboard/hackathon/${hackathonId}`)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{hackathon.title}</h1>
              <p className="text-gray-600">Team Management</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export Teams
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Team
            </motion.button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Teams</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.teams}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-green-100">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Participants</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.participants}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Teams with Submissions</h3>
            <p className="text-3xl font-bold text-gray-900">
              {teams.filter(team => team.status === 'complete').length}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-amber-100">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Teams Withdrawn</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.teamWithdrawn}</p>
          </motion.div>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search teams or members..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter:</span>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Teams</option>
                <option value="complete">With Submissions</option>
                <option value="incomplete">Without Submissions</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Teams Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeams.map(team => (
                  <tr 
                    key={team.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleTeamClick(team)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{team.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((member: any) => (
                          <img 
                            key={member.id}
                            className="h-8 w-8 rounded-full border-2 border-white"
                            src={member.avatar}
                            alt={member.name}
                          />
                        ))}
                        {team.members.length > 3 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-white bg-gray-200 text-xs text-gray-500">
                            +{team.members.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {team.status === 'complete' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                          Submitted
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                          In Progress
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {team.project ? team.project.name : 'Not submitted yet'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <MessageSquare className="h-5 w-5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredTeams.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No teams found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Team Details Modal */}
      {showTeamDetailsModal && selectedTeam && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-900">Team Details</h3>
              <button 
                onClick={() => setShowTeamDetailsModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="py-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedTeam.name}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">{selectedTeam.size} / {selectedTeam.maxSize} members</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="text-sm text-gray-500">Status</p>
                  {selectedTeam.status === 'complete' ? (
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-700">Submission Complete</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-700">In Progress</span>
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-md font-semibold text-gray-700 mb-3">Team Members</h3>
              <div className="space-y-3 mb-6">
                {selectedTeam.members.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded hover:bg-gray-200">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-200">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </button>
                      {member.role === "Team Lead" && (
                        <span className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          Lead
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedTeam.project ? (
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mb-3">Project Submission</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-1">{selectedTeam.project.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{selectedTeam.project.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Submitted on {new Date(selectedTeam.project.submissionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-yellow-800">No Project Submission</h4>
                      <p className="text-sm text-yellow-700">This team hasn't submitted their project yet.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowTeamDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Message Team
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;