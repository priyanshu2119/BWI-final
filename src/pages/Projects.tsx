import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Code, 
  Github, 
  ExternalLink,
  Heart,
  Share2,
  MessageSquare,
  Award,
  ChevronRight,
  Hash,
  Bookmark,
  Eye,
  ThumbsUp
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "AI-Powered Health Assistant",
    description: "An intelligent virtual health assistant that uses machine learning to provide personalized health recommendations and medication reminders.",
    technologies: ["Python", "TensorFlow", "React Native", "Firebase"],
    hackathon: "AI Innovation Challenge",
    teamName: "Code Crushers",
    teamSize: 4,
    likes: 127,
    views: 3240,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/ai-health",
    repoUrl: "https://github.com/example/ai-health",
    featured: true,
    winner: true,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    id: 2,
    title: "Decentralized Creator Marketplace",
    description: "A blockchain-based platform where digital creators can sell their work directly to consumers without intermediaries, using smart contracts for royalties.",
    technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
    hackathon: "Web3 Builders Hackathon",
    teamName: "Blockchain Builders",
    teamSize: 3,
    likes: 89,
    views: 1852,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/creator-market",
    repoUrl: "https://github.com/example/creator-market",
    featured: true,
    winner: false,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    id: 3,
    title: "EcoTrack: Sustainability Monitor",
    description: "A comprehensive dashboard for small businesses to track, visualize, and improve their environmental impact across various metrics.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    hackathon: "Green Tech Summit",
    teamName: "Green Innovators",
    teamSize: 4,
    likes: 103,
    views: 2180,
    image: "https://images.unsplash.com/photo-1623227773881-29d273c0897b?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/eco-track",
    repoUrl: "https://github.com/example/eco-track",
    featured: false,
    winner: true,
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: 4,
    title: "DevOps Pipeline Automator",
    description: "A tool that automates CI/CD workflows for cloud-native applications, optimizing deployment processes and reducing operational overhead.",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
    hackathon: "Cloud Innovation Hackathon",
    teamName: "DevOps Dynamos",
    teamSize: 2,
    likes: 76,
    views: 1425,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/pipeline-auto",
    repoUrl: "https://github.com/example/pipeline-auto",
    featured: false,
    winner: false,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 5,
    title: "Community Volunteer Connect",
    description: "A mobile app connecting volunteers with local community service opportunities, featuring real-time notifications and impact tracking.",
    technologies: ["React Native", "Firebase", "Google Maps API"],
    hackathon: "Mobile App Challenge",
    teamName: "Mobile Mavericks",
    teamSize: 3,
    likes: 94,
    views: 1680,
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/volunteer-connect",
    repoUrl: "https://github.com/example/volunteer-connect",
    featured: false,
    winner: true,
    gradient: "from-orange-500 to-red-600"
  },
  {
    id: 6,
    title: "Urban Transit Optimizer",
    description: "A data-driven solution to optimize urban transportation routes and schedules based on historical and real-time traffic data.",
    technologies: ["Python", "TensorFlow", "PostgreSQL", "Mapbox"],
    hackathon: "Smart Cities Hackathon",
    teamName: "Data Wizards",
    teamSize: 4,
    likes: 65,
    views: 1240,
    image: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&q=80&w=800",
    demoUrl: "https://demo.example.com/transit-optimizer",
    repoUrl: "https://github.com/example/transit-optimizer",
    featured: false,
    winner: false,
    gradient: "from-yellow-500 to-amber-600"
  }
];

