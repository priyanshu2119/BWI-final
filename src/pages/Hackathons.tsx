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
  },
  {
    id: 13,
    title: 'Quantum Computing Challenge',
    date: 'November 8-10, 2024',
    registrationDeadline: 'October 25, 2024',
    participants: '150+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-indigo-800 to-violet-900',
    category: 'Quantum',
    prizePool: '$30,000',
    skillLevel: 'Advanced',
    description: 'Explore the frontiers of quantum computing and develop innovative algorithms that leverage quantum principles.',
    featured: false,
    status: 'upcoming',
    rating: 4.9,
    sponsors: ['QuantumTech', 'QBits', 'Entangle Systems'],
    teamSize: '2-4'
  },
  {
    id: 14,
    title: 'Social Impact Hackathon',
    date: 'December 1-3, 2024',
    registrationDeadline: 'November 20, 2024',
    participants: '400+',
    location: 'Hybrid - London & Virtual',
    image: 'https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-sky-600 to-cyan-700',
    category: 'Social',
    prizePool: '$15,000',
    skillLevel: 'All Levels',
    description: 'Build solutions that address pressing social issues and contribute to creating a more equitable and sustainable world.',
    featured: false,
    status: 'upcoming',
    rating: 4.6,
    sponsors: ['GlobalGood', 'SocialVentures', 'ImpactNow'],
    teamSize: '2-5'
  },
  {
    id: 15,
    title: 'Space Tech Innovation',
    date: 'January 20-22, 2025',
    registrationDeadline: 'January 10, 2025',
    participants: '250+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-gray-800 to-blue-900',
    category: 'Space',
    prizePool: '$40,000',
    skillLevel: 'Intermediate',
    description: 'Develop cutting-edge solutions for space exploration, satellite technology, and interplanetary travel.',
    featured: false,
    status: 'upcoming',
    rating: 4.9,
    sponsors: ['SpaceX', 'OrbitTech', 'StarNav'],
    teamSize: '2-4'
  },
  {
    id: 16,
    title: 'Robotics Challenge',
    date: 'February 15-17, 2025',
    registrationDeadline: 'February 1, 2025',
    participants: '200+',
    location: 'Hybrid - Tokyo & Virtual',
    image: 'https://images.unsplash.com/photo-1561152820-340780bc049e?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-gray-700 to-stone-900',
    category: 'Robotics',
    prizePool: '$25,000',
    skillLevel: 'Advanced',
    description: 'Build and program robots to solve complex challenges in logistics, manufacturing, and everyday life.',
    featured: false,
    status: 'upcoming',
    rating: 4.7,
    sponsors: ['RoboInc', 'MechMinds', 'AutomateNow'],
    teamSize: '2-5'
  },
  {
    id: 17,
    title: 'Metaverse Design Sprint',
    date: 'March 5-7, 2025',
    registrationDeadline: 'February 20, 2025',
    participants: '300+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-pink-700 to-purple-900',
    category: 'Metaverse',
    prizePool: '$20,000',
    skillLevel: 'Intermediate',
    description: 'Create immersive metaverse experiences that redefine how we interact, work, and play in virtual environments.',
    featured: false,
    status: 'upcoming',
    rating: 4.5,
    sponsors: ['MetaCorp', 'VirtualWorlds', 'ImmersiveX'],
    teamSize: '2-4'
  },
  {
    id: 18,
    title: 'Blockchain for Social Good',
    date: 'January 10-12, 2025',
    registrationDeadline: 'December 25, 2024',
    participants: '250+',
    location: 'Virtual',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800',
    gradient: 'bg-gradient-to-br from-blue-800 to-blue-950',
    category: 'Blockchain',
    prizePool: '$18,000',
    skillLevel: 'All Levels',
    description: 'Leverage blockchain technology to create solutions for social challenges like transparency, identity, and financial inclusion.',
    featured: true,
    status: 'upcoming',
    rating: 4.8,
    sponsors: ['ChainImpact', 'BlockGood', 'CryptoForAll'],
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

        {/* Active Hackathons with Countdown */}
        {activeHackathons.length > 0 && !showFavoritesOnly && selectedStatus !== 'Past' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Happening Now
              </h2>
              <Link to="/hackathons/active" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View all active
              </Link>
            </div>
            
            {/* Live hackathon cards with activity indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeHackathons.slice(0, 2).map(hackathon => (
                <motion.div
                  key={`active-${hackathon.id}`}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex h-full">
                    <div className="w-1/3 relative">
                      <img 
                        src={hackathon.image} 
                        alt={hackathon.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 opacity-60 ${hackathon.gradient}`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
                          <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">
                            LIVE
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-2/3 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                            <span className="text-xs text-gray-500 ml-2">Ends in {Math.floor(Math.random() * 10) + 1} days</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{hackathon.title}</h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{hackathon.description}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-gray-100 p-2 rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(hackathon.id);
                          }}
                        >
                          <Heart 
                            className={`w-5 h-5 ${favoriteHackathons.includes(hackathon.id) ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} 
                          />
                        </motion.button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{hackathon.prizePool}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{hackathon.participants}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="inline-flex gap-1">
                          <span className="animate-ping absolute h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative rounded-full h-2 w-2 bg-red-500"></span>
                          <span className="text-xs text-gray-500">{120 + Math.floor(Math.random() * 50)} people active</span>
                        </div>
                        <Link to={`/hackathon/${hackathon.id}`} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Join Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Hackathon Listing with Enhanced Cards */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory !== 'All' ? selectedCategory : showFavoritesOnly ? 'Your Favorites' : 'All Hackathons'}
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Sort by:</span>
              <select className="border-none bg-transparent focus:ring-0 cursor-pointer">
                <option>Date (Newest)</option>
                <option>Prize Pool</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(hackathon => (
              <motion.div
                key={`grid-${hackathon.id}`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 group"
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(hackathon.id);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favoriteHackathons.includes(hackathon.id) ? 'fill-amber-500 text-amber-500' : 'text-gray-600'}`} 
                      />
                    </motion.button>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 left-4">
                    {hackathon.status === 'active' ? (
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md font-medium inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                        Live Now
                      </span>
                    ) : hackathon.status === 'upcoming' ? (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium inline-flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Upcoming
                      </span>
                    ) : (
                      <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md font-medium inline-flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Past
                      </span>
                    )}
                  </div>
                  
                  <img 
                    src={hackathon.image} 
                    alt={hackathon.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  
                  {/* Countdown for upcoming hackathons */}
                  {hackathon.status === 'upcoming' && getDaysUntil(hackathon.registrationDeadline) !== null && (
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">
                          Registration closes in {getDaysUntil(hackathon.registrationDeadline)} days
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      hackathon.category === 'AI/ML' ? 'bg-blue-100 text-blue-700' :
                      hackathon.category === 'Blockchain' ? 'bg-purple-100 text-purple-700' :
                      hackathon.category === 'Sustainability' ? 'bg-green-100 text-green-700' :
                      hackathon.category === 'Mobile' ? 'bg-orange-100 text-orange-700' :
                      hackathon.category === 'Health' ? 'bg-emerald-100 text-emerald-700' :
                      hackathon.category === 'Gaming' ? 'bg-violet-100 text-violet-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {hackathon.category}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{hackathon.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{hackathon.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{hackathon.description}</p>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block mb-1">Prize</span>
                        <span className="text-sm font-bold text-gray-900">{hackathon.prizePool}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block mb-1">Team Size</span>
                        <span className="text-sm font-bold text-gray-900">{hackathon.teamSize}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block mb-1">Participants</span>
                        <span className="text-sm font-bold text-gray-900">{hackathon.participants}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1" />
                        {hackathon.location}
                      </span>
                      <Link 
                        to={`/hackathon/${hackathon.id}`} 
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Add map view - a placeholder for now */
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-[500px] relative">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Map className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Map view coming soon!</p>
                <p className="text-sm mt-2">Browse hackathons by location</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Quick Apply floating button */}
        <motion.div 
          className="fixed bottom-8 right-8 z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-4 rounded-full shadow-lg font-bold flex items-center"
          >
            <span className="mr-2">Quick Apply</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Empty state for no results */}
        {filteredHackathons.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-indigo-500 opacity-70" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hackathons found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any hackathons matching your current filters. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedSkillLevel('All Levels');
                setSelectedStatus('All');
                setShowFavoritesOnly(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hackathons;