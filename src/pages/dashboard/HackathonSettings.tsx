import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, Globe, Tag, Upload, Users, Info, 
  Trash2, Plus, Settings, Save, Bell, Mail, Shield, CheckSquare,
  X, Award, MessageSquare, AlertTriangle, Lock, Edit
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const HackathonSettings = () => {
  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    categoryInput: '',
    prizeDetails: '',
    rules: '',
    eligibility: '',
    judging: '',
    resources: '',
    faqs: [] as { question: string; answer: string }[],
    bannerImage: '',
    isPublished: false,
    requireApproval: true,
    autoTeamMatching: true,
    allowTeamChanges: true,
    enableCommunications: true,
    enableMentorship: true,
    requireSubmissionApproval: true,
    notifyOnRegistration: true,
    notifyOnSubmission: true,
    customDomain: '',
    analyticsTrackingId: '',
    customCss: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    setHasChanges(true);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setFormData(prev => ({ ...prev, [name]: numValue }));
      setHasChanges(true);
    }
  };

  const handleAddCategory = () => {
    if (formData.categoryInput.trim() !== '' && !formData.categories.includes(formData.categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, prev.categoryInput.trim()],
        categoryInput: ''
      }));
      setHasChanges(true);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
    setHasChanges(true);
  };

  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
    setHasChanges(true);
  };

  const handleRemoveFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
    setHasChanges(true);
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData(prev => ({
      ...prev,
      faqs: updatedFaqs
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // In a real app, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved settings:', formData);
      setHasChanges(false);
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
      // Show error message
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteHackathon = async () => {
    try {
      // In a real app, you'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleted hackathon:', hackathonId);
      navigate('/dashboard/organizer');
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      // Show error message
    }
  };

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        // In a real app, you'd fetch data from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        setFormData({
          title: 'AI Innovation Challenge',
          description: 'A hackathon focused on innovative AI solutions to real-world problems.',
          shortDescription: 'Build cutting-edge AI solutions',
          startDate: '2024-03-15T09:00',
          endDate: '2024-03-17T17:00',
          timezone: 'UTC-5',
          location: 'Virtual',
          format: '48-hour hackathon',
          maxTeamSize: 4,
          skillLevel: 'All Levels',
          categories: ['AI/ML', 'Data Science', 'Cloud Computing'],
          categoryInput: '',
          prizeDetails: '$10,000 in total prizes',
          rules: 'All code must be written during the hackathon. Pre-existing libraries and frameworks are allowed.',
          eligibility: 'Open to all college students and professionals.',
          judging: 'Projects will be judged based on innovation, technical complexity, design, and presentation.',
          resources: 'We provide access to cloud computing resources and datasets for all participants.',
          faqs: [
            { 
              question: 'What skills do I need to participate?', 
              answer: 'Participants should have basic programming knowledge. Experience with AI/ML frameworks is beneficial but not required.' 
            },
            { 
              question: 'Do I need to have a team?', 
              answer: 'No, you can register as an individual and form a team during the event.' 
            }
          ],
          bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          isPublished: true,
          requireApproval: true,
          autoTeamMatching: true,
          allowTeamChanges: true,
          enableCommunications: true,
          enableMentorship: true,
          requireSubmissionApproval: true,
          notifyOnRegistration: true,
          notifyOnSubmission: true,
          customDomain: '',
          analyticsTrackingId: '',
          customCss: ''
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching hackathon:', error);
        setIsLoading(false);
      }
    };
    
    fetchHackathon();
  }, [hackathonId]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => navigate('/dashboard/organizer')}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{formData.title}</h1>
              <p className="text-gray-600">Hackathon Settings</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {hasChanges && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </motion.button>
            )}
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 md:mr-2 inline-block" />
              <span className="hidden md:inline-block">Delete Hackathon</span>
            </button>
          </div>
        </div>
        
        {/* Settings Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto p-1">
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'general' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'guidelines' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('guidelines')}
              >
                Guidelines & Rules
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'faqs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('faqs')}
              >
                FAQs
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'appearance' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('appearance')}
              >
                Appearance
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap ${
                  activeTab === 'advanced' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('advanced')}
              >
                Advanced
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Hackathon Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC+1">Central European Time (UTC+1)</option>
                      <option value="UTC+5:30">Indian Standard Time (UTC+5:30)</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="Virtual">Virtual</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-1">
                      Format
                    </label>
                    <input
                      type="text"
                      id="format"
                      name="format"
                      value={formData.format}
                      onChange={handleInputChange}
                      placeholder="e.g., 48-hour hackathon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Skill Level
                    </label>
                    <select
                      id="skillLevel"
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="All Levels">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="maxTeamSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Maximum Team Size
                    </label>
                    <input
                      type="number"
                      id="maxTeamSize"
                      name="maxTeamSize"
                      min="1"
                      max="10"
                      value={formData.maxTeamSize}
                      onChange={handleNumberChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="prizeDetails" className="block text-sm font-medium text-gray-700 mb-1">
                      Prize Details
                    </label>
                    <input
                      type="text"
                      id="prizeDetails"
                      name="prizeDetails"
                      value={formData.prizeDetails}
                      onChange={handleInputChange}
                      placeholder="e.g., $10,000 in prizes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categories
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.categories.map(category => (
                        <div key={category} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md text-sm flex items-center">
                          {category}
                          <button 
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-1 text-indigo-600 hover:text-indigo-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        id="categoryInput"
                        name="categoryInput"
                        value={formData.categoryInput}
                        onChange={handleInputChange}
                        placeholder="Add a category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddCategory}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                    Publish this hackathon (make it visible to participants)
                  </label>
                </div>
              </div>
            )}
            
            {activeTab === 'guidelines' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Guidelines & Rules</h2>
                
                <div>
                  <label htmlFor="rules" className="block text-sm font-medium text-gray-700 mb-1">
                    Rules
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    value={formData.rules}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">
                    Eligibility
                  </label>
                  <textarea
                    id="eligibility"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="judging" className="block text-sm font-medium text-gray-700 mb-1">
                    Judging Criteria
                  </label>
                  <textarea
                    id="judging"
                    name="judging"
                    value={formData.judging}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="resources" className="block text-sm font-medium text-gray-700 mb-1">
                    Resources & Support
                  </label>
                  <textarea
                    id="resources"
                    name="resources"
                    value={formData.resources}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            )}
            
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
                  <button
                    onClick={handleAddFaq}
                    className="flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add FAQ
                  </button>
                </div>
                
                {formData.faqs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No FAQs yet. Add some to help participants.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.faqs.map((faq, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium text-gray-700">FAQ #{index + 1}</h3>
                          <button
                            onClick={() => handleRemoveFaq(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                              placeholder="Question"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <textarea
                              value={faq.answer}
                              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                              placeholder="Answer"
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
                
                <div>
                  <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Image URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="bannerImage"
                      name="bannerImage"
                      value={formData.bannerImage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter image URL or upload"
                    />
                    <button className="ml-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Upload className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {formData.bannerImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img 
                      src={formData.bannerImage} 
                      alt="Banner preview" 
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        // Handle image load error
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x200?text=Banner+Preview';
                      }}
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="customCss" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom CSS (Advanced)
                  </label>
                  <textarea
                    id="customCss"
                    name="customCss"
                    value={formData.customCss}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                    placeholder="/* Add custom CSS here */"
                  ></textarea>
                </div>
              </div>
            )}
            
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireApproval"
                      name="requireApproval"
                      checked={formData.requireApproval}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="requireApproval" className="ml-2 text-gray-700 flex items-center">
                      <span>Require approval for participant registration</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoTeamMatching"
                      name="autoTeamMatching"
                      checked={formData.autoTeamMatching}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="autoTeamMatching" className="ml-2 text-gray-700 flex items-center">
                      <span>Enable automatic team matching for participants</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="allowTeamChanges"
                      name="allowTeamChanges"
                      checked={formData.allowTeamChanges}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="allowTeamChanges" className="ml-2 text-gray-700 flex items-center">
                      <span>Allow team changes after submission deadline</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableCommunications"
                      name="enableCommunications"
                      checked={formData.enableCommunications}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="enableCommunications" className="ml-2 text-gray-700 flex items-center">
                      <span>Enable chat and communications between participants</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableMentorship"
                      name="enableMentorship"
                      checked={formData.enableMentorship}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="enableMentorship" className="ml-2 text-gray-700 flex items-center">
                      <span>Enable mentor access and scheduling</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireSubmissionApproval"
                      name="requireSubmissionApproval"
                      checked={formData.requireSubmissionApproval}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="requireSubmissionApproval" className="ml-2 text-gray-700 flex items-center">
                      <span>Require approval for project submissions</span>
                      <Info className="w-4 h-4 text-gray-400 ml-1" />
                    </label>
                  </div>

                  <h3 className="text-md font-medium text-gray-800 mt-8 mb-3">Notifications</h3>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyOnRegistration"
                      name="notifyOnRegistration"
                      checked={formData.notifyOnRegistration}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="notifyOnRegistration" className="ml-2 text-gray-700">
                      Notify organizers on new registrations
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifyOnSubmission"
                      name="notifyOnSubmission"
                      checked={formData.notifyOnSubmission}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="notifyOnSubmission" className="ml-2 text-gray-700">
                      Notify organizers on new project submissions
                    </label>
                  </div>

                  <h3 className="text-md font-medium text-gray-800 mt-8 mb-3">Advanced Configuration</h3>

                  <div>
                    <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Domain (Optional)
                    </label>
                    <input
                      type="text"
                      id="customDomain"
                      name="customDomain"
                      value={formData.customDomain}
                      onChange={handleInputChange}
                      placeholder="hackathon.yourdomain.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="analyticsTrackingId" className="block text-sm font-medium text-gray-700 mb-1">
                      Analytics Tracking ID (Optional)
                    </label>
                    <input
                      type="text"
                      id="analyticsTrackingId"
                      name="analyticsTrackingId"
                      value={formData.analyticsTrackingId}
                      onChange={handleInputChange}
                      placeholder="e.g., GA-12345678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-red-800">Danger Zone</h4>
                          <p className="text-sm text-red-700 mt-1">
                            Once deleted, a hackathon cannot be recovered. Please be certain.
                          </p>
                          <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 inline-flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete this hackathon
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Hackathon</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>{formData.title}</strong>? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleDeleteHackathon}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Yes, delete hackathon
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonSettings;