import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Stethoscope, Search, Menu, X, Sun, Moon, Mic, Loader2, Mail } from 'lucide-react';
import { JOB_SITES, LEARNING_SITES, INTERVIEW_SITES } from './constants';
import { ResourceCard } from './components/ResourceCard';
import { ChatConsultant } from './components/ChatConsultant';

const Tab = {
  JOBS: 'JOBS',
  LEARNING: 'LEARNING',
  INTERVIEW: 'INTERVIEW',
  CONSULTANT: 'CONSULTANT'
} as const;

type TabType = typeof Tab[keyof typeof Tab];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(Tab.JOBS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [jobSearch, setJobSearch] = useState('');
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      return;
    }
    
    // Start transition: fade out (300ms duration matching global animation)
    setIsContentVisible(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);

    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(true);

      // Transition to showing content
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsContentVisible(true), 50);
      }, 400); // Small pause for UX
    }, 300); // 300ms delay for fade-out animation
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.JOBS:
        const filteredJobs = JOB_SITES.filter(site => 
          site.name.toLowerCase().includes(jobSearch.toLowerCase()) ||
          site.description.toLowerCase().includes(jobSearch.toLowerCase())
        );

        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">לוחות דרושים מומלצים</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                ריכזנו עבורך את האתרים הטובים ביותר למציאת העבודה הבאה שלך. 
                ממשרות הייטק ועד משרות ממשלתיות.
              </p>
              
              <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pr-10 p-3 border border-slate-300 dark:border-slate-600 rounded-full leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 sm:text-sm shadow-sm transition-colors"
                  placeholder="חיפוש אתר דרושים..."
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((site) => (
                  <ResourceCard key={site.url} resource={site} type="job" />
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400 py-10">
                  לא נמצאו תוצאות עבור "{jobSearch}"
                </div>
              )}
            </div>
          </div>
        );
      case Tab.LEARNING:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">פיתוח מיומנויות ולמידה</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  שדרגו את קורות החיים שלכם עם קורסים והסמכות מהמוסדות המובילים בעולם.
                  רוב התכנים זמינים בחינם.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEARNING_SITES.map((site) => (
                  <ResourceCard key={site.url} resource={site} type="learning" />
                ))}
              </div>
            </div>
          </div>
        );
      case Tab.INTERVIEW:
        return (
          <div className="space-y-8 animate-fadeIn">
             <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-4">
                  <Mic className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  סימולציות והכנה לראיונות
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                   כלים מתקדמים לתרגול ראיונות עבודה, כולל סימולציות דיגיטליות ומשוב אוטומטי לשיפור הביצועים שלכם בזמן אמת.
                </p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INTERVIEW_SITES.map((site) => (
                <ResourceCard key={site.url} resource={site} type="interview" />
              ))}
            </div>
          </div>
        );
      case Tab.CONSULTANT:
        return (
          <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] animate-fadeIn">
             <ChatConsultant />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 cursor-pointer" onClick={() => handleTabChange(Tab.JOBS)}>
            <div className="bg-medical-100 dark:bg-medical-900/50 p-2 rounded-full">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Dr. Job</h1>
          </div>

          {/* Desktop Nav */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex gap-1 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
              <button
                onClick={() => handleTabChange(Tab.JOBS)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === Tab.JOBS
                    ? 'bg-white dark:bg-slate-600 text-medical-700 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                חיפוש עבודה
              </button>
              <button
                onClick={() => handleTabChange(Tab.LEARNING)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === Tab.LEARNING
                    ? 'bg-white dark:bg-slate-600 text-medical-700 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                למידה וקורסים
              </button>
              <button
                onClick={() => handleTabChange(Tab.INTERVIEW)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === Tab.INTERVIEW
                    ? 'bg-white dark:bg-slate-600 text-medical-700 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Mic className="w-4 h-4" />
                הכנה לראיונות
              </button>
              <button
                onClick={() => handleTabChange(Tab.CONSULTANT)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === Tab.CONSULTANT
                    ? 'bg-gradient-to-r from-medical-500 to-indigo-500 text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                ד"ר ג'וב AI
              </button>
            </nav>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={darkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-slate-600 dark:text-slate-300" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 absolute w-full left-0 shadow-lg">
            <div className="flex flex-col p-4 gap-2">
              <button
                onClick={() => handleTabChange(Tab.JOBS)}
                className={`p-3 rounded-lg text-right font-medium flex items-center gap-3 ${
                  activeTab === Tab.JOBS 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Briefcase className="w-5 h-5" /> חיפוש עבודה
              </button>
              <button
                onClick={() => handleTabChange(Tab.LEARNING)}
                className={`p-3 rounded-lg text-right font-medium flex items-center gap-3 ${
                  activeTab === Tab.LEARNING 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <GraduationCap className="w-5 h-5" /> למידה וקורסים
              </button>
              <button
                onClick={() => handleTabChange(Tab.INTERVIEW)}
                className={`p-3 rounded-lg text-right font-medium flex items-center gap-3 ${
                  activeTab === Tab.INTERVIEW 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Mic className="w-5 h-5" /> הכנה לראיונות
              </button>
              <button
                onClick={() => handleTabChange(Tab.CONSULTANT)}
                className={`p-3 rounded-lg text-right font-medium flex items-center gap-3 ${
                  activeTab === Tab.CONSULTANT 
                  ? 'bg-gradient-to-r from-medical-500 to-indigo-500 text-white' 
                  : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Stethoscope className="w-5 h-5" /> התייעץ עם ד"ר ג'וב
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 relative min-h-[60vh]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
            <div className="flex flex-col items-center gap-3 text-medical-600 dark:text-medical-400">
               <Loader2 className="w-10 h-10 animate-spin" />
               <span className="text-sm font-medium animate-pulse">טוען תוכן...</span>
            </div>
          </div>
        ) : (
          <div className={`transition-all duration-300 ease-in-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-auto transition-colors duration-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 text-slate-500 dark:text-slate-400 text-sm">
          <p className="font-medium">© Noam Gold AI 2026</p>
          <div className="flex items-center gap-4">
            <a 
              href="mailto:goldnoamai@gmail.com" 
              className="flex items-center gap-2 hover:text-medical-600 dark:hover:text-medical-400 transition-colors px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <Mail className="w-4 h-4" />
              Send Feedback
            </a>
            <span className="hidden md:inline text-slate-300 dark:text-slate-600">|</span>
            <span className="text-xs">goldnoamai@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;