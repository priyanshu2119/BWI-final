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
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    name: '',
    description: '',
    hackathon: hackathonOptions[1],
    maxMembers: 4,
    skills: [] as string[],
    openRoles: [] as string[],
    avatar: ''
  });
  const [teamsToCompare, setTeamsToCompare] = useState<number[]>([]);
    const [showComparisonModal, setShowComparisonModal] = useState(false);
    const [selectedTeamForJoin, setSelectedTeamForJoin] = useState<any>(null);
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [joinFormData, setJoinFormData] = useState({
      name: '',
      email: '',
      eligibility: ''
    });
    const [showTeamDetails, setShowTeamDetails] = useState(false);
    const totalSteps = 5;
  
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         team.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === 'All Skills' || team.skills.includes(selectedSkill);
    const matchesHackathon = selectedHackathon === 'All Hackathons' || team.hackathon === selectedHackathon;
    const matchesOpenPositions = !onlyOpenPositions || team.openRoles.length > 0;
    
    return matchesSearch && matchesSkill && matchesHackathon && matchesOpenPositions;
  });

  const handleTeamClick = (teamId: number) => {
    // If the same team is clicked again, close it
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
      return;
    }
    
    // Set the selected team but don't show details modal
    setSelectedTeam(teamId);
    
    // Give a slight delay for the expansion to start before scrolling
    setTimeout(() => {
      const teamElement = document.getElementById(`team-${teamId}`);
      if (teamElement) {
        // Smooth scroll to the team with offset to account for fixed header
        window.scrollTo({
          top: teamElement.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    }, 50);
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

        {/* Team Matching Quiz/Banner */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 border border-indigo-200 rounded-xl p-6 mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4f46e5" d="M45.7,-70.5C58.9,-62.5,69.3,-49.4,75.9,-34.7C82.5,-20,85.4,-3.7,83.1,12.7C80.9,29.2,73.5,45.8,61.3,55.8C49,65.8,31.8,69.2,15.4,72.8C-1,76.4,-16.7,80.2,-31.4,76.5C-46.1,72.8,-59.7,61.6,-70.6,47.1C-81.4,32.6,-89.4,14.8,-88.3,-2.4C-87.1,-19.6,-77,-36.2,-64.4,-47.9C-51.8,-59.6,-36.8,-66.5,-22.1,-70.9C-7.5,-75.3,6.7,-77.1,20.4,-75.6C34.1,-74.1,47.3,-69.3,55.2,-61.2" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900 mb-2">Find your perfect team match</h3>
              <p className="text-sm text-indigo-700 max-w-md mb-4 md:mb-0">
                Answer a few questions about your skills and goals to get personalized team recommendations based on what you bring to the table.
              </p>
            </div>
            <motion.button
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {/* Open skill matching quiz */}}
            >
              <Lightbulb className="w-4 h-4" />
              Start Matching Quiz
            </motion.button>
          </div>
        </motion.div>

        {/* Skill Demand Visualization */}
        <motion.div 
          className="bg-white rounded-xl shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">In-Demand Skills</h3>
            <button className="text-sm text-indigo-600 hover:underline">View all stats</button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { skill: "Machine Learning", demand: 85, color: "bg-blue-500" },
              { skill: "React", demand: 72, color: "bg-cyan-500" },
              { skill: "Blockchain", demand: 68, color: "bg-purple-500" },
              { skill: "UX Design", demand: 63, color: "bg-pink-500" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ y: -2 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                  <span className="text-xs font-semibold bg-gray-200 px-2 py-0.5 rounded-full">{item.demand}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className={`h-2 rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.demand}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Teams */}
        {!searchQuery && !onlyOpenPositions && selectedHackathon === 'All Hackathons' && selectedSkill === 'All Skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Recommended for You</h2>
              <button className="text-sm text-indigo-600 hover:underline">View all</button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-1">
              <div className="flex overflow-x-auto scrollbar-hide gap-4 p-4">
                {teams.slice(0, 4).map((team) => (
                  <div 
                    key={`rec-${team.id}`}
                    className="min-w-[280px] bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
                    onClick={() => {
                      handleTeamClick(team.id);
                      document.getElementById(`team-${team.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${team.gradient} flex items-center justify-center text-white`}>
                          {team.avatar ? (
                            <img src={team.avatar} alt={team.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users className="w-5 h-5" />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-800">{team.name}</h3>
                          <p className="text-xs text-gray-500">{team.hackathon}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded-full py-1 px-3 text-xs font-medium text-indigo-600 border border-indigo-100">
                        {Math.floor(Math.random() * 31) + 70}% Match
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {team.description}
                    </div>
                    
                    {team.openRoles.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Needs:</p>
                        <div className="flex flex-wrap gap-1">
                          {team.openRoles.map((role, index) => (
                            <span key={index} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <style>
                {`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}
              </style>
            </div>
          </motion.div>
        )}

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-max">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <motion.div
                key={team.id}
                id={`team-${team.id}`}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all ${
                  selectedTeam === team.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleTeamClick(team.id)}
                layout
              >
                {/* Add team status banners */}
                {team.openRoles.length > 0 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium px-4 py-1 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                    Actively Recruiting • {team.openRoles.length} open position{team.openRoles.length > 1 ? 's' : ''}
                  </div>
                )}

                <div className="p-6">
                  {/* Team header with compatibility score */}
                  <div className="flex items-center mb-5">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${team.gradient} flex items-center justify-center text-white`}>
                      {team.avatar ? (
                        <img src={team.avatar} alt={team.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <Users className="w-6 h-6" />
                      )}
                      {/* Progress indicator removed */}
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-800">{team.name}</h3>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (teamsToCompare.includes(team.id)) {
                              setTeamsToCompare(teamsToCompare.filter(id => id !== team.id));
                            } else if (teamsToCompare.length < 3) {
                              setTeamsToCompare([...teamsToCompare, team.id]);
                            } else {
                              alert("You can compare up to 3 teams at a time");
                            }
                          }}
                        >
                          {teamsToCompare.includes(team.id) ? 'Remove' : 'Compare'}
                          <Code className="w-3 h-3 ml-1" />
                        </motion.button>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm text-gray-500">
                          {team.members} / {team.maxMembers} members • {team.hackathon}
                        </p>
                        
                        {/* Activity status */}
                        <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                          Active Today
                        </span>
                      </div>
                    </div>
                    
                    {/* Compatibility score */}
                    <div className="ml-auto">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full border-4 border-indigo-100 flex items-center justify-center">
                          <span className="text-lg font-bold text-indigo-600">
                            {Math.floor(Math.random() * 31) + 70}%
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">Match</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{team.description}</p>
                  
                  {/* Skills section with visual indicators */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Team Skills</h4>
                      <span className="text-xs text-gray-500">{team.skills.length} skills</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {team.skills.map((skill, index) => (
                        <div className="relative group">
                          <span className={`px-3 py-1 text-xs rounded-full flex items-center ${
                            index % 3 === 0 ? 'bg-indigo-100 text-indigo-700' :
                            index % 3 === 1 ? 'bg-purple-100 text-purple-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            <Hash className="w-3 h-3 mr-1" />
                            {skill}
                            {Math.random() > 0.5 && (
                              <span className="ml-1 w-2 h-2 bg-green-500 rounded-full" title="Matching skill"></span>
                            )}
                          </span>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <div className="font-medium mb-1">{skill}</div>
                            <div className="text-gray-300 mb-1">
                              {Math.random() > 0.5 ? 'You have this skill (85% match)' : 'High demand skill'}
                            </div>
                            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-1 bg-green-500 rounded-full" style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Team members preview */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2">
                      {Array(team.members).fill(0).map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-8 h-8 rounded-full border-2 border-white ${
                            i % 2 === 0 ? `bg-${team.gradient.split(' ')[1].replace('to-', '')}` : 'bg-gray-300'
                          } flex items-center justify-center text-white text-xs font-medium`}
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {team.members < team.maxMembers && (
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                          <PlusCircle className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {team.maxMembers - team.members} spot{team.maxMembers - team.members !== 1 ? 's' : ''} left
                    </span>
                  </div>
                  
                  <AnimatePresence>
                    {selectedTeam === team.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-gray-100"
                      >
                        {team.openRoles.length > 0 ? (
                          <div className="mb-4 px-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Open Positions:</h4>
                            <div className="flex flex-wrap gap-2">
                              {team.openRoles.map((role, index) => (
                                <div key={index} className="relative group">
                                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full group-hover:bg-indigo-200 transition-colors cursor-pointer">
                                    {role}
                                  </span>
                                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Click to apply for this role
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-gray-900 border-t-0 border-r-transparent border-l-transparent"></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mb-4 px-6">This team is not currently looking for new members.</p>
                        )}
                        
                        <div className="flex gap-3 px-6 mb-4">
                          {team.openRoles.length > 0 && (
                            <motion.button
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTeamForJoin(team);
                                setShowJoinForm(true);
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Join Team
                            </motion.button>
                          )}
                          <motion.button
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : selectedTeam && selectedTeam !== team.id ? (
                      // Add decorative content for non-selected expanded teams
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-gray-100"
                      >
                        <div className="p-6 flex flex-col items-center justify-center text-center">
                          <div className="mb-3 bg-gray-100 rounded-full p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-500">Click to view this team's details</p>
                        </div>
                      </motion.div>
                    ) : null}
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
      
      {/* Interactive Team Creation Wizard */}
      <AnimatePresence>
        {showCreateTeamModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => {
                if (wizardStep > 1 && !confirm("Are you sure you want to exit? Your progress will be lost.")) {
                  return;
                }
                setShowCreateTeamModal(false);
                setWizardStep(1);
              }}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-0 max-w-2xl w-full h-[80vh] mx-auto mt-[10vh] bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Wizard header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
                <motion.button
                  onClick={() => {
                    if (wizardStep > 1 && !confirm("Are you sure you want to exit? Your progress will be lost.")) {
                      return;
                    }
                    setShowCreateTeamModal(false);
                    setWizardStep(1);
                  }}
                  className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                
                <h2 className="text-2xl font-bold mb-2">Build Your Dream Team</h2>
                <p className="text-white/80 max-w-lg">
                  Create a team that combines the perfect mix of skills to build something amazing together.
                </p>
                
                {/* Progress bar */}
                <div className="mt-6 relative">
                  <div className="overflow-hidden h-2 text-xs flex rounded-full bg-white/30">
                    <motion.div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                      animate={{ width: `${(wizardStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    ></motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    {[...Array(totalSteps)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer 
                          ${i + 1 < wizardStep ? 'bg-white text-indigo-600' : 
                            i + 1 === wizardStep ? 'bg-white text-indigo-600 ring-4 ring-white/30' : 
                            'bg-white/30 text-white'}`
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (i + 1 < wizardStep) {
                            setWizardStep(i + 1);
                          }
                        }}
                      >
                        {i + 1 < wizardStep ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-1 text-xs text-white/70">
                    <span>Team Basics</span>
                    <span>Project</span>
                    <span>Skills</span>
                    <span>Positions</span>
                    <span>Review</span>
                  </div>
                </div>
              </div>
              
              {/* Wizard content */}
              <div className="p-6 h-[calc(100%-200px)] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {/* Step 1: Team Basics */}
                  {wizardStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Team Identity</h3>
                        
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-1 w-full">
                            <label htmlFor="team-name" className="block text-sm font-medium text-gray-700 mb-2">
                              Team Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="team-name"
                              placeholder="e.g., Code Crushers, Data Wizards"
                              value={wizardData.name}
                              onChange={(e) => setWizardData({...wizardData, name: e.target.value})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              required
                            />
                            <p className="mt-1 text-xs text-gray-500">Choose a name that reflects your team's identity and goals.</p>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Team Avatar
                            </label>
                            <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                              {wizardData.avatar ? (
                                <img src={wizardData.avatar} alt="Team Avatar" className="w-full h-full object-cover" />
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              )}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Optional</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-4">
                          <label htmlFor="team-max-members" className="block text-sm font-medium text-gray-700 mb-2">
                            Team Size
                          </label>
                          <div className="flex items-center gap-3">
                            {[2, 3, 4, 5, 6].map(size => (
                              <motion.button
                                key={size}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setWizardData({...wizardData, maxMembers: size})}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                  wizardData.maxMembers === size 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {size}
                              </motion.button>
                            ))}
                          </div>
                          <p className="mt-1 text-xs text-gray-500">Maximum number of team members (including you)</p>
                        </div>
                        
                        <label htmlFor="team-hackathon" className="block text-sm font-medium text-gray-700 mb-2">
                          Hackathon <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="team-hackathon"
                          value={wizardData.hackathon}
                          onChange={(e) => setWizardData({...wizardData, hackathon: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {hackathonOptions.slice(1).map(hackathon => (
                            <option key={hackathon} value={hackathon}>{hackathon}</option>
                          ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Select which hackathon your team is participating in</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 2: Project Details */}
                  {wizardStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">What are you building?</h3>
                        
                        <label htmlFor="team-description" className="block text-sm font-medium text-gray-700 mb-2">
                          Project Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="team-description"
                          rows={6}
                          placeholder="Describe your project idea, goals, and how you plan to implement it..."
                          value={wizardData.description}
                          onChange={(e) => setWizardData({...wizardData, description: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">Be specific but concise. This will help attract the right team members!</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Project Category</h4>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            { name: "Web App", icon: "🌐" },
                            { name: "Mobile App", icon: "📱" },
                            { name: "AI/ML", icon: "🤖" },
                            { name: "Blockchain", icon: "⛓️" },
                            { name: "IoT", icon: "🔌" },
                            { name: "Game", icon: "🎮" },
                          ].map((category) => (
                            <motion.div
                              key={category.name}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className="bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer border border-gray-200"
                              onClick={() => {
                                // This would update a category field if we had one in wizardData
                                // For now it's just an interactive element
                              }}
                            >
                              <div className="flex items-center">
                                <span className="text-2xl mr-3">{category.icon}</span>
                                <span className="text-sm font-medium">{category.name}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 3: Skills Needed */}
                  {wizardStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Skills & Technologies</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Select the skills and technologies your team will be using
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex gap-2 flex-wrap mb-4">
                            {wizardData.skills.map((skill, index) => (
                              <motion.div
                                key={index}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                whileHover={{ scale: 1.05 }}
                                layout
                              >
                                {skill}
                                <button
                                  onClick={() => {
                                    const newSkills = [...wizardData.skills];
                                    newSkills.splice(index, 1);
                                    setWizardData({...wizardData, skills: newSkills});
                                  }}
                                  className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center hover:bg-indigo-300"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </motion.div>
                            ))}
                            {wizardData.skills.length === 0 && (
                              <span className="text-sm text-gray-500 italic">No skills selected yet</span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <select
                              id="skill-select"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="">Select a skill to add...</option>
                              {skillOptions.slice(1).filter(skill => !wizardData.skills.includes(skill)).map(skill => (
                                <option key={skill} value={skill}>{skill}</option>
                              ))}
                            </select>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                              onClick={() => {
                                const select = document.getElementById('skill-select') as HTMLSelectElement;
                                const skill = select.value;
                                if (skill && !wizardData.skills.includes(skill)) {
                                  setWizardData({...wizardData, skills: [...wizardData.skills, skill]});
                                  select.value = '';
                                }
                              }}
                            >
                              Add
                            </motion.button>
                          </div>
                        </div>
                        
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Skills</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            "React", "Node.js", "Python", "Machine Learning", "UI/UX Design", "AWS",
                            "Firebase", "MongoDB", "TypeScript", "Swift", "Flutter", "Blockchain",
                            "Figma", "Unity", "Solidity", "Docker"
                          ].filter(skill => !wizardData.skills.includes(skill)).slice(0, 9).map((skill) => (
                            <motion.button
                              key={skill}
                              type="button"
                              whileHover={{ scale: 1.02, backgroundColor: "#EEF2FF" }}
                              whileTap={{ scale: 0.98 }}
                              className="px-3 py-2 text-sm text-left rounded-lg border border-gray-200 hover:border-indigo-200"
                              onClick={() => {
                                if (!wizardData.skills.includes(skill)) {
                                  setWizardData({...wizardData, skills: [...wizardData.skills, skill]});
                                }
                              }}
                            >
                              + {skill}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 8a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-blue-800 mb-1">Skill Matching</h4>
                            <p className="text-xs text-blue-700">
                              The skills you select will help us match your team with potential members who have complementary skills.
                              Be specific about the technologies and skills required for your project.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 4: Open Positions */}
                  {wizardStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Open Positions</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Define the roles you're looking to fill on your team
                        </p>
                        
                        <div className="space-y-3 mb-4">
                          {wizardData.openRoles.map((role, index) => (
                            <motion.div
                              key={index}
                              layout
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-700">{role}</div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  const newRoles = [...wizardData.openRoles];
                                  newRoles.splice(index, 1);
                                  setWizardData({...wizardData, openRoles: newRoles});
                                }}
                                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                            </motion.div>
                          ))}
                          
                          {wizardData.openRoles.length === 0 && (
                            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                              <div className="flex justify-center mb-2">
                                <UserPlus className="w-8 h-8 text-gray-400" />
                              </div>
                              <h4 className="text-sm font-medium text-gray-600 mb-1">No roles defined yet</h4>
                              <p className="text-xs text-gray-500">Add positions you need to fill on your team</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="new-role"
                            placeholder="e.g. Frontend Developer, UI Designer"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                const input = e.target as HTMLInputElement;
                                if (input.value.trim()) {
                                  setWizardData({
                                    ...wizardData, 
                                    openRoles: [...wizardData.openRoles, input.value.trim()]
                                  });
                                  input.value = '';
                                }
                              }
                            }}
                          />
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                            onClick={() => {
                              const input = document.getElementById('new-role') as HTMLInputElement;
                              if (input.value.trim()) {
                                setWizardData({
                                  ...wizardData, 
                                  openRoles: [...wizardData.openRoles, input.value.trim()]
                                });
                                input.value = '';
                              }
                            }}
                          >
                            <PlusCircle className="w-5 h-5" />
                            Add Position
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Roles</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Frontend Developer", "Backend Developer", "UI/UX Designer", 
                            "Data Scientist", "DevOps Engineer", "Mobile Developer",
                            "Blockchain Developer", "Project Manager", "Full-Stack Developer"
                          ].filter(role => !wizardData.openRoles.includes(role)).map((role) => (
                            <motion.button
                              key={role}
                              type="button"
                              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-indigo-100 hover:text-indigo-700"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (!wizardData.openRoles.includes(role)) {
                                  setWizardData({...wizardData, openRoles: [...wizardData.openRoles, role]});
                                }
                              }}
                            >
                              + {role}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 5: Review & Create */}
                  {wizardStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Review Your Team</h3>
                        
                        <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h2 className="text-xl font-bold text-gray-900">{wizardData.name || "Your Team Name"}</h2>
                                <p className="text-sm text-gray-600">{wizardData.hackathon}</p>
                              </div>
                              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                {wizardData.maxMembers} members max
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-4">
                              {wizardData.description || "Your project description will appear here."}
                            </p>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Skills & Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {wizardData.skills.length > 0 ? wizardData.skills.map((skill, index) => (
                                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                    {skill}
                                  </span>
                                )) : (
                                  <span className="text-sm text-gray-500 italic">No skills selected</span>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Open Positions</h4>
                              <div className="flex flex-wrap gap-2">
                                {wizardData.openRoles.length > 0 ? wizardData.openRoles.map((role, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                    {role}
                                  </span>
                                )) : (
                                  <span className="text-sm text-gray-500 italic">No open positions</span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-100 px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">You</p>
                                <p className="text-xs text-gray-600">Team Creator</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {(!wizardData.name || !wizardData.description) && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-yellow-800">Required fields missing</h4>
                              <p className="text-xs text-yellow-700 mt-1">
                                Please go back and complete the {!wizardData.name && "team name"}
                                {!wizardData.name && !wizardData.description && " and "}
                                {!wizardData.description && "project description"} before creating your team.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Team visibility and preferences */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-3">
                          <input
                            id="team-public" 
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="team-public" className="ml-2 block text-sm text-gray-700">
                            Make team profile public in team discovery
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="team-notify" 
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label htmlFor="team-notify" className="ml-2 block text-sm text-gray-700">
                            Notify me when someone requests to join
                          </label>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Wizard footer with navigation buttons */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-5 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center gap-2 ${wizardStep === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                    onClick={() => {
                      if (wizardStep > 1) {
                        setWizardStep(wizardStep - 1);
                      }
                    }}
                    disabled={wizardStep === 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back
                  </motion.button>
                  
                  {wizardStep < totalSteps ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-5 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700"
                      onClick={() => {
                        setWizardStep(wizardStep + 1);
                      }}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={wizardData.name && wizardData.description ? { scale: 1.02 } : {}}
                      whileTap={wizardData.name && wizardData.description ? { scale: 0.98 } : {}}
                      className={`px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center gap-2 shadow-md
                        ${(!wizardData.name || !wizardData.description) ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
                      onClick={() => {
                        if (wizardData.name && wizardData.description) {
                          // Handle team creation here
                          alert("Team created successfully!");
                          setShowCreateTeamModal(false);
                          setWizardStep(1);
                          setWizardData({
                            name: '',
                            description: '',
                            hackathon: hackathonOptions[1],
                            maxMembers: 4,
                            skills: [],
                            openRoles: [],
                            avatar: ''
                          });
                        }
                      }}
                      disabled={!wizardData.name || !wizardData.description}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Create Team
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {teamsToCompare.length > 0 && (
        <motion.div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.button
            className="bg-white shadow-lg border border-indigo-100 px-4 py-2 rounded-full text-indigo-600 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowComparisonModal(true)}
          >
            Compare {teamsToCompare.length} Teams
          </motion.button>
        </motion.div>
      )}
      {/* Join Team Application - Simple Centered Form */}
{showJoinForm && selectedTeamForJoin && (
  <div 
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={() => setShowJoinForm(false)}
  >
    <div 
      className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-xl p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Join {selectedTeamForJoin.name}</h2>
          <button
            onClick={() => setShowJoinForm(false)}
            className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-5">
        {/* Team info */}
        <div className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedTeamForJoin.gradient} flex items-center justify-center text-white overflow-hidden`}>
            {selectedTeamForJoin.avatar ? (
              <img src={selectedTeamForJoin.avatar} alt={selectedTeamForJoin.name} className="w-full h-full object-cover" />
            ) : (
              <Users className="w-6 h-6" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="font-medium">{selectedTeamForJoin.name}</h3>
            <p className="text-sm text-gray-500">{selectedTeamForJoin.hackathon}</p>
          </div>
        </div>
        
        {/* Open positions */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Available positions:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTeamForJoin.openRoles.map((role: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                {role}
              </span>
            ))}
          </div>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          alert(`Your request to join ${selectedTeamForJoin.name} has been sent!`);
          setShowJoinForm(false);
          setJoinFormData({
            name: '',
            email: '',
            eligibility: ''
          });
        }}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={joinFormData.name}
              onChange={(e) => setJoinFormData({...joinFormData, name: e.target.value})}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={joinFormData.email}
              onChange={(e) => setJoinFormData({...joinFormData, email: e.target.value})}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">
              Why do you want to join this team? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="eligibility"
              rows={3}
              value={joinFormData.eligibility}
              onChange={(e) => setJoinFormData({...joinFormData, eligibility: e.target.value})}
              placeholder="Describe your skills and why you'd be a good fit for this team..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setShowJoinForm(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={!joinFormData.name || !joinFormData.email || !joinFormData.eligibility}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Teams;