import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Award, Book, Clock, Target, ChevronRight, TrendingUp } from 'lucide-react';

const UserProgress = () => {
  const navigate = useNavigate();
  
  const skillProgress = [
    { skill: 'React & Frontend', progress: 85, color: 'indigo' },
    { skill: 'Node.js & Backend', progress: 70, color: 'blue' },
    { skill: 'Database Design', progress: 60, color: 'cyan' },
    { skill: 'UI/UX Design', progress: 75, color: 'purple' },
    { skill: 'DevOps & Deployment', progress: 45, color: 'green' },
    { skill: 'Problem Solving', progress: 80, color: 'pink' }
  ];
  
  const learningModules = [
    {
      title: 'Advanced React Patterns',
      progress: 75,
      description: 'Master advanced patterns like Render Props, Compound Components, and Custom Hooks',
      lessons: 12,
      completed: 9,
      color: 'bg-indigo-600'
    },
    {
      title: 'Full Stack Authentication',
      progress: 60,
      description: 'Implement secure authentication with JWT, OAuth, and session management',
      lessons: 10,
      completed: 6,
      color: 'bg-blue-600'
    },
    {
      title: 'Database Optimization',
      progress: 40,
      description: 'Learn indexing, query optimization and data modeling strategies',
      lessons: 8,
      completed: 3,
      color: 'bg-cyan-600'
    }
  ];
  
  const projectMilestones = [
    {
      milestone: 'Project Planning',
      status: 'completed',
      date: 'Jan 15, 2024'
    },
    {
      milestone: 'Design & Wireframing',
      status: 'completed',
      date: 'Jan 25, 2024'
    },
    {
      milestone: 'Frontend Development',
      status: 'in-progress',
      date: 'Feb 15, 2024'
    },
    {
      milestone: 'Backend Integration',
      status: 'upcoming',
      date: 'Mar 1, 2024'
    },
    {
      milestone: 'Testing & QA',
      status: 'upcoming',
      date: 'Mar 15, 2024'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        </div>
        
        {/* Overview Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white p-6 shadow-lg">
            <div className="mb-3">
              <Award className="w-8 h-8 text-white opacity-90" />
            </div>
            <h3 className="text-lg font-semibold opacity-90 mb-1">Skill Mastery</h3>
            <p className="text-3xl font-bold">73%</p>
            <div className="mt-2 text-xs text-indigo-100 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> 
              +5% this month
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl text-white p-6 shadow-lg">
            <div className="mb-3">
              <Book className="w-8 h-8 text-white opacity-90" />
            </div>
            <h3 className="text-lg font-semibold opacity-90 mb-1">Modules Completed</h3>
            <p className="text-3xl font-bold">18 / 30</p>
            <div className="mt-2 text-xs text-blue-100 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> 
              3 in progress
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl text-white p-6 shadow-lg">
            <div className="mb-3">
              <Target className="w-8 h-8 text-white opacity-90" />
            </div>
            <h3 className="text-lg font-semibold opacity-90 mb-1">Goal Completion</h3>
            <p className="text-3xl font-bold">65%</p>
            <div className="mt-2 text-xs text-green-100 flex items-center">
              <Clock className="w-4 h-4 mr-1" /> 
              On track for March
            </div>
          </div>
        </motion.div>
        
        {/* Skill Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Skill Progress</h2>
            <p className="text-indigo-100">Track your technical knowledge growth</p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-6">
              {skillProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{skill.skill}</h3>
                    <span className="text-sm text-gray-600">{skill.progress}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full bg-${skill.color}-600`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard/user/skills/assessment')}
                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium inline-flex items-center"
              >
                Take Skill Assessment
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Learning Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Learning Modules</h2>
            <p className="text-blue-100">Your ongoing educational journey</p>
          </div>
          
          <div className="p-6">
            <div className="grid gap-8">
              {learningModules.map((module, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {module.completed}/{module.lessons} lessons
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{module.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${module.color}`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
                  >
                    Continue Learning
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Project Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 text-white">
            <h2 className="text-xl font-semibold">Project Milestones</h2>
            <p className="text-green-100">Track your project development timeline</p>
          </div>
          
          <div className="p-6">
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              {/* Milestones */}
              {projectMilestones.map((milestone, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  <div className="flex gap-4">
                    <div className={`
                      relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                      ${milestone.status === 'completed' ? 'bg-green-100 text-green-600' : 
                        milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                        'bg-gray-100 text-gray-400'}
                    `}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className={`
                        font-semibold
                        ${milestone.status === 'completed' ? 'text-green-600' : 
                          milestone.status === 'in-progress' ? 'text-blue-600' : 
                          'text-gray-500'}
                      `}>
                        {milestone.milestone}
                      </h3>
                      <p className="text-gray-500 text-sm">{milestone.date}</p>
                      
                      {milestone.status === 'in-progress' && (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded"
                        >
                          Update Progress
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProgress;