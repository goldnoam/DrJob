import React from 'react';
import { ExternalLink, Star, Mic, Briefcase, GraduationCap } from 'lucide-react';
import { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  type: 'job' | 'learning' | 'interview';
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, type }) => {
  const handleLinkClick = () => {
    // Direct navigation without confirmation as requested
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      onClick={handleLinkClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] border border-slate-100 dark:border-slate-700 transition-all duration-300 ease-out flex flex-col h-full relative overflow-hidden ring-medical-500/0 hover:ring-2"
    >
      {resource.recommended && (
        <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-br-lg flex items-center gap-1 z-20 shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          מומלץ
        </div>
      )}
      
      {/* Header Section */}
      {type === 'job' ? (
        <div className="bg-slate-50 dark:bg-slate-700/30 p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
           <div className="flex gap-4 items-center">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-blue-600 dark:text-blue-400 ring-1 ring-slate-100 dark:ring-slate-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
                   {resource.name}
                 </h3>
                 <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                   {resource.category || 'כללי'}
                 </span>
              </div>
           </div>
           <div className="text-slate-400 dark:text-slate-500 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors p-1">
              <ExternalLink className="w-5 h-5" />
           </div>
        </div>
      ) : (
        <div className="px-6 pt-6 flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl shadow-sm ring-1 transition-colors ${
            type === 'interview'
              ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 ring-purple-100 dark:ring-purple-800 group-hover:bg-purple-100'
              : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-emerald-100 dark:ring-emerald-800 group-hover:bg-emerald-100'
          }`}>
            {type === 'interview' ? (
               <Mic className="w-6 h-6" />
            ) : (
               <GraduationCap className="w-6 h-6" />
            )}
          </div>
          <div className="text-slate-400 dark:text-slate-500 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      )}
      
      <div className={`flex-grow flex flex-col ${type === 'job' ? 'p-5 pt-4' : 'px-6 pb-6'}`}>
        {type !== 'job' && (
           <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
             {resource.name}
           </h3>
        )}
        
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
          {resource.description}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-700/50">
          <div 
            className={`block w-full text-center py-2.5 rounded-lg font-bold text-sm transition-all ${
              type === 'job' 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 group-hover:bg-blue-600 group-hover:text-white' 
                : type === 'interview'
                ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 group-hover:bg-purple-600 group-hover:text-white'
                : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white'
            }`}
          >
            מעבר לאתר
          </div>
        </div>
      </div>
    </div>
  );
};