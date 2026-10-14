import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { queryKnowledgeBase } from '../data/knowledgeBase';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RotateCcw,
  PhoneCall 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

interface FarmingChatbotProps {
  lang: Language;
}

export const FarmingChatbot: React.FC<FarmingChatbotProps> = ({ lang }) => {
  const t = translations[lang];

  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: t.chatbot.welcomeMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Query knowledge base
    setTimeout(() => {
      const answer = queryKnowledgeBase(query, lang);
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 350);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!window.speechSynthesis) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting symbols for clean speech
    const cleanText = text.replace(/[*_#`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setSpeakingId(null);
    };
    utterance.onerror = () => {
      setSpeakingId(null);
    };

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const suggestions = [
    t.chatbot.suggestion1,
    t.chatbot.suggestion2,
    t.chatbot.suggestion3,
    t.chatbot.suggestion4,
    t.chatbot.suggestion5,
    t.chatbot.suggestion6,
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200 flex flex-col h-[750px] max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-600 flex items-center justify-center text-white shadow-sm">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>{t.chatbot.title}</span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'te' ? 'ఆన్‌లైన్ • వ్యవసాయ పరిజ్ఞాన కోశం సిద్ధంగా ఉంది' : 'Online • Built-in Agricultural Knowledge Base'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setMessages([
                {
                  id: `welcome-${Date.now()}`,
                  sender: 'bot',
                  text: t.chatbot.welcomeMsg,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }
              ]);
            }}
            title="Reset Chat"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="py-3 border-b border-slate-100">
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {t.chatbot.quickSuggestions}
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(sug)}
                className="px-3 py-1.5 rounded-full bg-farm-50 hover:bg-farm-100 text-farm-800 border border-farm-200 text-xs font-semibold whitespace-nowrap transition active:scale-95"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-farm-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-farm-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                }`}
              >
                {/* Render formatted lines */}
                <div className="space-y-1.5 whitespace-pre-wrap">
                  {msg.text}
                </div>

                <div className="mt-2.5 pt-1.5 border-t border-slate-300/40 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className="p-1 hover:text-farm-600 transition flex items-center gap-1 font-semibold"
                      title="Read aloud"
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                          <span className="text-rose-600">{lang === 'te' ? 'ఆపు' : 'Stop'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{lang === 'te' ? 'వినండి' : 'Listen'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-farm-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-5 py-3 rounded-2xl bg-farm-600 hover:bg-farm-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-farm-600/30 transition"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.chatbot.send}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
