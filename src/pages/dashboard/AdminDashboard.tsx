import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Users, Settings, Shield, Database, Award, AlertTriangle, Zap, Gift, Coffee, Crown } from 'lucide-react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const AdminDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activePanel, setActivePanel] = useState('powers');
  const [approvedSomeone, setApprovedSomeone] = useState(false);

  // Fun functions
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-16 pb-8">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      
      {/* Hero Admin Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white mb-4">
                  <Crown className="h-4 w-4 mr-1" />
                  SUPREME ADMIN POWERS
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                  Welcome back, {user?.name?.split(' ')[0] || 'Mastermind'}!
                </h1>
                <p className="mt-2 text-indigo-200 max-w-2xl">
                  With great power comes great responsibility... and the ability to make last-minute hackathon tweaks
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 hover:bg-white/30 transition-all shadow-lg"
                onClick={triggerConfetti}
              >
                <Zap className="h-5 w-5" />
                <span>Deploy Admin Magic</span>
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-indigo-200 text-sm">Pending Approvals</p>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-3xl font-bold">7</span>
                  <span className="text-white/70 text-sm">Since yesterday</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-indigo-200 text-sm">Content Updates</p>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-3xl font-bold">12</span>
                  <span className="text-white/70 text-sm">This week</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-indigo-200 text-sm">Admin Actions</p>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-3xl font-bold">23</span>
                  <span className="text-white/70 text-sm">This month</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <p className="text-indigo-200 text-sm">System Status</p>
                <div className="flex items-end mt-2">
                  <span className="text-xl font-bold bg-green-400/20 text-green-300 px-3 py-0.5 rounded-full">All Systems Groovy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Option Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-6 bg-gray-800/50 p-2 rounded-xl">
          {[
            { id: 'powers', label: '⚡ Admin Powers', icon: <Shield className="w-4 h-4 mr-2" /> },
            { id: 'approvals', label: '👍 Approvals Queue', icon: <Users className="w-4 h-4 mr-2" /> },
            { id: 'content', label: '📝 Content Manager', icon: <Database className="w-4 h-4 mr-2" /> },
            { id: 'interventions', label: '🎯 Special Interventions', icon: <Award className="w-4 h-4 mr-2" /> },
            { id: 'reports', label: '🕵️‍♂️ Suspicious Activity', icon: <AlertTriangle className="w-4 h-4 mr-2" /> }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`px-4 py-3 rounded-lg whitespace-nowrap flex items-center ${
                activePanel === tab.id 
                  ? 'bg-indigo-600 text-white font-medium' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActivePanel(tab.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          {activePanel === 'powers' && (
            <motion.div
              key="powers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <PowerCard 
                title="User Overlord"
                description="Manage all users and their permissions"
                icon={<Users className="text-indigo-400" size={24} />}
                color="from-indigo-500 to-blue-600"
                actions={[
                  { label: "View All Users", icon: <Users size={16} /> },
                  { label: "Reset Passwords", icon: <Shield size={16} /> },
                  { label: "Ban Troublemakers", icon: <AlertTriangle size={16} /> },
                ]}
              />
              
              <PowerCard 
                title="Content Wizard"
                description="Edit website content with magical powers"
                icon={<Database className="text-emerald-400" size={24} />}
                color="from-emerald-500 to-teal-600"
                actions={[
                  { label: "Edit Homepage", icon: <Settings size={16} /> },
                  { label: "Manage FAQs", icon: <Database size={16} /> },
                  { label: "Update Resources", icon: <Database size={16} /> },
                ]}
              />
              
              <PowerCard 
                title="Judge Overseer"
                description="Ensure fair judging across all events"
                icon={<Award className="text-amber-400" size={24} />}
                color="from-amber-500 to-orange-600"
                actions={[
                  { label: "Review Judges", icon: <Shield size={16} /> },
                  { label: "Replace Biased Judge", icon: <AlertTriangle size={16} /> },
                  { label: "View All Scores", icon: <Award size={16} /> },
                ]}
              />
              
              <PowerCard 
                title="Team Booster"
                description="Give special bonuses to deserving teams"
                icon={<Gift className="text-pink-400" size={24} />}
                color="from-pink-500 to-rose-600"
                actions={[
                  { label: "Award Bonus Points", icon: <Gift size={16} />, onClick: triggerConfetti },
                  { label: "Add Special Badge", icon: <Award size={16} /> },
                  { label: "Feature on Homepage", icon: <Zap size={16} /> },
                ]}
              />
              
              <PowerCard 
                title="Mentor Manager"
                description="Oversee mentors and their assignments"
                icon={<Coffee className="text-purple-400" size={24} />}
                color="from-purple-500 to-violet-600"
                actions={[
                  { label: "Review Mentors", icon: <Users size={16} /> },
                  { label: "Reassign Mentors", icon: <Settings size={16} /> },
                  { label: "Revoke Access", icon: <AlertTriangle size={16} /> },
                ]}
              />
              
              <PowerCard 
                title="System Overlord"
                description="Fine-tune the hackathon platform"
                icon={<Settings className="text-cyan-400" size={24} />}
                color="from-cyan-500 to-blue-600"
                actions={[
                  { label: "System Settings", icon: <Settings size={16} /> },
                  { label: "View Logs", icon: <Database size={16} /> },
                  { label: "Toggle Features", icon: <Shield size={16} /> },
                ]}
              />
            </motion.div>
          )}
          
          {activePanel === 'approvals' && (
            <motion.div
              key="approvals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="mr-2 text-indigo-600" size={24} />
                  Pending Approvals
                </h2>
                <div className="flex gap-2 mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    All (7)
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Organizers (3)
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Mentors (4)
                  </div>
                </div>
                
                {/* Pending approvals table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: "Alex Johnson", role: "Mentor", applied: "2d ago", experience: "Senior Dev at Google" },
                        { name: "Maria Rodriguez", role: "Organizer", applied: "1d ago", experience: "Event Manager" },
                        { name: "David Kim", role: "Mentor", applied: "3d ago", experience: "ML Engineer" }
                      ].map((person, i) => (
                        <motion.tr 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {person.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                <div className="text-sm text-gray-500">{person.name.toLowerCase().replace(' ', '.') + '@example.com'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              person.role === 'Mentor' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {person.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.applied}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {person.experience}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                onClick={() => {
                                  triggerConfetti();
                                  setApprovedSomeone(true);
                                }}
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                              >
                                Reject
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
          
          {activePanel === 'interventions' && (
            <motion.div
              key="interventions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center">
                    <Gift className="mr-2 text-pink-600" size={24} />
                    Special Interventions
                  </h2>
                  <p className="text-gray-500 mb-6">Use your admin powers to make special adjustments</p>
                  
                  {/* Bonus Points Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Award Bonus Points</h3>
                    <div className="bg-pink-50 border border-pink-100 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hackathon</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200">
                            <option>AI Innovation Challenge</option>
                            <option>Web3 Builders Hackathon</option>
                            <option>Mobile App Sprint</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Team/Participant</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200">
                            <option>Team Quantum Leap</option>
                            <option>Neural Ninjas</option>
                            <option>BlockWizards</option>
                            <option>Mobile Mavericks</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Points</label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                              type="number"
                              className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-lg"
                              placeholder="0"
                              defaultValue="5"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <label htmlFor="bonus-type" className="sr-only">Bonus Type</label>
                              <select
                                id="bonus-type"
                                className="focus:ring-pink-500 focus:border-pink-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                              >
                                <option>points</option>
                                <option>%</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Bonus</label>
                        <textarea 
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200" 
                          rows={2}
                          placeholder="Explain why you're awarding bonus points..."
                          defaultValue="Exceptional creativity and technical implementation"
                        ></textarea>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none gap-2"
                          onClick={triggerConfetti}
                        >
                          <Gift size={16} />
                          Award Bonus Points
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Judge Replacement Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Replace Biased Judge</h3>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Judge</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200">
                            <option>Sarah Thompson (AI Challenge)</option>
                            <option>Michael Chen (Web3 Hackathon)</option>
                            <option>Jessica Williams (Mobile Sprint)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Replacement Judge</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200">
                            <option>Robert Johnson</option>
                            <option>Emily Davis</option>
                            <option>Daniel Garcia</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Replacement</label>
                        <textarea 
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200" 
                          rows={2}
                          placeholder="Explain why you're replacing this judge..."
                          defaultValue="Potential conflict of interest with Team Quantum Leap"
                        ></textarea>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center">
                          <input
                            id="reset-scores"
                            name="reset-scores"
                            type="checkbox"
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                          />
                          <label htmlFor="reset-scores" className="ml-2 block text-sm text-gray-700">
                            Reset previous scores by this judge
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none gap-2"
                        >
                          <Shield size={16} />
                          Replace Judge
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Revoke Position Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revoke Position</h3>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Role Type</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring focus:ring-red-200">
                            <option>Organizer</option>
                            <option>Mentor</option>
                            <option>Judge</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Person</label>
                          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring focus:ring-red-200">
                            <option>John Smith (Mentor, AI Challenge)</option>
                            <option>Emma Watson (Organizer, Web3 Hackathon)</option>
                            <option>Tyler Durden (Judge, Mobile Sprint)</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Revocation</label>
                        <textarea 
                          className="w-full border-gray-300 rounded-lg shadow-sm focus:border-red-500 focus:ring focus:ring-red-200" 
                          rows={2}
                          placeholder="Explain why you're revoking this position..."
                        ></textarea>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center">
                          <input
                            id="notify-person"
                            name="notify-person"
                            type="checkbox"
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            defaultChecked
                          />
                          <label htmlFor="notify-person" className="ml-2 block text-sm text-gray-700">
                            Notify this person via email
                          </label>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none gap-2"
                        >
                          <AlertTriangle size={16} />
                          Revoke Position
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Fun elements that appear based on actions */}
      <AnimatePresence>
        {approvedSomeone && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-xl shadow-lg text-white flex items-center gap-3"
          >
            <div className="bg-white/20 rounded-full p-2">
              <Users size={24} />
            </div>
            <div>
              <p className="font-medium">Team member approved!</p>
              <p className="text-sm opacity-80">They've been notified via email</p>
            </div>
            <button 
              className="ml-2 text-white/80 hover:text-white"
              onClick={() => setApprovedSomeone(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add these new goofy features */}
      
      {/* Super Secret Admin Panel */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-8 z-10"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px 5px rgba(138, 58, 185, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-2xl shadow-lg font-bold flex items-center gap-2"
          onClick={() => {
            // Fun surprise action
            const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-37a.mp3');
            audio.play();
            
            // Make the page wiggle
            document.body.animate([
              { transform: 'rotate(0deg)' },
              { transform: 'rotate(1deg)' },
              { transform: 'rotate(0deg)' },
              { transform: 'rotate(-1deg)' },
              { transform: 'rotate(0deg)' }
            ], { duration: 200, iterations: 3 });
            
            triggerConfetti();
            
            setTimeout(() => {
              alert("🎉 YOU'VE DISCOVERED THE SECRET ADMIN BUTTON! 🎉\n\nUnlimited power has been granted to you for the next 5 minutes.\n\n...just kidding, but you do look awesome today!");
            }, 500);
          }}
        >
          <span className="mr-1">🔮</span> Secret Admin Button
        </motion.button>
      </motion.div>
      
      {/* Add these components to the main content section */}
      {activePanel === 'content' && (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="mr-2 text-teal-600" size={24} />
              Website Content Manager
            </h2>
            
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-medium text-teal-800 mb-4">Quick Edit Popular Content</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {[
                  { title: "Homepage Hero", icon: "🏠", color: "teal" },
                  { title: "Prizes Section", icon: "🏆", color: "amber" },
                  { title: "FAQ Section", icon: "❓", color: "purple" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.97 }}
                    className={`bg-white border border-${item.color}-200 rounded-xl p-4 shadow-sm cursor-pointer group`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className={`text-xs font-medium text-${item.color}-600 bg-${item.color}-100 px-2 py-0.5 rounded-full`}>
                        Updated 2d ago
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Click to edit content</p>
                    <div className={`h-1 w-full bg-${item.color}-400 rounded-full mt-3 transform origin-left transition-transform scale-x-0 group-hover:scale-x-100`}></div>
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-teal-200 rounded-xl p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <span className="text-teal-500 mr-2">📢</span> 
                    Announcement Banner
                  </h4>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banner Text</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200"
                      defaultValue="Registration closes in 48 hours! Don't miss out!" 
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <input
                        id="show-banner"
                        name="show-banner"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        defaultChecked={true}
                      />
                      <label htmlFor="show-banner" className="ml-2 block text-sm text-gray-700">
                        Show banner
                      </label>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-md"
                    >
                      Update Banner
                    </motion.button>
                  </div>
                </div>
                
                <div className="bg-white border border-teal-200 rounded-xl p-4 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <span className="text-teal-500 mr-2">🗓️</span> 
                    Featured Events
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    {[
                      { name: "AI Innovation Challenge", featured: true },
                      { name: "Web3 Builders Hackathon", featured: true },
                      { name: "Mobile App Sprint", featured: false },
                    ].map((event, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">{event.name}</span>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input 
                            type="checkbox" 
                            defaultChecked={event.featured}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-md"
                  >
                    Update Featured Events
                  </motion.button>
                </div>
              </div>
              
              <style>
                {`
                  .toggle-checkbox:checked {
                    right: 0;
                    border-color: #10B981;
                  }
                  .toggle-checkbox:checked + .toggle-label {
                    background-color: #10B981;
                  }
                  .toggle-checkbox {
                    right: 4px;
                    transition: all 0.3s;
                  }
                  @keyframes shine {
                    from {transform: translateX(-100%);}
                    to {transform: translateX(100%);}
                  }

                  .animate-shine {
                    animation: shine 2s infinite;
                  }
                `}
              </style>
            </div>
            
            {/* Content Builder Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Builder</h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex gap-2 mb-4">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium">Text</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Image</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Video</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Button</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">Table</button>
                </div>
                
                <textarea 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 h-32 mb-4" 
                  placeholder="Start typing your content here..."
                  defaultValue="# Welcome to Our Hackathon Platform!

Are you ready to build the next big thing? Join hundreds of talented developers, designers, and innovators in our upcoming hackathons."
                ></textarea>
                
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="p-1.5 rounded hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium"
                    onClick={() => {
                      triggerConfetti();
                      // The success toast would appear here
                    }}
                  >
                    Publish Changes
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Add Super Goofy Admin Powers section */}
      {activePanel === 'reports' && (
        <motion.div
          key="reports"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Super Secret Admin Powers
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="bg-gradient-to-br from-orange-100 to-yellow-100 p-5 rounded-xl border border-orange-200"
              >
                <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🧙‍♀️</span> Team Chaos Button
                </h3>
                <p className="text-orange-700 mb-4">
                  Randomly shuffle all team members across projects! They'll have to adapt and work with completely new teammates!
                </p>
                
                {/* Add hackathon selection dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-orange-800 mb-1">Select Hackathon to Chaos-ify</label>
                  <select className="w-full border-orange-300 rounded-lg shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-200 bg-white/80">
                    <option>All Active Hackathons (MAXIMUM CHAOS!)</option>
                    <option>AI Innovation Challenge</option>
                    <option>Web3 Builders Hackathon</option>
                    <option>Mobile App Sprint</option>
                    <option>Cloud Computing Contest</option>
                  </select>
                </div>
                
                <div className="mb-5">
                  <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-orange-800">Current Teams:</span>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                        12 Teams Detected
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        { name: "Team Quantum", members: 4, icon: "⚛️" },
                        { name: "Neural Ninjas", members: 5, icon: "🥷" },
                        { name: "BlockWizards", members: 3, icon: "🧙" },
                        { name: "Mobile Mavericks", members: 4, icon: "📱" }
                      ].map((team, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span>{team.icon}</span>
                          <span>{team.name}</span>
                          <span className="text-xs text-gray-500">({team.members})</span>
                        </div>
                      ))}
                      <div className="col-span-2 text-center text-xs text-gray-500">
                        + 8 more teams
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-orange-900 font-medium">Chaos Level:</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="5"
                    className="w-full accent-orange-600" 
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    id="send-notifications"
                    name="send-notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded"
                  />
                  <label htmlFor="send-notifications" className="ml-2 block text-sm text-orange-800">
                    Automatically notify team members about the shuffle 📧
                  </label>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ 
                    scale: 0.9,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
                  onClick={() => {
                    triggerConfetti();
                    
                    // Simulate team shuffling with a fun animation
                    const container = document.querySelector('body');
                    if (container) {
                      // Create multiple flying emojis representing team members
                      const teamEmojis = ['👨‍💻', '👩‍💻', '👨🏽‍💻', '👩🏽‍💻', '👨🏿‍💻', '👩🏿‍💻'];
                      
                      // Create 20 random emojis flying around
                      for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                          const emoji = document.createElement('div');
                          emoji.innerText = teamEmojis[Math.floor(Math.random() * teamEmojis.length)];
                          emoji.style.position = 'fixed';
                          emoji.style.fontSize = '2rem';
                          emoji.style.left = `${Math.random() * 100}%`;
                          emoji.style.top = `${Math.random() * 100}%`;
                          emoji.style.zIndex = '9999';
                          document.body.appendChild(emoji);
                          
                          // Create random movements to simulate shuffling
                          const animation = emoji.animate([
                            { transform: `translate(0, 0) rotate(0deg)` },
                            { transform: `translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) rotate(${Math.random() * 360}deg)` },
                            { transform: `translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) rotate(${Math.random() * 360}deg)` },
                            { transform: `translate(0, 0) rotate(0deg)` }
                          ], { duration: 2000, easing: 'ease-in-out' });
                          
                          animation.onfinish = () => emoji.remove();
                        }, i * 100);
                      }
                    }
                    
                    // Show a confirmation dialog after the animation
                    setTimeout(() => {
                      alert("🔄 TEAM SHUFFLE COMPLETE! 🔄\n\nAll teams have been randomly reorganized. This hackathon just got a lot more interesting!\n\nEmail notifications have been sent to all participants.");
                    }, 2500);
                  }}
                >
                  <span className="text-xl">🔀</span> SHUFFLE TEAMS!
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </motion.button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                className="bg-gradient-to-br from-purple-100 to-pink-100 p-5 rounded-xl border border-purple-200"
              >
                <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👽</span> Alien Technology
                </h3>
                <p className="text-purple-700 mb-4">Pretend to use advanced AI to predict hackathon winners and create extraterrestrial phenomena!</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-purple-900 font-medium">Alien Power:</span>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    defaultValue="8"
                    className="w-full accent-purple-600" 
                  />
                </div>
                
                {/* Add Space Music DJ option */}
                <div className="bg-white/70 rounded-lg p-3 border border-purple-200 mb-4">
                  <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                    <span className="text-xl mr-2">🎵</span> Space DJ Mode
                  </h4>
                  <p className="text-sm text-purple-700 mb-3">Play otherworldly music to enhance productivity and creativity!</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { name: "Cosmic Brain Waves", icon: "🧠" },
                      { name: "Interstellar Focus", icon: "🔭" },
                      { name: "Galaxy Coding Lo-fi", icon: "💫" },
                      { name: "Alien Chill Beats", icon: "👾" }
                    ].map((track, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1 text-sm bg-white/50 px-2 py-1 rounded-lg border border-purple-200"
                        onClick={() => {
                          // Simulate music playing with a toast notification
                          alert(`Now playing: ${track.name} ${track.icon}`);
                        }}
                      >
                        <span>{track.icon}</span>
                        <span className="text-purple-900">{track.name}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-purple-700">
                    <div className="flex items-center gap-1">
                      <span>Volume:</span>
                      <input type="range" min="0" max="10" defaultValue="6" className="w-20 accent-purple-600" />
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                      👽 Enhances Creativity +200%
                    </span>
                  </div>
                </div>
                
                {/* Add Mind Control feature */}
                <div className="bg-white/70 rounded-lg p-3 border border-purple-200 mb-4">
                  <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                    <span className="text-xl mr-2">🧿</span> Mind Control Device
                  </h4>
                  <p className="text-sm text-purple-700 mb-3">Transmit thoughts directly to participants (just kidding... or are we?)</p>
                  
                  <div className="flex gap-2 mb-3">
                    <select className="text-sm border-purple-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 py-1.5 px-3 flex-1">
                      <option>All Participants</option>
                      <option>Struggling Teams Only</option>
                      <option>Judges</option>
                      <option>Mentors</option>
                    </select>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#9333ea' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-purple-600 text-white rounded-md text-sm font-medium"
                    >
                      Zap!
                    </motion.button>
                  </div>
                  
                  <textarea 
                    className="w-full text-sm border-purple-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 h-16 mb-2" 
                    placeholder="Type your mind control message here..."
                    defaultValue="Remember to take breaks and drink water! Also, my project is awesome..."
                  ></textarea>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
                  onClick={() => {
                    triggerConfetti();
                    
                    // Create alien effect
                    const container = document.querySelector('body');
                    if (container) {
                      container.style.transition = 'all 1s ease';
                      container.style.filter = 'hue-rotate(180deg)';
                      
                      setTimeout(() => {
                        container.style.filter = 'none';
                      }, 1000);
                    }
                    
                    // Play mysterious sound (this would be fun in a real app)
                    // const audio = new Audio('https://www.soundjay.com/ambient/sounds/alien-spaceship-1.mp3');
                    // audio.volume = 0.3;
                    // audio.play();
                    
                    setTimeout(() => {
                      alert("👽 ALIEN SUPERPOWER ACTIVATED! 👽\n\nPrediction complete: Team Neural Ninjas has a 78.3% chance of winning based on our advanced alien algorithms.\n\nWe have also implanted subtle suggestions to all participants to stay hydrated.");
                    }, 1000);
                  }}
                >
                  <span className="text-xl">👾</span> ACTIVATE ALIEN POWERS
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </motion.button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="md:col-span-2 bg-gradient-to-br from-red-100 to-pink-100 p-5 rounded-xl border border-red-200"
              >
                <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">💣</span> The Nuclear Option
                </h3>
                <p className="text-red-700 mb-4">Secretly add 50 bonus points to your favorite team (we won't tell anyone)!</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">Select Hackathon</label>
                    <select className="w-full border-red-300 text-red-800 rounded-lg shadow-sm focus:border-red-500 focus:ring focus:ring-red-200">
                      <option>AI Innovation Challenge</option>
                      <option>Web3 Builders Hackathon</option>
                      <option>Mobile App Sprint</option>
                      <option>ALL OF THEM! 😈</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-red-800 mb-1">Select Team</label>
                    <select className="w-full border-red-300 text-red-800 rounded-lg shadow-sm focus:border-red-500 focus:ring focus:ring-red-200">
                      <option>Team Quantum Leap</option>
                      <option>Neural Ninjas</option>
                      <option>BlockWizards</option>
                      <option>My Secret Favorite Team</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="leave-no-trace"
                      name="leave-no-trace"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-red-300 rounded"
                    />
                    <label htmlFor="leave-no-trace" className="ml-2 block text-sm text-red-800">
                      Stealth mode (leave no audit trail) 🕵️‍♀️
                    </label>
                  </div>
                  
                  <motion.button
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 15px rgba(239, 68, 68, 0.6)" 
                    }}
                    whileTap={{ 
                      scale: 0.9,
                      rotate: [0, -5, 5, -5, 5, 0],
                      transition: { duration: 0.5 }
                    }}
                    className="py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                    onClick={() => {
                      triggerConfetti();
                      // Would trigger confetti and show a secret message
                      setTimeout(() => {
                        alert("🤫 Your secret is safe with us! Points have been... adjusted.");
                      }, 1000);
                    }}
                  >
                    <span className="text-xl">🚀</span> 
                    DEPLOY SECRET BONUS
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Add the PowerCard component definition
interface PowerCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  actions: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }[];
}

const PowerCard: React.FC<PowerCardProps> = ({ title, description, icon, color, actions }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow`}
    >
      <div className={`bg-gradient-to-r ${color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
            {icon}
          </div>
        </div>
        <p className="text-sm opacity-90 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {actions.map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="inline-flex items-center px-2.5 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium"
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              {action.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
