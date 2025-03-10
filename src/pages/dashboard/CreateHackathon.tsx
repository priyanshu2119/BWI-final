import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Globe, Tag, Upload, Users, Info, Trash2, Plus, Check } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const CreateHackathon = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [bannerPreview, setBannerPreview] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    startDate: '',
    endDate: '',
    timezone: 'UTC',
    location: 'Virtual',
    format: 'Online',
    maxTeamSize: 4,
    skillLevel: 'All Levels',
    categories: [] as string[],
    prizeDetails: '',
    rules: '',
    eligibility: '',
    judging: '',
    resources: '',
    banner: null as File | null,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle banner upload
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, banner: file });
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle category input
  const handleCategoryAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value.trim();
      
      if (value && !formData.categories.includes(value)) {
        setFormData({
          ...formData,
          categories: [...formData.categories, value]
        });
        input.value = '';
      }
    }
  };

  // Remove category
  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter(c => c !== category)
    });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Form data:', formData);
      
      // Navigate to organizer dashboard
      navigate('/organizer/dashboard', { state: { success: 'Hackathon created successfully!' } });
    } catch (error) {
      console.error('Error creating hackathon:', error);
      setIsSubmitting(false);
    }
  };

  // Next step
  const goToNextStep = () => {
    setActiveStep(prevStep => prevStep + 1);
    window.scrollTo(0, 0);
  };

  // Previous step
  const goToPreviousStep = () => {
    setActiveStep(prevStep => prevStep - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Create Hackathon</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress steps */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <div className="flex justify-between">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step < activeStep ? 'bg-green-500 text-white' : 
                    step === activeStep ? 'bg-white text-indigo-600' : 
                    'bg-white/30 text-white'
                  }`}>
                    {step < activeStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${step <= activeStep ? 'text-white' : 'text-white/70'}`}>
                    {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Basic Information */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Basic Information</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Hackathon Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. AI Innovation Challenge 2025"
                  />
                </div>
                
                <div>
                  <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="A brief one-line description (max 100 characters)"
                    maxLength={100}
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Detailed description of your hackathon..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Details</h2>
                
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="PST">PST</option>
                    <option value="EST">EST</option>
                    <option value="CST">CST</option>
                    <option value="MST">MST</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g. Virtual, New York, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                    Format <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="format"
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Online">Online</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Team Size <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="maxTeamSize"
                    name="maxTeamSize"
                    value={formData.maxTeamSize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min={1}
                    max={10}
                  />
                </div>
                
                <div>
                  <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="skillLevel"
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                    Categories <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="categories"
                    name="categories"
                    onKeyDown={handleCategoryAdd}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Press Enter to add categories"
                  />
                  <div className="flex flex-wrap mt-2">
                    {formData.categories.map((category, index) => (
                      <div key={index} className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mr-2 mb-2">
                        <span>{category}</span>
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="ml-2 focus:outline-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="prizeDetails" className="block text-sm font-medium text-gray-700 mb-1">
                    Prize Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="prizeDetails"
                    name="prizeDetails"
                    value={formData.prizeDetails}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Details about the prizes..."
                  />
                </div>
                
                <div>
                  <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
                    Rules <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Rules and guidelines for the hackathon..."
                  />
                </div>
                
                <div>
                  <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">
                    Eligibility <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Eligibility criteria for participants..."
                  />
                </div>
                
                <div>
                  <label htmlFor="judging" className="block text-sm font-medium text-gray-700 mb-1">
                    Judging Criteria <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="judging"
                    name="judging"
                    value={formData.judging}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Criteria for judging the submissions..."
                  />
                </div>
                
                <div>
                  <label htmlFor="resources" className="block text-sm font-medium text-gray-700 mb-1">
                    Resources <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="resources"
                    name="resources"
                    value={formData.resources}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Resources and tools available for participants..."
                  />
                </div>
                
                <div>
                  <label htmlFor="banner" className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {bannerPreview && (
                    <div className="mt-4">
                      <img src={bannerPreview} alt="Banner Preview" className="w-full h-48 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Review</h2>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h3>
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Short Description:</strong> {formData.shortDescription}</p>
                  <p><strong>Full Description:</strong> {formData.description}</p>
                  <p><strong>Start Date:</strong> {formData.startDate}</p>
                  <p><strong>End Date:</strong> {formData.endDate}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Details</h3>
                  <p><strong>Timezone:</strong> {formData.timezone}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                  <p><strong>Format:</strong> {formData.format}</p>
                  <p><strong>Maximum Team Size:</strong> {formData.maxTeamSize}</p>
                  <p><strong>Skill Level:</strong> {formData.skillLevel}</p>
                  <p><strong>Categories:</strong> {formData.categories.join(', ')}</p>
                  <p><strong>Prize Details:</strong> {formData.prizeDetails}</p>
                  <p><strong>Rules:</strong> {formData.rules}</p>
                  <p><strong>Eligibility:</strong> {formData.eligibility}</p>
                  <p><strong>Judging Criteria:</strong> {formData.judging}</p>
                  <p><strong>Resources:</strong> {formData.resources}</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Banner Image</h3>
                  {bannerPreview && (
                    <img src={bannerPreview} alt="Banner Preview" className="w-full h-48 object-cover rounded-lg" />
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {activeStep > 1 && (
                <motion.button
                  type="button"
                  onClick={goToPreviousStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Previous
                </motion.button>
              )}
              
              {activeStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={goToNextStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateHackathon;