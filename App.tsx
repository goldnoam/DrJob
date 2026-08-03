
import React, { useState, useEffect, useMemo } from 'react';
import { Briefcase, GraduationCap, Stethoscope, Search, Menu, X, Sun, Moon, Mic, Loader2, Mail, Star, Lightbulb, Network, UserCheck, Compass, Zap, ChevronRight, HelpCircle, Heart, PenTool, Share2, Copy, Check, ChevronDown, ChevronUp, Cpu, Database, Settings, ArrowRight, User, ShieldCheck, Cloud, Layout, Terminal, Sparkles, PlusCircle, Building2, MapPin, Layers, FileText, CheckCircle2, Filter, Send, ExternalLink, Code } from 'lucide-react';
// Fixed: Removed missing export INTERVIEW_QUESTIONS from constants
import { JOB_SITES, LEARNING_SITES, INTERVIEW_SITES, PROFESSIONAL_ADVICE, TECHNICAL_ROLES } from './constants';
import { ResourceCard } from './components/ResourceCard';
import { AITools } from './components/AITools';
import { TechnicalQuestion, TechnicalRole, DirectJob, JobApplication } from './types';

const Tab = {
  JOBS: 'JOBS',
  LEARNING: 'LEARNING',
  INTERVIEW: 'INTERVIEW',
  ADVICE: 'ADVICE',
  AI_TOOLS: 'AI_TOOLS'
} as const;

type TabType = typeof Tab[keyof typeof Tab];

