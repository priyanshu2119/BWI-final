import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, Users, MapPin, Award, Clock, Globe, Tag,
  ChevronDown, MessageSquare, Share2, Heart, Brain, 
  DollarSign, Leaf, Gamepad2, Code, Check, Zap,
  Trophy, Sparkles, Rocket, Medal, Shield, Lightbulb,
  Presentation, Upload, CheckSquare, MonitorPlay,
  Plus, UsersRound, Gift, Search
} from 'lucide-react';

// Add this component function above the HackathonDetails component
const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`card-container perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

const HackathonDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [hackathon, setHackathon] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Countdown timer values
  const remainingDays = hackathon ? Math.max(0, Math.floor((new Date(hackathon.registerBy).getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const remainingHours = hackathon ? Math.max(0, Math.floor((new Date(hackathon.registerBy).getTime() - currentTime.getTime()) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))) : 0;
  const remainingMinutes = hackathon ? Math.max(0, Math.floor((new Date(hackathon.registerBy).getTime() - currentTime.getTime()) % (1000 * 60 * 60) / (1000 * 60))) : 0;
  const remainingSeconds = hackathon ? Math.max(0, Math.floor((new Date(hackathon.registerBy).getTime() - currentTime.getTime()) % (1000 * 60) / 1000)) : 0;
  
  const timeLeft = hackathon ? Math.max(0, new Date(hackathon.registerBy).getTime() - currentTime.getTime()) : 0;
  const totalTime = 1000 * 60 * 60 * 24 * 30; // Roughly a month in milliseconds
  const remainingPercentage = hackathon ? Math.round((timeLeft / totalTime) * 100) : 0;
  
  useEffect(() => {
    // Timer to update the countdown
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Simulate fetching hackathon data
    setTimeout(() => {
      setHackathon({
        id,
        title: "AI Innovation Challenge",
        description: "Join the AI Innovation Challenge and build cutting-edge solutions that leverage artificial intelligence and machine learning to solve real-world problems. Collaborate with like-minded individuals, learn from industry experts, and showcase your skills to potential employers.",
        longDescription: "The AI Innovation Challenge is a premier hackathon designed to push the boundaries of what's possible with artificial intelligence and machine learning. Participants will have 48 hours to develop innovative solutions that address pressing challenges in healthcare, education, sustainability, or finance.\n\nThis hackathon provides a unique opportunity to network with industry professionals, receive mentorship from AI experts, and gain hands-on experience with the latest technologies and frameworks. Whether you're a seasoned developer or just starting your journey in AI, this event offers something for everyone.\n\nTop projects will be awarded cash prizes, opportunities for internships or job interviews with sponsoring companies, and ongoing support to further develop their solutions.",
        date: "March 15-17, 2024",
        registerBy: "March 10, 2024",
        timezone: "UTC-5 (Eastern Time)",
        location: "Virtual",
        format: "48-hour hackathon",
        participants: "500+",
        skillLevel: "All Levels",
        teamSize: "1-4 members",
        prizePool: "$10,000",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        categories: ["AI/ML", "Data Science", "Cloud Computing"],
        sponsors: [
          { name: "TechCorp", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=40" },
          { name: "AI Solutions", logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=40" },
          { name: "Data Ventures", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=40" }
        ],
        judges: [
          { name: "Dr. Sarah Johnson", role: "AI Research Lead, TechCorp", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100" },
          { name: "Michael Chen", role: "CTO, AI Solutions", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
          { name: "Dr. Lisa Patel", role: "Professor of Computer Science", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100" }
        ],
        mentors: [
          { name: "James Wilson", expertise: "Machine Learning", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" },
          { name: "Emily Zhang", expertise: "Natural Language Processing", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
          { name: "Robert Kim", expertise: "Computer Vision", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100" }
        ],
        schedule: [
          { day: "Day 1", time: "9:00 AM", event: "Opening Ceremony" },
          { day: "Day 1", time: "10:00 AM", event: "Team Formation" },
          { day: "Day 1", time: "11:00 AM", event: "Hackathon Begins" },
          { day: "Day 2", time: "2:00 PM", event: "Mentor Sessions" },
          { day: "Day 3", time: "12:00 PM", event: "Submission Deadline" },
          { day: "Day 3", time: "3:00 PM", event: "Judging" },
          { day: "Day 3", time: "5:00 PM", event: "Awards Ceremony" }
        ],
        faqs: [
          { 
            question: "What skills do I need to participate?", 
            answer: "Participants should have basic programming knowledge. Experience with AI/ML frameworks (TensorFlow, PyTorch, etc.) is beneficial but not required. We welcome all skill levels!" 
          },
          { 
            question: "Do I need to have a team to register?", 
            answer: "No, you can register as an individual and form a team during the event. We'll have team formation activities to help you find teammates." 
          },
          {
            question: "What are the judging criteria?",
            answer: "Projects will be judged based on innovation, technical complexity, practical application, presentation quality, and adherence to hackathon themes."
          }
        ]
      });
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hackathon Not Found</h2>
        <p className="text-gray-600 mb-8">The hackathon you're looking for doesn't exist or has been removed.</p>
        <motion.a 
          href="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.a>
      </div>
    );
  }

  function triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        {/* Add animated particles background */}
        <div className="absolute inset-0 z-5">
          <motion.div className="h-full w-full"
            style={{ 
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm20 20a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-6a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px',
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/80 z-10"></div>
        <img 
          src={hackathon.image} 
          alt={hackathon.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Add floating tech icons based on hackathon category */}
        <div className="absolute inset-0 z-15 overflow-hidden">
            {hackathon.categories.map((category: string, index: number) => (
            Array(3).fill(0).map((_, i: number) => (
              <motion.div
              key={`${category}-${i}`}
              className="absolute w-8 h-8 md:w-10 md:h-10 opacity-20 text-white flex items-center justify-center"
              initial={{ 
                x: Math.random() * 100 + 50 * index, 
                y: Math.random() * 200, 
                opacity: 0 
              }}
              animate={{ 
                x: [null, Math.random() * 100 + 50 * index + 20, Math.random() * 100 + 50 * index],
                y: [null, Math.random() * 200 - 20, Math.random() * 200],
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5 + Math.random() * 10,
                delay: index + i * 2,
                ease: "easeInOut"
              }}
              >
              {category === 'AI/ML' ? <Brain className="w-full h-full" /> : 
               category === 'Blockchain' ? <DollarSign className="w-full h-full" /> :
               category === 'Sustainability' ? <Leaf className="w-full h-full" /> : 
               category === 'Gaming' ? <Gamepad2 className="w-full h-full" /> :
               <Code className="w-full h-full" />}
              </motion.div>
            ))
            ))}
        </div>
        
        {/* Rest of hero content */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.categories.map((category: string) => (
                  <span key={category} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full backdrop-blur-sm">
                    {category}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{hackathon.title}</h1>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{hackathon.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{hackathon.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{hackathon.participants} Participants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{hackathon.prizePool} Prize Pool</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <motion.button
                className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('overview')}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                Overview
              </motion.button>
              <motion.button
                className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'schedule' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('schedule')}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                Schedule
              </motion.button>
              <motion.button
                className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'judges' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('judges')}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                Judges & Mentors
              </motion.button>
              <motion.button
                className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'sponsors' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('sponsors')}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                Sponsors
              </motion.button>
              <motion.button
                className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'faqs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('faqs')}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                FAQs
              </motion.button>
              <motion.button
  className={`px-6 py-4 font-medium text-sm focus:outline-none whitespace-nowrap ${
    activeTab === 'teams' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
  }`}
  onClick={() => setActiveTab('teams')}
  whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
>
  Teams
</motion.button>

            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <motion.div
                  className="mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Zap className="w-5 h-5 text-amber-500 mr-2" />
                    Skills Match Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { skill: "Machine Learning", match: 92, color: "blue" },
                      { skill: "Web Development", match: 78, color: "indigo" },
                      { skill: "UX Design", match: 65, color: "violet" },
                      { skill: "Data Analysis", match: 88, color: "green" }
                    ].map(item => (
                      <div key={item.skill} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                          <div className="flex items-center">
                            <motion.div 
                              className={`text-sm font-bold text-${item.color}-600`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              {item.match}%
                            </motion.div>
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: item.match > 85 ? 1 : 0 }}
                              className="ml-1"
                            >
                              <Trophy className="w-4 h-4 text-amber-500" />
                            </motion.div>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-${item.color}-500`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.match}%` }}
                            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <motion.div
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        initial={{ opacity: 0.5, scale: 1 }}
                        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="inline-flex items-center"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        83% Overall Match - Highly Compatible!
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
  className="mb-10 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl overflow-hidden shadow-lg"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  <div className="p-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
    <div className="px-3 py-1 text-xs font-bold text-center text-white uppercase tracking-wider">
      Special Challenge
    </div>
  </div>

  <div className="p-6">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
        animate={{ 
          boxShadow: ['0 0 0 rgba(251, 191, 36, 0)', '0 0 20px rgba(251, 191, 36, 0.5)', '0 0 0 rgba(251, 191, 36, 0)'],
          scale: [1, 1.05, 1]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Sparkles className="w-10 h-10 text-white" />
      </motion.div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-white mb-2">AI Innovation Booster Challenge</h3>
        <p className="text-blue-100 text-sm mb-3">
          Complete this special challenge to unlock exclusive rewards and boost your hackathon experience!
        </p>
        
        <div className="space-y-3 mb-4">
          {[
            { text: "Register before early bird deadline", completed: true },
            { text: "Complete team formation", completed: false },
            { text: "Submit project idea proposal", completed: false },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <motion.div 
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  task.completed ? 'bg-green-500' : 'bg-white/20'
                }`}
                animate={task.completed ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              >
                {task.completed && <Check className="w-3 h-3 text-white" />}
              </motion.div>
              <span className={`text-sm ${task.completed ? 'text-white' : 'text-blue-200'}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
        <div className="text-white font-bold mb-1">Reward</div>
        <div className="text-amber-300 text-2xl font-bold mb-1">+250 XP</div>
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-700/50 text-purple-200 text-xs font-medium">
            <Gift className="w-3 h-3 mr-1" />
            Exclusive Badge
          </span>
        </div>
        <motion.button
          className="w-full px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-bold shadow-md"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.5)" }}
          whileTap={{ scale: 0.98 }}
        >
          Start Challenge
        </motion.button>
      </div>
    </div>
  </div>
</motion.div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Hackathon</h2>
                  <p className="text-gray-600 whitespace-pre-line">{hackathon.longDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-medium">Date & Time</h3>
                    </div>
                    <p className="text-gray-600">{hackathon.date}</p>
                    <p className="text-gray-600 text-sm mt-1">Register by: {hackathon.registerBy}</p>
                    <p className="text-gray-600 text-sm mt-1">Timezone: {hackathon.timezone}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-medium">Location</h3>
                    </div>
                    <p className="text-gray-600">{hackathon.location}</p>
                    <p className="text-gray-600 text-sm mt-1">{hackathon.format}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-medium">Team Size</h3>
                    </div>
                    <p className="text-gray-600">{hackathon.teamSize}</p>
                    <p className="text-gray-600 text-sm mt-1">Skill Level: {hackathon.skillLevel}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Card3D className="inline-block overflow-hidden">
  <motion.button
    className="relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium overflow-hidden group"
    whileTap={{ scale: 0.98 }}
    onClick={() => triggerConfetti()}
  >
    {/* Animated particles inside button */}
    <div className="absolute inset-0 w-full h-full">
      {Array(5).fill(0).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white rounded-full opacity-0"
          style={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%"
          }}
          animate={{
            y: [0, -40],
            x: [0, Math.random() * 20 - 10],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            repeatDelay: 1
          }}
        />
      ))}
    </div>
    
    {/* The actual content */}
    <div className="relative flex items-center">
      <span className="mr-2">Register Now</span>
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Rocket className="w-5 h-5" />
      </motion.div>
    </div>
    
    {/* Shine effect */}
    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
  </motion.button>
</Card3D>

                  
                  <motion.div className="flex gap-2">
                    <motion.button
                      className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Your Hackathon Journey</h3>
                  <div className="relative">
                    <div className="absolute top-2/4 left-0 right-0 h-1 bg-gray-200 -translate-y-2/4"></div>
                    <div className="flex justify-between relative">
                      {["Register", "Form Team", "Submit Idea", "Build", "Present"].map((step, index) => {
                        const isCompleted = index === 0; // In a real app, this would be determined dynamically
                        const isActive = index === 1; // Next step
                        
                        return (
                          <div key={step} className="flex flex-col items-center relative">
                            <motion.div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                isCompleted 
                                  ? 'bg-green-500 text-white' 
                                  : isActive
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-white border-2 border-gray-300 text-gray-500'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              initial={{ scale: isActive ? 0.8 : 1 }}
                              animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                              transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                            >
                              {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                            </motion.div>
                            <p className={`text-xs mt-2 font-medium ${
                              isCompleted ? 'text-green-600' : isActive ? 'text-indigo-600' : 'text-gray-500'
                            }`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="mt-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    Registration Deadline Approaching
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="grid grid-cols-4 gap-3 w-full md:w-auto">
                      {/* Days */}
                      <div className="text-center">
                        <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 rounded-lg p-3 text-white relative overflow-hidden">
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-white/20 h-full origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: remainingDays / 30 }}
                          />
                          <span className="text-2xl font-bold relative z-10">{remainingDays}</span>
                          <div className="text-xs mt-1 relative z-10">Days</div>
                        </div>
                      </div>
                      
                      {/* Hours */}
                      <div className="text-center">
                        <div className="bg-gradient-to-b from-purple-500 to-purple-700 rounded-lg p-3 text-white relative overflow-hidden">
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-white/20 h-full origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: remainingHours / 24 }}
                          />
                          <span className="text-2xl font-bold relative z-10">{remainingHours}</span>
                          <div className="text-xs mt-1 relative z-10">Hours</div>
                        </div>
                      </div>
                      
                      {/* Minutes */}
                      <div className="text-center">
                        <div className="bg-gradient-to-b from-fuchsia-500 to-fuchsia-700 rounded-lg p-3 text-white relative overflow-hidden">
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-white/20 h-full origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: remainingMinutes / 60 }}
                          />
                          <span className="text-2xl font-bold relative z-10">{remainingMinutes}</span>
                          <div className="text-xs mt-1 relative z-10">Mins</div>
                        </div>
                      </div>
                      
                      {/* Seconds */}
                      <div className="text-center">
                        <div className="bg-gradient-to-b from-pink-500 to-pink-700 rounded-lg p-3 text-white relative overflow-hidden">
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 bg-white/20 h-full origin-bottom"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: remainingSeconds / 60 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span className="text-2xl font-bold relative z-10">{remainingSeconds}</span>
                          <div className="text-xs mt-1 relative z-10">Secs</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                          style={{ width: `${100 - (timeLeft / totalTime) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {remainingPercentage}% of registration time remaining
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-12 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-50"></div>
                  
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                    Achievements & Rewards
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { title: "Hackathon Participant", icon: <Medal className="w-6 h-6 text-blue-300" />, points: 100, unlocked: true },
                      { title: "Team Builder", icon: <Users className="w-6 h-6 text-purple-300" />, points: 150, unlocked: false },
                      { title: "Project Submitter", icon: <Rocket className="w-6 h-6 text-pink-300" />, points: 200, unlocked: false },
                      { title: "Innovative Thinker", icon: <Sparkles className="w-6 h-6 text-yellow-300" />, points: 250, unlocked: false }
                    ].map((achievement, index) => (
                      <motion.div 
                        key={achievement.title}
                        className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 border ${achievement.unlocked ? 'border-yellow-400' : 'border-white/20'}`}
                        whileHover={{ y: -5, scale: 1.03 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <motion.div 
                            className={`w-14 h-14 rounded-full ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-300 to-amber-500' : 'bg-white/10'} flex items-center justify-center`}
                            animate={achievement.unlocked ? { 
                              boxShadow: ['0 0 10px 0px rgba(251, 191, 36, 0.5)', '0 0 20px 2px rgba(251, 191, 36, 0.5)', '0 0 10px 0px rgba(251, 191, 36, 0.5)']
                            } : {}}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          >
                            {achievement.icon}
                          </motion.div>
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <div className={`text-xs ${achievement.unlocked ? 'text-yellow-300' : 'text-white/50'}`}>
                            {achievement.points} XP
                          </div>
                          {achievement.unlocked ? (
                            <div className="text-xs text-green-400 flex items-center">
                              <Check className="w-3 h-3 mr-1" /> Unlocked
                            </div>
                          ) : (
                            <div className="text-xs text-white/50">Locked</div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-white/10 rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-2">Hackathon Score</h4>
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: '25%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-white/70">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </motion.div>

                {/* Add this new section to the overview tab content */}
                <motion.div
                  className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-indigo-100 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl" />

                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-indigo-600" />
                    Your Hackathon Achievements
                  </h3>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
                    {[
                      { name: "Early Bird", icon: <Clock className="w-full h-full" />, earned: true, xp: 50 },
                      { name: "Team Player", icon: <Users className="w-full h-full" />, earned: false, xp: 75 },
                      { name: "Idea Machine", icon: <Lightbulb className="w-full h-full" />, earned: false, xp: 100 },
                      { name: "Coder Extraordinaire", icon: <Code className="w-full h-full" />, earned: false, xp: 125 },
                      { name: "Presenter", icon: <Presentation className="w-full h-full" />, earned: false, xp: 150 },
                    ].map((badge, index) => (
                      <motion.div
                        key={badge.name}
                        className={`p-3 rounded-xl flex flex-col items-center text-center ${
                          badge.earned 
                            ? 'bg-gradient-to-br from-indigo-200 to-purple-200 text-indigo-800 border border-indigo-300' 
                            : 'bg-white/50 text-gray-400 border border-gray-200'
                        }`}
                        whileHover={badge.earned ? { y: -5, scale: 1.05 } : { scale: 1.02 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                            badge.earned ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                          animate={badge.earned ? {
                            boxShadow: ['0 0 0 rgba(129, 140, 248, 0)', '0 0 12px rgba(129, 140, 248, 0.7)', '0 0 0 rgba(129, 140, 248, 0)']
                          } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          {badge.icon}
                        </motion.div>
                        <h4 className="text-sm font-medium">{badge.name}</h4>
                        <span className={`text-xs ${badge.earned ? 'text-indigo-600' : 'text-gray-400'}`}>
                          {badge.xp} XP
                        </span>
                        {badge.earned && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-amber-500" />
                        Hackathon Level: <span className="ml-1 text-indigo-600">1</span>
                      </h4>
                      <span className="text-sm text-gray-600">50/350 XP</span>
                    </div>
                    
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: '15%' }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <motion.button
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-sm font-medium shadow-md flex items-center"
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        View Leaderboard
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 text-sm font-medium shadow-sm flex items-center"
                        whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Progress
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Schedule</h2>
                
                <div className="relative">
                  {/* Timeline track */}
                  <div className="absolute left-6 top-8 bottom-0 w-1 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                  
                  <div className="space-y-8">
                    {['Day 1', 'Day 2', 'Day 3'].map((day, dayIndex) => (
                      <div key={day}>
                        <motion.div 
                          className="flex items-center ml-6 mb-6 relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: dayIndex * 0.2 }}
                        >
                          <div className="absolute -left-6 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white"></div>
                          <h3 className="ml-4 text-xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {day}
                          </h3>
                        </motion.div>
                        
                        <div className="space-y-4 pl-10">
                          {hackathon.schedule
                            .filter((item: any) => item.day === day)
                            .map((item: any, index: number) => (
                              <motion.div 
                                key={index}
                                className={`bg-white border-l-4 ${
                                  item.event.includes('Opening') ? 'border-emerald-500' :
                                  item.event.includes('Submission') ? 'border-amber-500' :
                                  item.event.includes('Judging') ? 'border-sky-500' :
                                  item.event.includes('Awards') ? 'border-pink-500' :
                                  'border-indigo-500'
                                } p-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dayIndex * 0.2 + 0.1 + index * 0.1 }}
                                whileHover={{ x: 5 }}
                              >
                                <div className="flex items-start">
                                  <div className={`p-2 rounded-lg ${
                                    item.event.includes('Opening') ? 'bg-emerald-100 text-emerald-800' :
                                    item.event.includes('Submission') ? 'bg-amber-100 text-amber-800' :
                                    item.event.includes('Judging') ? 'bg-sky-100 text-sky-800' :
                                    item.event.includes('Awards') ? 'bg-pink-100 text-pink-800' :
                                    'bg-indigo-100 text-indigo-800'
                                  } mr-3`}>
                                    {item.event.includes('Opening') ? <MonitorPlay className="w-5 h-5" /> :
                                     item.event.includes('Team') ? <Users className="w-5 h-5" /> :
                                     item.event.includes('Submission') ? <Upload className="w-5 h-5" /> :
                                     item.event.includes('Judging') ? <CheckSquare className="w-5 h-5" /> :
                                     item.event.includes('Awards') ? <Trophy className="w-5 h-5" /> :
                                     <Calendar className="w-5 h-5" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h4 className="font-semibold text-gray-900">{item.event}</h4>
                                      <span className={`text-sm ${
                                        item.event.includes('Opening') ? 'text-emerald-600' :
                                        item.event.includes('Submission') ? 'text-amber-600' :
                                        item.event.includes('Judging') ? 'text-sky-600' :
                                        item.event.includes('Awards') ? 'text-pink-600' :
                                        'text-indigo-600'
                                      }`}>
                                        {item.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Add a timestamp */}
                                <div className="mt-2 flex items-center">
                                  <div className="h-1 flex-1 bg-gray-200"></div>
                                  <motion.div 
                                    className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs flex items-center gap-1"
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {item.time.includes('AM') ? 'Morning Session' : 'Afternoon Session'}
                                    </span>
                                  </motion.div>
                                  <div className="h-1 flex-1 bg-gray-200"></div>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'judges' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Judges</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hackathon.judges.map((judge: any, index: number) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <img 
                              src={judge.image} 
                              alt={judge.name} 
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{judge.name}</h3>
                              <p className="text-sm text-gray-500">{judge.role}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentors</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hackathon.mentors.map((mentor: any, index: number) => (
                      <motion.div
                        key={index}
                        className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <img 
                              src={mentor.image} 
                              alt={mentor.name} 
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{mentor.name}</h3>
                              <p className="text-sm text-gray-500">Expertise: {mentor.expertise}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'sponsors' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Sponsors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hackathon.sponsors.map((sponsor: any, index: number) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <img src={sponsor.logo} alt={sponsor.name} className="w-12 h-12 object-contain" />
                      </div>
                      <h3 className="font-semibold text-center">{sponsor.name}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'faqs' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
    {hackathon.faqs.map((faq: any, index: number) => (
      <motion.div 
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="overflow-hidden"
      >
        <motion.div
          className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl shadow-sm overflow-hidden"
          whileHover={{ scale: 1.01, boxShadow: "0 8px 20px -5px rgba(79, 70, 229, 0.2)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full px-6 py-4 flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-indigo-100 rounded-full p-1 text-indigo-600"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </Disclosure.Button>

                <Disclosure.Panel>
                  <motion.div 
                    className="px-6 pb-4 prose prose-indigo max-w-none text-gray-600"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                    
                    {/* Add interactive elements based on the question content */}
                    {faq.question.includes("team") && (
                      <motion.div 
                        className="mt-3 bg-white p-3 rounded-lg border border-indigo-100"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-indigo-500" />
                          <span className="text-sm font-medium text-indigo-700">Team Building Tip</span>
                        </div>
                        <p className="text-sm">Try using our team matching feature to find teammates with complementary skills!</p>
                        <motion.button
                          className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium"
                          whileHover={{ scale: 1.05, backgroundColor: "rgb(129, 140, 248)" }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Find Teammates
                        </motion.button>
                      </motion.div>
                    )}
                    
                    {/* Show emoji reactions at the bottom of each answer */}
                    <div className="mt-4 flex gap-2 justify-end">
                      <motion.button 
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        👍 <span className="text-xs text-gray-500">Helpful</span>
                      </motion.button>
                      <motion.button 
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        🙏 <span className="text-xs text-gray-500">Thanks</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </motion.div>
      </motion.div>
    ))}
    
    {/* Add interactive FAQ search and filters */}
    <motion.div 
      className="mt-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-medium text-gray-800 mb-3">Can't find what you're looking for?</h3>
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search questions..."
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>
      <div className="mt-3 flex gap-2">
        <motion.button
          className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(199, 210, 254)" }}
        >
          Registration
        </motion.button>
        <motion.button
          className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(229, 231, 235)" }}
        >
          Teams
        </motion.button>
        <motion.button
          className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full font-medium"
          whileHover={{ scale: 1.05, backgroundColor: "rgb(229, 231, 235)" }}
        >
          Judging
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
)}
{activeTab === 'teams' && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Team Formation</h2>
      <motion.button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium flex items-center"
        whileHover={{ scale: 1.03, backgroundColor: "#4f46e5" }}
        whileTap={{ scale: 0.98 }}
      >
        <Users className="w-4 h-4 mr-2" />
        Create a Team
      </motion.button>
    </div>

    <div className="bg-indigo-50 rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="bg-indigo-600 rounded-full p-4 text-white">
          <UsersRound className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Find Your Perfect Team</h3>
          <p className="text-gray-600 mb-4">
            Connect with other participants who have complementary skills and interests.
            Form a balanced team to maximize your chances of success!
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-sm text-indigo-700">Recommended: 3-4 members</span>
            <span className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-sm text-indigo-700">Balanced skills</span>
            <span className="px-3 py-1 bg-white border border-indigo-200 rounded-full text-sm text-indigo-700">Diverse backgrounds</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { 
          name: "AI Innovators", 
          members: 2, 
          maxMembers: 4,
          lookingFor: ["ML Engineer", "UX Designer"],
          tags: ["AI/ML", "Data Science"]
        },
        { 
          name: "Tech Titans", 
          members: 3, 
          maxMembers: 4,
          lookingFor: ["Frontend Developer"],
          tags: ["Web", "Cloud"]
        },
        { 
          name: "Code Crusaders", 
          members: 1, 
          maxMembers: 3,
          lookingFor: ["Backend Developer", "UI/UX Designer"],
          tags: ["Mobile", "IoT"]
        },
      ].map((team, i) => (
        <motion.div
          key={i}
          className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-gray-900">{team.name}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                Recruiting
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
              <Users className="w-4 h-4" />
              <span>{team.members}/{team.maxMembers} members</span>
              
              <div className="flex-1 flex justify-end">
                {team.tags.map((tag) => (
                  <span key={tag} className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Looking for:</div>
              <div className="flex flex-wrap gap-2">
                {team.lookingFor.map((role) => (
                  <span key={role} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex -space-x-2">
                {[...Array(team.members)].map((_, j) => (
                  <div key={j} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/100x100?face=${i*3+j}`} 
                      alt="Team member" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
                {[...Array(team.maxMembers - team.members)].map((_, j) => (
                  <div key={j} className="w-8 h-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center">
                    <Plus className="w-4 h-4 text-indigo-400" />
                  </div>
                ))}
              </div>
              <motion.button
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Team
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-8 text-center bg-gray-50"
        whileHover={{ scale: 1.02, borderColor: "#6366f1", backgroundColor: "#f5f7ff" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
          <Plus className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-1">Create New Team</h3>
        <p className="text-gray-500 text-sm mb-4">Build your dream team for this hackathon</p>
        <motion.button
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start a Team
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;
