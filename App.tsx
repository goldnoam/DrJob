import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Stethoscope, Search, Menu, X, Sun, Moon, Mic, Loader2, Mail, Star, Lightbulb, Network, UserCheck, Compass, Zap, ChevronRight, HelpCircle, Heart, PenTool, Share2, Copy, Check, ChevronDown, ChevronUp, Cpu, Database, Settings } from 'lucide-react';
import { JOB_SITES, LEARNING_SITES, INTERVIEW_SITES, PROFESSIONAL_ADVICE, INTERVIEW_QUESTIONS, TECHNICAL_ROLES } from './constants';
import { ResourceCard } from './components/ResourceCard';
import { TechnicalQuestion } from './types';

const Tab = {
  JOBS: 'JOBS',
  LEARNING: 'LEARNING',
  INTERVIEW: 'INTERVIEW',
  ADVICE: 'ADVICE'
} as const;

type TabType = typeof Tab[keyof typeof Tab];

const QuestionItem: React.FC<{ q: TechnicalQuestion }> = ({ q }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:border-medical-200 dark:hover:border-medical-800/50 transition-all">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-right p-4 flex items-start justify-between gap-3 group"
      >
        <div className="flex items-start gap-3">
          <span className="font-bold text-medical-500 mt-0.5">•</span>
          <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{q.question}</p>
        </div>
        <div className="flex-shrink-0 text-slate-400 group-hover:text-medical-500 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-10 pb-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border-r-4 border-medical-500 shadow-sm">
             <span className="text-[10px] font-bold text-medical-500 uppercase block mb-1">אבחנה מקצועית:</span>
             <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{q.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(Tab.JOBS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [jobSearch, setJobSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showOnlySavedJobs, setShowOnlySavedJobs] = useState(false);
  const [savedJobUrls, setSavedJobUrls] = useState<string[]>([]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechRoleId, setSelectedTechRoleId] = useState<string>(TECHNICAL_ROLES[0].id);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (jobSearch === '') {
      setDebouncedSearch('');
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(jobSearch);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(handler);
  }, [jobSearch]);

  useEffect(() => {
    const saved = localStorage.getItem('drjob_saved_jobs');
    if (saved) {
      try {
        setSavedJobUrls(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved jobs", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('drjob_saved_jobs', JSON.stringify(savedJobUrls));
  }, [savedJobUrls]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleSaveJob = (url: string) => {
    setSavedJobUrls(prev => 
      prev.includes(url) 
        ? prev.filter(u => u !== url) 
        : [...prev, url]
    );
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      return;
    }
    setIsContentVisible(false);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsContentVisible(true), 50);
      }, 400);
    }, 300);
  };

  const currentTechRole = TECHNICAL_ROLES.find(r => r.id === selectedTechRoleId) || TECHNICAL_ROLES[0];

  const handleShareQuestions = () => {
    let text = `🩺 שאלות מקצועיות לראיון עבודה עבור: ${currentTechRole.name}\n\n`;
    currentTechRole.categories.forEach(cat => {
      text += `--- ${cat.title} ---\n`;
      cat.questions.forEach((q, i) => {
        text += `${i + 1}. ${q.question}\n`;
      });
      text += `\n`;
    });
    text += `באדיבות Dr. Job | המרכז לקריירה שלך`;

    if (navigator.share) {
      navigator.share({ title: `שאלות לראיון - ${currentTechRole.name}`, text: text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.JOBS:
        let filteredJobs = JOB_SITES.filter(site => 
          site.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          site.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        if (showOnlySavedJobs) {
          filteredJobs = filteredJobs.filter(site => savedJobUrls.includes(site.url));
        }

        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">לוחות דרושים מובילים</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                ריכזנו עבורכם את כל האתרים הכי טובים למציאת עבודה בישראל. ממשרות הייטק ועד משרות ממשלתיות.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 text-medical-500 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    className="block w-full pr-10 p-3 border border-slate-300 dark:border-slate-600 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-sm transition-all"
                    placeholder="חיפוש אתר דרושים..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setShowOnlySavedJobs(!showOnlySavedJobs)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm border ${
                    showOnlySavedJobs 
                      ? 'bg-red-500 border-red-600 text-white shadow-red-500/20' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${showOnlySavedJobs ? 'fill-current' : ''}`} />
                  שמורים ({savedJobUrls.length})
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((site) => (
                  <ResourceCard 
                    key={site.url} 
                    resource={site} 
                    type="job" 
                    isSaved={savedJobUrls.includes(site.url)}
                    onToggleSave={() => toggleSaveJob(site.url)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center text-slate-500 dark:text-slate-400 py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                  <p className="text-lg">לא נמצאו תוצאות עבור החיפוש שלך</p>
                  <button onClick={() => {setJobSearch(''); setDebouncedSearch(''); setShowOnlySavedJobs(false);}} className="mt-4 text-medical-500 font-bold hover:underline">נקה הכל</button>
                </div>
              )}
            </div>
          </div>
        );
      case Tab.LEARNING:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">פיתוח מיומנויות ולמידה</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">שדרגו את קורות החיים שלכם עם קורסים והסמכות מהמוסדות המובילים בעולם. הידע הוא המרשם הכי טוב לקריירה.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNING_SITES.map((site) => (
                <ResourceCard key={site.url} resource={site} type="learning" />
              ))}
            </div>
          </div>
        );
      case Tab.INTERVIEW:
        return (
          <div className="space-y-12 animate-fadeIn">
             <div className="text-center">
                <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-4">
                  <Mic className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">סימולציות והכנה לראיונות</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">כלים מתקדמים לתרגול ראיונות עבודה. זכרו: תרגול נכון מונע 'דפיקות לב' בראיון האמיתי.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INTERVIEW_SITES.map((site) => (
                <ResourceCard key={site.url} resource={site} type="interview" />
              ))}
            </div>

            <div className="mt-16 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
              <div className={`absolute top-4 right-1/2 translate-x-1/2 z-30 transition-all duration-300 ${showShareSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="bg-medical-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-2">
                  <Check className="w-3.5 h-3.5" /> השאלות הועתקו ללוח
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">בנק שאלות מקצועיות</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">בחרו תפקיד ולחצו על שאלה לצפייה בתשובה המומלצת</p>
                  </div>
                </div>
                <button
                  onClick={handleShareQuestions}
                  className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-all font-medium"
                >
                  <Share2 className="w-4 h-4" /> שתף שאלות
                </button>
              </div>
              
              {/* Role Selector with scroll for mobile */}
              <div className="relative mb-10 group">
                <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-2 px-2 scroll-smooth">
                  {TECHNICAL_ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedTechRoleId(role.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border whitespace-nowrap flex-shrink-0 ${
                        selectedTechRoleId === role.id 
                          ? 'bg-medical-500 border-medical-500 text-white shadow-md' 
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-medical-400'
                      }`}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
                {/* Visual fade indicators for scroll */}
                <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white dark:from-slate-800 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-white dark:from-slate-800 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                {currentTechRole.categories.map((cat, idx) => (
                  <div key={idx} className="space-y-5">
                    <h4 className="text-lg font-bold text-medical-600 dark:text-medical-400 border-r-4 border-medical-500 pr-3">
                      {cat.title}
                    </h4>
                    <div className="space-y-4">
                      {cat.questions.map((q, qIdx) => (
                        <QuestionItem key={qIdx} q={q} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case Tab.ADVICE:
        return (
          <div className="space-y-10 animate-fadeIn">
             <div className="text-center mb-12">
                <div className="inline-flex p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">טיפים מקצועיים לקריירה</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">תובנות מעשיות שיעזרו לכם להתבלט מעל כולם בתהליך חיפוש העבודה.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROFESSIONAL_ADVICE.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400`}>
                        {item.icon === 'Network' && <Network className="w-6 h-6" />}
                        {item.icon === 'UserCheck' && <UserCheck className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                    </div>
                    <ul className="space-y-4">
                      {item.content.map((point, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                          <ChevronRight className={`w-5 h-5 flex-shrink-0 text-${item.color}-500`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
          </div>
        );
      default: return null;
    }
  };

  const NavButton = ({ tab, icon: Icon, label }: { tab: TabType, icon: any, label: string }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => handleTabChange(tab)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
          isActive
            ? 'bg-white dark:bg-slate-600 text-medical-700 dark:text-white shadow-sm'
            : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        <Icon className="w-4 h-4" /> <span className="hidden sm:inline">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 cursor-pointer" onClick={() => handleTabChange(Tab.JOBS)}>
            <div className="bg-medical-100 dark:bg-medical-900/50 p-2 rounded-full">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Dr. Job</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden lg:flex gap-1 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
              <NavButton tab={Tab.JOBS} icon={Briefcase} label="חיפוש עבודה" />
              <NavButton tab={Tab.LEARNING} icon={GraduationCap} label="למידה וקורסים" />
              <NavButton tab={Tab.INTERVIEW} icon={Mic} label="הכנה לראיונות" />
              <NavButton tab={Tab.ADVICE} icon={Lightbulb} label="טיפים מקצועיים" />
            </nav>
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className={`lg:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 absolute w-full left-0 shadow-lg z-40 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible scale-y-100' : 'opacity-0 -translate-y-4 invisible scale-y-95 pointer-events-none'}`}>
          <div className="flex flex-col p-4 gap-2 text-right">
            {[ { t: Tab.JOBS, l: 'חיפוש עבודה', i: Briefcase }, { t: Tab.LEARNING, l: 'למידה וקורסים', i: GraduationCap }, { t: Tab.INTERVIEW, l: 'הכנה לראיונות', i: Mic }, { t: Tab.ADVICE, l: 'טיפים מקצועיים', i: Lightbulb } ].map(item => (
              <button key={item.t} onClick={() => handleTabChange(item.t as TabType)} className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 ${activeTab === item.t ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' : 'text-slate-600 dark:text-slate-300'}`}>
                {item.l} <item.i className="w-5 h-5" /> 
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 relative min-h-[60vh]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center animate-fadeIn">
            <div className="flex flex-col items-center gap-3 text-medical-600 dark:text-medical-400">
               <Loader2 className="w-10 h-10 animate-spin" />
               <span className="text-sm font-medium animate-pulse">מכין את המרשם...</span>
            </div>
          </div>
        ) : (
          <div className={`transition-all duration-300 ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            {renderContent()}
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400 text-sm text-center md:text-right">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="font-medium">© Noam Gold AI 2026</p>
            <p className="text-[10px] opacity-60">המרכז הישראלי למציאת עבודה וקריירה</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:goldnoamai@gmail.com" className="flex items-center gap-2 hover:text-medical-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <Mail className="w-4 h-4" /> שלח משוב
            </a>
            <span className="hidden md:inline opacity-30">|</span>
            <span className="text-xs">goldnoamai@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;