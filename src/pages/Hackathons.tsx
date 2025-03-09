import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  MapPin, 
  ChevronRight,
  Star,
  Clock,
  Globe,
  Award,
  BookOpen,
  Tag,
  TrendingUp,
  Bell,
  Heart,
  Map
} from 'lucide-react';

// Enhanced hackathon data with more variety and options
const hackathons = [
  {
    id: 1,
    title: 'AI Innovation Challenge',
    date: 'March 15-17, 2024',
    registrationDeadline: 'March 10, 2024',
    participants: '500+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    category: 'AI/ML',
    prizePool: '$10,000',
    skillLevel: 'All Levels',
    description: 'Join the AI Innovation Challenge and build cutting-edge solutions that leverage artificial intelligence and machine learning to solve real-world problems.',
    featured: true,
    status: 'upcoming',
    rating: 4.8,
    sponsors: ['TechCorp', 'AI Solutions', 'CloudNet'],
    teamSize: '1-4'
  },
  {
    id: 2,
    title: 'Web3 Builders Hackathon',
    date: 'April 5-7, 2024',
    registrationDeadline: 'March 25, 2024',
    participants: '300+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
    category: 'Blockchain',
    prizePool: '$15,000',
    skillLevel: 'Intermediate',
    description: 'Create the next generation of decentralized applications using blockchain technology and Web3 frameworks.',
    featured: false,
    status: 'upcoming',
    rating: 4.6,
    sponsors: ['CryptoVentures', 'BlockChain Inc', 'DecentraWeb'],
    teamSize: '2-5'
  },
  {
    id: 3,
    title: 'Green Tech Summit',
    date: 'April 20-22, 2024',
    registrationDeadline: 'April 10, 2024',
    participants: '400+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-green-600 to-teal-600',
    category: 'Sustainability',
    prizePool: '$12,000',
    skillLevel: 'Beginner Friendly',
    description: 'Build innovative solutions for environmental challenges and contribute to a more sustainable future.',
    featured: false,
    status: 'upcoming',
    rating: 4.5,
    sponsors: ['EcoInnovate', 'GreenFuture', 'SustainTech'],
    teamSize: '1-4'
  },
  {
    id: 4,
    title: 'Mobile App Development Sprint',
    date: 'May 12-14, 2024',
    registrationDeadline: 'May 1, 2024',
    participants: '250+',
    location: 'Hybrid - New York & Virtual',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    category: 'Mobile',
    prizePool: '$8,000',
    skillLevel: 'Intermediate',
    description: 'Design and develop innovative mobile applications that solve real-world problems and enhance user experiences.',
    featured: false,
    status: 'upcoming',
    rating: 4.3,
    sponsors: ['AppFactory', 'MobileFirst', 'DevStudio'],
    teamSize: '2-4'
  },
  {
    id: 5,
    title: 'Health Tech Innovation',
    date: 'June 8-10, 2024',
    registrationDeadline: 'May 25, 2024',
    participants: '350+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
    category: 'Health',
    prizePool: '$20,000',
    skillLevel: 'All Levels',
    description: 'Create innovative solutions for healthcare challenges using technology to improve patient outcomes and healthcare delivery.',
    featured: true,
    status: 'upcoming',
    rating: 4.7,
    sponsors: ['HealthCare Plus', 'MediTech', 'BioInnovate'],
    teamSize: '2-5'
  },
  {
    id: 6,
    title: 'Game Development Challenge',
    date: 'Currently Active',
    registrationDeadline: 'Closed',
    endDate: 'March 20, 2024',
    participants: '420+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1556438064-2d7638ffa026?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-violet-600 to-fuchsia-600',
    category: 'Gaming',
    prizePool: '$15,000',
    skillLevel: 'All Levels',
    description: 'Design and develop engaging games with compelling gameplay and storylines using the latest technologies.',
    featured: false,
    status: 'active',
    rating: 4.9,
    sponsors: ['GameStudio', 'PlayTech', 'DigitalWorlds'],
    teamSize: '1-5'
  },
  {
    id: 7,
    title: 'Cloud Computing Innovations',
    date: 'Currently Active',
    registrationDeadline: 'Closed',
    endDate: 'March 25, 2024',
    participants: '280+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    category: 'Cloud',
    prizePool: '$18,000',
    skillLevel: 'Advanced',
    description: 'Develop innovative cloud-based solutions that leverage serverless architectures, containers, and microservices.',
    featured: false,
    status: 'active',
    rating: 4.5,
    sponsors: ['CloudCo', 'ServerlessInc', 'MicroCloud'],
    teamSize: '2-4'
  },
  {
    id: 8,
    title: 'Education Technology Hackathon',
    date: 'July 15-17, 2024',
    registrationDeadline: 'July 1, 2024',
    participants: '200+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    category: 'Education',
    prizePool: '$10,000',
    skillLevel: 'Beginner Friendly',
    description: 'Create innovative solutions for education challenges, from learning platforms to classroom tools and assessment systems.',
    featured: false,
    status: 'upcoming',
    rating: 4.3,
    sponsors: ['EduTech', 'LearnCo', 'SchoolSolutions'],
    teamSize: '1-4'
  },
  {
    id: 9,
    title: 'Smart Cities Hackathon',
    date: 'August 5-7, 2024',
    registrationDeadline: 'July 20, 2024',
    participants: '300+',
    location: 'Hybrid - San Francisco & Virtual',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-cyan-600 to-blue-700',
    category: 'IoT',
    prizePool: '$25,000',
    skillLevel: 'Intermediate',
    description: 'Design and develop solutions that make cities smarter, more efficient, and more sustainable using IoT technologies.',
    featured: true,
    status: 'upcoming',
    rating: 4.7,
    sponsors: ['SmartCityCo', 'UrbanTech', 'ConnectedLife'],
    teamSize: '2-5'
  },
  {
    id: 10,
    title: 'Financial Technology Challenge',
    date: 'September 10-12, 2024',
    registrationDeadline: 'August 25, 2024',
    participants: '350+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    category: 'FinTech',
    prizePool: '$30,000',
    skillLevel: 'Advanced',
    description: 'Create innovative fintech solutions that address challenges in payments, banking, investing, and financial inclusion.',
    featured: false,
    status: 'upcoming',
    rating: 4.6,
    sponsors: ['FinCorp', 'BankTech', 'PayInnovate'],
    teamSize: '2-4'
  },
  {
    id: 11,
    title: 'AR/VR Innovation Challenge',
    date: 'Currently Active',
    registrationDeadline: 'Closed',
    endDate: 'March 18, 2024',
    participants: '200+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1626379953819-c1bf4b2d62cc?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    category: 'AR/VR',
    prizePool: '$15,000',
    skillLevel: 'Intermediate',
    description: 'Build immersive experiences using augmented and virtual reality technologies that solve problems or create new possibilities.',
    featured: false,
    status: 'active',
    rating: 4.8,
    sponsors: ['RealityLabs', 'ImmerseTech', 'VirtualSolutions'],
    teamSize: '2-4'
  },
  {
    id: 12,
    title: 'Cybersecurity Challenge',
    date: 'October 15-17, 2024',
    registrationDeadline: 'October 1, 2024',
    participants: '250+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-slate-700 to-gray-900',
    category: 'Security',
    prizePool: '$20,000',
    skillLevel: 'Advanced',
    description: 'Develop solutions to cybersecurity challenges, from secure authentication to threat detection and privacy protection.',
    featured: false,
    status: 'upcoming',
    rating: 4.5,
    sponsors: ['SecureTech', 'CyberDefense', 'SafeNet'],
    teamSize: '1-4'
  }
];

