import { ResourceItem, AdviceItem, TechnicalRole } from './types';

export const JOB_SITES: ResourceItem[] = [
  {
    name: "LinkedIn",
    description: "הרשת המקצועית הגדולה בעולם. מצוינת למציאת עבודה, נטוורקינג ומיתוג אישי.",
    url: "https://www.linkedin.com/jobs",
    category: "General",
    recommended: true,
  },
  {
    name: "AllJobs",
    description: "לוח הדרושים הגדול בישראל המרכז משרות מכל רחבי הרשת במקום אחד.",
    url: "https://www.alljobs.co.il",
    category: "General",
    recommended: true,
  },
  {
    name: "Jobify360",
    description: "פלטפורמה טכנולוגית מתקדמת להתאמת מועמדים למשרות מדויקות בישראל.",
    url: "https://www.jobify360.co.il",
    category: "Tech",
    recommended: true,
  },
  {
    name: "Gotfriends",
    description: "חברת ההשמה המובילה להייטק בישראל. משרות בלעדיות בחברות סטארטאפ וטכנולוגיה.",
    url: "https://www.gotfriends.co.il",
    category: "Tech",
    recommended: true,
  },
  {
    name: "Nisha",
    description: "קבוצת השמה המתמחה במגוון תחומים: הייטק, פיננסים, ביומד וקלינטק.",
    url: "https://www.nisha.co.il",
    category: "Professional",
  },
  {
    name: "Jobmaster",
    description: "אחד מלוחות הדרושים הוותיקים והגדולים בישראל, מגוון רחב של משרות בכל התחומים.",
    url: "https://www.jobmaster.co.il",
    category: "General",
  },
  {
    name: "Drushim",
    description: "לוח דרושים פופולרי עם מנוע חיפוש נוח ואפשרויות סינון מתקדמות.",
    url: "https://www.drushim.co.il",
    category: "General",
    recommended: true,
  },
  {
    name: "Glow",
    description: "מנוע חיפוש חכם למשרות הייטק בישראל המרכז אלפי משרות מחברות מובילות.",
    url: "https://glow.co.il",
    category: "Tech",
  },
  {
    name: "שירות התעסוקה",
    description: "האתר הרשמי של שירות התעסוקה הישראלי. משרות ממשלתיות, הכשרות וזכויות עובדים.",
    url: "https://www.taasuka.gov.il",
    category: "Government",
  }
];

export const LEARNING_SITES: ResourceItem[] = [
  {
    name: "קמפוס IL (Campus IL)",
    description: "המיזם הלאומי ללמידה דיגיטלית. קורסים אקדמיים והכשרות מקצועיות בחינם בשיתוף האוניברסיטאות ומשרדי הממשלה.",
    url: "https://campus.gov.il/",
    recommended: true,
  },
  {
    name: "Google Digital Garage",
    description: "קורסים של גוגל לפיתוח מיומנויות דיגיטליות, שיווק, נתונים וטכנולוגיה. כולל תעודות.",
    url: "https://learndigital.withgoogle.com/digitalgarage/",
  },
  {
    name: "LinkedIn Learning",
    description: "פלטפורמת הלמידה של לינקדאין. קורסים מקצועיים בתחומי עסקים, טכנולוגיה ויצירתיות.",
    url: "https://www.linkedin.com/learning/",
  },
  {
    name: "Coursera",
    description: "שיתוף פעולה עם אוניברסיטאות מובילות. רוב הקורסים ניתנים לצפייה חינם (Auditing).",
    url: "https://www.coursera.org/",
  },
  {
    name: "edX",
    description: "מיזם של MIT והרווארד. קורסים אקדמיים ברמה גבוהה. אפשרות ללמוד בחינם במצב Audit.",
    url: "https://www.edx.org/",
  },
  {
    name: "Khan Academy",
    description: "מוסד ללא כוונת רווח. דגש על מתמטיקה, מדעים ומדעי המחשב. חינם לחלוטין.",
    url: "https://www.khanacademy.org/",
  },
  {
    name: "HubSpot Academy",
    description: "מתמחה בשיווק, מכירות ו-CRM. קורסים חינם רבים עם תעודות רשמיות מוכרות בתעשייה.",
    url: "https://academy.hubspot.com/",
  },
  {
    name: "freeCodeCamp",
    description: "ארגון ללא מטרות רווח ללימודי תכנות. פרויקטים מעשיים והסמכות מלאות לפיתוח תוכנה בחינם.",
    url: "https://www.freecodecamp.org/",
  },
  {
    name: "Codecademy",
    description: "לימוד תכנות אינטראקטיבי. מסלולים בסיסיים רבים בחינם ללימוד שפות פיתוח.",
    url: "https://www.codecademy.com/",
  },
  {
    name: "MIT OpenCourseWare",
    description: "חומרי הקורס המלאים של MIT לתואר ראשון ושני. איכות אקדמית גבוהה בחינם.",
    url: "https://ocw.mit.edu/",
  },
  {
    name: "Alison",
    description: "פלטפורמה למיומנויות מקום העבודה. אלפי קורסים חינם עם אופציה לתעודה.",
    url: "https://alison.com/",
  }
];

