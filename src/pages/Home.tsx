import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import UpcomingHackathons from '../components/UpcomingHackathons';
import CountUp from 'react-countup';
import { TypeAnimation } from 'react-type-animation';
import { MessageSquare } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

const Home = () => {
  const navigate = useNavigate();
  // For parallax scroll effect
  const { scrollY } = useScroll();
  // Note: For smooth scrolling, consider using CSS scroll-behavior or another approach
  const translateY = useTransform(scrollY, [0, 1500], [0, -150]); // Changed from 1000 to 1500
  const opacity = useTransform(scrollY, [0, 700], [1, 0.2]); // Changed from 300 to 700
  const scrollProgress = useTransform(scrollY, 
    [0, document.body.scrollHeight - window.innerHeight], 
    [0, 1]
  );
  
  // For animated gradient background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Testimonials data with actual photos
  const testimonials = [
    {
      quote: "This hackathon was an amazing experience! I learned so much and made great connections.",
      name: "Alex Chen",
      role: "Web Developer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "The mentorship I received helped me take my project to the next level. Can't wait for the next one!",
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "Collaborating with talented developers from diverse backgrounds was incredibly inspiring.",
      name: "Miguel Rodriguez",
      role: "Mobile Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "The challenges pushed me out of my comfort zone and helped me grow as a developer.",
      name: "Priya Sharma",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
    },
    {
      quote: "Finding teammates was seamless. We're still working together even after the hackathon ended!",
      name: "Thomas Wright",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    }
  ];

  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<null | 'success' | 'error'>(null);
  // Add state for the chat modal
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubscribing(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionStatus('success');
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      
      // Reset error message after 3 seconds
      setTimeout(() => {
        setSubscriptionStatus(null);
      }, 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatedBackground />
      {/* Rest of your Home component */}
      {/* Replace ParticlesBg with the new AnimatedBackground component */}
      <div className="fixed inset-0 z-[-20] opacity-60" style={{
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%"
      }}>
        <AnimatedBackground />
      </div>

      {/* Animated gradient that follows mouse position */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-[-10]"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(99, 102, 241, 0.3), transparent 50%)`,
        }}
      />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-indigo-300/20 to-purple-300/20 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.2 + 0.9]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content with scroll animations */}
      <motion.div 
        style={{ 
          y: translateY, 
          opacity,
          willChange: "transform, opacity" // Add this for hardware acceleration
        }} 
        className="relative z-10"
      >
        <HeroSection 
          onRegisterClick={() => navigate('/signup')}
          onExploreClick={() => navigate('/hackathons')}
        />
      </motion.div>
      
      {/* TypeAnimation Section - Integrated with white background */}
      <div className="py-16 relative z-10 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Build the Next 
            <span className="ml-2 inline-block">
              <TypeAnimation
                sequence={[
                  'Innovation', 
                  2000,
                  'Solution',
                  2000,
                  'Breakthrough',
                  2000,
                  'Big Idea',
                  2000
                ]}
                wrapper="span"
                speed={30}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
              />
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our hackathons to transform your ideas into reality, collaborate with talented individuals, and create solutions that make a difference.
          </p>
        </div>
      </div>
      
      {/* Spinner section removed completely */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        <UpcomingHackathons />
      </motion.div>

      {/* Add before statistics section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm mb-4">Featured Hackathon</div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Innovation Challenge</h3>
              <p className="text-white/80 mb-6">Build cutting-edge AI solutions to solve real-world problems. $20,000 in prizes.</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Mar 15-17", "Global", "500+ Participants"].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">{tag}</span>
                ))}
              </div>
              <motion.button 
                className="px-6 py-3 bg-white text-indigo-900 rounded-full font-medium text-lg mt-4 self-start"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log("Navigating to signup page");
                  navigate('/signup');
                }}
              >
                Register Now
              </motion.button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Hackathon team collaborating" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent md:bg-gradient-to-r"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 150, label: "Hackathons" },
            { value: 5000, label: "Participants" },
            { value: 1200, label: "Projects" },
            { value: 500, label: "Mentors" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.span 
                className="text-4xl font-bold text-indigo-600 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <CountUp end={stat.value} duration={2.5} />+
              </motion.span>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-indigo-500/80 to-indigo-600/80 text-white rounded-full font-medium text-lg shadow-sm backdrop-blur-sm border border-white/20"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 8px 20px -5px rgba(79, 70, 229, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/hackathons')}
          >
            Join Upcoming Hackathons
          </motion.button>
        </motion.div>
      </div>

      {/* Add before testimonials section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-indigo-200 -translate-x-1/2"></div>
          
          {/* Timeline steps */}
          {[
            { icon: "👋", title: "Register", description: "Create an account and set up your developer profile", link: "/user/login" },
            { icon: "🔍", title: "Find Hackathons", description: "Browse upcoming events that match your skills and interests", link: "/hackathons" },
            { icon: "👥", title: "Form Teams", description: "Join existing teams or create your own with our team matching", link: "/teams" },
            { icon: "💻", title: "Build Projects", description: "Collaborate and code during the hackathon period", link: "/projects/new" },
            { icon: "🏆", title: "Win Prizes", description: "Submit your project and win recognition and rewards", link: "/projects/submit" }
          ].map((step, i) => (
            <motion.div 
              key={i} 
              className={`flex items-center mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-1/2"></div>
              <div className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-indigo-500 flex items-center justify-center z-10`}>
                <span className="text-xl">{step.icon}</span>
              </div>
              <div className="w-1/2 p-4">
                <motion.div 
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)" }}
                  onClick={() => navigate(step.link)}
                >
                  <h3 className="text-xl font-bold mb-2 text-indigo-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  <div className="mt-3 flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <TypeAnimation
              sequence={[
                'What Participants Say',
                1000,
                'Success Stories',
                1000
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="inline-block"
            />
          </h2>
          
          {/* Fixed carousel with smooth infinite loop */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ 
                x: [0, -(testimonials.length * 358)] 
              }}
              transition={{ 
                duration: testimonials.length * 6, 
                repeat: Infinity, 
                repeatType: "loop", 
                ease: "linear" 
              }}
            >
              {/* Show each testimonial twice to create seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <motion.div 
                  key={i} 
                  className="min-w-[350px] max-w-[350px] bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(99, 102, 241, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div className="mt-4 flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add after testimonials */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-2">Trusted By</h2>
        <p className="text-gray-500 text-center mb-12">Our platform is backed by industry leaders</p>
        
        {/* Update the company logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {[
            {name: "Google", url: "https://cloud.google.com/developers", logo: "/logos/google.png"},
            {name: "Microsoft", url: "https://developer.microsoft.com", logo: "/logos/microsoft.png"},
            {name: "Amazon", url: "https://aws.amazon.com/developers", logo: "/logos/amazon.png"},
            {name: "Meta", url: "https://developers.facebook.com", logo: "/logos/meta.png"},
            {name: "IBM", url: "https://developer.ibm.com", logo: "/logos/ibm.png"},
            {name: "Intel", url: "https://www.intel.com/content/www/us/en/developer/overview.html", logo: "/logos/intel.png"}
          ].map((company) => (
            <motion.a 
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <div className="h-12 flex items-center justify-center font-bold text-xl text-gray-400">
                {company.name}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="relative -mt-20 z-0 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            fill="#4F46E5"
            fillOpacity="0.2"
            d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,197.3C672,213,768,203,864,165.3C960,128,1056,64,1152,58.7C1248,53,1344,107,1392,133.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></motion.path>
        </svg>
      </div>

      {/* Add a newsletter signup at the bottom before the footer */}
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-indigo-200 mb-6">Get notified about new hackathons and opportunities</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-lg flex-grow bg-indigo-800 border border-indigo-600 text-white placeholder-indigo-300 focus:outline-none"
              />
              <motion.button 
                type="submit"
                className={`px-6 py-3 bg-white text-indigo-900 rounded-lg font-medium flex items-center justify-center ${isSubscribing ? 'opacity-70' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribing}
              >
                {isSubscribing ? (
                  <svg className="animate-spin h-5 w-5 text-indigo-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Subscribe'}
              </motion.button>
            </form>

            {/* Subscription status message */}
            {subscriptionStatus && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-3 text-center ${subscriptionStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}
              >
                {subscriptionStatus === 'success' 
                  ? 'Thanks for subscribing! Check your email.' 
                  : 'Oops! Something went wrong. Please try again.'}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {showToast && (
        <motion.div 
          className="fixed bottom-24 right-8 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Reminder set for upcoming hackathon!
        </motion.div>
      )}

      {/* Update the message button to open chat modal */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: ["0px 0px 0px rgba(79, 70, 229, 0.4)", "0px 0px 20px rgba(79, 70, 229, 0.7)", "0px 0px 0px rgba(79, 70, 229, 0.4)"] 
        }}
        transition={{ duration: 2 }}
        onClick={() => navigate('/support')}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-8 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
            <button onClick={() => setIsChatOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4 bg-gray-50">
            <div className="flex flex-col gap-3">
              <div className="bg-indigo-100 rounded-lg p-3 mr-12">
                <p className="text-sm text-gray-700">
                  👋 Hello! How can we help you today with hackathons or finding a team?
                </p>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button className="ml-2 p-2 bg-indigo-600 text-white rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX: scrollProgress }}
      />
    </div>
  );
};

export default Home;