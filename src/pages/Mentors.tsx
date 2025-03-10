import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  Calendar, 
  Award, 
  MessageSquare,
  Star,
  Clock,
  BookOpen,
  Briefcase,
  Globe,
  X,
  ChevronRight,
  Hash,
  UserPlus
} from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Senior AI Researcher",
    company: "Tech Innovations Inc.",
    expertise: ["Machine Learning", "Computer Vision", "Natural Language Processing"],
    bio: "Dr. Chen has over 15 years of experience in AI and machine learning. She has published numerous research papers and has worked on cutting-edge AI projects for Fortune 500 companies.",
    availability: "Weekdays, 6-8 PM EST",
    languages: ["English", "Mandarin"],
    rating: 4.9,
    reviews: 27,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Senior Software Engineer",
    company: "CloudStack Systems",
    expertise: ["Cloud Architecture", "DevOps", "Kubernetes", "AWS"],
    bio: "Michael specializes in building scalable cloud infrastructure and CI/CD pipelines. He has helped numerous startups set up their cloud architecture from scratch.",
    availability: "Weekends, flexible hours",
    languages: ["English", "Spanish"],
    rating: 4.8,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Jessica Wang",
    role: "Product Design Lead",
    company: "DesignFirst",
    expertise: ["UI/UX Design", "Design Thinking", "Prototyping", "User Research"],
    bio: "Jessica is a design leader with expertise in creating intuitive and engaging user experiences. She has mentored dozens of designers and product teams at hackathons.",
    availability: "Tuesday & Thursday evenings",
    languages: ["English"],
    rating: 5.0,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: 4,
    name: "Raj Patel",
    role: "Blockchain Developer",
    company: "Decentral Systems",
    expertise: ["Blockchain", "Smart Contracts", "Solidity", "Web3"],
    bio: "Raj is a blockchain expert who has built several DeFi platforms and NFT marketplaces. He loves helping newcomers understand blockchain technology and its applications.",
    availability: "Weekends and evenings",
    languages: ["English", "Hindi"],
    rating: 4.7,
    reviews: 14,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 5,
    name: "Emily Johnson",
    role: "Backend Engineer",
    company: "ServerStack",
    expertise: ["Node.js", "Python", "Database Design", "API Architecture"],
    bio: "Emily specializes in building robust backend systems and APIs. She has extensive experience with microservices architecture and database optimization.",
    availability: "Monday & Wednesday evenings",
    languages: ["English"],
    rating: 4.6,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 6,
    name: "David Kim",
    role: "Frontend Engineer",
    company: "UX Dynamics",
    expertise: ["React", "Vue.js", "TypeScript", "Responsive Design"],
    bio: "David is passionate about creating beautiful, performant frontend applications. He has mentored numerous teams in past hackathons to success.",
    availability: "Flexible schedule",
    languages: ["English", "Korean"],
    rating: 4.9,
    reviews: 17,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 7,
    name: "Dr. Aisha Patel",
    role: "Data Science Director",
    company: "DataInsight Labs",
    expertise: ["Data Science", "Big Data", "Machine Learning", "Statistical Analysis"],
    bio: "Dr. Patel leads data science initiatives for Fortune 500 companies with 12+ years of experience. She specializes in turning complex data into actionable business insights.",
    availability: "Weekends, morning hours",
    languages: ["English", "Hindi", "Gujarati"],
    rating: 4.9,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    gradient: "from-teal-500 to-emerald-500"
  },
  {
    id: 8,
    name: "Thomas Wright",
    role: "Game Development Lead",
    company: "Pixel Studios",
    expertise: ["Unity3D", "Game Design", "3D Modeling", "C#"],
    bio: "Thomas has shipped over 15 successful games across multiple platforms. He's passionate about mentoring new game developers and sharing industry best practices.",
    availability: "Tuesday & Friday evenings",
    languages: ["English", "German"],
    rating: 4.7,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    gradient: "from-blue-500 to-violet-500"
  },
  {
    id: 9,
    name: "Maria Rodriguez",
    role: "Security Engineer",
    company: "CyberShield",
    expertise: ["Cybersecurity", "Penetration Testing", "Network Security", "Ethical Hacking"],
    bio: "Maria is a certified ethical hacker with expertise in identifying and mitigating security vulnerabilities. She's helped secure systems for major financial institutions.",
    availability: "Weekdays, evening hours",
    languages: ["English", "Spanish", "Portuguese"],
    rating: 5.0,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&q=80&w=200",
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: 10,
    name: "Wei Zhang",
    role: "Mobile Architecture Specialist",
    company: "AppFusion",
    expertise: ["iOS Development", "Swift", "Android", "Kotlin", "React Native"],
    bio: "Wei has architected mobile applications used by millions of users globally. He specializes in cross-platform development and optimizing app performance.",
    availability: "Weekends and Thursday evenings",
    languages: ["English", "Mandarin", "Cantonese"],
    rating: 4.8,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    id: 11,
    name: "Sophia Lee",
    role: "AR/VR Innovation Lead",
    company: "Immersive Future",
    expertise: ["Augmented Reality", "Virtual Reality", "Unity3D", "3D Modeling"],
    bio: "Sophia is pioneering AR/VR applications for education and training. She's worked on cutting-edge projects for major tech companies and loves mentoring future XR developers.",
    availability: "Flexible schedule",
    languages: ["English", "Korean"],
    rating: 4.9,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 12,
    name: "Jamal Washington",
    role: "DevOps Architect",
    company: "CloudScale Systems",
    expertise: ["DevOps", "AWS", "Kubernetes", "Terraform", "CI/CD Pipelines"],
    bio: "Jamal has transformed infrastructure operations for startups and enterprises alike. He specializes in scalable cloud architecture and automating deployment workflows.",
    availability: "Monday & Wednesday, all day",
    languages: ["English"],
    rating: 4.8,
    reviews: 25,
    image: "https://images.unsplash.com/photo-1539935403468-73d41cac7005?auto=format&fit=crop&q=80&w=200",
    gradient: "from-purple-600 to-violet-600"
  }
];

