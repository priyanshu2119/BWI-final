import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronDown, ChevronUp, Plus, Users, PieChart, Settings, 
  Award, FileText, Calendar, Bell, BarChart2, Clock, 
  UserCheck, UserPlus, Star, Check, Activity, ArrowLeft,
  Filter, Search, EyeIcon, ThumbsUp, ThumbsDown, MessageSquare,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const ManageSubmissions = () => {
  // Add missing interface for submission type
  interface Submission {
    id: string;
    projectName: string;
    teamName: string;
    submittedBy: string;
    submittedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    score: number | null;
    description: string;
    techStack: string[];
    thumbnail: string;
    comments: {
      author: string;
      text: string;
      timestamp: string;
    }[];
  }

  const navigate = useNavigate();
  const { hackathonId } = useParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [hackathon, setHackathon] = useState<any>(null);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Sample data for submissions
  const sampleSubmissions: Submission[] = [
    {
      id: "sub-001",
      projectName: "AI Assistant for Healthcare",
      teamName: "MediTech",
      submittedBy: "Alex Johnson",
      submittedAt: "2025-03-16T14:30:00",
      status: "pending", // pending, approved, rejected
      score: null,
      description: "An AI assistant that helps doctors analyze medical records and suggest diagnosis options.",
      techStack: ["Python", "TensorFlow", "React", "MongoDB"],
      thumbnail: "https://images.unsplash.com/photo-1584982751601-97dcc096659c",
      comments: []
    },
    {
      id: "sub-002",
      projectName: "EcoTrack",
      teamName: "Green Coders",
      submittedBy: "Sarah Chen",
      submittedAt: "2025-03-16T10:15:00",
      status: "approved",
      score: 87,
      description: "A platform to track and reduce carbon footprint through personalized recommendations.",
      techStack: ["Vue.js", "Node.js", "PostgreSQL", "D3.js"],
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      comments: [
        { author: "Dr. Emily Parker", text: "Very impressive use of data visualization to make environmental impact tangible", timestamp: "2025-03-16T12:30:00" }
      ]
    },
    {
      id: "sub-003",
      projectName: "VirtualClassroom",
      teamName: "EduTech Pros",
      submittedBy: "Miguel Rodriguez",
      submittedAt: "2025-03-15T18:45:00",
      status: "rejected",
      score: 62,
      description: "VR-based classroom experience for remote learning with interactive 3D models.",
      techStack: ["Unity", "C#", "Firebase", "WebRTC"],
      thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
      comments: [
        { author: "John Smith", text: "The concept is interesting but the execution needs more work", timestamp: "2025-03-16T09:15:00" }
      ]
    },
    {
      id: "sub-004",
      projectName: "SmartBudget",
      teamName: "FinHackers",
      submittedBy: "Emma Wilson",
      submittedAt: "2025-03-16T22:05:00",
      status: "pending",
      score: null,
      description: "An AI-powered budget management app that forecasts expenses and suggests savings strategies.",
      techStack: ["React Native", "Python", "Flask", "AWS"],
      thumbnail: "https://images.unsplash.com/photo-1580519542036-c47de6d5f2ed",
      comments: []
    },
    {
      id: "sub-005",
      projectName: "FoodShare",
      teamName: "Community Builders",
      submittedBy: "David Kim",
      submittedAt: "2025-03-15T09:30:00",
      status: "approved",
      score: 91,
      description: "Platform connecting restaurants with excess food to shelters and food banks.",
      techStack: ["Flutter", "Firebase", "Google Maps API", "Node.js"],
      thumbnail: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      comments: [
        { author: "Maria Garcia", text: "This project has incredible real-world impact potential", timestamp: "2025-03-15T14:20:00" },
        { author: "James Wilson", text: "The UX is highly intuitive and the backend architecture is solid", timestamp: "2025-03-15T16:45:00" }
      ]
    }
  ];

  // Sample data for hackathon
  const sampleHackathon = {
    id: hackathonId || "hack-001",
    title: "AI Innovation Challenge",
    description: "Build cutting-edge AI solutions that leverage artificial intelligence and machine learning to solve real-world problems.",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    status: "active",
    participants: 254,
    submissions: 56,
    judges: 8,
    banner: "https://images.unsplash.com/photo-1677442136019-21780ecad995"
  };

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmissions(sampleSubmissions);
        setHackathon(sampleHackathon);
      } catch (error) {
        console.error("Error loading submissions:", error);
        // Add error state handling if needed
        setSubmissions([]);
        setHackathon(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [hackathonId]);

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    // Apply status filter
    if (filter !== 'all' && submission.status !== filter) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        submission.projectName.toLowerCase().includes(query) ||
        submission.teamName.toLowerCase().includes(query) ||
        submission.submittedBy.toLowerCase().includes(query) ||
        submission.description.toLowerCase().includes(query) ||
        submission.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      case 'oldest':
        return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      case 'highest-score':
        if (a.score === null) return 1;
        if (b.score === null) return -1;
        return b.score - a.score;
      case 'lowest-score':
        if (a.score === null) return 1;
        if (b.score === null) return -1;
        return a.score - b.score;
      case 'team-name':
        return a.teamName.localeCompare(b.teamName);
      default:
        return 0;
    }
  });

  // Format date for display
interface DateFormatOptions {
    year: 'numeric';
    month: 'short';
    day: 'numeric';
    hour: '2-digit';
    minute: '2-digit';
}

const formatDate = (dateString: string): string => {
    const options: DateFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

  // Update the getStatusBadgeStyles function
  const getStatusBadgeStyles = (status: 'pending' | 'approved' | 'rejected'): string => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle submission status change
interface StatusChangeParams {
    submissionId: string;
    newStatus: 'pending' | 'approved' | 'rejected';
}

const handleStatusChange = (submissionId: string, newStatus: 'pending' | 'approved' | 'rejected'): void => {
    setSubmissions(
        submissions.map(submission => 
            submission.id === submissionId 
                ? { ...submission, status: newStatus, score: newStatus === 'approved' ? 75 : null } 
                : submission
        )
    );
};

  // Navigate to submission detail page
const viewSubmission = (submissionId: string): void => {
    const submission = submissions.find(sub => sub.id === submissionId);
    if (submission) {
      setSelectedSubmission(submission);
      setShowDetailsModal(true);
    }
};

  // Add comment
  const addComment = () => {
    if (!commentText.trim() || !selectedSubmission) return;
    
    const newComment = {
      author: user?.name || "Organizer",
      text: commentText.trim(),
      timestamp: new Date().toISOString()
    };
    
    const updatedSubmission = {
      ...selectedSubmission,
      comments: [...selectedSubmission.comments, newComment]
    };
    
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === selectedSubmission.id ? updatedSubmission : sub
      )
    );
    
    setSelectedSubmission(updatedSubmission);
    setCommentText('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: checked
    }));
  };

  const setFormData = (data: any) => {
    // Implement form data handling logic here
    console.log("Form data updated:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with back button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-full shadow-sm border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Submissions</h1>
              {hackathon && (
                <p className="text-gray-600">{hackathon.title}</p>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 flex justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="mt-3 text-gray-600">Loading submissions...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex flex-wrap gap-2">
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'all' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFilter('all')}
                  >
                    All Submissions
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFilter('pending')}
                  >
                    Pending Review
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFilter('approved')}
                  >
                    Approved
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFilter('rejected')}
                  >
                    Rejected
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search submissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest-score">Highest Score</option>
                      <option value="lowest-score">Lowest Score</option>
                      <option value="team-name">Team Name</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submissions list */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  {filter === 'all' ? 'All Submissions' : 
                   filter === 'pending' ? 'Pending Submissions' :
                   filter === 'approved' ? 'Approved Submissions' : 'Rejected Submissions'} 
                  <span className="ml-2 text-sm font-normal text-gray-500">({sortedSubmissions.length})</span>
                </h2>
              </div>
              
              {sortedSubmissions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {sortedSubmissions.map((submission: Submission) => (
                    <div key={submission.id} className="p-6">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/4 lg:w-1/5 mb-4 md:mb-0 md:mr-6">
                          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={`${submission.thumbnail}?auto=format&fit=crop&w=500&h=281`}
                              alt={submission.projectName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{submission.projectName}</h3>
                            <div className="mt-1 sm:mt-0">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyles(submission.status)}`}>
                                {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap text-sm text-gray-500 gap-x-4 gap-y-1 mb-3">
                            <span>Team: {submission.teamName}</span>
                            <span>By: {submission.submittedBy}</span>
                            <span>Submitted: {formatDate(submission.submittedAt)}</span>
                            {submission.score !== null && (
                              <span className="text-indigo-600 font-medium">Score: {submission.score}/100</span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{submission.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {submission.techStack.map((tech, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => viewSubmission(submission.id)}
                              className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 flex items-center"
                            >
                              <EyeIcon className="w-4 h-4 mr-2" />
                              View Details
                            </motion.button>
                            
                            {submission.status !== 'approved' && (
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleStatusChange(submission.id, 'approved')}
                                className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 flex items-center"
                              >
                                <ThumbsUp className="w-4 h-4 mr-2" />
                                Approve
                              </motion.button>
                            )}
                            
                            {submission.status !== 'rejected' && (
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleStatusChange(submission.id, 'rejected')}
                                className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 flex items-center"
                              >
                                <ThumbsDown className="w-4 h-4 mr-2" />
                                Reject
                              </motion.button>
                            )}
                            
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center"
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowDetailsModal(true);
                              }}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Comment
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                  <p className="text-gray-600 mb-6">
                    {filter !== 'all' 
                      ? `There are no ${filter} submissions at the moment.` 
                      : searchQuery 
                        ? 'No results match your search criteria.' 
                        : 'There are no submissions for this hackathon yet.'
                    }
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Submission Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedSubmission && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-gray-200 p-5">
                <h3 className="text-xl font-semibold text-gray-900">{selectedSubmission.projectName}</h3>
                <button onClick={() => setShowDetailsModal(false)} className="p-1 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="overflow-y-auto p-5 space-y-6">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                  <img 
                    src={`${selectedSubmission.thumbnail}?auto=format&fit=crop&w=1000&h=562`}
                    alt={selectedSubmission.projectName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyles(selectedSubmission.status)}`}>
                    {selectedSubmission.status.charAt(0).toUpperCase() + selectedSubmission.status.slice(1)}
                  </span>
                  {selectedSubmission.score !== null && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Score: {selectedSubmission.score}/100
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Team</h4>
                    <p className="text-gray-900">{selectedSubmission.teamName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Submitted By</h4>
                    <p className="text-gray-900">{selectedSubmission.submittedBy}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Submitted On</h4>
                    <p className="text-gray-900">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-900">{selectedSubmission.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedSubmission.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Comments</h4>
                  {selectedSubmission.comments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedSubmission.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No comments yet</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Add Comment</h4>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={addComment}
                      disabled={!commentText.trim()}
                      className={`px-4 py-2 bg-indigo-600 text-white rounded-lg ${!commentText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                    >
                      Post
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-200 p-5">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg"
                >
                  Close
                </button>
                <div className="flex gap-2">
                  {selectedSubmission.status !== 'approved' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleStatusChange(selectedSubmission.id, 'approved');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </motion.button>
                  )}
                  {selectedSubmission.status !== 'rejected' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleStatusChange(selectedSubmission.id, 'rejected');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageSubmissions;