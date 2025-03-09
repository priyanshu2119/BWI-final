import React from 'react';
import { Code2, Users, Trophy, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#6366f1_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20 animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6"
            variants={fadeIn}
          >
            Build. Connect. Innovate.
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12"
            variants={fadeIn}
          >
            Join the world's most exciting hackathon platform where innovation meets opportunity.
            Connect with talented developers, build amazing projects, and showcase your skills.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            variants={fadeIn}
          >
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold border-2 border-indigo-600 flex items-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Hackathons
            </motion.button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Projects</h3>
              <p className="text-gray-600">Create innovative solutions with cutting-edge technology</p>
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Team</h3>
              <p className="text-gray-600">Connect with like-minded developers and form dream teams</p>
            </motion.div>

            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              variants={fadeIn}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Win Prizes</h3>
              <p className="text-gray-600">Compete for exciting prizes and recognition</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;