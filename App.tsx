import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Stethoscope, Search, Menu, X, Sun, Moon, Mic, Loader2, Mail, Star, Lightbulb, Network, UserCheck, Compass, Zap, ChevronRight, HelpCircle, Heart, PenTool } from 'lucide-react';
import { JOB_SITES, LEARNING_SITES, INTERVIEW_SITES, PROFESSIONAL_ADVICE, INTERVIEW_QUESTIONS, TECHNICAL_ROLES } from './constants';
import { ResourceCard } from './components/ResourceCard';

const Tab = {
  JOBS: 'JOBS',
  LEARNING: 'LEARNING',
  INTERVIEW: 'INTERVIEW',
  ADVICE: 'ADVICE'
} as const;

type TabType = typeof Tab[keyof typeof Tab];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(Tab.JOBS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [jobSearch, setJobSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showOnlyRecommendedJobs, setShowOnlyRecommendedJobs] = useState(false);
  const [showOnlySavedJobs, setShowOnlySavedJobs] = useState(false);
  const [savedJobUrls, setSavedJobUrls] = useState<string[]>([]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechRoleId, setSelectedTechRoleId] = useState<string>(TECHNICAL_ROLES[0].id);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle Search Debouncing
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

  // Load saved jobs from localStorage
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

  // Save jobs to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('drjob_saved_jobs', JSON.stringify(savedJobUrls));
  }, [savedJobUrls]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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

  const renderContent = () => {
    switch (activeTab) {
      case Tab.JOBS:
        let filteredJobs = JOB_SITES.filter(site => 
          site.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          site.description.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        if (showOnlyRecommendedJobs) {
          filteredJobs = filteredJobs.filter(site => site.recommended);
        }

        if (showOnlySavedJobs) {
          filteredJobs = filteredJobs.filter(site => savedJobUrls.includes(site.url));
        }

        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">לוחות דרושים מומלצים</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
                ריכזנו עבורך את האתרים הטובים ביותר למציאת העבודה הבאה שלך. 
                ממשרות הייטק ועד משרות ממשלתיות.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                    {isSearching ? (
                      <Loader2 className="h-5 w-5 text-medical-500 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5 text-slate-400 transition-colors" />
                    )}
                  </div>
                  <input
                    type="text"
                    className="block w-full pr-10 p-3 border border-slate-300 dark:border-slate-600 rounded-full leading-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-medical-500 sm:text-sm shadow-sm transition-all"
                    placeholder="חיפוש אתר דרושים..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowOnlyRecommendedJobs(!showOnlyRecommendedJobs)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm border ${
                      showOnlyRecommendedJobs 
                        ? 'bg-yellow-400 border-yellow-500 text-yellow-900 shadow-yellow-400/20' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-yellow-400'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${showOnlyRecommendedJobs ? 'fill-current' : ''}`} />
                    מומלצים
                  </button>
                  <button
                    onClick={() => setShowOnlySavedJobs(!showOnlySavedJobs)}
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-sm border ${
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
                  <button onClick={() => {setJobSearch(''); setDebouncedSearch(''); setShowOnlyRecommendedJobs(false); setShowOnlySavedJobs(false);}} className="mt-4 text-medical-500 font-bold hover:underline">נקה הכל</button>
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
          <div className="space-y-12 animate-fadeIn">
             <div className="text-center">
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

            {/* Technical Questions Section */}
            <div className="mt-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">שאלות מקצועיות לפי תפקיד</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">התכונן לשלב הטכני בראיון</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {TECHNICAL_ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setSelectedTechRoleId(role.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedTechRoleId === role.id 
                          ? 'bg-medical-500 text-white shadow-md shadow-medical-500/20' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {role.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {currentTechRole.categories.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="text-lg font-bold text-medical-600 dark:text-medical-400 border-r-4 border-medical-500 pr-3">
                      {cat.title}
                    </h4>
                    <div className="space-y-3">
                      {cat.questions.map((q, qIdx) => (
                        <div key={qIdx} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm border border-slate-100 dark:border-slate-800 hover:border-medical-200 dark:hover:border-medical-800/50 transition-colors">
                          <span className="font-bold text-medical-500 ml-2">•</span>
                          {q.question}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                <HelpCircle className="w-6 h-6 text-medical-500" />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">שאלות כלליות נפוצות בראיונות ואיך לענות</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INTERVIEW_QUESTIONS.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-medical-400/50 transition-colors">
                    <h4 className="text-lg font-bold text-medical-700 dark:text-medical-400 mb-3 flex items-center gap-2">
                      <span className="bg-medical-100 dark:bg-medical-900/40 w-6 h-6 rounded-full flex items-center justify-center text-xs">{idx + 1}</span>
                      {item.question}
                    </h4>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border-r-4 border-medical-500">
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        <strong className="block text-slate-800 dark:text-white mb-1">אסטרטגיה:</strong>
                        {item.strategy}
                      </p>
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
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  ידע הוא כוח. אספנו עבורכם תובנות ושיטות עבודה שיעזרו לכם להתבלט מעל כולם בתהליך חיפוש העבודה ובבניית הקריירה.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROFESSIONAL_ADVICE.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-${item.color}-50 dark:bg-${item.color}-900/20 text-${item.color}-600 dark:text-${item.color}-400`}>
                        {item.icon === 'Network' && <Network className="w-6 h-6" />}
                        {item.icon === 'UserCheck' && <UserCheck className="w-6 h-6" />}
                        {item.icon === 'Compass' && <Compass className="w-6 h-6" />}
                        {item.icon === 'Zap' && <Zap className="w-6 h-6" />}
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
      default:
        return null;
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
        <Icon className="w-4 h-4" />
        {label}
      </button>
    );
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
              <NavButton tab={Tab.JOBS} icon={Briefcase} label="חיפוש עבודה" />
              <NavButton tab={Tab.LEARNING} icon={GraduationCap} label="למידה וקורסים" />
              <NavButton tab={Tab.INTERVIEW} icon={Mic} label="הכנה לראיונות" />
              <NavButton tab={Tab.ADVICE} icon={Lightbulb} label="טיפים מקצועיים" />
            </nav>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={darkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
              aria-label={darkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" 
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="פתח תפריט ניווט"
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div 
          id="mobile-menu"
          className={`lg:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 absolute w-full left-0 shadow-lg z-40 transition-all duration-300 ease-in-out origin-top ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 visible scale-y-100' 
              : 'opacity-0 -translate-y-4 invisible scale-y-95 pointer-events-none'
          }`}
          role="navigation"
        >
          <div className="flex flex-col p-4 gap-2 text-right">
            <button 
              onClick={() => handleTabChange(Tab.JOBS)} 
              className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 transition-colors ${
                activeTab === Tab.JOBS 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              חיפוש עבודה <Briefcase className="w-5 h-5" /> 
            </button>
            <button 
              onClick={() => handleTabChange(Tab.LEARNING)} 
              className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 transition-colors ${
                activeTab === Tab.LEARNING 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              למידה וקורסים <GraduationCap className="w-5 h-5" /> 
            </button>
            <button 
              onClick={() => handleTabChange(Tab.INTERVIEW)} 
              className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 transition-colors ${
                activeTab === Tab.INTERVIEW 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              הכנה לראיונות <Mic className="w-5 h-5" /> 
            </button>
            <button 
              onClick={() => handleTabChange(Tab.ADVICE)} 
              className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 transition-colors ${
                activeTab === Tab.ADVICE 
                  ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              טיפים מקצועיים <Lightbulb className="w-5 h-5" /> 
            </button>
          </div>
        </div>
      </header>

      {/* AdSense Top Slot */}
      <div className="container mx-auto px-4 mt-4">
        <div className="w-full h-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
          מקום לפרסומת (AdSense Ready)
        </div>
      </div>

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

      {/* AdSense Bottom Slot */}
      <div className="container mx-auto px-4 mb-8">
        <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-xs italic">
          מקום לפרסומת מרובעת (AdSense Ready)
        </div>
      </div>

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