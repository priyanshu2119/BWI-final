import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';

const hackathons = [
  {
    id: 1,
    title: 'AI Innovation Challenge',
    date: 'March 15-17, 2024',
    participants: '500+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    category: 'AI/ML',
    prizePool: '$10,000',
    skillLevel: 'All Levels',
    description: 'Join the AI Innovation Challenge and build cutting-edge solutions that leverage artificial intelligence and machine learning to solve real-world problems.'
  },
  {
    id: 2,
    title: 'Web3 Builders Hackathon',
    date: 'April 5-7, 2024',
    participants: '300+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
    category: 'Blockchain',
    prizePool: '$15,000',
    skillLevel: 'Intermediate',
    description: 'Create the next generation of decentralized applications using blockchain technology and Web3 frameworks.'
  },
  {
    id: 3,
    title: 'Green Tech Summit',
    date: 'April 20-22, 2024',
    participants: '400+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-green-600 to-teal-600',
    category: 'Sustainability',
    prizePool: '$12,000',
    skillLevel: 'Beginner Friendly',
    description: 'Build innovative solutions for environmental challenges and contribute to a more sustainable future.'
  }
];

const categories = ['All', 'AI/ML', 'Blockchain', 'Sustainability', 'Web Development', 'Mobile'];
const skillLevels = ['All Levels', 'Beginner Friendly', 'Intermediate', 'Advanced'];

const Hackathons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hackathon.category === selectedCategory;
    const matchesSkillLevel = selectedSkillLevel === 'All Levels' || hackathon.skillLevel === selectedSkillLevel;
    
    return matchesSearch && matchesCategory && matchesSkillLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-900 h-72">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Hackathons
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-3xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find exciting hackathons, build amazing projects, and connect with like-minded innovators.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-10">
        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search hackathons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
                    <select
                      value={selectedSkillLevel}
                      onChange={(e) => setSelectedSkillLevel(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hackathons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map((hackathon) => (
              <motion.div
                key={hackathon.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100 ${hackathon.gradient}`}></div>
                
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                      {hackathon.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{hackathon.title}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{hackathon.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{hackathon.participants} Participants</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{hackathon.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      Prize Pool: {hackathon.prizePool}
                    </span>
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      {hackathon.skillLevel}
                    </span>
                  </div>

                  <Link to={`/hackathon/${hackathon.id}`}>
                    <motion.button 
                      className="mt-4 w-full px-4 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-100 p-4 rounded-full mb-4"
              >
                <Calendar className="w-8 h-8 text-gray-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Hackathons Found</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                We couldn't find any hackathons matching your search criteria. Try adjusting your filters or come back later.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedSkillLevel('All Levels');
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hackathons;