const QuestionItem: React.FC<{ q: TechnicalQuestion }> = ({ q }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:border-medical-200 dark:hover:border-medical-800/50 transition-all">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-right p-4 flex items-start justify-between gap-3 group focus:outline-none"
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

const RoleCard: React.FC<{ role: TechnicalRole, onClick: () => void }> = ({ role, onClick }) => {
  const getIcon = () => {
    if (role.id.includes('cyber')) return <ShieldCheck size={28} className="md:w-8 md:h-8" />;
    if (role.id.includes('cloud')) return <Cloud size={28} className="md:w-8 md:h-8" />;
    if (role.id.includes('data')) return <Database size={28} className="md:w-8 md:h-8" />;
    if (role.id.includes('ui') || role.id.includes('designer')) return <Layout size={28} className="md:w-8 md:h-8" />;
    if (role.id.includes('developer') || role.id.includes('cpp') || role.id.includes('python')) return <Terminal size={28} className="md:w-8 md:h-8" />;
    if (role.id.includes('it') || role.id.includes('specialist')) return <Settings size={28} className="md:w-8 md:h-8" />;
    return <User size={28} className="md:w-8 md:h-8" />;
  }

  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 md:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-medical-500 dark:hover:border-medical-500 hover:shadow-xl hover:-translate-y-1 transition-all group h-full w-full text-center relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-medical-500/20"
    >
      <div className="p-3 md:p-4 bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 rounded-full mb-3 md:mb-4 group-hover:bg-medical-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
        {getIcon()}
      </div>
      <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
        {role.name}
      </h3>
      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        צפה בשאלות <ArrowRight className="w-3 h-3 rotate-180" />
      </div>
    </button>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(Tab.JOBS);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Theme state: 'light' | 'dark' | 'colorful'
  const [theme, setTheme] = useState<'light' | 'dark' | 'colorful'>('dark');
  const [jobSearch, setJobSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showOnlySavedJobs, setShowOnlySavedJobs] = useState(false);
  const [savedJobUrls, setSavedJobUrls] = useState<string[]>([]);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTechRoleId, setSelectedTechRoleId] = useState<string | null>(null);
  const [isRoleLoading, setIsRoleLoading] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  // Direct jobs & applications states
  const [activeJobSubTab, setActiveJobSubTab] = useState<'direct' | 'external'>('direct');
  
  const [directJobs, setDirectJobs] = useState<DirectJob[]>(() => {
    const saved = localStorage.getItem('drjob_direct_jobs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [
      {
        id: '1',
        title: 'מפתח/ת Full Stack React & Node.js',
        company: 'טק-סולושנס בע"מ',
        location: 'תל אביב',
        industry: 'פיתוח תוכנה',
        experienceLevel: 'בנינוניים/Mid',
        description: 'דרוש/ה מפתח/ת Full Stack מוכשר/ת להשתלבות בצוות פיתוח מוצר חדשני בענן. עבודה עם React, TypeScript, Node.js ו-MongoDB.',
        salary: '₪22,000 - ₪28,000',
        contactEmail: 'hr@techsolutions.co.il',
        createdAt: Date.now() - 86400000 * 2
      },
      {
        id: '2',
        title: 'מנהל/ת שיווק דיגיטלי ושחקן/ית תוכן',
        company: 'גרוות תעשיות',
        location: 'מרחוק',
        industry: 'שיווק',
        experienceLevel: 'בכיר',
        description: 'ניהול קמפיינים ממומנים (PPC), כתיבת תוכן שיווקי, ניהול רשתות חברתיות ואנליטיקה עסקית לחברה בינלאומית.',
        salary: '₪18,000 - ₪23,000',
        contactEmail: 'jobs@growgroup.co.il',
        createdAt: Date.now() - 86400000 * 5
      },
      {
        id: '3',
        title: 'נציג/ת שירות לקוחות ותמיכה טכנית',
        company: 'סלולר-טק',
        location: 'חיפה',
        industry: 'שירות לקוחות',
        experienceLevel: 'ללא ניסיון',
        description: 'מתן מענה טכני ושירותי ללקוחות החברה במוקד מוביל בחיפה. הכשרה מלאה עלינו! מתאים גם לסטודנטים.',
        salary: '₪9,000 - ₪12,000',
        contactEmail: 'support@cellulartech.co.il',
        createdAt: Date.now() - 86400000 * 1
      },
      {
        id: '4',
        title: 'אנליסט/ית נתונים (Data Analyst)',
        company: 'פינטק ישראל',
        location: 'ירושלים',
        industry: 'פיננסים',
        experienceLevel: 'ג\'וניור',
        description: 'ניתוח נתונים פיננסיים, בניית דשבורדים ב-Tableau / PowerBI ועבודה עם SQL לעזרה בקבלת החלטות ענקיות.',
        salary: '₪16,000 - ₪20,000',
        contactEmail: 'analytics@fintechisrael.com',
        createdAt: Date.now() - 86400000 * 3
      }
    ];
  });

  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('drjob_applications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return [];
  });

  const [directSearchKeyword, setDirectSearchKeyword] = useState('');
  const [filterLocation, setFilterLocation] = useState('הכל');
  const [filterIndustry, setFilterIndustry] = useState('הכל');
  const [filterExperience, setFilterExperience] = useState('הכל');

  const [savedLearningUrls, setSavedLearningUrls] = useState<string[]>([]);
  const toggleSaveLearning = (url: string) => {
    setSavedLearningUrls(prev => 
      prev.includes(url) 
        ? prev.filter(u => u !== url) 
        : [...prev, url]
    );
  };

  const filteredDirectJobs = useMemo(() => {
    return directJobs.filter(job => {
      const matchesKeyword = directSearchKeyword === '' || 
        job.title.toLowerCase().includes(directSearchKeyword.toLowerCase()) ||
        job.company.toLowerCase().includes(directSearchKeyword.toLowerCase());
      const matchesLocation = filterLocation === 'הכל' || job.location === filterLocation;
      const matchesIndustry = filterIndustry === 'הכל' || job.industry === filterIndustry;
      const matchesExperience = filterExperience === 'הכל' || job.experienceLevel === filterExperience;
      return matchesKeyword && matchesLocation && matchesIndustry && matchesExperience;
    });
  }, [directJobs, directSearchKeyword, filterLocation, filterIndustry, filterExperience]);

  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<DirectJob | null>(null);
  const [showMyAppsModal, setShowMyAppsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Post form
  const [postTitle, setPostTitle] = useState('');
  const [postCompany, setPostCompany] = useState('');
  const [postLocation, setPostLocation] = useState('תל אביב');
  const [postIndustry, setPostIndustry] = useState('פיתוח תוכנה');
  const [postExperience, setPostExperience] = useState('בנינוניים/Mid');
  const [postDescription, setPostDescription] = useState('');
  const [postSalary, setPostSalary] = useState('');
  const [postEmail, setPostEmail] = useState('');

  // Apply form
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appCoverLetter, setAppCoverLetter] = useState('');

  useEffect(() => {
    localStorage.setItem('drjob_direct_jobs', JSON.stringify(directJobs));
  }, [directJobs]);

  useEffect(() => {
    localStorage.setItem('drjob_applications', JSON.stringify(jobApplications));
  }, [jobApplications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postCompany || !postDescription || !postEmail) {
      alert('נא למלא את כל שדות החובה');
      return;
    }
    const newJob: DirectJob = {
      id: Date.now().toString(),
      title: postTitle,
      company: postCompany,
      location: postLocation,
      industry: postIndustry,
      experienceLevel: postExperience,
      description: postDescription,
      salary: postSalary || undefined,
      contactEmail: postEmail,
      createdAt: Date.now()
    };
    setDirectJobs([newJob, ...directJobs]);
    setShowPostJobModal(false);
    setPostTitle('');
    setPostCompany('');
    setPostDescription('');
    setPostSalary('');
    setPostEmail('');
    showToast('המשרה פורסמה בהצלחה בלוח המשרות!');
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;
    if (!appName || !appEmail || !appPhone) {
      alert('נא למלא את פרטי ההתקשרות (שם, אימייל וטלפון)');
      return;
    }
    const newApp: JobApplication = {
      id: Date.now().toString(),
      jobId: selectedJobForApply.id,
      jobTitle: selectedJobForApply.title,
      company: selectedJobForApply.company,
      applicantName: appName,
      applicantEmail: appEmail,
      applicantPhone: appPhone,
      coverLetter: appCoverLetter,
      submittedAt: Date.now()
    };
    setJobApplications([newApp, ...jobApplications]);
    setShowApplyModal(false);
    setSelectedJobForApply(null);
    setAppName('');
    setAppEmail('');
    setAppPhone('');
    setAppCoverLetter('');
    showToast('מועמדותך הוגשה בהצלחה! המעסיק יצור עמך קשר בקרוב.');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'colorful');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'colorful') {
      root.classList.add('colorful');
    }
  }, [theme]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'colorful';
      return 'light';
    });
  };

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

  const currentTechRole = useMemo(() => 
    TECHNICAL_ROLES.find(r => r.id === selectedTechRoleId),
    [selectedTechRoleId]
  );

  const handleRoleSelect = (roleId: string) => {
    setIsRoleLoading(true);
    // Simulate lazy loading delay for technical questions
    setTimeout(() => {
      setSelectedTechRoleId(roleId);
      setIsRoleLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleShareQuestions = () => {
    if (!currentTechRole) return;
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
        return (
          <div className="space-y-8 animate-fadeIn">
            {/* Header & SubTab Switcher */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">לוח משרות וקישורי דרושים</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
                מצאו עבודה בקלות עם מערכת חיפוש חכמה, הגישו מועמדות ישירות או עיינו בלוחות הדרושים והקישורים המובילים בישראל.
              </p>

              {/* Sub Tab Switcher */}
              <div className="flex justify-center gap-2 mb-8">
                <button
                  onClick={() => setActiveJobSubTab('direct')}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                    activeJobSubTab === 'direct'
                      ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/25'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-medical-400'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  משרות ישירות באתר ({directJobs.length})
                </button>
                <button
                  onClick={() => setActiveJobSubTab('external')}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                    activeJobSubTab === 'external'
                      ? 'bg-medical-600 text-white shadow-lg shadow-medical-500/25'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-medical-400'
                  }`}
                >
                  <ExternalLink className="w-5 h-5" />
                  לוחות דרושים וקישורים חיצוניים
                </button>
              </div>

              {/* Action buttons for Employers / Seeker Applications */}
              {activeJobSubTab === 'direct' && (
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <button
                    onClick={() => setShowPostJobModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    פרסם משרה חדשה (למעסיקים)
                  </button>
                  <button
                    onClick={() => setShowMyAppsModal(true)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold px-6 py-3 rounded-2xl shadow-sm hover:border-medical-400 transition-all flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5 text-medical-500" />
                    המשרות שהגשתי אליהן ({jobApplications.length})
                  </button>
                </div>
              )}
            </div>

            {/* Direct Jobs View */}
            {activeJobSubTab === 'direct' ? (
              <div className="space-y-8">
                {/* Search & Filtering System */}
                <div className="bg-white dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold mb-2">
                    <Filter className="w-5 h-5 text-medical-500" />
                    סינון וחיפוש משרות מתקדם
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Keyword Search */}
                    <div className="relative md:col-span-1">
                      <Search className="absolute right-3 top-3.5 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="חיפוש לפי כותרת, חברה..."
                        value={directSearchKeyword}
                        onChange={(e) => setDirectSearchKeyword(e.target.value)}
                        className="w-full pr-10 p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                      />
                    </div>
                    {/* Location Filter */}
                    <div>
                      <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                      >
                        <option value="הכל">כל המיקומים</option>
                        <option value="תל אביב">תל אביב</option>
                        <option value="חיפה">חיפה</option>
                        <option value="ירושלים">ירושלים</option>
                        <option value="מרכז">מרכז</option>
                        <option value="צפון">צפון</option>
                        <option value="דרום">דרום</option>
                        <option value="מרחוק">מרחוק (Remote)</option>
                      </select>
                    </div>
                    {/* Industry Filter */}
                    <div>
                      <select
                        value={filterIndustry}
                        onChange={(e) => setFilterIndustry(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                      >
                        <option value="הכל">כל התעשיות</option>
                        <option value="פיתוח תוכנה">פיתוח תוכנה</option>
                        <option value="שיווק">שיווק</option>
                        <option value="שירות לקוחות">שירות לקוחות</option>
                        <option value="פיננסים">פיננסים</option>
                        <option value="עיצוב">עיצוב</option>
                      </select>
                    </div>
                    {/* Experience Filter */}
                    <div>
                      <select
                        value={filterExperience}
                        onChange={(e) => setFilterExperience(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                      >
                        <option value="הכל">כל רמות הניסיון</option>
                        <option value="ללא ניסיון">ללא ניסיון</option>
                        <option value="ג'וניור">ג'וניור</option>
                        <option value="בנינוניים/Mid">בנינוניים/Mid</option>
                        <option value="בכיר">בכיר</option>
                        <option value="ראשי צוותים">ראשי צוותים</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDirectJobs.length > 0 ? (
                    filteredDirectJobs.map(job => (
                      <div key={job.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-xs bg-medical-100 text-medical-800 dark:bg-medical-900/40 dark:text-medical-300 px-3 py-1 rounded-full font-bold">
                              {job.industry}
                            </span>
                            {job.salary && (
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                                {job.salary}
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{job.title}</h3>
                          <p className="text-medical-600 dark:text-medical-400 font-semibold mb-3 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4" /> {job.company}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {job.location}
                            </span>
                            <span className="bg-slate-100 dark:bg-slate-700/60 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <Layers className="w-3.5 h-3.5" /> {job.experienceLevel}
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                            {job.description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <span className="text-xs text-slate-400">פורסם ב-{new Date(job.createdAt).toLocaleDateString('he-IL')}</span>
                          <button
                            onClick={() => { setSelectedJobForApply(job); setShowApplyModal(true); }}
                            className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            הגש מועמדות
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                      <p className="text-lg text-slate-500">לא נמצאו משרות התואמות את סינון החיפוש.</p>
                      <button
                        onClick={() => { setDirectSearchKeyword(''); setFilterLocation('הכל'); setFilterIndustry('הכל'); setFilterExperience('הכל'); }}
                        className="mt-4 text-medical-600 font-bold hover:underline"
                      >
                        אפס מסננים
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* External Links & Categorized Job Boards Section */
              <div className="space-y-12 animate-fadeIn">
                <div className="text-center mb-8">
                  <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    ריכזנו עבורכם את כל אתרי הדרושים, לוחות הממשלה ומאגרי התעסוקה המובילים בישראל, מסודרים לפי קטגוריות.
                  </p>
                </div>

                {/* Category 1: General Job Boards */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <Briefcase className="w-6 h-6 text-medical-500" />
                    לוחות דרושים כלליים (General Job Boards)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_SITES.filter(s => s.category === 'General').map(site => (
                      <ResourceCard key={site.url} resource={site} type="job" isSaved={savedJobUrls.includes(site.url)} onToggleSave={() => toggleSaveJob(site.url)} />
                    ))}
                  </div>
                </div>

                {/* Category 2: Tech Jobs */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <Cpu className="w-6 h-6 text-purple-500" />
                    משרות הייטק וסטארטאפים (Tech Jobs)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_SITES.filter(s => s.category === 'Tech').map(site => (
                      <ResourceCard key={site.url} resource={site} type="job" isSaved={savedJobUrls.includes(site.url)} onToggleSave={() => toggleSaveJob(site.url)} />
                    ))}
                  </div>
                </div>

                {/* Category 3: Government Jobs */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    משרות ממשלתיות ונתוני תעסוקה (Government Jobs)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_SITES.filter(s => s.category === 'Government').map(site => (
                      <ResourceCard key={site.url} resource={site} type="job" isSaved={savedJobUrls.includes(site.url)} onToggleSave={() => toggleSaveJob(site.url)} />
                    ))}
                  </div>
                </div>

                {/* Category 4: Recruitment Agencies */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <Network className="w-6 h-6 text-blue-500" />
                    חברות השמה וגיוס מקצועי (Recruitment Agencies)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {JOB_SITES.filter(s => s.category === 'Professional' || (!['General', 'Tech', 'Government'].includes(s.category || ''))).map(site => (
                      <ResourceCard key={site.url} resource={site} type="job" isSaved={savedJobUrls.includes(site.url)} onToggleSave={() => toggleSaveJob(site.url)} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case Tab.LEARNING:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">פיתוח מיומנויות ולמידה</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">שדרגו את קורות החיים שלכם עם קורסים והסמכות מהמוסדות המובילים בעולם.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEARNING_SITES.map((platform) => (
                <ResourceCard 
                  key={platform.url} 
                  resource={platform} 
                  type="learning" 
                  isSaved={savedLearningUrls.includes(platform.url)}
                  onToggleSave={() => toggleSaveLearning(platform.url)}
                />
              ))}
            </div>
          </div>
        );
      case Tab.INTERVIEW:
        return (
          <div className="space-y-10 animate-fadeIn">
             <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-medical-100 dark:bg-medical-900/30 rounded-full text-medical-600 dark:text-medical-400 mb-4">
                  <Mic className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">הכנה לראיונות טכניים</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">בחרו תפקיד טכנולוגי ותרגלו שאלות ראיון נפוצות עם תשובות לדוגמה המומלצות על ידי מומחי גיוס.</p>
             </div>

             {selectedTechRoleId === null ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TECHNICAL_ROLES.map((role) => (
                      <div 
                        key={role.id}
                        onClick={() => handleRoleSelect(role.id)}
                        className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-medical-500 dark:hover:border-medical-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-6">
                            <div className="p-4 rounded-2xl bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 group-hover:bg-medical-600 group-hover:text-white transition-colors">
                              {role.id === 'cpp' ? <Terminal size={28} /> : role.id === 'python' ? <Cpu size={28} /> : role.id === 'it' ? <Network size={28} /> : <Code size={28} />}
                            </div>
                            <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full font-medium">
                              {role.categories.reduce((acc, c) => acc + c.questions.length, 0)} שאלות
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                            {role.name}
                          </h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {role.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 font-bold text-sm">
                          <span>התחל תרגול</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="animate-fadeIn">
                  <button 
                    onClick={() => setSelectedTechRoleId(null)}
                    className="mb-8 flex items-center gap-2 text-medical-600 dark:text-medical-400 font-bold hover:underline group"
                  >
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    חזרה לרשימת התפקידים
                  </button>

                  <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                     <div className={`absolute top-4 right-1/2 translate-x-1/2 z-30 transition-all duration-300 ${showShareSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                       <div className="bg-medical-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-2">
                         <Check className="w-3.5 h-3.5" /> השאלות הועתקו ללוח
                       </div>
                     </div>

                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-medical-50 dark:bg-medical-900/30 rounded-2xl text-medical-600 dark:text-medical-400">
                           <User size={32} />
                         </div>
                         <div>
                           <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{currentTechRole?.name}</h3>
                           <p className="text-slate-500 dark:text-slate-400 text-sm">לחצו על השאלה לצפייה בתשובה המומלצת</p>
                         </div>
                       </div>
                       <button
                         onClick={handleShareQuestions}
                         className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 transition-all font-bold"
                       >
                         <Share2 className="w-4 h-4" /> שתף שאלות
                       </button>
                     </div>

                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                       {currentTechRole?.categories.map((cat, idx) => (
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
              )}
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
                        {item.icon === 'Zap' && <Zap className="w-6 h-6" />}
                        {item.icon === 'Star' && <Star className="w-6 h-6" />}
                        {item.icon === 'Compass' && <Compass className="w-6 h-6" />}
                        {item.icon === 'Search' && <Search className="w-6 h-6" />}
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

            case Tab.LEARNING:
        return (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">פיתוח מיומנויות ולמידה</h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">שדרגו את קורות החיים שלכם עם קורסים והסמכות מהמוסדות המובילים בעולם.</p>
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
             {!selectedTechRoleId ? (
               <>
                 <div className="text-center mb-12">
                    <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400 mb-4">
                      <Mic className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">בנק שאלות מקצועיות</h2>
                    <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">בחרו את התפקיד שלכם כדי לקבל את ה"אבחנה" המקצועית - שאלות נפוצות בראיונות טכניים והתשובות המומלצות.</p>
                 </div>
                 
                 {isRoleLoading ? (
                   <div className="flex flex-col items-center justify-center py-20">
                     <Loader2 className="w-10 h-10 animate-spin text-medical-500" />
                     <p className="mt-4 text-slate-500">טוען שאלות מקצועיות...</p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                      {TECHNICAL_ROLES.map(role => (
                        <RoleCard 
                          key={role.id} 
                          role={role} 
                          onClick={() => handleRoleSelect(role.id)} 
                        />
                      ))}
                   </div>
                 )}

                 <div className="mt-20 border-t border-slate-200 dark:border-slate-700 pt-10">
                    <div className="flex items-center gap-3 mb-8">
                      <HelpCircle className="w-6 h-6 text-medical-500" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">סימולציות וכלים כלליים</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {INTERVIEW_SITES.map((site) => (
                        <ResourceCard key={site.url} resource={site} type="interview" />
                      ))}
                    </div>
                 </div>
               </>
             ) : (
               <div className="animate-fadeIn">
                 <button 
                   onClick={() => setSelectedTechRoleId(null)}
                   className="mb-8 flex items-center gap-2 text-medical-600 dark:text-medical-400 font-bold hover:underline group"
                 >
                   <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                   חזרה לרשימת התפקידים
                 </button>

                 <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-4 right-1/2 translate-x-1/2 z-30 transition-all duration-300 ${showShareSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                      <div className="bg-medical-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-2">
                        <Check className="w-3.5 h-3.5" /> השאלות הועתקו ללוח
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-medical-50 dark:bg-medical-900/30 rounded-2xl text-medical-600 dark:text-medical-400">
                          <User size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{currentTechRole?.name}</h3>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">לחצו על השאלה לצפייה בתשובה המומלצת</p>
                        </div>
                      </div>
                      <button
                        onClick={handleShareQuestions}
                        className="flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-medical-50 dark:hover:bg-medical-900/30 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-600 transition-all font-bold"
                      >
                        <Share2 className="w-4 h-4" /> שתף שאלות
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                      {currentTechRole?.categories.map((cat, idx) => (
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
             )}
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
                        {item.icon === 'Zap' && <Zap className="w-6 h-6" />}
                        {item.icon === 'Star' && <Star className="w-6 h-6" />}
                        {item.icon === 'Compass' && <Compass className="w-6 h-6" />}
                        {item.icon === 'Search' && <Search className="w-6 h-6" />}
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
      case Tab.AI_TOOLS:
        return <AITools />;
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
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-medical-500" />
                פרסום משרה חדשה (למעסיקים)
              </h3>
              <button onClick={() => setShowPostJobModal(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">כותרת המשרה *</label>
                <input
                  type="text"
                  required
                  placeholder="לדוגמה: מפתח/ת Frontend React"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">שם החברה *</label>
                  <input
                    type="text"
                    required
                    placeholder="לדוגמה: טק-סולושנס בע&quot;מ"
                    value={postCompany}
                    onChange={(e) => setPostCompany(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">אימייל ליצירת קשר *</label>
                  <input
                    type="email"
                    required
                    placeholder="hr@company.co.il"
                    value={postEmail}
                    onChange={(e) => setPostEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">מיקום</label>
                  <select
                    value={postLocation}
                    onChange={(e) => setPostLocation(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  >
                    <option value="תל אביב">תל אביב</option>
                    <option value="חיפה">חיפה</option>
                    <option value="ירושלים">ירושלים</option>
                    <option value="מרכז">מרכז</option>
                    <option value="צפון">צפון</option>
                    <option value="דרום">דרום</option>
                    <option value="מרחוק">מרחוק (Remote)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">תעשייה</label>
                  <select
                    value={postIndustry}
                    onChange={(e) => setPostIndustry(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  >
                    <option value="פיתוח תוכנה">פיתוח תוכנה</option>
                    <option value="שיווק">שיווק</option>
                    <option value="שירות לקוחות">שירות לקוחות</option>
                    <option value="פיננסים">פיננסים</option>
                    <option value="עיצוב">עיצוב</option>
                    <option value="אדמיניסטרציה">אדמיניסטרציה</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">רמת ניסיון</label>
                  <select
                    value={postExperience}
                    onChange={(e) => setPostExperience(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  >
                    <option value="ללא ניסיון">ללא ניסיון</option>
                    <option value="ג'וניור">ג'וניור</option>
                    <option value="בנינוניים/Mid">בנינוניים/Mid</option>
                    <option value="בכיר">בכיר</option>
                    <option value="ראשי צוותים">ראשי צוותים</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">טווח שכר (אופציונלי)</label>
                <input
                  type="text"
                  placeholder="לדוגמה: ₪20,000 - ₪25,000"
                  value={postSalary}
                  onChange={(e) => setPostSalary(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">תיאור המשרה ודרישות *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="פרט על התפקיד, הטכנולוגיות או הדרישות..."
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-lg shadow-medical-500/20 transition-all"
                >
                  פרסם משרה עכשיו
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Job Modal */}
      {showApplyModal && selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-medical-500" />
                הגשת מועמדות ל-{selectedJobForApply.title}
              </h3>
              <button onClick={() => setShowApplyModal(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-sm text-slate-600 dark:text-slate-300">
              <p className="font-bold text-slate-800 dark:text-white">{selectedJobForApply.company}</p>
              <p>{selectedJobForApply.location} | {selectedJobForApply.industry}</p>
            </div>
            <form onSubmit={handleApplySubmit} className="space-y-4 text-right">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">שם מלא *</label>
                <input
                  type="text"
                  required
                  placeholder="ישראל ישראלי"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">אימייל *</label>
                  <input
                    type="email"
                    required
                    placeholder="israel@gmail.com"
                    value={appEmail}
                    onChange={(e) => setAppEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">טלפון נייד *</label>
                  <input
                    type="tel"
                    required
                    placeholder="050-0000000"
                    value={appPhone}
                    onChange={(e) => setAppPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">מכתב מקדים או הערה למעסיק</label>
                <textarea
                  rows={4}
                  placeholder="ספר בקצרה מדוע אתה מתאים לתפקיד..."
                  value={appCoverLetter}
                  onChange={(e) => setAppCoverLetter(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-6 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all"
                >
                  ביטול
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-white bg-medical-600 hover:bg-medical-700 shadow-lg shadow-medical-500/20 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  שלח מועמדות
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* My Applications Modal */}
      {showMyAppsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-medical-500" />
                המשרות שהגשתי אליהן ({jobApplications.length})
              </h3>
              <button onClick={() => setShowMyAppsModal(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            {jobApplications.length > 0 ? (
              <div className="space-y-4 text-right">
                {jobApplications.map(app => (
                  <div key={app.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 px-2.5 py-1 rounded-full font-medium">הוגש בהצלחה</span>
                      <span className="text-xs text-slate-400">{new Date(app.submittedAt).toLocaleDateString('he-IL')}</span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">{app.jobTitle}</h4>
                    <p className="text-medical-600 dark:text-medical-400 font-medium text-sm">{app.company}</p>
                    {app.coverLetter && (
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <strong>הערה:</strong> {app.coverLetter}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg">טרם הגשת מועמדות למשרות דרך הפלטפורמה.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 cursor-pointer" onClick={() => handleTabChange(Tab.JOBS)}>
            <div className="bg-medical-100 dark:bg-medical-900/50 p-1.5 md:p-2 rounded-full">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Dr. Job</h1>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden lg:flex gap-1 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
              <NavButton tab={Tab.JOBS} icon={Briefcase} label="חיפוש עבודה" />
              <NavButton tab={Tab.LEARNING} icon={GraduationCap} label="למידה וקורסים" />
              <NavButton tab={Tab.AI_TOOLS} icon={Sparkles} label="כלי AI" />
              <NavButton tab={Tab.INTERVIEW} icon={Mic} label="הכנה לראיונות" />
              <NavButton tab={Tab.ADVICE} icon={Lightbulb} label="טיפים מקצועיים" />
            </nav>
            <button onClick={toggleTheme} className="p-2.5 rounded-full text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2" title="החלף מצב תצוגה">
              {theme === 'light' && <Sun className="w-5 h-5" />}
              {theme === 'dark' && <Moon className="w-5 h-5" />}
              {theme === 'colorful' && <Sparkles className="w-5 h-5 text-pink-500" />}
              <span className="hidden xl:inline text-xs font-bold">
                {theme === 'light' ? 'בהיר' : theme === 'dark' ? 'כהה' : 'צבעוני'}
              </span>
            </button>
            <button className="lg:hidden p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className={`lg:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 absolute w-full left-0 shadow-lg z-40 transition-all duration-300 origin-top ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible scale-y-100' : 'opacity-0 -translate-y-4 invisible scale-y-95 pointer-events-none'}`}>
          <div className="flex flex-col p-4 gap-2 text-right">
            {[ 
              { t: Tab.JOBS, l: 'חיפוש עבודה', i: Briefcase }, 
              { t: Tab.LEARNING, l: 'למידה וקורסים', i: GraduationCap }, 
              { t: Tab.AI_TOOLS, l: 'כלי AI', i: Sparkles },
              { t: Tab.INTERVIEW, l: 'הכנה לראיונות', i: Mic }, 
              { t: Tab.ADVICE, l: 'טיפים מקצועיים', i: Lightbulb } 
            ].map(item => (
              <button key={item.t} onClick={() => handleTabChange(item.t as TabType)} className={`p-3 rounded-xl font-medium flex items-center justify-end gap-3 ${activeTab === item.t ? 'bg-medical-50 dark:bg-medical-900/30 text-medical-700 dark:text-medical-300' : 'text-slate-600 dark:text-slate-300'}`}>
                {item.l} <item.i className="w-5 h-5" /> 
              </button>
            ))}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-24 lg:pb-8 relative min-h-[60vh]">
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

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center p-2">
          {[
            { t: Tab.JOBS, l: 'חיפוש', i: Briefcase },
            { t: Tab.LEARNING, l: 'למידה', i: GraduationCap },
            { t: Tab.AI_TOOLS, l: 'AI', i: Sparkles },
            { t: Tab.INTERVIEW, l: 'ראיונות', i: Mic },
            { t: Tab.ADVICE, l: 'טיפים', i: Lightbulb }
          ].map(item => (
            <button
              key={item.t}
              onClick={() => handleTabChange(item.t as TabType)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 min-w-[64px] ${
                activeTab === item.t
                  ? 'text-medical-600 dark:text-medical-400 bg-medical-50 dark:bg-medical-900/20'
                  : 'text-slate-500 dark:text-slate-400 active:bg-slate-100 dark:active:bg-slate-700'
              }`}
            >
              <item.i className={`w-5 h-5 ${activeTab === item.t ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-bold">{item.l}</span>
            </button>
          ))}
        </div>
      </div>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-12 pb-24 lg:pb-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 mb-1">
                <Stethoscope className="w-5 h-5" />
                <span className="font-bold text-lg">Dr. Job</span>
              </div>
              <p className="font-medium">© Noam Gold AI 2026</p>
              <p className="text-xs opacity-60">המרכז הישראלי למציאת עבודה וקריירה</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="https://www.linkedin.com/in/noamgold" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition-colors px-4 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Share2 className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://noam-gold-games.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-600 transition-colors px-4 py-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                  <Zap className="w-4 h-4" /> More Games
                </a>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="mailto:goldnoamai@gmail.com" className="flex items-center gap-2 hover:text-medical-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <Mail className="w-4 h-4" /> Send Feedback
                </a>
                <span className="hidden md:inline opacity-30">|</span>
                <span className="text-xs font-mono">goldnoamai@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
