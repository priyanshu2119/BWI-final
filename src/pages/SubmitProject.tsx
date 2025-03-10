import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Paperclip, Link, Check, X, Globe, Github, Youtube } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const SubmitProject = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    projectName: '',
    hackathonName: '',
    description: '',
    techStack: [] as string[],
    repoUrl: '',
    demoUrl: '',
    videoUrl: '',
    teamMembers: [user?.name || ''] as string[],
    challenges: '',
    achievements: '',
    futureEnhancements: '',
  });
  
  const hackathons = [
    'AI Innovation Challenge 2025',
    'Health Tech Hackathon',
    'Climate Action Hack 2025',
    'Smart Cities Hackathon',
    'Fintech Innovation Jam',
    'Blockchain for Good'
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map(tech => tech.trim()).filter(Boolean);
    setFormData({
      ...formData,
      techStack: techs
    });
  };
  
  const handleTeamMemberChange = (index: number, value: string) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = value;
    setFormData({
      ...formData,
      teamMembers: newTeamMembers
    });
  };
  
  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, '']
    });
  };
  
  const removeTeamMember = (index: number) => {
    const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      teamMembers: newTeamMembers
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newUploadedFiles = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
      
      // Generate previews
      const newPreviews: string[] = [];
      newUploadedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newUploadedFiles.length) {
            setPreviewImages([...previewImages, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const removeImage = (index: number) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Project data:', { ...formData, files: uploadedFiles });
      
      // Show success message
      setSuccessMessage('Your project has been successfully submitted! The hackathon organizers will review it shortly.');
      
      // Reset form or redirect after a delay
      setTimeout(() => {
        navigate('/dashboard/user');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting project:', error);
    } finally {
      setIsSubmitting(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Submit Your Hackathon Project</h1>
        </div>
        
        {successMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Project Submitted!</h2>
            <p className="text-green-700">{successMessage}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-white/20 mr-3">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Project Submission</h2>
                  <p className="text-indigo-100 text-sm">Share your hackathon project with the community</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name and Hackathon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your project name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hackathonName" className="block text-sm font-medium text-gray-700 mb-1">
                      Hackathon <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="hackathonName"
                        name="hackathonName"
                        value={formData.hackathonName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                      >
                        <option value="">Select hackathon</option>
                        {hackathons.map((hackathon) => (
                          <option key={hackathon} value={hackathon}>{hackathon}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your project, its goals, and how it works..."
                  />
                </div>
                
                {/* Tech Stack */}
                <div>
                  <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="techStack"
                    name="techStack"
                    value={formData.techStack.join(", ")}
                    onChange={handleTechStackChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="React, Node.js, MongoDB, etc. (comma separated)"
                  />
                </div>
                
                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Repository URL <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Github className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        id="repoUrl"
                        name="repoUrl"
                        value={formData.repoUrl}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      Demo URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        id="demoUrl"
                        name="demoUrl"
                        value={formData.demoUrl}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Demo Video URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Youtube className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>
                
                {/* Team Members */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Members <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={member}
                          onChange={(e) => handleTeamMemberChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder={`Team member ${index + 1}`}
                          required={index === 0}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTeamMember(index)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {formData.teamMembers.length < 6 && (
                      <motion.button
                        type="button"
                        onClick={addTeamMember}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-2 px-4 py-2 border border-dashed border-indigo-300 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center justify-center w-full"
                      >
                        + Add Team Member
                      </motion.button>
                    )}
                  </div>
                </div>
                
                {/* Screenshots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Screenshots
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {previewImages.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                          <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    {previewImages.length < 8 && (
                      <div className="aspect-w-16 aspect-h-9">
                        <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <Upload className="w-6 h-6 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                            multiple
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Challenges and Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                      Challenges Faced
                    </label>
                    <textarea
                      id="challenges"
                      name="challenges"
                      rows={3}
                      value={formData.challenges}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="What challenges did you face during development?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 mb-1">
                      Achievements
                    </label>
                    <textarea
                      id="achievements"
                      name="achievements"
                      rows={3}
                      value={formData.achievements}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="What are you most proud of about this project?"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="futureEnhancements" className="block text-sm font-medium text-gray-700 mb-1">
                    Future Enhancements
                  </label>
                  <textarea
                    id="futureEnhancements"
                    name="futureEnhancements"
                    rows={3}
                    value={formData.futureEnhancements}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="How do you plan to enhance this project in the future?"
                  />
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Project...
                      </div>
                    ) : (
                      'Submit Project'
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubmitProject;