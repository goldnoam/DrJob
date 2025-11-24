import React, { useState } from 'react';
import { ExternalLink, Star, AlertCircle, Mic, Briefcase, GraduationCap } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  type: 'job' | 'learning' | 'interview';
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, type }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] border border-slate-100 dark:border-slate-700 p-6 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
        {resource.recommended && (
          <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-br-lg flex items-center gap-1 z-10 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            מומלץ למתחילים
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4 mt-2">
          <div className={`p-3 rounded-lg ${
            type === 'job' 
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
              : type === 'interview'
              ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
          }`}>
            {type === 'job' ? (
               <Briefcase className="w-6 h-6" />
            ) : type === 'interview' ? (
               <Mic className="w-6 h-6" />
            ) : (
               <GraduationCap className="w-6 h-6" />
            )}
          </div>
          <button 
            onClick={handleLinkClick}
            className="text-slate-400 dark:text-slate-500 hover:text-medical-600 dark:hover:text-medical-400 transition-colors"
            title="פתח קישור חיצוני"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{resource.name}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
          {resource.description}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-700">
          <button 
            onClick={handleLinkClick}
            className={`block w-full text-center py-2.5 rounded-lg font-medium transition-colors ${
              type === 'job' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50' 
                : type === 'interview'
                ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
            }`}
          >
            מעבר לאתר
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn" style={{ animationDuration: '0.2s' }}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-100 dark:border-slate-700 transform scale-100 animate-fadeIn" style={{ animationDuration: '0.3s' }}>
            <div className="flex items-center gap-3 text-amber-500 mb-4">
               <AlertCircle className="w-6 h-6" />
               <h3 className="text-lg font-bold text-slate-900 dark:text-white">מעבר לאתר חיצוני</h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              הקישור מוביל לאתר <strong>{resource.name}</strong>. האם את/ה בטוח/ה שברצונך לעזוב את Dr. Job?
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-medical-600 text-white hover:bg-medical-700 font-medium transition-colors shadow-sm"
              >
                כן, המשך לאתר
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};