const techOptions = [
  "All Technologies",
  "Python",
  "TensorFlow",
  "React",
  "React Native",
  "Firebase",
  "Solidity",
  "Ethereum",
  "Web3.js",
  "D3.js",
  "Node.js",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "GitHub Actions",
  "AWS",
  "Google Maps API",
  "PostgreSQL",
  "Mapbox"
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

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All Technologies');
  const [selectedHackathon, setSelectedHackathon] = useState('All Hackathons');
  const [onlyWinners, setOnlyWinners] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState<number[]>([]);
  const [savedProjects, setSavedProjects] = useState<number[]>([]);
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesTech = selectedTech === 'All Technologies' || 
                       project.technologies.includes(selectedTech);
                       
    const matchesHackathon = selectedHackathon === 'All Hackathons' || 
                            project.hackathon === selectedHackathon;
                            
    const matchesWinners = !onlyWinners || project.winner;
    
    return matchesSearch && matchesTech && matchesHackathon && matchesWinners;
  });

  const handleLikeProject = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSaveProject = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    setSavedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-800 to-violet-900 h-64">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl"></div>
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Innovative Projects
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore projects created at hackathons around the world. Get inspired, learn from others,
            and see what's possible when creative minds collaborate.
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
                placeholder="Search projects..."
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
                {isFilterOpen ? 
                  <ChevronRight className="w-4 h-4 transform rotate-90" /> :
                  <ChevronRight className="w-4 h-4" />
                }
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technology</label>
                    <select
                      value={selectedTech}
                      onChange={(e) => setSelectedTech(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {techOptions.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
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
                      id="winners-only"
                      type="checkbox"
                      checked={onlyWinners}
                      onChange={() => setOnlyWinners(!onlyWinners)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <label htmlFor="winners-only" className="ml-2 text-gray-700">
                      Show winning projects only
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Featured Projects */}
        {filteredProjects.some(project => project.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects
                .filter(project => project.featured)
                .map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90 md:opacity-100`}></div>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover mix-blend-overlay md:mix-blend-normal"
                        />
                        {project.winner && (
                          <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            Winner
                          </div>
                        )}
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <motion.span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center"
                                whileHover={{ scale: 1.05 }}
                              >
                                <Hash className="w-3 h-3 mr-1" />
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="text-sm text-gray-500 mb-3 md:mb-0">
                            <span className="mr-4">Team: {project.teamName} ({project.teamSize} members)</span>
                            <span>{project.hackathon}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="flex items-center text-gray-500 text-sm mr-3">
                              <Eye className="w-4 h-4 mr-1" />
                              {project.views}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {project.likes + (likedProjects.includes(project.id) ? 1 : 0)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a 
                            href={project.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                          
                          <motion.button
                            onClick={(e) => handleLikeProject(e, project.id)}
                            className={`p-2 rounded-lg flex items-center ${
                              likedProjects.includes(project.id) 
                                ? 'text-red-500' 
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className={`w-5 h-5 ${likedProjects.includes(project.id) ? 'fill-red-500' : ''}`} />
                          </motion.button>
                          
                          <motion.button
                            onClick={(e) => handleSaveProject(e, project.id)}
                            className={`p-2 rounded-lg flex items-center ${
                              savedProjects.includes(project.id) 
                                ? 'text-indigo-500' 
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Bookmark className={`w-5 h-5 ${savedProjects.includes(project.id) ? 'fill-indigo-500' : ''}`} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects
              .filter(project => !project.featured)
              .map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`}></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover mix-blend-overlay"
                    />
                    {project.winner && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        Winner
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.button
                        onClick={(e) => handleLikeProject(e, project.id)}
                        className={`p-2 rounded-full backdrop-blur-sm ${
                          likedProjects.includes(project.id) 
                            ? 'bg-white/30 text-red-500' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className={`w-5 h-5 ${likedProjects.includes(project.id) ? 'fill-red-500' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        onClick={(e) => handleSaveProject(e, project.id)}
                        className={`p-2 rounded-full backdrop-blur-sm ${
                          savedProjects.includes(project.id) 
                            ? 'bg-white/30 text-indigo-500' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className={`w-5 h-5 ${savedProjects.includes(project.id) ? 'fill-indigo-500' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <motion.span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full flex items-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Hash className="w-3 h-3 mr-1" />
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{project.hackathon}</span>
                      <div className="flex gap-3">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {project.views}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {project.likes + (likedProjects.includes(project.id) ? 1 : 0)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <a 
                        href={project.demoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg flex items-center justify-center gap-1 text-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </a>
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-100 p-4 rounded-full mb-4"
            >
              <Code className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Found</h3>
            <p className="text-gray-600 text-center max-w-md mb-6">
              We couldn't find any projects matching your search criteria. Try adjusting your filters or come back later.
            </p>
            <motion.button
              onClick={() => {
                setSearchQuery('');
                setSelectedTech('All Technologies');
                setSelectedHackathon('All Hackathons');
                setOnlyWinners(false);
              }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear All Filters
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Submit Project CTA */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-800 mt-12">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Showcase Your Project
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Share your hackathon project with the community. Get feedback, recognition,
              and connect with potential collaborators or employers.
            </motion.p>
            <motion.button
              className="px-8 py-3 bg-white text-indigo-700 rounded-full font-semibold hover:shadow-lg inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Submit Your Project
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;