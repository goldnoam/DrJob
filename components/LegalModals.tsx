import React, { useEffect } from 'react';
import { X, Shield, FileText, CheckCircle2 } from 'lucide-react';

export type LegalModalType = 'terms' | 'privacy' | 'accessibility' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400">
              {activeModal === 'terms' && <FileText className="w-6 h-6" />}
              {activeModal === 'privacy' && <Shield className="w-6 h-6" />}
              {activeModal === 'accessibility' && <CheckCircle2 className="w-6 h-6" />}
            </div>
            <h2 id="legal-modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">
              {activeModal === 'terms' && 'תנאי שימוש (Terms of Use)'}
              {activeModal === 'privacy' && 'מדיניות פרטיות (Privacy Policy)'}
              {activeModal === 'accessibility' && 'הצהרת נגישות (Accessibility Statement)'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="סגור חלון"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {activeModal === 'terms' && (
            <>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                ברוכים הבאים לאתר Dr. Job (להלן: [שם האתר / החברה: Dr. Job]).
              </p>
              <p>
                השימוש באתר ובשירותים המוצעים בו כפוף להסכמתך לתנאים המפורטים להלן. גלישה באתר או שימוש בשירותיו מעידים על הסכמתך לתנאים אלה.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">1. מהות השירות והגבלת אחריות</h3>
              <p>
                אתר Dr. Job משמש כפורטל מרכז מידע, לוחות דרושים, קישורים לאתרי קריירה, כלי למידה והכנה לראיונות עבודה. האתר אינו אחראי על תוכן המשרות המפורסמות, תהליכי המיון או ההתקשרות החוזית בין מועמדים למעסיקים. כל הסתמכות על המידע הינה באחריות המשתמש בלבד.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">2. שימוש מותר והגנה על קניין רוחני</h3>
              <p>
                כל זכויות הקניין הרוחני באתר, לרבות עיצובים, קוד מקור, סימני מסחר ותכנים, שמורות ל-[שם האתר / החברה]. אין להעתיק, להפיץ או לעשות שימוש מסחרי ללא הרשאה מפורשת בכתב.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">3. יצירת קשר</h3>
              <p>
                בכל שאלה או פנייה בנוגע לתנאי השימוש, ניתן ליצור קשר בדוא"ל: [דוא"ל ליצירת קשר: goldnoamai@gmail.com].
              </p>
            </>
          )}

          {activeModal === 'privacy' && (
            <>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                מדיניות הפרטיות של Dr. Job ([שם האתר / החברה: Dr. Job]).
              </p>
              <p>
                אנו מכבדים את פרטיותך ומחויבים להגן על המידע האישי שאתה עשוי למסור בעת השימוש באתר, בהתאם להוראות חוק הגנת הפרטיות, התשמ"א-1981 והתקנות הרלוונטיות.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">1. איסוף ואחסון מידע מקומי (LocalStorage / Cookies)</h3>
              <p>
                האתר עושה שימוש באחסון מקומי (LocalStorage) ובקובצי Cookies חיוניים על מנת לשמור את העדפותיך (כגון משרות שמורות, ערכת עיצוב כהה/בהירה והגשות מועמדות שבוצעו ישירות דרך הדפדפן). מידע זה נשמר במכשירך בלבד ואינו נמסר לצדדים שלישיים ללא הסכמתך.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">2. הגשת מועמדות ופרטי התקשרות</h3>
              <p>
                בעת פרסום משרה או הגשת מועמדות, הפרטים המוזנים (שם, אימייל, טלפון, מכתב מקדים) משמשים אך ורק לצורך תיווך הפנייה אל המעסיק הרלוונטי ואינם משמשים לדיוור פרסומי בלתי מורשה.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">3. פניות בנושאי פרטיות</h3>
              <p>
                למימוש זכות העיון או המחיקה של נתונים, ניתן לפנות לממונה הפרטיות בדוא"ל: [דוא"ל ליצירת קשר: goldnoamai@gmail.com].
              </p>
            </>
          )}

          {activeModal === 'accessibility' && (
            <>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                הצהרת נגישות לאתר Dr. Job
              </p>
              <p>
                אנו ב-Dr. Job ([שם האתר / החברה]) רואים חשיבות עליונה במתן שירות שוויוני ונגיש לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, מתוך אמונה כי לכל אדם מגיעה גישה שווה למידע, משרות והזדמנויות תעסוקה.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">עמידה בתקנים (Compliance)</h3>
              <p>
                אתר זה הונגש בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, ועומד בהנחיות התקן הישראלי ת"י 5568 ברמת AA ובהנחיות הבינלאומיות WCAG 2.1 Level AA.
              </p>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">התאמות הנגישות שבוצעו באתר:</h3>
              <ul className="list-disc list-inside space-y-1.5 pr-2">
                <li>ניווט מלא באמצעות מקלדת (שימוש במקש Tab, חיצים, מקש הרווח ו-Enter).</li>
                <li>תמיכה בסגירת חלונות ומודאלים באמצעות מקש Escape.</li>
                <li>שימוש ב-HTML סמנטי ותגיות ARIA מותאמות לקוראי מסך.</li>
                <li>ניגודיות צבעים מוקפדת במצב בהיר ובמצב כהה (Dark Mode).</li>
                <li>טפסים מונגשים בעלי תוויות (Labels) והנחיות מילוי ברורות.</li>
                <li>התאמה מלאה למסכי מגע ומכשירים ניידים.</li>
              </ul>
              <h3 className="text-base font-bold text-slate-800 dark:text-white pt-2">פרטי רכז הנגישות ויצירת קשר</h3>
              <p>
                אם במהלך הגלישה נתקלתם בקושי בנושא נגישות, נשמח לקבל משוב ולפעול לתיקון בהקדם.
                <br />
                רכז הנגישות: [שם רכז הנגישות: נעם גולד]
                <br />
                דוא"ל ליצירת קשר: [דוא"ל ליצירת קשר: goldnoamai@gmail.com]
              </p>
            </>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-medical-600 hover:bg-medical-700 transition-all text-sm"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
};