const expertiseOptions = [
  "All Expertise",
  "Machine Learning",
  "Computer Vision",
  "Natural Language Processing",
  "Cloud Architecture",
  "DevOps",
  "Kubernetes",
  "AWS",
  "UI/UX Design",
  "Design Thinking",
  "Prototyping",
  "User Research",
  "Blockchain",
  "Smart Contracts",
  "Solidity",
  "Web3",
  "Node.js",
  "Python",
  "Database Design",
  "API Architecture",
  "React",
  "Vue.js",
  "TypeScript",
  "Responsive Design"
];

const availabilityOptions = [
  "Any Availability",
  "Weekdays",
  "Weekends",
  "Evenings",
  "Flexible"
];

const languageOptions = [
  "All Languages",
  "English",
  "Mandarin",
  "Spanish",
  "Hindi",
  "Korean"
];

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Expertise');
  const [selectedAvailability, setSelectedAvailability] = useState('Any Availability');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [mentorForRequest, setMentorForRequest] = useState<number | null>(null);
  const [autoPlayCarousel, setAutoPlayCarousel] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [showMentorApplicationModal, setShowMentorApplicationModal] = useState(false);
  const [mentorApplication, setMentorApplication] = useState({
    name: '',
    email: '',
    expertise: [] as string[],
    experience: '',
    linkedin: '',
    availability: '',
    motivation: ''
  });

  const handleExpertiseChange = (expertise: string) => {
    if (mentorApplication.expertise.includes(expertise)) {
      setMentorApplication({
        ...mentorApplication, 
        expertise: mentorApplication.expertise.filter(item => item !== expertise)
      });
    } else if (mentorApplication.expertise.length < 5) {
      setMentorApplication({
        ...mentorApplication, 
        expertise: [...mentorApplication.expertise, expertise]
      });
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
                         
    const matchesExpertise = selectedExpertise === 'All Expertise' || 
                            mentor.expertise.includes(selectedExpertise);
                            
    const matchesAvailability = selectedAvailability === 'Any Availability' || 
                               mentor.availability.toLowerCase().includes(selectedAvailability.toLowerCase());
                               
    const matchesLanguage = selectedLanguage === 'All Languages' || 
                           mentor.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesExpertise && matchesAvailability && matchesLanguage;
  });

  const handleMentorClick = (mentorId: number) => {
    setSelectedMentor(selectedMentor === mentorId ? null : mentorId);
  };

  const handleRequestMentorship = (mentorId: number) => {
    setMentorForRequest(mentorId);
    setShowMentorshipModal(true);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoPlayCarousel) {
      interval = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % (mentors.length - 4));
        
        if (carouselRef.current) {
          carouselRef.current.scrollTo({
            left: carouselIndex * 300,
            behavior: 'smooth'
          });
        }
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [autoPlayCarousel, carouselIndex, mentors.length]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner with 3D Animated Elements */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 h-72 md:h-80 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        
        {/* Animated floating shapes */}
        <motion.div 
          className="absolute right-1/4 top-1/4 w-24 h-24 md:w-32 md:h-32 bg-purple-500/20 rounded-full backdrop-blur-sm"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        ></motion.div>
        
        <motion.div 
          className="absolute left-1/4 bottom-1/3 w-16 h-16 md:w-20 md:h-20 bg-blue-400/20 rounded-xl backdrop-blur-sm"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        ></motion.div>
        
        {/* Content with staggered animation */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4"
          >
            <BookOpen className="h-8 w-8 text-white" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Connect with Expert Mentors
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/90 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get personalized guidance from industry leaders who've been there and done that
          </motion.p>
          
          <motion.div 
            className="mt-6 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              1,000+ Expert Mentors
            </span>
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              24+ Technology Fields
            </span>
            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              Flexible Scheduling
            </span>
          </motion.div>
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
                placeholder="Search mentors by name, expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 w-full md:w-auto"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
                    <select
                      value={selectedExpertise}
                      onChange={(e) => setSelectedExpertise(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {expertiseOptions.map(expertise => (
                        <option key={expertise} value={expertise}>{expertise}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      value={selectedAvailability}
                      onChange={(e) => setSelectedAvailability(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {availabilityOptions.map(availability => (
                        <option key={availability} value={availability}>{availability}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {languageOptions.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Featured Mentors Carousel - Add after the search bar */}
        <motion.div 
          className="mb-10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Featured Mentors</h2>
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: Math.ceil(mentors.slice(0, 9).length / 4) }).map((_, i) => (
                  <motion.button
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === Math.floor(carouselIndex / 4) ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    onClick={() => {
                      setCarouselIndex(i * 4);
                      if (carouselRef.current) {
                        carouselRef.current.scrollTo({
                          left: i * 4 * 300,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    whileHover={{ scale: 1.2 }}
                    animate={{ scale: i === Math.floor(carouselIndex / 4) ? 1.2 : 1 }}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAutoPlayCarousel(!autoPlayCarousel)}
                className={`p-1.5 rounded-full ${autoPlayCarousel ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'}`}
              >
                {autoPlayCarousel ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
          
          <div 
            className="flex gap-4 overflow-hidden pb-4" 
            ref={carouselRef}
            onMouseEnter={() => setAutoPlayCarousel(false)}
            onMouseLeave={() => setAutoPlayCarousel(true)}
          >
            {mentors.slice(0, 9).map((mentor, idx) => (
              <motion.div
                key={`featured-${mentor.id}`}
                className="min-w-[280px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all flex-shrink-0"
                whileHover={{ y: -4 }}
                animate={{ 
                  x: idx === carouselIndex ? 0 : idx < carouselIndex ? -300 : 300,
                  opacity: (idx >= carouselIndex && idx < carouselIndex + 4) ? 1 : 0.5,
                  scale: (idx >= carouselIndex && idx < carouselIndex + 4) ? 1 : 0.95
                }}
                transition={{ duration: 0.5 }}
              >
                <div className={`h-24 w-full bg-gradient-to-r ${mentor.gradient}`}></div>
                <div className="px-4 pb-4 relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white absolute top-[-32px] left-4 shadow-sm">
                    <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-[32px] pt-2"> {/* Fixed spacing to prevent overlap */}
                    <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                    <p className="text-xs text-gray-500">{mentor.role}</p>
                    <div className="flex mt-2">
                      {renderStars(mentor.rating)}
                      <span className="text-xs text-gray-500 ml-1">{mentor.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mentor.expertise.slice(0, 2).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">{skill}</span>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full">+{mentor.expertise.length - 2}</span>
                      )}
                    </div>
                    <motion.button 
                      className="w-full mt-3 px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm rounded-lg transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMentorClick(mentor.id)}
                    >
                      View Profile
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all ${
                  selectedMentor === mentor.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                onClick={() => handleMentorClick(mentor.id)}
              >
                {/* Card header with gradient */}
                <div className={`h-3 w-full bg-gradient-to-r ${mentor.gradient}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`relative group w-16 h-16 rounded-full bg-gradient-to-br ${mentor.gradient} flex items-center justify-center text-white overflow-hidden`}>
                      {mentor.image ? (
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-8 h-8" />
                      )}
                      <motion.div 
                        className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ opacity: 1 }}
                      >
                        <UserPlus className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
                          <p className="text-sm text-gray-500">{mentor.role} at {mentor.company}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex mr-1">
                              {renderStars(mentor.rating)}
                            </div>
                            <span className="text-sm text-gray-600">{mentor.rating} ({mentor.reviews} reviews)</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mentor.reviews > 25 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {mentor.reviews > 25 ? 'Top Mentor' : 'Rising Star'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{mentor.bio}</p>
                  
                  {/* Expertise tags with micro interactions */}
                  <div className="mb-4">
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <motion.div
                          key={index}
                          className="relative group cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={`px-3 py-1 ${
                            index % 4 === 0 ? 'bg-indigo-100 text-indigo-700' :
                            index % 4 === 1 ? 'bg-purple-100 text-purple-700' :
                            index % 4 === 2 ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          } text-xs rounded-full flex items-center`}>
                            <Hash className="w-3 h-3 mr-1" />
                            {skill}
                          </span>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Click to find similar mentors
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-gray-900 border-b-0 border-r-transparent border-l-transparent"></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Information grid with icons */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        Availability
                      </div>
                      <p className="text-gray-700">{mentor.availability}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Globe className="w-4 h-4 mr-1" />
                        Languages
                      </div>
                      <p className="text-gray-700">{mentor.languages.join(', ')}</p>
                    </div>
                  </div>
                  
                  {/* Action buttons with improved visual indicators */}
                  <div className="flex gap-3 mt-6">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestMentorship(mentor.id);
                      }}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg flex items-center justify-center gap-2 shadow-sm"
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <UserPlus className="w-4 h-4" />
                      Request Mentorship
                    </motion.button>
                    
                    <motion.button
                      className="px-4 py-2.5 border border-gray-300 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  {/* Expanded content when selected */}
                  <AnimatePresence>
                    {selectedMentor === mentor.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <div className="space-y-4">
                          {/* Mentor strengths */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                              {["Communication", "Technical Expertise", "Problem-Solving", "Patience"].map((strength, i) => (
                                <div key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-xs flex items-center">
                                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5"></div>
                                  {strength}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Testimonial */}
                          <div className="bg-gray-50 p-4 rounded-lg relative">
                            <div className="text-gray-400 text-4xl absolute top-2 left-2">"</div>
                            <p className="text-sm text-gray-600 italic pl-6">
                              {mentor.name} has been an incredible mentor. Their guidance helped me navigate complex
                              technical challenges and advance my career significantly.
                            </p>
                            <div className="flex items-center mt-3">
                              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                              <div>
                                <p className="text-xs font-medium">Former Mentee</p>
                                <p className="text-xs text-gray-500">Junior Developer</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Calendar preview */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Availability</h4>
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              {["Mon", "Wed", "Thu", "Sat"].map((day, i) => (
                                <div key={i} className="border border-gray-200 rounded p-2 text-center">
                                  <div className="text-xs text-gray-500">{day}</div>
                                  <div className="text-sm font-medium">
                                    {["2pm", "4pm", "10am", "1pm"][i]}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button className="text-xs text-indigo-600 font-medium flex items-center">
                              See more slots
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Mentors Found</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                We couldn't find any mentors matching your search criteria. Try adjusting your filters or come back later.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedExpertise('All Expertise');
                  setSelectedAvailability('Any Availability');
                  setSelectedLanguage('All Languages');
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
      </div>
      
      {/* Mentorship Request Modal */}
      <AnimatePresence>
        {showMentorshipModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowMentorshipModal(false)}
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
                  <h2 className="text-2xl font-bold text-gray-800">Request Mentorship</h2>
                  <motion.button
                    onClick={() => setShowMentorshipModal(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </motion.button>
                </div>
                
                {mentorForRequest !== null && (
                  <div className="flex items-center mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={mentors.find(m => m.id === mentorForRequest)?.image} 
                        alt="Mentor" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {mentors.find(m => m.id === mentorForRequest)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {mentors.find(m => m.id === mentorForRequest)?.role}
                      </p>
                    </div>
                  </div>
                )}
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      id="topic"
                      placeholder="What would you like to discuss?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
                      Learning Goals
                    </label>
                    <textarea
                      id="goal"
                      rows={3}
                      placeholder="What do you hope to achieve from this mentorship?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Any specific questions or areas you'd like to focus on"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setShowMentorshipModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Request
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add this Success Statistics section before the Become a Mentor CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the community that's helping shape the next generation of tech talent through personalized mentorship
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "5,000+", label: "Mentorship Sessions" },
            { value: "94%", label: "Satisfaction Rate" },
            { value: "250+", label: "Success Stories" },
            { value: "12+", label: "Avg. Career Growth" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div 
                className="text-4xl font-bold text-indigo-600 mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:pl-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How Our Mentorship Works
              </h3>
              <div className="space-y-6">
                {[
                  { 
                    title: "Find Your Match", 
                    description: "Browse through our curated list of experienced mentors filtered by expertise and availability.",
                    icon: "search"
                  },
                  { 
                    title: "Schedule Sessions", 
                    description: "Book 1:1 time directly on your mentor's calendar at times that work for both of you.",
                    icon: "calendar"
                  },
                  { 
                    title: "Grow Your Skills", 
                    description: "Receive personalized guidance, feedback and industry insights to accelerate your learning.",
                    icon: "chart"
                  },
                ].map((step, i) => (
                  <motion.div 
                    key={i}
                    className="flex gap-4" 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="mt-1 bg-indigo-100 rounded-full p-2 h-fit">
                      {step.icon === "search" ? (
                        <Search className="w-5 h-5 text-indigo-700" />
                      ) : step.icon === "calendar" ? (
                        <Calendar className="w-5 h-5 text-indigo-700" />
                      ) : (
                        <Award className="w-5 h-5 text-indigo-700" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-full min-h-[300px] md:min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Mentorship Session" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 to-blue-500/40 backdrop-blur-sm flex items-center justify-center">
                <motion.button
                  className="bg-white/90 backdrop-blur-sm text-indigo-700 px-5 py-3 rounded-full font-medium flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Watch success stories
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Become a Mentor CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 mt-12">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Share Your Knowledge, Become a Mentor
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Help shape the future of tech by mentoring the next generation of innovators.
              Share your expertise, guide projects, and build meaningful connections.
            </motion.p>
            <motion.button
              className="px-8 py-3 bg-white text-indigo-700 rounded-full font-semibold hover:shadow-lg inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMentorApplicationModal(true)}
            >
              Apply to Become a Mentor
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentors;