import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import UpcomingHackathons from '../components/UpcomingHackathons';

const Home = () => {
  // For parallax scroll effect
  const { scrollY } = useScroll();
  const translateY = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  
  // For animated gradient background
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated gradient that follows mouse position */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(99, 102, 241, 0.3), transparent 50%)`,
        }}
      />

      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
      <motion.div style={{ y: translateY, opacity }}>
        <HeroSection />
      </motion.div>
      
      {/* Section divider with animation */}
      <div className="relative">
        <div className="absolute inset-x-0 -top-10 h-20 bg-gradient-to-b from-transparent to-indigo-50/60 z-10"></div>
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center"
          >
            <motion.div 
              className="w-10 h-10 border-t-4 border-indigo-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <UpcomingHackathons />
      </motion.div>

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
    </div>
  );
};

export default Home;