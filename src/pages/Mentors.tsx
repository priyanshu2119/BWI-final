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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 h-64">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute right-1/3 bottom-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Learn from Industry Experts
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 max-w-2xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with experienced mentors who can guide you through challenges,
            provide valuable feedback, and help you take your skills to the next level.
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
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${mentor.gradient} flex items-center justify-center text-white overflow-hidden`}>
                      {mentor.image ? (
                        <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-8 h-8" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{mentor.name}</h3>
                          <p className="text-sm text-gray-500">
                            {mentor.role} • {mentor.company}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderStars(mentor.rating)}
                          </div>
                          <span className="text-sm text-gray-500">({mentor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{mentor.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Hash className="w-3 h-3 mr-1" />
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-xs uppercase tracking-wide">Availability</span>
                      </div>
                      <p className="text-gray-700">{mentor.availability}</p>
                    </div>
                    <div>
                      <div className="flex items-center text-gray-500 mb-1">
                        <Globe className="w-4 h-4 mr-1" />
                        <span className="text-xs uppercase tracking-wide">Languages</span>
                      </div>
                      <p className="text-gray-700">{mentor.languages.join(", ")}</p>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {selectedMentor === mentor.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 border-t border-gray-100"
                      >
                        <div className="flex gap-3">
                          <motion.button
                            onClick={() => handleRequestMentorship(mentor.id)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <UserPlus className="w-4 h-4" />
                            Request Mentorship
                          </motion.button>
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
                      <p className="font-medium">{mentors.find(m => m.id === mentorForRequest)?.name}</p>
                      <p className="text-sm text-gray-500">
                        {mentors.find(m => m.id === mentorForRequest)?.role} • 
                        {mentors.find(m => m.id === mentorForRequest)?.company}
                      </p>
                    </div>
                  </div>
                )}
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                      Topic for Discussion
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
                      Your Goals
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
                    <div className="flex gap-4">
                      <input
                        type="date"
                        id="date"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="time"
                        id="time"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Mentor's availability: {mentors.find(m => m.id === mentorForRequest)?.availability}
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                      Session Duration
                    </label>
                    <select
                      id="duration"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
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