const categories = ['All', 'AI/ML', 'Blockchain', 'Sustainability', 'Web Development', 'Mobile', 'Health', 'Gaming', 'Cloud', 'Education', 'IoT', 'FinTech', 'AR/VR', 'Security'];
const skillLevels = ['All Levels', 'Beginner Friendly', 'Intermediate', 'Advanced'];
const statusOptions = ['All', 'Active', 'Upcoming', 'Past'];

const Hackathons = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState('grid'); // 'grid' or 'map'
  const [favoriteHackathons, setFavoriteHackathons] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  // Simulated loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Interface for hackathon ID type
  interface HackathonId {
    id: number;
  }

  // Type for the favorite hackathons array
  type FavoriteHackathons = number[];

  // Typed function to toggle favorites
  const toggleFavorite = (id: number): void => {
    if (favoriteHackathons.includes(id)) {
      setFavoriteHackathons(favoriteHackathons.filter(hackId => hackId !== id));
    } else {
      setFavoriteHackathons([...favoriteHackathons, id]);
    }
  };

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hackathon.category === selectedCategory;
    const matchesSkillLevel = selectedSkillLevel === 'All Levels' || hackathon.skillLevel === selectedSkillLevel;
    const matchesStatus = selectedStatus === 'All' || hackathon.status === selectedStatus.toLowerCase();
    const matchesFavorite = !showFavoritesOnly || favoriteHackathons.includes(hackathon.id);
    
    return matchesSearch && matchesCategory && matchesSkillLevel && matchesStatus && matchesFavorite;
  });

  // Get featured hackathons
  const featuredHackathons = hackathons.filter(h => h.featured).slice(0, 3);
  
  // Get active hackathons
  const activeHackathons = hackathons.filter(h => h.status === 'active');

  // Calculate days until registration deadline
  // Interface for date string parameter
  interface DateStringParam {
    dateString: string;
  }

  // Typed function to calculate days until a date
  const getDaysUntil = (dateString: string): number | null => {
    if (dateString === 'Closed') return null;
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner with enhanced animation and depth */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-900 h-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <motion.div 
            className="absolute left-1/4 top-1/3 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 8,
              ease: "easeInOut"
            }}
          />
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
          
          {/* Quick stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-white/90">{activeHackathons.length} Active Hackathons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <span className="text-white/90">$175,000+ in Total Prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
              <span className="text-white/90">3,500+ Participants</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-10">
        {/* Search and Filter Section with enhanced functionality */}
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
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${showFavoritesOnly ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-gray-200 hover:bg-gray-50'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-amber-500 text-amber-500' : ''}`} />
                Favorites
                {favoriteHackathons.length > 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {favoriteHackathons.length}
                  </span>
                )}
              </motion.button>
              
              <div className="flex bg-gray-100 rounded-lg">
                <motion.button
                  onClick={() => setView('grid')}
                  className={`px-3 py-2 rounded-lg ${view === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  whileHover={view !== 'grid' ? { backgroundColor: '#f3f4f6' } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={() => setView('map')}
                  className={`px-3 py-2 rounded-lg ${view === 'map' ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  whileHover={view !== 'map' ? { backgroundColor: '#f3f4f6' } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  <Map className="w-5 h-5" />
                </motion.button>
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
          </div>

          {/* Category quick filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.slice(0, 8).map(category => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category 
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {category}
              </motion.button>
            ))}
            {categories.length > 8 && (
              <motion.button
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsFilterOpen(true)}
              >
                + More
              </motion.button>
            )}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Featured Hackathons Carousel */}
        {!showFavoritesOnly && searchQuery === '' && selectedCategory === 'All' && selectedStatus === 'All' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="w-5 h-5 mr-2 text-amber-500" />
                Featured Hackathons
              </h2>
              <Link to="/hackathons/featured" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View all featured
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredHackathons.map((hackathon) => (
                <motion.div
                  key={`featured-${hackathon.id}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className={`absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100 ${hackathon.gradient}`}></div>
                  
                  <img
                    src={hackathon.image}
                    alt={hackathon.title}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                          {hackathon.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2">{hackathon.title}</h3>
                        <p className="text-white/90 text-sm line-clamp-2 mb-4">{hackathon.description}</p>
                        
                        <div className="flex items-center gap-4 text-white/90 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{hackathon.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            <span>{hackathon.prizePool}</span>
                          </div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(hackathon.id);
                        }}
                      >
                        <Heart 
                          className={`w-5 h-5 ${favoriteHackathons.includes(hackathon.id) ? 'fill-white text-white' : 'text-white'}`} 
                        />
                      </motion.button>
                    </div>
                    
                    <div className="mt-6 flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${hackathon.gradient.replace('bg-gradient-to-br', 'bg')}`}></div>
                        ))}
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs">
                          +{parseInt(hackathon.participants) - 3}
                        </div>
                      </div>
                      
                      <Link to={`/hackathon/${hackathon.id}`} className="bg-white/90 hover:bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;