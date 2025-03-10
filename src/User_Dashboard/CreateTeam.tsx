import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Users, ChevronDown, Upload } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const CreateTeam = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    hackathon: '',
    openRoles: [] as string[],
    teamSize: '3-5',
    communicationPreference: 'discord',
    ideaDescription: '',
    lookingForSkills: [] as string[],
    contactEmail: user?.email || '',
  });
  
  const [teamAvatar, setTeamAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleInput, setRoleInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  
  const hackathons = [
    'AI Innovation Challenge 2025',
    'Health Tech Hackathon',
    'Climate Action Hack 2025',
    'Smart Cities Hackathon',
    'Fintech Innovation Jam',
    'Blockchain for Good',
    'Education Empowerment Hack'
  ];
  
  const roleOptions = [
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
    'Data Scientist',
    'Project Manager',
    'Mobile Developer',
    'DevOps Engineer',
    'Content Writer',
    'Marketing Specialist'
  ];
  
  const skillOptions = [
    'React', 'Angular', 'Vue', 'Node.js', 'Python',
    'UI Design', 'UX Research', 'Machine Learning',
    'Data Analysis', 'Cloud Services', 'Mobile Development',
    'GraphQL', 'REST API', 'Technical Writing'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addRole = (role: string) => {
    if (role && !formData.openRoles.includes(role)) {
      setFormData({
        ...formData,
        openRoles: [...formData.openRoles, role]
      });
    }
    setRoleInput('');
  };

  const removeRole = (role: string) => {
    setFormData({
      ...formData,
      openRoles: formData.openRoles.filter(r => r !== role)
    });
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.lookingForSkills.includes(skill)) {
      setFormData({
        ...formData,
        lookingForSkills: [...formData.lookingForSkills, skill]
      });
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      lookingForSkills: formData.lookingForSkills.filter(s => s !== skill)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the data to your backend
      console.log('Team data:', { ...formData, teamAvatar });
      
      // Navigate to teams page or show success
      navigate('/teams', { state: { createdTeam: true }});
      
    } catch (error) {
      console.error('Error creating team:', error);
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
          <h1 className="text-2xl font-bold text-gray-900">Create New Team</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-6 text-white">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-white/20 mr-3">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Team Details</h2>
                <p className="text-indigo-100 text-sm">Find teammates for your next hackathon</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Team Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Give your team a catchy name"
                    />
                  </div>
                  
                  {/* Team Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Team Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Briefly describe your team, its goals, and what makes it unique"
                    />
                  </div>
                </div>
                
                {/* Team Avatar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Avatar</label>
                  <div className="mt-1 flex flex-col items-center">
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-2 border-dashed ${teamAvatar ? 'border-transparent' : 'border-gray-300'}`}>
                      {teamAvatar ? (
                        <img src={teamAvatar} alt="Team avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-4">
                          <Upload className="h-8 w-8 text-gray-400" strokeWidth={1} />
                          <p className="text-xs text-gray-500 mt-2">Upload team logo</p>
                        </div>
                      )}
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleAvatarChange}
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="mt-3 cursor-pointer text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      {teamAvatar ? "Change avatar" : "Select image"}
                    </label>
                    {teamAvatar && (
                      <button
                        type="button"
                        onClick={() => setTeamAvatar(null)}
                        className="mt-1 text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Hackathon Selection */}
              <div>
                <label htmlFor="hackathon" className="block text-sm font-medium text-gray-700 mb-1">
                  Participating Hackathon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="hackathon"
                    name="hackathon"
                    value={formData.hackathon}
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
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Team Size & Communication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size
                  </label>
                  <div className="relative">
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                    >
                      <option value="2-3">Small (2-3 people)</option>
                      <option value="3-5">Medium (3-5 people)</option>
                      <option value="5+">Large (5+ people)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="communicationPreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Communication
                  </label>
                  <div className="relative">
                    <select
                      id="communicationPreference"
                      name="communicationPreference"
                      value={formData.communicationPreference}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                    >
                      <option value="discord">Discord</option>
                      <option value="slack">Slack</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="telegram">Telegram</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Idea */}
              <div>
                <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Idea <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="ideaDescription"
                  name="ideaDescription"
                  rows={3}
                  value={formData.ideaDescription}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe your project idea for the hackathon"
                />
              </div>
              
              {/* Open Roles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roles You're Looking For <span className="text-red-500">*</span>
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.openRoles.map((role) => (
                    <div 
                      key={role}
                      className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {role}
                      <button 
                        type="button" 
                        onClick={() => removeRole(role)}
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
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add roles you need (e.g., Frontend Developer)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addRole(roleInput))}
                  />
                  <button
                    type="button"
                    onClick={() => addRole(roleInput)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-indigo-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
                
                {roleInput && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {roleOptions
                      .filter(option => 
                        option.toLowerCase().includes(roleInput.toLowerCase()) && 
                        !formData.openRoles.includes(option)
                      )
                      .slice(0, 5)
                      .map(suggestion => (
                        <motion.button
                          key={suggestion}
                          type="button"
                          onClick={() => addRole(suggestion)}
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
              
              {/* Skills Needed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills You're Looking For
                </label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.lookingForSkills.map((skill) => (
                    <div 
                      key={skill}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add skills you're looking for (e.g., React, Machine Learning)"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill(skillInput)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-purple-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
                
                {skillInput && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skillOptions
                      .filter(option => 
                        option.toLowerCase().includes(skillInput.toLowerCase()) && 
                        !formData.lookingForSkills.includes(option)
                      )
                      .slice(0, 5)
                      .map(suggestion => (
                        <motion.button
                          key={suggestion}
                          type="button"
                          onClick={() => addSkill(suggestion)}
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
              
              {/* Contact Email */}
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Email for interested teammates to contact you"
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
                      Creating Team...
                    </div>
                  ) : (
                    'Create Team'
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

export default CreateTeam;