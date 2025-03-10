import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, CheckCircle, Circle, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const UserRoadmap = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  
  const roadmapSteps = [
    { 
      title: 'Create Your Profile', 
      description: 'Complete your developer profile with skills and experience',
      status: 'completed', 
      icon: <CheckCircle className="w-6 h-6" />
    },
    { 
      title: 'Join a Hackathon', 
      description: 'Find and register for an upcoming hackathon',
      status: 'completed', 
      icon: <CheckCircle className="w-6 h-6" />
    },
    { 
      title: 'Form or Join a Team', 
      description: 'Connect with other developers to build your project',
      status: 'current', 
      icon: <Flag className="w-6 h-6" />
    },
    { 
      title: 'Submit Project Proposal', 
      description: 'Create a detailed plan for your hackathon project',
      status: 'pending', 
      icon: <Circle className="w-6 h-6" />
    },
    { 
      title: 'Build Your MVP', 
      description: 'Develop the minimum viable product for your idea',
      status: 'pending', 
      icon: <Circle className="w-6 h-6" />
    },
    { 
      title: 'Submit Final Project', 
      description: 'Present your completed project for judging',
      status: 'pending', 
      icon: <Circle className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Your Hackathon Roadmap</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white">
            <h2 className="text-xl font-semibold">Your Personal Hackathon Journey</h2>
            <p className="text-indigo-100 mt-1">Track your progress and reach your goals</p>
            <div className="mt-4 bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div className="bg-white h-2.5 rounded-full" style={{ width: '37%' }}></div>
            </div>
            <div className="mt-1 flex justify-between text-xs text-indigo-100">
              <span>37% Complete</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> 14 days remaining
              </span>
            </div>
          </div>
          
          {/* Roadmap Steps */}
          <div className="p-6">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Steps */}
              {roadmapSteps.map((step, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="flex gap-4">
                    <div className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                      ${step.status === 'completed' ? 'bg-green-100 text-green-600' : 
                        step.status === 'current' ? 'bg-indigo-100 text-indigo-600' : 
                        'bg-gray-100 text-gray-600'}
                    `}>
                      {step.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`
                        font-semibold
                        ${step.status === 'completed' ? 'text-green-600' : 
                          step.status === 'current' ? 'text-indigo-600' : 
                          'text-gray-600'}
                      `}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                      
                      {step.status === 'current' && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg"
                        >
                          Continue This Step
                        </motion.button>
                      )}
                      
                      {step.status === 'completed' && (
                        <div className="mt-2 flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recommended Next Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-blue-50 rounded-lg p-4"
            >
              <div className="text-blue-600 mb-2">👥</div>
              <h3 className="font-semibold text-blue-800">Join Open Teams</h3>
              <p className="text-sm text-blue-600 mt-1">Find teams looking for your skills</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-purple-50 rounded-lg p-4"
            >
              <div className="text-purple-600 mb-2">📝</div>
              <h3 className="font-semibold text-purple-800">Project Planning</h3>
              <p className="text-sm text-purple-600 mt-1">Create a project roadmap</p>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-green-50 rounded-lg p-4"
            >
              <div className="text-green-600 mb-2">🧠</div>
              <h3 className="font-semibold text-green-800">Skill Building</h3>
              <p className="text-sm text-green-600 mt-1">Complete React tutorial</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRoadmap;