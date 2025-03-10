import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload, Link as LinkIcon, ChevronDown, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const CreateProject = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: '',
    techStack: [] as string[],
    thumbnailUrl: '',
    githubUrl: '',
    demoUrl: '',
    videoUrl: '',
    lookingForCollaborators: false
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [techInput, setTechInput] = useState('');
  
  const techOptions = [
    'React', 'Angular', 'Vue', 'Svelte', 'Node.js', 'Express', 
    'MongoDB', 'PostgreSQL', 'Firebase', 'AWS', 'Docker',
    'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go'
  ];
  
  const projectTypes = [
    'Web Application', 'Mobile App', 'AI/ML Project', 
    'Data Visualization', 'Blockchain', 'IoT', 'Game'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTechStack = (tech: string) => {
    if (tech && !formData.techStack.includes(tech)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech]
      });
    }
    setTechInput('');
  };

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter(t => t !== tech)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Project data:', { ...formData, thumbnailUrl: imagePreview });
      
      // Navigate to projects page or show success
      navigate('/projects', { state: { createdProject: true }});
    } catch (error) {
      console.error('Error creating project:', error);
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
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-white/20 mr-3">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Project Details</h2>
                <p className="text-indigo-100 text-sm">Tell us about your innovation</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Give your project a descriptive name"
                />
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
                  placeholder="Describe your project, its purpose, and what problem it solves"
                />
              </div>
              
              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used <span className="text-red-500">*</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.techStack.map((tech) => (
                    <div 
                      key={tech}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {tech}
                      <button 
                        type="button" 
                        onClick={() => removeTechStack(tech)}
                        className="ml-2 text-indigo-600 hover:text-indigo-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add technologies (e.g., React, Node.js)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack(techInput))}
                  />
                  <button
                    type="button"
                    onClick={() => addTechStack(techInput)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-indigo-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
                
                {techInput && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {techOptions
                      .filter(option => 
                        option.toLowerCase().includes(techInput.toLowerCase()) && 
                        !formData.techStack.includes(option)
                      )
                      .slice(0, 5)
                      .map(suggestion => (
                        <motion.button
                          key={suggestion}
                          type="button"
                          onClick={() => addTechStack(suggestion)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-md"
                        >
                          {suggestion}
                        </motion.button>
                      ))
                    }
                  </div>
                )}
              </div>
              
              {/* Project Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Thumbnail
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div>
                        <img src={imagePreview} alt="Thumbnail preview" className="mx-auto h-32 w-auto rounded" />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1} />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                          >
                            <span>Upload an image</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Project Links */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub Repository
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="githubUrl"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://github.com/username/repository"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Demo URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="demoUrl"
                      name="demoUrl"
                      value={formData.demoUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://your-demo-site.com"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <LinkIcon className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                    Video Demo URL (YouTube, Vimeo, etc.)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="videoUrl"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Looking for Collaborators */}
              <div className="flex items-center">
                <input
                  id="lookingForCollaborators"
                  name="lookingForCollaborators"
                  type="checkbox"
                  checked={formData.lookingForCollaborators}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="lookingForCollaborators" className="ml-2 block text-sm text-gray-700">
                  I'm looking for collaborators on this project
                </label>
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
                      Creating Project...
                    </div>
                  ) : (
                    'Create Project'
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateProject;