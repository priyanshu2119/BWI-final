import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Settings, ChevronRight, ExternalLink, Calendar, Clock, MoreHorizontal, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const UserTeams = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const activeTeams = [
    {
      id: 1,
      name: "Code Titans",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100",
      hackathon: "AI Innovation Challenge",
      status: "active",
      role: "Team Lead",
      members: [
        { name: "You", role: "Team Lead", avatar: null, isYou: true },
        { name: "Sarah Chen", role: "UI Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" },
        { name: "Michael Johnson", role: "Backend Developer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
        { name: "Emma Williams", role: "Data Scientist", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" }
      ],
      nextMeeting: "Tomorrow, 3:00 PM",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      id: 2,
      name: "Green Innovators",
      avatar: "https://images.unsplash.com/photo-1594283025376-44cb918029af?auto=format&fit=crop&q=80&w=100",
      hackathon: "Sustainability Tech Summit",
      status: "active",
      role: "Developer",
      members: [
        { name: "Alex Rodriguez", role: "Team Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
        { name: "You", role: "Developer", avatar: null, isYou: true },
        { name: "Priya Sharma", role: "UI/UX Designer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" }
      ],
      nextMeeting: "Friday, 4:30 PM",
      gradient: "from-green-500 to-emerald-500"
    }
  ];
  
  const pastTeams = [
    {
      id: 3,
      name: "Data Wizards",
      avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=100",
      hackathon: "Big Data Hackathon 2023",
      status: "completed",
      result: "Runner-up",
      role: "Developer",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Mobile Masters",
      avatar: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=100",
      hackathon: "Mobile App Challenge",
      status: "completed",
      result: "Participation",
      role: "UI Designer",
      gradient: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            <h1 className="text-2xl font-bold text-gray-900">Your Teams</h1>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/teams/new')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Create Team
          </motion.button>
        </div>
        
        {/* Active Teams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Active Teams</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {activeTeams.map((team) => (
                <motion.div 
                  key={team.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
                >
                  <div className={`bg-gradient-to-r ${team.gradient} h-3`}></div>
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-4">
                          {team.avatar ? (
                            <img src={team.avatar} alt={team.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-full h-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                          <p className="text-gray-500 text-sm flex items-center">
                            {team.hackathon}
                            <span className="inline-flex items-center ml-3 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Active
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <Settings className="w-5 h-5 text-gray-500" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/teams/${team.id}`)}
                          className="p-2 rounded-full hover:bg-gray-100"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-500" />
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
                      <div className="flex -space-x-2 overflow-hidden">
                        {team.members.map((member, i) => (
                          <div key={i} className="relative inline-block">
                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                              {member.avatar ? (
                                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-indigo-100 flex items-center justify-center text-indigo-800 text-xs font-bold">
                                  {member.name.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            {member.isYou && (
                              <span className="absolute -bottom-0.5 -right-0.5 bg-indigo-500 rounded-full w-3 h-3 border-2 border-white"></span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Next meeting: {team.nextMeeting}</span>
                      </div>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-sm text-indigo-600 font-medium flex items-center"
                        onClick={() => navigate(`/teams/${team.id}`)}
                      >
                        View Team Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Past Teams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Past Teams</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {pastTeams.map((team) => (
              <motion.div 
                key={team.id}
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${team.gradient} flex items-center justify-center text-white overflow-hidden mr-4`}>
                    {team.avatar ? (
                      <img src={team.avatar} alt={team.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{team.name}</h3>
                    <p className="text-sm text-gray-500">{team.hackathon}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-800">
                      {team.result}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-1.5 rounded-full hover:bg-gray-200"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserTeams;