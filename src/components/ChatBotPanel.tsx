import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "I noticed that your Frontend CI/CD pipeline hasn't implemented security scanning. Consider adding SAST tools like SonarQube to detect vulnerabilities early.",
  "Your Backend API Tests pipeline shows some failed security checks. I recommend reviewing the authentication middleware and API rate limiting configurations.",
  "Based on recent pipeline activity, you might want to add container scanning to your security pipeline. This will help detect vulnerabilities in your Docker images.",
  "I've detected that your Database Backup pipeline runs less frequently than recommended. Consider increasing the backup frequency for better data protection."
];

export default function ChatBotPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your security assistant. I can help you analyze your pipelines and provide security recommendations. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDocked, setIsDocked] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div 
        className={`fixed ${isDocked ? 'right-0 bottom-0' : 'right-8 bottom-8'} flex items-center bg-white rounded-lg shadow-lg border border-gray-200 cursor-pointer transition-all duration-200 hover:shadow-xl`}
        onClick={() => setIsMinimized(false)}
      >
        <div className="p-4 flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <span className="font-medium text-gray-900">Security Assistant</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed ${
        isDocked ? 'right-0 bottom-0 h-screen w-96' : 'right-8 bottom-8 h-[600px] w-96 rounded-lg'
      } bg-white shadow-xl border border-gray-200 flex flex-col transition-all duration-200`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <h3 className="font-medium text-gray-900">Security Assistant</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDocked(!isDocked)}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isDocked ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-gray-100' : 'bg-blue-100'}`}>
                {message.type === 'user' ? (
                  <User className="h-5 w-5 text-gray-600" />
                ) : (
                  <Bot className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div
                className={`p-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px] max-h-32"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}