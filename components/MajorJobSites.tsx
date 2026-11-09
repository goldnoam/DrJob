import React from 'react';
import { ExternalLink, Star, Briefcase, Globe, Cpu, ShieldCheck } from 'lucide-react';
import { ResourceItem } from '../types';

interface MajorJobSitesProps {
  sites: ResourceItem[];
  savedUrls?: string[];
  onToggleSave?: (url: string) => void;
}

export const MajorJobSites: React.FC<MajorJobSitesProps> = ({
  sites,
  savedUrls = [],
  onToggleSave,
}) => {
  // Highlighted major Israeli job search websites (AllJobs, JobMaster, LinkedIn, Drushim, etc.)
  const majorSites = sites.filter(s =>
    ['LinkedIn', 'AllJobs', 'Jobmaster', 'Drushim', 'מערך הדיגיטל הלאומי - משרות וקריירה', 'פורטל גיוס מרכב״ה - שירות המדינה ומשרדי הממשלה', 'שירות התעסוקה', 'Gotfriends', 'Jobify360', 'אבו-דאטה (Avodata) - משרד העבודה'].includes(s.name)
  );

  return (
    <section className="space-y-6" aria-labelledby="major-sites-title">
      <div className="bg-gradient-to-r from-medical-50/80 via-blue-50/40 to-slate-50 dark:from-slate-800/90 dark:via-medical-950/20 dark:to-slate-800/90 p-6 md:p-8 rounded-3xl border border-medical-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-500/10 text-medical-600 dark:text-medical-400 text-xs font-bold mb-2">
              <Globe className="w-3.5 h-3.5" />
              פורטלי התעסוקה המובילים
            </div>
            <h3 id="major-sites-title" className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              אתרי הדרושים והחיפוש הגדולים בישראל
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-3xl mt-1">
              ריכוז של אתרי הדרושים המובילים בישראל – כולל AllJobs, JobMaster, LinkedIn Jobs, לוחות ממשלתיים וטכנולוגיים, עם קישורים ישירים ותיאור מקצועי של כל אתר.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {majorSites.map((site) => {
            const isSaved = savedUrls.includes(site.url);
            return (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-medical-500 dark:hover:border-medical-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-medical-50 dark:bg-medical-900/40 text-medical-600 dark:text-medical-400 group-hover:bg-medical-600 group-hover:text-white transition-colors">
                      {site.category === 'Tech' ? (
                        <Cpu className="w-5 h-5" />
                      ) : site.category === 'Government' ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        <Briefcase className="w-5 h-5" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {site.recommended && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/40">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          מוביל
                        </span>
                      )}
                      <span className="text-slate-400 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors flex items-center gap-1.5">
                    {site.name}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {site.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-medical-600 dark:text-medical-400 font-bold">
                  <span>כניסה לאתר החיפוש</span>
                  <span className="text-slate-400 group-hover:-translate-x-1 transition-transform">←</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
