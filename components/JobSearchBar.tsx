import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, RotateCcw, TrendingUp, Flame, X } from 'lucide-react';

const STORAGE_KEY = 'drjob_search_keyword_counts';

// Popular default searches in Israel if localStorage is empty
const DEFAULT_POPULAR_SEARCHES = [
  'React',
  'Full Stack',
  'Node.js',
  'Data Analyst',
  'QA',
  'Product Manager',
  'שיווק דיגיטלי',
  'DevOps',
  'Python',
];

interface JobSearchBarProps {
  keyword: string;
  onKeywordChange: (val: string) => void;
  location: string;
  onLocationChange: (val: string) => void;
  industry: string;
  onIndustryChange: (val: string) => void;
  onSearch?: () => void;
  onReset?: () => void;
  totalResultsCount?: number;
}

export const JobSearchBar: React.FC<JobSearchBarProps> = ({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  industry,
  onIndustryChange,
  onSearch,
  onReset,
  totalResultsCount,
}) => {
  const [popularKeywords, setPopularKeywords] = useState<string[]>([]);

  // Load frequent searches from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const counts: Record<string, number> = JSON.parse(raw);
        const sorted = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .map(([term]) => term)
          .slice(0, 8);

        if (sorted.length > 0) {
          setPopularKeywords(sorted);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to load search keyword frequencies', e);
    }
    // Fallback defaults
    setPopularKeywords(DEFAULT_POPULAR_SEARCHES);
  }, []);

  // Helper to log a keyword into localStorage frequency map
  const logSearchKeyword = (rawTerm: string) => {
    const term = rawTerm.trim();
    if (!term || term.length < 2) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
      
      // Normalize casing while preserving display formatting for Hebrew & English
      const existingKey = Object.keys(counts).find(
        (k) => k.toLowerCase() === term.toLowerCase()
      );
      const keyToUse = existingKey || term;

      counts[keyToUse] = (counts[keyToUse] || 0) + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));

      // Update in-memory sorted popular list
      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([k]) => k)
        .slice(0, 8);

      setPopularKeywords(sorted);
    } catch (e) {
      console.error('Failed to log search keyword', e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      logSearchKeyword(keyword);
    }
    if (onSearch) {
      onSearch();
    }
  };

  const handlePopularClick = (term: string) => {
    onKeywordChange(term);
    logSearchKeyword(term);
    if (onSearch) {
      onSearch();
    }
  };

  const handleClearHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.removeItem(STORAGE_KEY);
      setPopularKeywords(DEFAULT_POPULAR_SEARCHES);
    } catch (err) {
      console.error(err);
    }
  };

  const hasActiveFilters = keyword.trim() !== '' || location !== 'הכל' || industry !== 'הכל';

  return (
    <div className="bg-white dark:bg-slate-800/90 p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 transition-all">
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="חיפוש משרות"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          {/* Keywords input */}
          <div className="relative md:col-span-5">
            <label htmlFor="job-search-keywords" className="sr-only">
              מילות מפתח (כותרת משרה, חברה, טכנולוגיה)
            </label>
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              id="job-search-keywords"
              type="text"
              placeholder="חיפוש לפי מילת מפתח, כותרת משרה או שם חברה..."
              value={keyword}
              onChange={(e) => onKeywordChange(e.target.value)}
              className="w-full pr-11 pl-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-medical-500 focus:border-transparent focus:outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Location select */}
          <div className="relative md:col-span-3">
            <label htmlFor="job-search-location" className="sr-only">
              מיקום
            </label>
            <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="job-search-location"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full pr-10 pl-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:border-transparent focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option value="הכל">כל המיקומים (בחר אזור)</option>
              <option value="תל אביב">תל אביב וגוש דן</option>
              <option value="מרכז">אזור המרכז</option>
              <option value="ירושלים">ירושלים והסביבה</option>
              <option value="חיפה">חיפה והקריות</option>
              <option value="צפון">אזור הצפון</option>
              <option value="דרום">אזור הדרום והשפלה</option>
              <option value="מרחוק">עבודה מרחוק / היברידי (Remote)</option>
            </select>
          </div>

          {/* Industry select */}
          <div className="relative md:col-span-2">
            <label htmlFor="job-search-industry" className="sr-only">
              תחום עיסוק
            </label>
            <Briefcase className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              id="job-search-industry"
              value={industry}
              onChange={(e) => onIndustryChange(e.target.value)}
              className="w-full pr-10 pl-4 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-medical-500 focus:border-transparent focus:outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
            >
              <option value="הכל">כל התחומים</option>
              <option value="פיתוח תוכנה">פיתוח תוכנה והייטק</option>
              <option value="שיווק">שיווק ודיגיטל</option>
              <option value="שירות לקוחות">שירות לקוחות ומכירות</option>
              <option value="פיננסים">פיננסים וכלכלה</option>
              <option value="עיצוב">עיצוב ו-UI/UX</option>
              <option value="אדמיניסטרציה">אדמיניסטרציה ומשאבי אנוש</option>
            </select>
          </div>

          {/* Search Submit Button */}
          <div className="md:col-span-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 bg-medical-600 hover:bg-medical-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-medical-500/25 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>חפש משרות</span>
            </button>

            {hasActiveFilters && onReset && (
              <button
                type="button"
                onClick={onReset}
                title="איפוס חיפוש ומסננים"
                className="p-3.5 rounded-2xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                aria-label="איפוס חיפוש"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Popular Searches Section */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>חיפושים פופולריים:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {popularKeywords.map((term) => {
              const isSelected = keyword.toLowerCase() === term.toLowerCase();
              return (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularClick(term)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1 font-medium ${
                    isSelected
                      ? 'bg-medical-600 text-white shadow-sm shadow-medical-500/30'
                      : 'bg-slate-100 hover:bg-medical-50 dark:bg-slate-700/70 dark:hover:bg-medical-900/40 text-slate-700 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-300'
                  }`}
                >
                  <TrendingUp className="w-3 h-3 opacity-60" />
                  <span>{term}</span>
                </button>
              );
            })}
          </div>

          {popularKeywords.length > 0 && localStorage.getItem(STORAGE_KEY) && (
            <button
              type="button"
              onClick={handleClearHistory}
              title="איפוס היסטוריית החיפושים הפופולריים"
              className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline transition-colors"
            >
              אפס פופולריים
            </button>
          )}
        </div>
      </div>

      {/* Filter status helper badge */}
      {typeof totalResultsCount === 'number' && (
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span>
            {totalResultsCount > 0
              ? `נמצאו ${totalResultsCount} משרות התואמות לחיפוש`
              : 'לא נמצאו משרות תואמות'}
          </span>
          {hasActiveFilters && (
            <span className="text-medical-600 dark:text-medical-400 font-medium">
              מסננים פעילים: {keyword && `"${keyword}"`} {location !== 'הכל' && `• ${location}`}{' '}
              {industry !== 'הכל' && `• ${industry}`}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
