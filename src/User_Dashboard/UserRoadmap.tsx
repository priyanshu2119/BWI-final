import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Circle, ArrowRight, Star, 
  Award, Code, Brain, BookOpen, Zap 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserRoadmap = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const roadmapSteps = [
    {
      id: 1,
      title: "Profile Setup",
      description: "Complete your developer profile with skills and background",
      completed: true,
      icon: <Code />
    },
    {
      id: 2,
      title: "Skill Assessment",
      description: "Take the skill assessment to gauge your current level",
      completed: true,
      icon: <Brain />
    },
    {
      id: 3,
      title: "Join First Hackathon",
      description: "Register and participate in your first hackathon",
      completed: false,
      icon: <Zap />
    },
    {
      id: 4,
      title: "Form a Team",
      description: "Find team members to collaborate with",
      completed: false,
      icon: <Award />
    },
    {
      id: 5,
      title: "Submit Project",
      description: "Complete and submit your first hackathon project",
      completed: false,
      icon: <Star />
    }
  ];
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Hackathon Roadmap</h1>
            <p className="text-gray-600 mt-2">Track your progress and achieve your developer goals</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link to="/dashboard/user">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                Back to Dashboard
              </motion.button>
            </Link>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / roadmapSteps.length) * 100}%` }}
              ></div>
            </div>
            <span className="ml-4 text-sm font-medium text-gray-700">
              {Math.round((currentStep / roadmapSteps.length) * 100)}%
            </span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Beginning</span>
            <span>Advanced</span>
          </div>
        </div>
        
        {/* Roadmap steps */}
        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border ${
                currentStep >= step.id ? 'border-indigo-200' : 'border-gray-200'
              } p-6 relative`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-100' : currentStep === step.id ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <span className="w-6 h-6 text-gray-600">{step.icon}</span>
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h3 className={`text-lg font-semibold ${
                      step.completed ? 'text-green-800' : currentStep === step.id ? 'text-indigo-800' : 'text-gray-800'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <div className="mt-2 sm:mt-0">
                      {step.completed ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : currentStep === step.id ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Current
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mt-2">{step.description}</p>
                  
                  {currentStep === step.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4"
                    >
                      <Link to={
                        step.id === 1 ? "/dashboard/user" :
                        step.id === 2 ? "/dashboard/user/skills/assessment" :
                        step.id === 3 ? "/hackathons" :
                        step.id === 4 ? "/teams/new" :
                        "/projects/submit"
                      }>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 inline-flex items-center"
                        >
                          {step.id === 1 ? "Update Profile" :
                           step.id === 2 ? "Take Assessment" :
                           step.id === 3 ? "Browse Hackathons" :
                           step.id === 4 ? "Create Team" : "Submit Project"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Achievements section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Profile Completed", icon: <CheckCircle className="w-8 h-8 text-green-600" />, achieved: true },
              { title: "First Hackathon", icon: <Award className="w-8 h-8 text-gray-400" />, achieved: false },
              { title: "Team Leader", icon: <Star className="w-8 h-8 text-gray-400" />, achieved: false }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border p-6 text-center ${
                  achievement.achieved ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className={`text-lg font-medium ${achievement.achieved ? 'text-green-800' : 'text-gray-800'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm mt-2 ${achievement.achieved ? 'text-green-600' : 'text-gray-500'}`}>
                  {achievement.achieved ? "Achieved" : "In progress"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoadmap;