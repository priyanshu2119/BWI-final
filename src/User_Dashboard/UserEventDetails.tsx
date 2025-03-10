import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Video, MessageCircle, FileText, Edit, Trash } from 'lucide-react';

const UserEventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState({
    id: '1',
    title: 'Team Project Meeting',
    type: 'meeting',
    date: 'Today',
    time: '3:00 PM',
    duration: '1 hour',
    location: 'Google Meet',
    link: 'https://meet.google.com/abc-defg-hij',
    description: 'Discuss progress on the UI components and review the API integration. Please prepare your updates before the meeting.',
    agenda: [
      'Project status updates (15 min)',
      'UI component review (20 min)',
      'API integration discussion (15 min)',
      'Next steps and task assignment (10 min)'
    ],
    attachments: [
      { name: 'Project_Timeline.pdf', size: '2.4 MB' },
      { name: 'UI_Mockups_v2.fig', size: '8.1 MB' }
    ],
    attendees: [
      { id: '1', name: 'You', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Frontend Developer', confirmed: true },
      { id: '2', name: 'Sarah Miller', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'UI/UX Designer', confirmed: true },
      { id: '3', name: 'David Chen', avatar: 'https://randomuser.me/api/portraits/men/51.jpg', role: 'Backend Developer', confirmed: true },
      { id: '4', name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/63.jpg', role: 'Product Manager', confirmed: false }
    ],
    status: 'upcoming',
    color: 'indigo'
  });

  // Add missing code to handle displaying event attendees
interface Attendee {
    id: string;
    name: string;
    avatar: string;
    role: string;
    confirmed: boolean;
}

const renderAttendeeStatus = (confirmed: boolean): JSX.Element => {
    if (confirmed) {
        return <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></div>;
    }
    return <div className="absolute -bottom-1 -right-1 bg-gray-300 rounded-full w-3 h-3 border-2 border-white"></div>;
};

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Event Details</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-6"
        >
          <div className={`bg-gradient-to-r from-${event.color}-600 to-${event.color}-700 p-6 text-white`}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{event.title}</h2>
                <div className="flex items-center mt-2">
                  <Calendar className="w-5 h-5 mr-2 opacity-80" />
                  <span>{event.date} | {event.time} ({event.duration})</span>
                </div>
                <div className="flex items-center mt-2">
                  {event.location === 'Google Meet' || event.location === 'Zoom' ? (
                    <Video className="w-5 h-5 mr-2 opacity-80" />
                  ) : (
                    <MapPin className="w-5 h-5 mr-2 opacity-80" />
                  )}
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30"
                >
                  <Trash className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Agenda</h3>
              <ul className="space-y-2">
                {event.agenda.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-medium mr-2 mt-0.5">{index + 1}</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Attachments</h3>
              <div className="space-y-3">
                {event.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-indigo-600 mr-3" />
                      <span className="text-gray-800">{file.name}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 mr-3">{file.size}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md hover:bg-indigo-200"
                      >
                        Download
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Attendees</h3>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {event.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center">
                    <div className="relative">
                      <img src={attendee.avatar} alt={attendee.name} className="w-8 h-8 rounded-full" />
                      {renderAttendeeStatus(attendee.confirmed)}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium text-gray-800">{attendee.name}</p>
                      <p className="text-xs text-gray-500">{attendee.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {event.link && (
              <motion.a 
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center"
              >
                <Video className="h-5 w-5 mr-2" />
                Join Meeting
              </motion.a>
            )}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <textarea 
              placeholder="Add your meeting notes here..."
              className="w-full h-[200px] border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
            >
              Save Notes
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Chat</h3>
            <div className="h-[200px] border border-gray-200 rounded-md mb-3 p-3 overflow-y-auto">
              <div className="flex mb-3">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Miller" className="w-8 h-8 rounded-full mr-3" />
                <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                  <p className="text-xs text-gray-500 mb-1">Sarah Miller</p>
                  <p className="text-sm">I'll prepare the design updates for the meeting. Does anyone have the latest prototype link?</p>
                </div>
              </div>
              
              <div className="flex justify-end mb-3">
                <div className="bg-indigo-100 rounded-lg p-2 max-w-[80%] mr-3">
                  <p className="text-xs text-gray-500 mb-1">You</p>
                  <p className="text-sm">Yes, I'll share it with you before the meeting. I've made some changes to the user flow.</p>
                </div>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="You" className="w-8 h-8 rounded-full" />
              </div>
              
              <div className="flex mb-3">
                <img src="https://randomuser.me/api/portraits/men/51.jpg" alt="David Chen" className="w-8 h-8 rounded-full mr-3" />
                <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                  <p className="text-xs text-gray-500 mb-1">David Chen</p>
                  <p className="text-sm">I might be a few minutes late to the meeting. Starting another call that might run over.</p>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserEventDetails;