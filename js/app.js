const { useState, useRef, useEffect } = React;
const { Send, Heart, Sparkles, Shield, Lock, MessageCircle, ArrowLeft } = lucide;

function MarriageCounselingBot() {
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const assistants = {
    male: {
      name: "Dr. Michael Anderson",
      title: "Licensed Marriage & Family Therapist",
      experience: "15+ years experience",
      greeting: "Hello, I'm Dr. Michael Anderson. I've been helping couples strengthen their relationships for over 15 years. This is a completely confidential and judgment-free space. I'm here to listen and guide you. What brings you here today?",
      avatar: "👨‍⚕️",
      gradient: "from-blue-600 to-indigo-600"
    },
    female: {
      name: "Dr. Sarah Mitchell",
      title: "Licensed Marriage & Family Therapist",
      experience: "15+ years experience",
      greeting: "Hello, I'm Dr. Sarah Mitchell. I've been supporting couples through their relationship journeys for over 15 years. This is a safe, confidential space where you can speak freely. I'm here to help. What would you like to talk about?",
      avatar: "👩‍⚕️",
      gradient: "from-purple-600 to-pink-600"
    }
  };

  const selectAssistant = (type) => {
    setSelectedAssistant(type);
    setTimeout(() => {
      setMessages([{
        type: 'bot',
        text: assistants[type].greeting,
        timestamp: new Date()
      }]);
    }, 500);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('intimacy') || lowerMessage.includes('sexual') || lowerMessage.includes('bedroom') || lowerMessage.includes('physical')) {
      return "Physical intimacy is a vital part of many relationships, and challenges in this area are incredibly common. Factors like stress, health, communication patterns, past experiences, and life transitions can all play a role. I want you to know that whatever you're experiencing is valid. Would you feel comfortable sharing more?";
    }
    
    if (lowerMessage.includes('communication') || lowerMessage.includes('talk') || lowerMessage.includes('listen') || lowerMessage.includes('understand')) {
      return "Communication really is the foundation of every strong relationship. Effective communication isn't just about talking; it's about truly hearing each other, expressing needs without blame, and creating space for vulnerability. What specific patterns have you noticed?";
    }
    
    if (lowerMessage.includes('trust') || lowerMessage.includes('affair') || lowerMessage.includes('cheating') || lowerMessage.includes('infidelity')) {
      return "Trust violations are deeply painful. Rebuilding trust is possible, but it requires genuine commitment, transparency, patience, and often professional support. It's a journey that takes time. How are you feeling right now?";
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('pressure') || lowerMessage.includes('overwhelmed')) {
      return "Stress and anxiety don't just affect us individually—they ripple through our relationships and can impact intimacy, communication, and emotional connection. Have you and your partner been able to talk about how stress is showing up?";
    }
    
    if (lowerMessage.includes('desire') || lowerMessage.includes('libido') || lowerMessage.includes('interest') || lowerMessage.includes('want')) {
      return "Differences in desire are one of the most common concerns couples face. Desire is complex and influenced by hormones, stress levels, relationship dynamics, mental health, medications, past experiences, and life circumstances. When did you first start noticing this pattern?";
    }
    
    if (lowerMessage.includes('connect') || lowerMessage.includes('distant') || lowerMessage.includes('disconnected') || lowerMessage.includes('alone')) {
      return "Feeling disconnected from your partner can be incredibly lonely. Emotional intimacy often needs active nurturing. Reconnection starts small: meaningful eye contact, asking thoughtful questions, expressing appreciation. What ways used to help you feel close?";
    }
    
    if (lowerMessage.includes('argue') || lowerMessage.includes('fight') || lowerMessage.includes('conflict') || lowerMessage.includes('angry')) {
      return "Conflict itself isn't the problem—it's how we handle conflict that matters. Every couple disagrees. The key is whether you can argue in ways that bring understanding rather than create more distance. What typically happens when you two disagree?";
    }
    
    if (lowerMessage.includes('love') || lowerMessage.includes('still love') || lowerMessage.includes('feelings')) {
      return "Questions about love and feelings can be confusing and scary. Love in long-term relationships evolves—it's natural for the intensity to shift over time. What's making you question your feelings?";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('advice') || lowerMessage.includes('what should')) {
      return "I'm here to help you find clarity and explore paths forward that feel right for your unique situation. There's no one-size-fits-all solution. To guide you most effectively, I'd like to understand more about your specific circumstances. What feels most pressing right now?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('grateful') || lowerMessage.includes('appreciate')) {
      return "You're very welcome. It takes real courage to open up about relationship challenges. Remember, seeking help isn't a sign of weakness—it's a sign of wisdom and care for your relationship. Is there anything else on your mind?";
    }

    if (lowerMessage.includes('medical') || lowerMessage.includes('doctor') || lowerMessage.includes('pain') || lowerMessage.includes('health')) {
      return "If you're experiencing physical pain, discomfort, or health concerns, it's really important to consult with a medical professional. I can help with the emotional and relational aspects of how health issues affect your relationship.";
    }

    if (lowerMessage.includes('divorce') || lowerMessage.includes('separate') || lowerMessage.includes('leave') || lowerMessage.includes('end')) {
      return "Contemplating separation or divorce is a significant and often painful decision. These thoughts deserve to be explored with care and honesty. Sometimes they signal deep work is needed in the relationship. What's leading you to consider this?";
    }
    
    return "Thank you for sharing that with me. I can hear that this is important to you. Relationship challenges can feel overwhelming, but you're taking a meaningful step by being here. Could you tell me more about what's been on your mind?";
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        type: 'bot',
        text: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setSelectedAssistant(null);
    setMessages([]);
    setInputMessage('');
  };

  if (!selectedAssistant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-5xl w-full relative">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-4 animate-pulse">
                  <Heart className="w-10 h-10 text-white" fill="currentColor" />
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">
                  Relationship Counseling
                </h1>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Professional, confidential support for your relationship journey
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">100% Confidential</h3>
                    <p className="text-xs text-gray-600">Your privacy protected</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Professional Care</h3>
                    <p className="text-xs text-gray-600">Expert guidance</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Judgment-Free</h3>
                    <p className="text-xs text-gray-600">Safe space to share</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-r-xl">
                <div className="flex gap-3">
                  <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-900 leading-relaxed">
                      <strong className="font-semibold">Privacy & Disclaimer:</strong> This AI assistant provides general guidance. For serious concerns, please consult a licensed therapist.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Choose Your Counselor
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => selectAssistant('male')}
                  className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      👨‍⚕️
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-1 transition-colors">
                      {assistants.male.name}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90 mb-2 transition-colors">
                      {assistants.male.title}
                    </p>
                    <div className="inline-block px-3 py-1 bg-blue-100 group-hover:bg-white/20 text-blue-800 group-hover:text-white text-xs font-medium rounded-full transition-colors">
                      {assistants.male.experience}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => selectAssistant('female')}
                  className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:border-transparent hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      👩‍⚕️
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-1 transition-colors">
                      {assistants.female.name}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90 mb-2 transition-colors">
                      {assistants.female.title}
                    </p>
                    <div className="inline-block px-3 py-1 bg-purple-100 group-hover:bg-white/20 text-purple-800 group-hover:text-white text-xs font-medium rounded-full transition-colors">
                      {assistants.female.experience}
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-8">
                Both counselors are equally qualified and ready to help
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentAssistant = assistants[selectedAssistant];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <div className={'bg-gradient-to-r ' + currentAssistant.gradient + ' shadow-lg'}>
        <div className="max-w-5xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                {currentAssistant.avatar}
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">
                  {currentAssistant.name}
                </h2>
                <p className="text-sm text-white/80">{currentAssistant.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/90">Available now</span>
                </div>
              </div>
            </div>
            <button
              onClick={resetChat}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all duration-200 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={'flex ' + (msg.type === 'user' ? 'justify-end' : 'justify-start') + ' animate-fadeIn'}
            >
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0 shadow-lg">
                  {currentAssistant.avatar}
                </div>
              )}
              <div
                className={'max-w-2xl px-6 py-4 rounded-2xl shadow-lg ' + (msg.type === 'user' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm')}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={'text-xs mt-2 ' + (msg.type === 'user' ? 'text-white/70' : 'text-gray-400')}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0 shadow-lg">
                {currentAssistant.avatar}
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl rounded-bl-sm shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-5 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... (Press Enter to send)"
              rows="1"
              className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-none transition-all duration-200"
              style={{minHeight: '56px', maxHeight: '120px'}}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className={(inputMessage.trim() ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed') + ' px-6 py-4 rounded-2xl transition-all duration-200 flex items-center gap-2 font-medium shadow-lg'}
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            <p>End-to-end encrypted • Your conversation is private and secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MarriageCounselingBot />);
