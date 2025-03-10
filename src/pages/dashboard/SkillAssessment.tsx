import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Code, Database, Layout, Server, Settings, BookOpen } from 'lucide-react';

const SkillAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock assessment questions
  const questions = [
    {
      id: 'q1',
      category: 'Frontend',
      question: 'Evaluate your proficiency with React hooks:',
      options: [
        { value: 1, label: 'Beginner: I understand basic useState and useEffect' },
        { value: 2, label: 'Intermediate: I can use most hooks efficiently' },
        { value: 3, label: 'Advanced: I create custom hooks and understand their internals' },
        { value: 4, label: 'Expert: I can optimize performance with memoization hooks' }
      ],
      icon: <Layout className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 'q2',
      category: 'Backend',
      question: 'How comfortable are you with Node.js and Express?',
      options: [
        { value: 1, label: 'Beginner: I can create basic routes' },
        { value: 2, label: 'Intermediate: I understand middleware and basic API design' },
        { value: 3, label: 'Advanced: I implement authentication and complex business logic' },
        { value: 4, label: 'Expert: I optimize performance and write scalable applications' }
      ],
      icon: <Server className="w-6 h-6 text-green-600" />
    },
    {
      id: 'q3',
      category: 'Database',
      question: 'Rate your database design and query optimization skills:',
      options: [
        { value: 1, label: 'Beginner: I can perform basic CRUD operations' },
        { value: 2, label: 'Intermediate: I understand relationships and normalization' },
        { value: 3, label: 'Advanced: I can optimize complex queries' },
        { value: 4, label: 'Expert: I design for scalability and implement advanced indexing strategies' }
      ],
      icon: <Database className="w-6 h-6 text-blue-600" />
    },
    {
      id: 'q4',
      category: 'DevOps',
      question: 'Assess your experience with deployment and CI/CD:',
      options: [
        { value: 1, label: 'Beginner: I\'ve deployed to platforms like Netlify or Vercel' },
        { value: 2, label: 'Intermediate: I can set up basic GitHub Actions or similar CI tools' },
        { value: 3, label: 'Advanced: I manage complex pipelines and containerized deployments' },
        { value: 4, label: 'Expert: I implement infrastructure as code and advanced monitoring' }
      ],
      icon: <Settings className="w-6 h-6 text-orange-600" />
    },
    {
      id: 'q5',
      category: 'Algorithms',
      question: 'How would you rate your problem-solving and algorithm skills?',
      options: [
        { value: 1, label: 'Beginner: I understand basic algorithms and data structures' },
        { value: 2, label: 'Intermediate: I can solve medium difficulty coding challenges' },
        { value: 3, label: 'Advanced: I optimize for time/space complexity in my solutions' },
        { value: 4, label: 'Expert: I can design and implement complex algorithms for specific use cases' }
      ],
      icon: <Code className="w-6 h-6 text-purple-600" />
    }
  ];

  const handleAnswer = (questionId: string, value: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to process assessment
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to results or dashboard
      navigate('/dashboard/user/progress', { state: { 
        assessmentCompleted: true,
        results: selectedAnswers
      }});
    }, 1500);
  };

  const currentQuestion = questions[currentStep - 1];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Skill Assessment</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep} of {questions.length}
            </span>
            <span className="text-sm font-medium text-indigo-600">
              {Math.round((currentStep / questions.length) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-white/20 mr-3">
                {currentQuestion.icon}
              </div>
              <div>
                <span className="text-indigo-200 text-sm">{currentQuestion.category}</span>
                <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${
                    selectedAnswers[currentQuestion.id] === option.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestion.id] === option.value
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-200'
                    }`}>
                      {selectedAnswers[currentQuestion.id] === option.value && <Check className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        selectedAnswers[currentQuestion.id] === option.value
                          ? 'text-indigo-700'
                          : 'text-gray-700'
                      }`}>
                        {option.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion.id] || isSubmitting}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-70 flex items-center ${
                  !selectedAnswers[currentQuestion.id] ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : currentStep === questions.length ? 'Submit Assessment' : 'Next Question'}
              </motion.button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
                <p className="text-sm text-gray-600">
                  This assessment helps personalize your learning path and recommend appropriate projects.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillAssessment;