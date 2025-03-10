import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Users, UserPlus, Search, Filter, 
  Download, UserCheck, UserX, Mail, ArrowUpDown,
  MessageSquare, MoreHorizontal, Check, X, AlertTriangle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ParticipantManagement = () => {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState<any[]>([]);
  const [hackathon, setHackathon] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, pending, rejected
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showParticipantModal, setShowParticipantModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching participants and hackathon data
    setTimeout(() => {
      setHackathon({
        id: hackathonId || '1',
        title: 'AI Innovation Challenge',
        dates: 'March 15-17, 2024',
        participants: 112,
        registrationsClosed: false,
        totalRegistrations: 125
      });
      
      // Sample participants data
      setParticipants([
        {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah@example.com",
          role: "Frontend Developer",
          skills: ["React", "JavaScript", "UI/UX"],
          status: "active",
          team: "Neural Navigators",
          registeredOn: "2024-02-10T14:30:00",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          id: 2,
          name: "David Chen",
          email: "david@example.com",
          role: "Backend Developer",
          skills: ["Python", "Django", "AWS"],
          status: "active",
          team: "Neural Navigators",
          registeredOn: "2024-02-12T09:15:00",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          id: 3,
          name: "Aisha Patel",
          email: "aisha@example.com",
          role: "ML Engineer",
          skills: ["TensorFlow", "PyTorch", "Data Science"],
          status: "active",
          team: "Neural Navigators",
          registeredOn: "2024-02-11T16:45:00",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
          id: 4,
          name: "James Wilson",
          email: "james@example.com",
          role: "Full Stack Developer",
          skills: ["Node.js", "React", "MongoDB"],
          status: "active",
          team: "Quantum Coders",
          registeredOn: "2024-02-15T10:30:00",
          avatar: "https://randomuser.me/api/portraits/men/64.jpg"
        },
        {
          id: 5,
          name: "Emily Zhang",
          email: "emily@example.com",
          role: "UI/UX Designer",
          skills: ["Figma", "Adobe XD", "CSS"],
          status: "active",
          team: "Quantum Coders",
          registeredOn: "2024-02-14T13:20:00",
          avatar: "https://randomuser.me/api/portraits/women/17.jpg"
        },
        {
          id: 6,
          name: "Robert Kim",
          email: "robert@example.com",
          role: "Data Scientist",
          skills: ["Python", "R", "Machine Learning"],
          status: "pending",
          team: null,
          registeredOn: "2024-02-20T11:10:00",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
          id: 7,
          name: "Lisa Wang",
          email: "lisa@example.com",
          role: "DevOps Engineer",
          skills: ["Docker", "Kubernetes", "CI/CD"],
          status: "rejected",
          team: null,
          registeredOn: "2024-02-18T15:50:00",
          avatar: "https://randomuser.me/api/portraits/women/95.jpg",
          rejectionReason: "Duplicate registration"
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [hackathonId]);

  const handleParticipantClick = (participant: any) => {
    setSelectedParticipant(participant);
    setShowParticipantModal(true);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredParticipants = participants
    .filter(participant => {
      const matchesSearch = 
        participant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (participant.team && participant.team.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = filter === 'all' || participant.status === filter;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortField === 'registeredOn') {
        return sortDirection === 'asc'
          ? new Date(a.registeredOn).getTime() - new Date(b.registeredOn).getTime()
          : new Date(b.registeredOn).getTime() - new Date(a.registeredOn).getTime();
      }
      return 0;
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
              <p className="text-gray-600">Participant Management</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export Data
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              onClick={() => {
                // Here you would implement invite functionality
                alert("Invite functionality would open here");
              }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Participants
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
            <h3 className="text-gray-500 text-sm font-medium mb-1">Total Participants</h3>
            <p className="text-3xl font-bold text-gray-900">{hackathon.participants}</p>
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
            <h3 className="text-gray-500 text-sm font-medium mb-1">Active Participants</h3>
            <p className="text-3xl font-bold text-gray-900">
              {participants.filter(p => p.status === 'active').length}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <AlertTriangle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Pending Registrations</h3>
            <p className="text-3xl font-bold text-gray-900">
              {participants.filter(p => p.status === 'pending').length}
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
                <UserX className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">Rejected Registrations</h3>
            <p className="text-3xl font-bold text-gray-900">
              {participants.filter(p => p.status === 'rejected').length}
            </p>
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
                placeholder="Search participants by name, email, or team..."
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
                <option value="all">All Participants</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Participants Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Participant</span>
                      {sortField === 'name' && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Skills</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('registeredOn')}
                  >
                    <div className="flex items-center">
                      <span>Registered On</span>
                      {sortField === 'registeredOn' && (
                        <ArrowUpDown className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map(participant => (
                  <tr 
                    key={participant.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleParticipantClick(participant)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={participant.avatar} 
                          alt={participant.name} 
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                          <div className="text-sm text-gray-500">{participant.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{participant.role}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {participant.skills.map((skill: string) => (
                          <span 
                            key={skill}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {participant.team ? (
                        <div className="text-sm text-gray-900">{participant.team}</div>
                      ) : (
                        <span className="text-xs text-gray-500">No team</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {participant.status === 'active' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      )}
                      {participant.status === 'pending' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                      {participant.status === 'rejected' && (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(participant.registeredOn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Mail className="h-5 w-5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <MessageSquare className="h-5 w-5" />
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredParticipants.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No participants found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Participant Details Modal */}
      {showParticipantModal && selectedParticipant && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold text-gray-900">Participant Details</h3>
              <button 
                onClick={() => setShowParticipantModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="py-4">
              <div className="flex items-center mb-6">
                <img 
                  className="h-16 w-16 rounded-full" 
                  src={selectedParticipant.avatar} 
                  alt={selectedParticipant.name} 
                />
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{selectedParticipant.name}</h2>
                  <p className="text-sm text-gray-500">{selectedParticipant.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {selectedParticipant.status === 'active' && (
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-700">Active</span>
                    </div>
                  )}
                  {selectedParticipant.status === 'pending' && (
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-yellow-700">Pending Approval</span>
                    </div>
                  )}
                  {selectedParticipant.status === 'rejected' && (
                    <div className="flex items-center">
                      <X className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-red-700">Rejected</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium text-gray-900">{selectedParticipant.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Team</p>
                  <p className="font-medium text-gray-900">{selectedParticipant.team || "No team"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registered On</p>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedParticipant.registeredOn).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedParticipant.skills.map((skill: string) => (
                    <span 
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedParticipant.status === 'rejected' && selectedParticipant.rejectionReason && (
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-gray-700 mb-2">Rejection Reason</h3>
                  <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-md border border-red-100">
                    {selectedParticipant.rejectionReason}
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex justify-between pt-4 border-t border-gray-200">
                <div>
                  {selectedParticipant.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 text-sm flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 text-sm flex items-center">
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ParticipantManagement;