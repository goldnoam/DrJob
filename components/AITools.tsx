
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  Sparkles, 
  FileText, 
  PenTool, 
  MessageSquare, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Copy,
  Check,
  Send,
  Bot,
  User,
  Stethoscope
} from 'lucide-react';
import { ChatConsultant } from './ChatConsultant';

const ToolType = {
  CONSULTANT: 'CONSULTANT',
  RESUME: 'RESUME',
  COVER_LETTER: 'COVER_LETTER'
} as const;

type ToolType = typeof ToolType[keyof typeof ToolType];

export const AITools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.CONSULTANT);
  
  // Resume Reviewer State
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState('');
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  
  // Cover Letter State
  const [jobDescription, setJobDescription] = useState('');
  const [userBackground, setUserBackground] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzingResume(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this resume text and provide a professional "diagnosis" in Hebrew. 
        Focus on:
        1. Structure and readability.
        2. Key strengths.
        3. Areas for improvement.
        4. Keywords that might be missing for common ATS systems.
        
        Keep the tone professional yet encouraging, like a doctor giving a health checkup.
        
        Resume text:
        ${resumeText}`,
      });
      setResumeAnalysis(response.text || 'לא ניתן היה לנתח את קורות החיים.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzingResume(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!jobDescription.trim() || !userBackground.trim()) return;
    setIsGeneratingLetter(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a tailored, professional cover letter in Hebrew based on the following:
        
        Job Description:
        ${jobDescription}
        
        User Background/Experience:
        ${userBackground}
        
        The letter should be persuasive, professional, and highlight why the user is a great fit for this specific role.
        Use a clean, modern business letter format.`,
      });
      setGeneratedLetter(response.text || 'לא ניתן היה ליצור מכתב מקדים.');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn">
      <div className="text-center mb-10">
        <div className="inline-flex p-3 bg-medical-100 dark:bg-medical-900/30 rounded-full text-medical-600 dark:text-medical-400 mb-4">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">כלי בינה מלאכותית לקריירה</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          השתמשו בכוח ה-AI כדי לשדרג את קורות החיים שלכם, לכתוב מכתבים מקדימים מנצחים ולהתייעץ עם המומחה הוירטואלי שלנו.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTool(ToolType.CONSULTANT)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-right ${
              activeTool === ToolType.CONSULTANT
                ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-medical-50 dark:hover:bg-medical-900/20 border border-slate-100 dark:border-slate-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-bold">יועץ קריירה AI</span>
          </button>
          
          <button
            onClick={() => setActiveTool(ToolType.RESUME)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-right ${
              activeTool === ToolType.RESUME
                ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-medical-50 dark:hover:bg-medical-900/20 border border-slate-100 dark:border-slate-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-bold">אבחון קורות חיים</span>
          </button>
          
          <button
            onClick={() => setActiveTool(ToolType.COVER_LETTER)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-right ${
              activeTool === ToolType.COVER_LETTER
                ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-medical-50 dark:hover:bg-medical-900/20 border border-slate-100 dark:border-slate-700'
            }`}
          >
            <PenTool className="w-5 h-5" />
            <span className="font-bold">מחולל מכתב מקדים</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 min-h-[500px]">
          {activeTool === ToolType.CONSULTANT && (
            <div className="h-[600px]">
              <ChatConsultant />
            </div>
          )}

          {activeTool === ToolType.RESUME && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <Stethoscope className="text-medical-500" /> אבחון קורות חיים מקצועי
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">הדביקו את טקסט קורות החיים שלכם כאן וקבלו ניתוח מעמיק מה-AI שלנו.</p>
              </div>
              
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="הדביקו את תוכן קורות החיים שלכם כאן..."
                className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 resize-none"
              />
              
              <button
                onClick={analyzeResume}
                disabled={isAnalyzingResume || !resumeText.trim()}
                className="w-full bg-medical-600 hover:bg-medical-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-medical-500/20"
              >
                {isAnalyzingResume ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> מבצע אבחון...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> נתח קורות חיים
                  </>
                )}
              </button>

              {resumeAnalysis && (
                <div className="mt-8 p-6 bg-medical-50 dark:bg-medical-900/20 rounded-2xl border border-medical-100 dark:border-medical-800/50 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-medical-700 dark:text-medical-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> תוצאות האבחון:
                    </h4>
                    <button 
                      onClick={() => handleCopy(resumeAnalysis)}
                      className="text-slate-400 hover:text-medical-500 transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {resumeAnalysis}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTool === ToolType.COVER_LETTER && (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <PenTool className="text-medical-500" /> מחולל מכתב מקדים מותאם אישית
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">הזינו את תיאור המשרה ואת הרקע שלכם כדי ליצור מכתב פנייה מרשים.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">תיאור המשרה:</label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="הדביקו כאן את תיאור המשרה מהמודעה..."
                    className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 resize-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">הרקע והניסיון שלכם:</label>
                  <textarea
                    value={userBackground}
                    onChange={(e) => setUserBackground(e.target.value)}
                    placeholder="ספרו בקצרה על הניסיון הרלוונטי שלכם..."
                    className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:outline-none text-slate-800 dark:text-slate-200 resize-none text-sm"
                  />
                </div>
              </div>
              
              <button
                onClick={generateCoverLetter}
                disabled={isGeneratingLetter || !jobDescription.trim() || !userBackground.trim()}
                className="w-full bg-medical-600 hover:bg-medical-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-medical-500/20"
              >
                {isGeneratingLetter ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> כותב עבורכם...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> צור מכתב מקדים
                  </>
                )}
              </button>

              {generatedLetter && (
                <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> המכתב המוכן שלך:
                    </h4>
                    <button 
                      onClick={() => handleCopy(generatedLetter)}
                      className="text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="prose prose-indigo dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {generatedLetter}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
