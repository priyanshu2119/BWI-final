import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Award, 
  Clock, 
  Globe, 
  Tag,
  ChevronDown,
  MessageSquare,
  Share2,
  Heart
} from 'lucide-react';

const HackathonDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [hackathon, setHackathon] = useState<any>(null);
  
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

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/80 z-10"></div>
        <img 
          src={hackathon.image} 
          alt={hackathon.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
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
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Register Now
                  </motion.button>
                  
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
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Schedule</h2>
                <div className="space-y-6">
                  {['Day 1', 'Day 2', 'Day 3'].map((day) => (
                    <div key={day} className="border-l-4 border-indigo-600 pl-4">
                      <h3 className="text-lg font-semibold mb-4">{day}</h3>
                      <div className="space-y-4">
                        {hackathon.schedule
                          .filter((item: any) => item.day === day)
                          .map((item: any, index: number) => (
                            <motion.div 
                              key={index}
                              className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="bg-indigo-100 p-2 rounded-lg">
                                <Clock className="w-5 h-5 text-indigo-600" />
                              </div>
                              <div>
                                <p className="font-medium">{item.event}</p>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
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
                  <motion.details 
                    key={index} 
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <summary className="flex justify-between items-center cursor-pointer p-4 font-medium">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="p-4 pt-0 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.details>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails;