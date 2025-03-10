import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, User } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi there! How can I help you with hackathons today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: message,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I can help you find the perfect hackathon for your skill level.",
        "Would you like some tips on forming a successful team?",
        "We have several upcoming hackathons that might interest you!",
        "Check out our mentorship program for guidance during hackathons.",
        "Is there a specific technology or theme you're interested in?",
        "Have you checked our resources section for project ideas?"
      ];
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full bg-white shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900">Support Chat</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-full mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-medium">Hackathon Support</h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-xs text-indigo-100">Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="p-6 h-96 overflow-y-auto bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white border border-gray-200'
                  }`}>
                    <p className={`${msg.sender === 'user' ? 'text-white' : 'text-gray-700'}`}>
                      {msg.text}
                    </p>
                    <p className={`text-xs mt-1 text-right ${
                      msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="px-6 py-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <button type="button" className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 ml-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!message.trim()}
                  className={`ml-2 p-2 bg-indigo-600 text-white rounded-full ${!message.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {[
                { q: "How do I join a hackathon?", a: "Browse our hackathons page, select one you like, and click the apply button." },
                { q: "Can I participate as a solo developer?", a: "Yes! You can join as an individual and we can help match you with a team." },
                { q: "What if I'm a beginner?", a: "We have hackathons for all skill levels, including beginner-friendly events." },
                { q: "How are winners selected?", a: "Each hackathon has specific judging criteria. Generally projects are evaluated on innovation, execution, impact, and presentation." }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-lg p-4 shadow-md"
                >
                  <h4 className="font-medium text-indigo-800">{faq.q}</h4>
                  <p className="text-gray-600 mt-2">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;