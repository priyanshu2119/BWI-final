import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Code, 
  Lightbulb, 
  MessageSquare,
  PlusCircle,
  UserPlus,
  X,
  ChevronRight,
  Hash
} from 'lucide-react';

const teams = [
  {
    id: 1,
    name: "Code Crushers",
    members: 3,
    maxMembers: 4,
    description: "We're building an AI-powered solution for healthcare data analysis.",
    skills: ["Machine Learning", "React", "Node.js"],
    hackathon: "AI Innovation Challenge",
    openRoles: ["Data Scientist", "UI/UX Designer"],
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 2,
    name: "Blockchain Builders",
    members: 2,
    maxMembers: 4,
    description: "Developing a decentralized marketplace for digital creators.",
    skills: ["Solidity", "Web3.js", "React"],
    hackathon: "Web3 Builders Hackathon",
    openRoles: ["Smart Contract Developer", "Frontend Developer"],
    avatar: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=100",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Green Innovators",
    members: 4,
    maxMembers: 4,
    description: "Creating sustainability tracking solutions for small businesses.",
    skills: ["Python", "React", "Data Visualization"],
    hackathon: "Green Tech Summit",
    openRoles: [],
    avatar: "https://images.unsplash.com/photo-1594283025376-44cb918029af?auto=format&fit=crop&q=80&w=100",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    name: "DevOps Dynamos",
    members: 2,
    maxMembers: 5,
    description: "Building automated CI/CD workflows for cloud-native applications.",
    skills: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
    hackathon: "Cloud Innovation Hackathon",
    openRoles: ["DevOps Engineer", "Backend Developer", "Technical Writer"],
    avatar: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=100",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 5,
    name: "Mobile Mavericks",
    members: 3,
    maxMembers: 4,
    description: "Creating a cross-platform mobile app for community volunteering.",
    skills: ["React Native", "Firebase", "UI/UX Design"],
    hackathon: "Mobile App Challenge",
    openRoles: ["Mobile Developer"],
    avatar: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=100",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    name: "Data Wizards",
    members: 2,
    maxMembers: 5,
    description: "Using big data analysis to solve urban transportation challenges.",
    skills: ["Python", "TensorFlow", "Data Visualization"],
    hackathon: "Smart Cities Hackathon",
    openRoles: ["Data Engineer", "UI Developer", "Domain Expert"],
    avatar: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&q=80&w=100",
    gradient: "from-yellow-500 to-amber-500"
  }
];

const skillOptions = [
  "All Skills",
  "Machine Learning",
  "React",
  "Node.js",
  "Python",
  "Solidity",
  "Web3.js",
  "Data Visualization",
  "Docker",
  "Kubernetes",
  "AWS",
  "React Native",
  "Firebase",
  "UI/UX Design",
  "TensorFlow"
];

const hackathonOptions = [
  "All Hackathons",
  "AI Innovation Challenge",
  "Web3 Builders Hackathon",
  "Green Tech Summit",
  "Cloud Innovation Hackathon",
  "Mobile App Challenge",
  "Smart Cities Hackathon"
];

const Teams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [selectedHackathon, setSelectedHackathon] = useState('All Hackathons');
  const [onlyOpenPositions, setOnlyOpenPositions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'All Skills' || team.skills.includes(selectedSkill);
    const matchesHackathon = selectedHackathon === 'All Hackathons' || team.hackathon === selectedHackathon;
    const matchesOpenPositions = !onlyOpenPositions || team.openRoles.length > 0;
    
    return matchesSearch && matchesSkill && matchesHackathon && matchesOpenPositions;
  });

  const handleTeamClick = (teamId: number) => {
    setSelectedTeam(selectedTeam === teamId ? null : teamId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-purple-900 to-indigo-800 h-64">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your Dream Team
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with talented individuals, join existing teams, or form your own to build 
            amazing projects for upcoming hackathons.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-10">
        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-5 h-5" />
                Filters
              </motion.button>
              
              <motion.button
                onClick={() => setShowCreateTeamModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusCircle className="w-5 h-5" />
                Create Team
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="pt-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    <select
                      value={selectedSkill}
                      onChange={(e) => setSelectedSkill(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {skillOptions.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hackathon</label>
                    <select
                      value={selectedHackathon}
                      onChange={(e) => setSelectedHackathon(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {hackathonOptions.map(hackathon => (
                        <option key={hackathon} value={hackathon}>{hackathon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="open-positions"
                      type="checkbox"
                      checked={onlyOpenPositions}
                      onChange={() => setOnlyOpenPositions(!onlyOpenPositions)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <label htmlFor="open-positions" className="ml-2 text-gray-700">
                      Only show teams with open positions
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <motion.div
                key={team.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all ${
                  selectedTeam === team.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => handleTeamClick(team.id)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${team.gradient} flex items-center justify-center text-white`}>
                      {team.avatar ? (
                        <img src={team.avatar} alt={team.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
                      <p className="text-sm text-gray-500">
                        {team.members} / {team.maxMembers} members • {team.hackathon}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{team.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Hash className="w-3 h-3 mr-1" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {selectedTeam === team.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-gray-100"
                      >
                        {team.openRoles.length > 0 ? (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Open Positions:</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.openRoles.map((role, index) => (
                                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mb-4">This team is not currently looking for new members.</p>
                        )}
                        
                        <div className="flex gap-3">
                          {team.openRoles.length > 0 && (
                            <motion.button
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Join Team
                            </motion.button>
                          )}
                          <motion.button
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-100 p-4 rounded-full mb-4"
              >
                <Users className="w-8 h-8 text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Teams Found</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                We couldn't find any teams matching your search criteria. Try adjusting your filters or create a new team.
              </p>
              <motion.button
                onClick={() => setShowCreateTeamModal(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusCircle className="w-5 h-5" />
                Create New Team
              </motion.button>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Team Modal */}
      <AnimatePresence>
        {showCreateTeamModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateTeamModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Create New Team</h2>
                  <motion.button
                    onClick={() => setShowCreateTeamModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </motion.button>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Team Name
                    </label>
                    <input
                      type="text"
                      id="team-name"
                      placeholder="Enter your team name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="team-description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="team-description"
                      rows={4}
                      placeholder="What is your team building?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="team-hackathon" className="block text-sm font-medium text-gray-700 mb-2">
                      Hackathon
                    </label>
                    <select
                      id="team-hackathon"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {hackathonOptions.slice(1).map(hackathon => (
                        <option key={hackathon} value={hackathon}>{hackathon}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills Needed
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {skillOptions.slice(1, 9).map(skill => (
                        <label key={skill} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded mr-2"
                          />
                          {skill}
                        </label>
                      ))}
                    </div>
                    <button className="text-sm text-indigo-600 hover:underline flex items-center">
                      <ChevronRight className="w-4 h-4" /> Show more skills
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Open Positions
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Frontend Developer"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">+</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setShowCreateTeamModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Team
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teams;