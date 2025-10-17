const { useState, useRef, useEffect } = React;
const { Send, Heart, Sparkles, Shield, Lock, MessageCircle, ArrowLeft } = lucide;

const MarriageCounselingBot = () => {
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
      greeting: "Hello, I'm Dr. Michael. I've been helping couples for 15 years. This is a confidential space. What brings you here?",
      avatar: "👨‍⚕️",
      gradient: "from-blue-600 to-indigo-600"
    },
    female: {
      name: "Dr. Sarah Mitchell",
      title: "Licensed Marriage & Family Therapist",
      experience: "15+ years experience",
      greeting: "Hello, I'm Dr. Sarah. I support couples through their journeys. This is a safe space. What would you like to talk about?",
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
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('intimacy') || msg.includes('sexual') || msg.includes('bedroom')) {
      return "Physical intimacy challenges are common. Many factors affect it - stress, health, communication, past experiences. Whatever you're experiencing is valid. Would you share more?";
    }
    
    if (msg.includes('communication') || msg.includes('talk') || msg.includes('listen')) {
      return "Communication is foundational. It's about truly hearing each other and expressing needs without blame. What patterns have you noticed in how you communicate?";
    }
    
    if (msg.includes('trust') || msg.includes('affair') || msg.includes('cheating')) {
      return "Trust violations are painful. Rebuilding is possible but requires commitment and transparency. How are you feeling right now?";
    }
    
    if (msg.includes('stress') || msg.includes('anxiety') || msg.includes('pressure')) {
      return "Stress ripples through relationships affecting intimacy and connection. Have you talked with your partner about how stress is showing up?";
    }
    
    if (msg.includes('desire') || msg.includes('libido') || msg.includes('interest')) {
      return "Desire differences are very common. It's influenced by hormones, stress, health, and life circumstances. When did you first notice this?";
    }
    
    if (msg.includes('connect') || msg.includes('distant') || msg.includes('disconnected')) {
      return "Feeling disconnected is lonely. Reconnection starts small - meaningful moments, appreciation, quality time. What helped you feel close before?";
    }
    
    if (msg.includes('argue') || msg.includes('fight') || msg.includes('conflict')) {
      return "Conflict isn't bad - it's how you handle it. Can you tell me what happens when you disagree?";
    }
    
    if (msg.includes('love') || msg.includes('feelings')) {
      return "Love evolves in relationships. What feels like lost love is often unaddressed hurt. What's making you question your feelings?";
    }
    
    if (msg.includes('thank') || msg.includes('grateful')) {
      return "You're welcome. It takes courage to seek help. Remember this is strength, not weakness. Anything else?";
    }

    if (msg.includes('medical') || msg.includes('doctor') || msg.includes('health')) {
      return "For medical concerns, see a healthcare professional. I can help with emotional and relational aspects.";
    }

    if (msg.includes('divorce') || msg.includes('separate') || msg.includes('leave')) {
      return "Contemplating separation is significant. These deserve care and honesty. What's leading you to consider this?";
    }
    
    return "Thank you for sharing. I want to give this attention it deserves. Tell me more about what's on your mind. Context helps me support you.";
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
        </div>

        <div className="max-w-5xl w-full relative">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-4 animate-pulse">
                  <Heart className="w-10 h-10 text-white" fill="currentColor" />
                </div>
                <h1 className="text-4xl font-bold mb-3 tracking-tight">Relationship Counseling</h1>
                <p className="text-lg text-white/90">Professional, confidential support for your relationship journey</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">100% Confidential</h3>
                    <p className="text-xs text-gray-600">Privacy protected</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Professional Care</h3>
                    <p className="text-xs text-gray-600">Expert guidance</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">Judgment-Free</h3>
                    <p className="text-xs text-gray-600">Safe space</p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Counselor</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <button onClick={() => selectAssistant('male')} className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-4">👨‍⚕️</div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-1 transition-colors">Dr. Michael Anderson</h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">Licensed Therapist</p>
                  </div>
                </button>

                <button onClick={() => selectAssistant('female')} className="group relative p-8 border-2 border-gray-200 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-7xl mb-4">👩‍⚕️</div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-white mb-1 transition-colors">Dr. Sarah Mitchell</h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors">Licensed Therapist</p>
                  </div>
                </button>
              </div>
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
              <div className="text-5xl bg-white/20 backdrop-blur-md p-3 rounded-2xl">{currentAssistant.avatar}</div>
              <div className="text-white">
                <h2 className="text-xl font-bold">{currentAssistant.name}</h2>
                <p className="text-sm text-white/80">{currentAssistant.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white/90">Available</span>
                </div>
              </div>
            </div>
            <button onClick={resetChat} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 text-white rounded-xl text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Change
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={'flex ' + (msg.type === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.type === 'bot' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0 shadow-lg">
                  {currentAssistant.avatar}
                </div>
              )}
              <div className={'max-w-2xl px-6 py-4 rounded-2xl shadow-lg ' + (msg.type === 'user' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-white text-gray-800')}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={'text-xs mt-2 ' + (msg.type === 'user' ? 'text-white/70' : 'text-gray-400')}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mr-3 flex-shrink-0 shadow-lg">
                {currentAssistant.avatar}
              </div>
              <div className="bg-white px-6 py-4 rounded-2xl shadow-lg">
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
            <textarea value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Share your thoughts..." rows="1" className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-none" style={{minHeight: '56px', maxHeight: '120px'}} />
            <button onClick={sendMessage} disabled={!inputMessage.trim()} className={(inputMessage.trim() ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed') + ' px-6 py-4 rounded-2xl flex items-center gap-2 font-medium'}>
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MarriageCounselingBot />);
