import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User as UserIcon, 
  Calendar, 
  Mail, 
  Lock, 
  X, 
  CheckCircle, 
  Github, 
  Globe, 
  ChevronRight, 
  Briefcase, 
  Building,
  Loader2, 
  CheckCircle2
} from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'user' | 'organizer'>('user');
  const [step, setStep] = useState(1);
  
  // User form state
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '', // Add this field
    branch: '',       // Add this field
    graduationYear: '', // Add this field
    skills: [] as string[],
    skillInput: '',
    bio: '',
    linkedin: '',
    github: '',
  });
  
  // Organizer form state
  const [organizerForm, setOrganizerForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: '',
    website: '',
    reasonToJoin: '',
    pastEvents: '',
  });
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const form = role === 'user' ? userForm : organizerForm;
    
    // Common validations
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Role specific validations
    if (role === 'organizer') {
      if (!organizerForm.organization) newErrors.organization = 'Organization name is required';
      if (!organizerForm.reasonToJoin) newErrors.reasonToJoin = 'Please explain why you want to join as an organizer';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOrganizerFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrganizerForm(prev => ({ ...prev, [name]: value }));
  };
  
  const addSkill = () => {
    if (userForm.skillInput && !userForm.skills.includes(userForm.skillInput)) {
      setUserForm({
        ...userForm,
        skills: [...userForm.skills, userForm.skillInput],
        skillInput: ''
      });
    }
  };
  
  const removeSkill = (skill: string) => {
    setUserForm({
      ...userForm,
      skills: userForm.skills.filter(s => s !== skill)
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, you would send the form data to your backend
      console.log(role === 'user' ? userForm : organizerForm);
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set success messages based on role
      if (role === 'user') {
        setSuccessMessage('Your account has been created successfully! Redirecting to login...');
      } else {
        setSuccessMessage('Your organizer application has been submitted! We\'ll review it shortly.');
      }
      
      setSubmitSuccess(true);
      
      // Navigate after showing success message for a few seconds
      setTimeout(() => {
        if (role === 'user') {
          navigate('/user/login', { state: { registered: true } });
        } else {
          navigate('/organizer/login', { state: { applied: true } });
        }
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Success message component to show after successful submission
  const SuccessMessageComponent = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-white/20 text-center"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-green-400" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-4">Success!</h2>
      <p className="text-lg text-white/90 mb-6">{successMessage}</p>
      <div className="flex justify-center">
        <div className="w-12 h-1 bg-white/30 rounded-full relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3 }}
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${
          role === 'user' 
            ? 'bg-gradient-to-br from-indigo-800 to-blue-900' 
            : 'bg-gradient-to-br from-purple-900 to-indigo-900'
        } transition-colors duration-500`}></div>
        
        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: role === 'user' 
                  ? `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 255}, 0.1)` 
                  : `rgba(${Math.random() * 255}, ${Math.random() * 100}, ${Math.random() * 255}, 0.1)`,
              }}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: Math.random() * 8 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10"> {/* Changed py-16 to py-24 for more space */}
        {/* Adjust Back to Home link position */}
        <Link to="/" className="absolute top-20 left-4 text-white opacity-80 hover:opacity-100 flex items-center">
          <span>← Back to Home</span>
        </Link>
        
        {/* Add app title */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-white">HackHub</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto" // Changed from max-w-4xl to max-w-3xl
        >
          <div className="text-center mb-8">
            <motion.div 
              className={`mx-auto h-20 w-20 rounded-full flex items-center justify-center shadow-lg ${
                role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {role === 'user' ? (
                <UserIcon className="h-10 w-10 text-white" />
              ) : (
                <Calendar className="h-10 w-10 text-white" />
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-3xl font-extrabold text-white"
            >
              {role === 'user' ? 'Create Your Account' : 'Apply as an Organizer'}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`mt-2 text-${role === 'user' ? 'blue' : 'purple'}-200`}
            >
              {role === 'user' 
                ? 'Join our community to participate in hackathons and build amazing projects' 
                : 'Host your own hackathons and connect with talented developers'
              }
            </motion.p>
          </div>
          
          {/* Role selector tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm p-1 rounded-lg flex">
              <button
                onClick={() => setRole('user')}
                className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
                  role === 'user' 
                    ? 'bg-white text-indigo-900 shadow-sm' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Participant</span>
              </button>
              <button
                onClick={() => setRole('organizer')}
                className={`px-6 py-2 rounded-md transition-all flex items-center gap-2 ${
                  role === 'organizer' 
                    ? 'bg-white text-purple-900 shadow-sm' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Organizer</span>
              </button>
            </div>
          </div>
          
          {/* Form container */}
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20"
          > {/* Changed p-8 to p-6 for more compact form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-500 bg-opacity-20 border border-red-300 rounded-lg p-3 text-white text-center"
                >
                  {errors.submit}
                </motion.div>
              )}
              <AnimatePresence mode="wait">
                {role === 'user' ? (
                  <motion.div
                    key="user-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* User name field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={userForm.name}
                            onChange={handleUserFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-blue-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>

                      {/* User email field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={userForm.email}
                            onChange={handleUserFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-blue-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
                            placeholder="you@example.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* User password field */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                          Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={userForm.password}
                            onChange={handleUserFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-blue-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                      </div>

                      {/* User confirm password field */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                          Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CheckCircle className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={userForm.confirmPassword}
                            onChange={handleUserFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-blue-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    {/* Educational Information */}
                    <div className="border-t border-white/10 my-6 pt-6">
                      <h3 className="text-white text-lg font-medium mb-4">Educational Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Organization/College */}
                        <div>
                          <label htmlFor="organization" className="block text-sm font-medium text-white mb-1">
                            Organization/College <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-blue-300" />
                            </div>
                            <input
                              id="organization"
                              name="organization"
                              type="text"
                              value={userForm.organization}
                              onChange={handleUserFormChange}
                              required
                              className="appearance-none block w-full pl-10 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                              placeholder="e.g. MIT, Stanford University"
                            />
                          </div>
                        </div>
                        
                        {/* Branch */}
                        <div>
                          <label htmlFor="branch" className="block text-sm font-medium text-white mb-1">
                            Branch/Major <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-blue-300" />
                            </div>
                            <input
                              id="branch"
                              name="branch"
                              type="text"
                              value={userForm.branch}
                              onChange={handleUserFormChange}
                              required
                              className="appearance-none block w-full pl-10 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                              placeholder="e.g. Computer Science, Electrical Engineering"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Graduation Year */}
                      <div className="mb-6">
                        <label htmlFor="graduationYear" className="block text-sm font-medium text-white mb-1">
                          Expected Graduation Year <span className="text-red-400">*</span>
                        </label>
                        <div className="relative max-w-[200px]">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-blue-300" />
                          </div>
                          <select
                            id="graduationYear"
                            name="graduationYear"
                            value={userForm.graduationYear}
                            onChange={handleUserFormChange}
                            required
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                          >
                            <option value="" disabled className="text-gray-700">Select year</option>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                              <option key={year} value={year} className="text-gray-800">{year}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronRight className="h-4 w-4 text-blue-300 transform rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills section */}
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-white mb-1">
                        Your Skills
                      </label>
                      <div className="flex mb-2">
                        <div className="relative flex-grow">
                          <input
                            id="skillInput"
                            name="skillInput"
                            type="text"
                            value={userForm.skillInput}
                            onChange={handleUserFormChange}
                            className="appearance-none block w-full pl-3 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                            placeholder="Add a skill (e.g. React, Python)"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                        </div>
                        <motion.button
                          type="button"
                          onClick={addSkill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                        >
                          Add
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {userForm.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-indigo-500/30 px-3 py-1 rounded-full text-white flex items-center gap-2"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="text-white/70 hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Brief bio */}
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-white mb-1">
                        Brief Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={userForm.bio}
                        onChange={handleUserFormChange}
                        className="appearance-none block w-full px-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                        placeholder="Tell us a bit about yourself..."
                      />
                    </div>

                    {/* Social links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="github" className="block text-sm font-medium text-white mb-1">
                          GitHub (optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Github className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="github"
                            name="github"
                            type="text"
                            value={userForm.github}
                            onChange={handleUserFormChange}
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                            placeholder="github.com/username"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium text-white mb-1">
                          LinkedIn (optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            id="linkedin"
                            name="linkedin"
                            type="text"
                            value={userForm.linkedin}
                            onChange={handleUserFormChange}
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-blue-300 border-opacity-30 bg-white bg-opacity-10 placeholder-blue-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                            placeholder="linkedin.com/in/username"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="organizer-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Organizer name field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <UserIcon className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={organizerForm.name}
                            onChange={handleOrganizerFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                      </div>

                      {/* Organizer email field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={organizerForm.email}
                            onChange={handleOrganizerFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                            placeholder="organizer@example.com"
                          />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Organizer password field */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                          Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={organizerForm.password}
                            onChange={handleOrganizerFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                      </div>

                      {/* Organizer confirm password field */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                          Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CheckCircle className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={organizerForm.confirmPassword}
                            onChange={handleOrganizerFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                            placeholder="••••••••"
                          />
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Organization */}
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-white mb-1">
                          Organization <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="organization"
                            name="organization"
                            type="text"
                            value={organizerForm.organization}
                            onChange={handleOrganizerFormChange}
                            required
                            className={`appearance-none block w-full pl-10 pr-3 py-2 border ${errors.organization ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                            placeholder="Company or Institution"
                          />
                        </div>
                        {errors.organization && <p className="mt-1 text-sm text-red-400">{errors.organization}</p>}
                      </div>

                      {/* Role */}
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-white mb-1">
                          Your Role
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-purple-300" />
                          </div>
                          <input
                            id="role"
                            name="role"
                            type="text"
                            value={organizerForm.role}
                            onChange={handleOrganizerFormChange}
                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-purple-300 border-opacity-30 bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150"
                            placeholder="Event Manager, Program Director, etc."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Website */}
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-white mb-1">
                        Organization Website
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-purple-300" />
                        </div>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          value={organizerForm.website}
                          onChange={handleOrganizerFormChange}
                          className="appearance-none block w-full pl-10 pr-3 py-2 border border-purple-300 border-opacity-30 bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150"
                          placeholder="https://www.example.com"
                        />
                      </div>
                    </div>

                    {/* Reason to join */}
                    <div>
                      <label htmlFor="reasonToJoin" className="block text-sm font-medium text-white mb-1">
                        Why do you want to organize hackathons? <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="reasonToJoin"
                        name="reasonToJoin"
                        rows={3}
                        value={organizerForm.reasonToJoin}
                        onChange={handleOrganizerFormChange}
                        required
                        className={`appearance-none block w-full px-3 py-2 border ${errors.reasonToJoin ? 'border-red-500' : 'border-purple-300 border-opacity-30'} bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150`}
                        placeholder="Tell us about your goals and aspirations as a hackathon organizer..."
                      />
                      {errors.reasonToJoin && <p className="mt-1 text-sm text-red-400">{errors.reasonToJoin}</p>}
                    </div>

                    {/* Past Events */}
                    <div>
                      <label htmlFor="pastEvents" className="block text-sm font-medium text-white mb-1">
                        Past events experience (if any)
                      </label>
                      <textarea
                        id="pastEvents"
                        name="pastEvents"
                        rows={3}
                        value={organizerForm.pastEvents}
                        onChange={handleOrganizerFormChange}
                        className="appearance-none block w-full px-3 py-2 border border-purple-300 border-opacity-30 bg-white bg-opacity-10 placeholder-purple-300 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-150"
                        placeholder="Describe any events you've organized in the past..."
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* OAuth options */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-indigo-900 text-white/70 text-sm">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    // In a real app, you would implement OAuth with GitHub
                    console.log('GitHub OAuth');
                    setTimeout(() => setIsLoading(false), 1000);
                  }}
                  className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    // In a real app, you would implement OAuth with Google
                    console.log('Google OAuth');
                    setTimeout(() => setIsLoading(false), 1000);
                  }}
                  className="flex items-center justify-center px-4 py-2 border border-white/20 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </motion.button>
              </div>

              {/* Terms and conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-white">
                    I agree to the <a href="#" className="underline">Terms and Conditions</a> and <a href="#" className="underline">Privacy Policy</a>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-full text-lg font-medium shadow-lg ${
                    role === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  } ${isLoading ? 'opacity-80' : ''}`}
                  whileHover={!isLoading ? { scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {role === 'user' ? 'Creating Account...' : 'Submitting Application...'}
                    </div>
                  ) : (
                    role === 'user' ? 'Create Account' : 'Submit Application'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
          
          {/* Already have an account */}
          <div className="mt-6 text-center text-white">
            Already have an account?{' '}
            <Link to={role === 'user' ? "/user/login" : "/organizer/login"} className="font-medium underline">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;