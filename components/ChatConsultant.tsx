
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2, Stethoscope, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';

export const ChatConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'שלום! אני ד"ר ג\'וב 🩺. אני כאן כדי לעזור לך לאבחן את מצב הקריירה שלך, לשפר את קורות החיים ולהמליץ על מסלולי למידה או משרות מתאימות. במה נתמקד היום?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key is missing");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Create a temporary ID for the streaming message
      const streamId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: streamId,
        role: 'model',
        content: '',
        timestamp: Date.now()
      }]);

      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      // Updated model to gemini-3-flash-preview as per guidelines for general Q&A
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are "Dr. Job" (ד"ר ג'וב), a helpful, empathetic, and professional career consultant speaking Hebrew. 
          Your goal is to help users find jobs and improve their skills.
          
          Guidelines:
          1. Always answer in Hebrew.
          2. Use medical metaphors occasionally but lightly (e.g., "Let's diagnose your resume", "I prescribe a course in...").
          3. When relevant, refer users to the specific resources available on this website:
             - Job Sites: LinkedIn, Jobify360, Jobmaster, Drushim, Taasuka.
             - Learning: Campus IL, Google Digital Garage, Coursera, edX, Khan Academy, freeCodeCamp.
          4. Be encouraging and practical. Give actionable advice.
          5. Keep responses concise and easy to read. Use bullet points.
          `,
        },
        history: history
      });

      const result = await chat.sendMessageStream({ message: userMessage.content });

      let fullText = '';
      for await (const chunk of result) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === streamId 
                ? { ...msg, content: fullText }
                : msg
            )
          );
        }
      }

    } catch (err) {
      console.error(err);
      setError('אופס, נראה שיש לנו בעיה בתקשורת כרגע. אנא נסה שוב מאוחר יותר.');
      // Remove the empty streaming message if it exists and failed
      setMessages(prev => prev.filter(msg => msg.content !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-medical-600 to-medical-500 p-4 flex items-center gap-3 text-white shadow-sm">
        <div className="bg-white/20 p-2 rounded-full">
          <Stethoscope className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg">ד"ר ג'וב AI</h2>
          <p className="text-medical-100 text-xs">יועץ קריירה וירטואלי 24/7</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-slate-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user'
                  ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'bg-medical-100 dark:bg-medical-900/50 text-medical-600 dark:text-medical-400'
              }`}
            >
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1].role === 'user' && (
           <div className="flex items-start gap-3">
             <div className="w-10 h-10 rounded-full bg-medical-100 dark:bg-medical-900/50 text-medical-600 dark:text-medical-400 flex items-center justify-center flex-shrink-0">
               <Loader2 className="animate-spin w-5 h-5" />
             </div>
             <div className="bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-sm">
               ד"ר ג'וב חושב על פתרון...
             </div>
           </div>
        )}
        {error && (
          <div className="flex justify-center my-4">
             <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
               <AlertCircle size={16} />
               {error}
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 transition-colors">
        <div className="relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="שאל את ד״ר ג׳וב על משרות, קורות חיים או קריירה..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:bg-white dark:focus:bg-slate-900 resize-none h-14 max-h-32 shadow-inner transition-colors"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`absolute left-2 p-2 rounded-lg transition-all ${
              input.trim() && !isLoading
                ? 'bg-medical-600 text-white hover:bg-medical-700 shadow-md'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
          ד"ר ג'וב עלול לעשות טעויות. מומלץ לבדוק מידע חשוב.
        </p>
      </div>
    </div>
  );
};
