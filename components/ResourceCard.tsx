import React, { useState } from 'react';
import { ExternalLink, Star, Mic, Briefcase, GraduationCap, Share2, Check, Stethoscope, Heart } from 'lucide-react';
import { ResourceItem } from '../types';

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

interface ResourceCardProps {
  resource: ResourceItem;
  type: 'job' | 'learning' | 'interview';
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, type, isSaved = false, onToggleSave }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleLinkClick = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    createRipple(e);
    navigator.clipboard.writeText(resource.url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const handleToggleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    createRipple(e);
    if (onToggleSave) onToggleSave();
  };

  const getIcon = () => {
    switch (type) {
      case 'job': return <Briefcase className="w-6 h-6" />;
      case 'learning': return <GraduationCap className="w-6 h-6" />;
      case 'interview': return <Mic className="w-6 h-6" />;
      default: return <Stethoscope className="w-6 h-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'job': return 'דרושים';
      case 'learning': return 'למידה';
      case 'interview': return 'ראיונות';
      default: return '';
    }
  };

  const getTypeColorClasses = () => {
    switch (type) {
      case 'job': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'learning': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'interview': return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-medical-50 text-medical-700 dark:bg-medical-900/30 dark:text-medical-300';
    }
  };

  return (
    <div 
      onClick={handleLinkClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] border border-slate-200 dark:border-slate-700 hover:border-medical-300 dark:hover:border-medical-500/30 transition-all duration-500 ease-out flex flex-col h-full relative overflow-hidden"
    >
      {/* Recommended Ribbon */}
      {resource.recommended && (
        <div className="absolute top-0 left-0 bg-medical-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-br-xl flex items-center gap-1 z-20 shadow-sm animate-pulse">
          <Star className="w-3 h-3 fill-current" />
          מומלץ ע"י הדוקטור
        </div>
      )}

      {/* Share Feedback Badge */}
      <div className={`absolute top-4 right-1/2 translate-x-1/2 z-30 transition-all duration-300 ${showCopied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="bg-medical-600 text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-lg flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />
          הקישור הועתק
        </div>
      </div>
      
      {/* Visual Header / Branding Accent */}
      <div className="h-2 bg-gradient-to-l from-medical-500/20 to-medical-600/40 dark:from-medical-900/40 dark:to-medical-800/60" />

      {/* Card Content Header */}
      <div className="p-4 md:p-6 pb-0 flex justify-between items-start">
        <div className="flex gap-3 md:gap-4 items-center">
          <div className={`p-2.5 md:p-3 rounded-xl shadow-sm ring-1 ring-slate-100 dark:ring-slate-700 transition-all duration-300 group-hover:scale-110 ${getTypeColorClasses()} group-hover:bg-medical-500 group-hover:text-white group-hover:ring-medical-400 group-hover:shadow-medical-500/20`}>
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${getTypeColorClasses()}`}>
                {getTypeLabel()}
              </span>
              {resource.category && (
                <span className="text-[9px] md:text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  • {resource.category}
                </span>
              )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors">
              {resource.name}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {type === 'job' && onToggleSave && (
            <button 
              onClick={handleToggleSave}
              className={`p-2.5 rounded-xl transition-all relative overflow-hidden ${
                isSaved 
                  ? 'text-red-500 bg-red-50 dark:bg-red-900/30' 
                  : 'text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
              }`}
              title={isSaved ? "הסר מהשמורים" : "שמור משרה"}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''} relative z-10`} />
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="ripple-span"
                  style={{
                    top: ripple.y,
                    left: ripple.x,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </button>
          )}
          <button 
            onClick={handleShare}
            className="p-2.5 text-slate-400 hover:text-medical-600 dark:hover:text-medical-400 hover:bg-medical-50 dark:hover:bg-medical-900/30 rounded-xl transition-all relative overflow-hidden"
            title="שתף קישור"
          >
            {showCopied ? <Check className="w-5 h-5 text-medical-600 relative z-10" /> : <Share2 className="w-5 h-5 relative z-10" />}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple-span"
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
          </button>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 line-clamp-3">
          {resource.description}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between text-[10px] md:text-[11px] font-medium text-slate-400 dark:text-slate-500 px-1">
             <div className="flex items-center gap-1">
               <Stethoscope className="w-3 h-3 text-medical-500/50" />
               <span>אבחנה: {isSaved ? 'שמור במערכת' : 'מוכן לשימוש'}</span>
             </div>
             <span className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity items-center gap-1">
               בקר באתר <ExternalLink className="w-3 h-3" />
             </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              createRipple(e);
              setTimeout(handleLinkClick, 150);
            }}
            className={`w-full py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-300 border relative overflow-hidden ${
              isSaved && type === 'job'
                ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800'
                : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border-slate-100 dark:border-slate-600'
            } group-hover:bg-medical-600 group-hover:text-white group-hover:border-medical-500 group-hover:shadow-lg group-hover:shadow-medical-600/20`}
          >
            <span className="relative z-10 flex items-center gap-2">מרשם להצלחה: בקר באתר</span>
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="ripple-span"
                style={{
                  top: ripple.y,
                  left: ripple.x,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Subtle Background Watermark */}
      <Stethoscope className="absolute -bottom-4 -left-4 w-24 h-24 text-slate-50 dark:text-slate-700/20 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
    </div>
  );
};