import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Lightbulb, TrendingUp, Target, Zap, Loader2, ArrowUp } from 'lucide-react';
import { gsap } from 'gsap';

export default function AIAdviser({ darkMode }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI startup adviser. I can help you with business ideas, market analysis, funding strategies, and growth plans. What would you like to discuss?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const quickSuggestions = [
    { icon: Lightbulb, text: "Validate my startup idea", category: "ideation" },
    { icon: TrendingUp, text: "Market analysis for my product", category: "market" },
    { icon: Target, text: "Create a business plan", category: "planning" },
    { icon: Zap, text: "Funding and investor strategies", category: "funding" }
  ];

  const headerRef = useRef(null);
  const sidebarRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current.children,
        { y: -50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );

      // Sidebar animation
      gsap.fromTo(sidebarRef.current,
        { x: -100, opacity: 0, rotationY: -90 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        }
      );

      // Chat container animation
      gsap.fromTo(chatRef.current,
        { 
          scale: 0.8,
          opacity: 0,
          rotationX: 45
        },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          delay: 0.5,
          ease: "elastic.out(1, 0.8)"
        }
      );

      // Quick suggestions hover animations
      const suggestions = sidebarRef.current?.querySelectorAll('button');
      suggestions?.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Add cursor magnetic effect to chat messages
      const messageContainer = chatRef.current?.querySelector('.flex-1');
      if (messageContainer) {
        const handleMouseMove = (e) => {
          const messages = messageContainer.querySelectorAll('[data-message]');
          messages.forEach(message => {
            const rect = message.getBoundingClientRect();
            const distance = Math.sqrt(
              Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
              Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );

            if (distance < 100) {
              gsap.to(message, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
              });
            } else {
              gsap.to(message, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
              });
            }
          });
        };

        messageContainer.addEventListener('mousemove', handleMouseMove);
      }

    });

    return () => ctx.revert();
  }, [messages]);

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY not found in .env file');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert startup adviser with years of experience helping entrepreneurs succeed. The user asks: "${message}". 

                Please provide:
                - Actionable, specific advice
                - Step-by-step guidance where applicable
                - Real-world examples or case studies
                - Potential challenges and how to overcome them
                
                Keep your response helpful, encouraging, and practical for startups.`
              }]
            }],
            generationConfig: {
              maxOutputTokens: 1000,
              temperature: 0.7,
            }
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error:', response.status, errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      let botResponse;
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        botResponse = data.candidates[0].content.parts[0].text;
      } else {
        console.error('Unexpected API response format:', data);
        botResponse = "I received an unexpected response format. Let me try to help you differently. Could you please rephrase your question?";
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMessage;
      if (error.message.includes('Failed to fetch')) {
        errorMessage = "❌ Cannot connect to Gemini API. Please check your internet connection.";
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage = "❌ Authentication failed. Please check your VITE_GEMINI_API_KEY in the .env file.";
      } else if (error.message.includes('400')) {
        errorMessage = "❌ Bad request to Gemini API. Please try rephrasing your question.";
      } else if (error.message.includes('VITE_GEMINI_API_KEY not found')) {
        errorMessage = "❌ API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
      } else {
        errorMessage = `❌ Error: ${error.message}`;
      }

      const errorMsg = {
        id: Date.now() + 1,
        type: 'bot',
        content: errorMessage,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gray-50'} transition-colors duration-300 cursor-none`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div ref={headerRef} className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            AI Startup Adviser
          </h1>
          <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Get personalized advice and strategies for your startup journey
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div ref={sidebarRef} className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl p-6 shadow-lg sticky top-4`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Quick Suggestions
              </h3>
              <div className="space-y-3">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion.text)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                        : 'bg-gray-50 hover:bg-gray-100 text-slate-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <suggestion.icon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{suggestion.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div ref={chatRef} className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg h-[600px] flex flex-col`}>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'bot' 
                          ? 'bg-blue-500' 
                          : darkMode ? 'bg-slate-600' : 'bg-slate-300'
                      }`}>
                        {message.type === 'bot' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'bot'
                          ? darkMode ? 'bg-slate-700 text-white' : 'bg-gray-100 text-slate-900'
                          : 'bg-blue-500 text-white'
                      }`}>
                        <p className="whitespace-pre-wrap" data-message>{message.content}</p>
                        <div className={`text-xs mt-2 opacity-70`}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`rounded-lg p-4 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className={`border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'} p-4`}>
                <div className="flex space-x-4">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your startup..."
                    className={`flex-1 resize-none rounded-lg p-3 ${
                      darkMode 
                        ? 'bg-slate-700 text-white border-slate-600' 
                        : 'bg-white text-slate-900 border-gray-300'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    rows="2"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white p-3 rounded-lg transition-colors cursor-none"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className={`fixed bottom-8 left-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
            darkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-gray-50 text-slate-900'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
}