export const INTERVIEW_SITES: ResourceItem[] = [
  {
    name: "Google Interview Warmup",
    description: "כלי מבוסס בינה מלאכותית של גוגל לתרגול ראיונות עבודה באנגלית. קבלת משוב בזמן אמת על התשובות.",
    url: "https://grow.google/certificates/interview-warmup/",
    recommended: true,
    category: "Interview",
  },
  {
    name: "JobTraining (כלי להדמיה)",
    description: "כלי להדמיה של ראיונות עבודה בעברית ובשפות נוספות, המאפשר תרגול אינטראקטיבי.",
    url: "https://jobtraining.me/he",
    category: "Interview",
  },
  {
    name: "Webcand",
    description: "פלטפורמה מובילה לראיונות וידאו דיגיטליים. מומלץ להכיר את המערכת והפורמט המוקלט.",
    url: "https://www.webcand.com/",
    category: "Interview",
  }
];

export const PROFESSIONAL_ADVICE: AdviceItem[] = [
  {
    id: 'linkedin',
    title: 'נטוורקינג ולינקדאין',
    icon: 'Network',
    color: 'blue',
    content: [
      'אל תשלחו בקשות חיבור ריקות: תמיד הוסיפו הערה אישית קצרה שמסבירה למה אתם רוצים להתחבר.',
      'שתפו תובנות, לא רק הצלחות: פוסטים שמסבירים "איך פתרתי בעיה" מושכים הרבה יותר תשומת לב ממגייסים.',
      'חפשו "קשרים מדרגה שנייה": בקשו מהחברים שלכם להכיר לכם אנשים בחברות היעד שלכם. הפניה אישית שווה פי 10 משליחת קו"ח.',
      'אופטימיזציה של הכותרת (Headline): אל תכתבו רק את התפקיד הנוכחי, כתבו מה הערך שאתם בביאים (למשל: "בונה פתרונות תוכנה שחוסכים זמן").'
    ]
  },
  {
    id: 'interview',
    title: 'מאסטריות בראיון עבודה',
    icon: 'UserCheck',
    color: 'purple',
    content: [
      'שיטת STAR: כששואלים אתכם על סיטואציה, ענו לפי הסדר: Situation (מצב), Task (משימה), Action (פעולה שנקטתם), Result (תוצאה סופית).',
      'חקר עומק: אל תקראו רק את עמוד ה"אודות". חפשו כתבות אחרונות על החברה, הבינו מי המתחרים שלהם ומה האתגר המרכזי שלהם.',
      'השאלה בסוף: תמיד הכינו 3 שאלות חכמות למראיין. למשל: "איך נראה יום מוצלח בתפקיד הזה בעיניך?".',
      'שפת גוף ושקט: אל תפחדו משתיקה של כמה שניות כדי לחשוב על תשובה טובה. זה משדר ביטחון, לא חוסר ידע.'
    ]
  },
  {
    id: 'search',
    title: 'אסטרטגיית חיפוש עבודה',
    icon: 'Compass',
    color: 'emerald',
    content: [
      'חוק ה-80/20: השקיעו 80% מהזמן בנטוורקינג ופנייה יזומה, ורק 20% בשליחת קו"ח דרך לוחות דרושים.',
      'מעקב צמוד: נהלו טבלת אקסל או Notion עם כל המשרות שהגשתם אליהן. עשו Follow-up אחרי שבוע אם לא קיבלתם תשובה.',
      'התאמת קורות חיים: אל תשלחו את אותו קובץ לכולם. ודאו שמילות המפתח בתיאור המשרה מופיעות בקו"ח שלכם.',
      'אל תחכו למשרה המושלמת: לפעמים כניסה לחברה בתפקיד מעט שונה יכולה להוביל לתפקיד החלומות שלכם מבפנים.'
    ]
  },
  {
    id: 'reinvention',
    title: 'להמציא את עצמך מחדש',
    icon: 'Zap',
    color: 'orange',
    content: [
      'זהו "מיומנויות מעבירות" (Transferable Skills): גם אם אתם עוברים תחום, היכולת לנהל פרויקטים או לפתור בעיות רלוונטית בכל מקום.',
      'בנו תיק עבודות (Portfolio): אל תספרו מה אתם יודעים לעשות, תראו את זה. פרויקט אישי שווה יותר מכל תעודה.',
      'למידה מתמדת: הקדישו שעה ביום ללמוד משהו חדש שרלוונטי לכיוון החדש שלכם. השוק משתנה מהר, הישארו רלוונטיים.',
      'מיתוג מחדש: עדכנו את הלינקדאין שלכם כך שישקף את מי שאתם רוצים להיות, לא רק את מי שהייתם.'
    ]
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    question: "ספר/י לי על עצמך",
    strategy: "אל תספרו את כל קורות החיים. התמקדו ב-3 נקודות: העבר הרלוונטי, ההווה המקצועי, ולמה אתם כאן (העתיד). שמרו על זה קצר - עד 2 דקות."
  },
  {
    question: "מהן החולשות שלך?",
    strategy: "בחרו חולשה אמיתית (לא 'פרפקציוניזם') והראו איך אתם עובדים כדי לשפר אותה. מגייסים מחפשים מודעות עצמית ויכולת למידה."
  },
  {
    question: "למה כדאי לנו להעסיק דווקא אותך?",
    strategy: "חברו בין הצרכים של החברה (שחקרתם מראש) לבין הכישורים הייחודיים שלכם. תנו דוגמה לבעיה שפתרתם בעבר שיכולה לעזור להם."
  },
  {
    question: "איפה את/ה רואה את עצמך בעוד 5 שנים?",
    strategy: "הראו שאיפה לצמיחה מקצועית שמתיישבת עם מסלול הקידום בחברה. אתם לא חייבים שם של תפקיד, אלא רצון להשפיע ולהתפתח."
  },
  {
    question: "ספר/י על קונפליקט שהיה לך עם קולגה",
    strategy: "מטרת השאלה היא לבחון אינטליגנציה רגשית. אל תאשימו את הצד השני. תארו איך ניהלתם את השיחה בצורה בוגרת והגעתם לפתרון משותף."
  },
  {
    question: "מהן ציפיות השכר שלך?",
    strategy: "עשו מחקר שוק מראש. תנו טווח במקום מספר מדויק, וציינו שאתם גמישים בהתאם לשאר התנאים והאחריות בתפקיד."
  }
];

export const TECHNICAL_ROLES: TechnicalRole[] = [
  {
    id: "mechanical-design",
    name: "תכן מכאני",
    categories: [
      {
        title: "יסודות מכניקה וחוזק חומרים",
        questions: [
          { question: "איך מחשבים מאמץ וכפיפה בקורה קונזולית עם עומס בקצה?" },
          { question: "מה ההבדל בין מאמץ נורמלי לגזירה?" },
          { question: "כיצד מחשבים מקדם בטיחות ולפי מה בוחרים אותו?" },
          { question: "מה ההבדל בין כשל סטטי לכשל עייפות?" },
          { question: "איך מנתחים כשל עייפות במחזורי עומס משתנים?" }
        ]
      },
      {
        title: "תכן למערכות תעופתיות",
        questions: [
          { question: "אילו שיקולים מיוחדים קיימים בתכן חלק למטוס/כטב\"ם?" },
          { question: "איך מתמודדים עם ויברציות ורעידות במבנה?" },
          { question: "איך מבצעים אנליזת מודל (Modal Analysis)?" }
        ]
      }
    ]
  },
  {
    id: "software-engineer",
    name: "פיתוח תוכנה (Backend)",
    categories: [
      {
        title: "מבני נתונים ואלגוריתמים",
        questions: [
          { question: "מה ההבדל בין Hash Map לבין Binary Search Tree?" },
          { question: "איך עובד אלגוריתם QuickSort ומה הסיבוכיות שלו?" }
        ]
      },
      {
        title: "ארכיטקטורה ו-System Design",
        questions: [
          { question: "איך היית מתכנן מערכת שתומכת במיליוני משתמשים בו-זמנית?" },
          { question: "מהו Microservices Architecture ומה היתרונות והחסרונות שלו?" }
        ]
      }
    ]
  },
  {
    id: "electronics-engineer",
    name: "הנדסת אלקטרוניקה",
    categories: [
      {
        title: "מעגלים אנלוגיים ודיגיטליים",
        questions: [
          { question: "הסבר את עקרון הפעולה של מגבר שרת (Op-Amp)." },
          { question: "מה ההבדל בין FPGA לבין Microcontroller?" }
        ]
      }
    ]
  }
];