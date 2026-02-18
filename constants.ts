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
    description: "פלטפורמת הלמידה של ליקדאין. קורסים מקצועיים בתחומי עסקים, טכנולוגיה ויצירתיות.",
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
      'חפשו "קשרים מדרגה שנייה": בקשו מהחברים שלכם להכיר לכם אנשים בחברות היעד שלכם.',
      'אופטימיזציה של הכותרת (Headline): אל תכתבו רק את התפקיד הנוכחי, כתבו מה הערך שאתם בביאים.'
    ]
  },
  {
    id: 'interview',
    title: 'מאסטריות בראיון עבודה',
    icon: 'UserCheck',
    color: 'purple',
    content: [
      'שיטת STAR: כששואלים אתכם על סיטואציה, ענו לפי הסדר: Situation, Task, Action, Result.',
      'חקר עומק: אל תקראו רק את עמוד ה"אודות". חפשו כתבות אחרונות על החברה והבנת האתגרים שלהם.',
      'השאלה בסוף: תמיד הכינו 3 שאלות חכמות למראיין כדי להראות עניין ורצינות.',
      'שפת גוף ושקט: אל תפחדו משתיקה של כמה שניות כדי לחשוב על תשובה טובה.'
    ]
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    question: "ספר/י לי על עצמך",
    strategy: "אל תספרו את כל קורות החיים. התמקדו ב-3 נקודות: העבר הרלוונטי, ההווה המקצועי, ולמה אתם כאן. שמרו על זה קצר - עד 2 דקות."
  },
  {
    question: "מהן החולשות שלך?",
    strategy: "בחרו חולשה אמיתית והראו איך אתם עובדים כדי לשפר אותה. מגייסים מחפשים מודעות עצמית ויכולת למידה."
  }
];

export const TECHNICAL_ROLES: TechnicalRole[] = [
  {
    id: "ui-developer",
    name: "מפתח UI/Frontend",
    categories: [
      {
        title: "HTML, CSS & Layout",
        questions: [
          { question: "הסבר את ה-Box Model ב-CSS.", answer: "Content, Padding, Border, Margin. 'box-sizing: border-box' כולל padding/border ברוחב הכולל." },
          { question: "מה ההבדל בין Flexbox ל-CSS Grid?", answer: "Flexbox לסידור מימד אחד (שורה/עמודה), Grid לדו-מימד." },
          { question: "מהו CSS Specificity?", answer: "היררכיה הקובעת איזה כלל יחול: Inline > ID > Class > Element." },
          { question: "איך מבצעים אופטימיזציה לתמונות ב-Web?", answer: "שימוש ב-WebP, Lazy Loading, רזולוציה מתאימה ושימוש ב-CDN." },
          { question: "מהם Semantic Elements ב-HTML?", answer: "תגיות כמו <article>, <section>, <nav> שעוזרות ל-SEO ולנגישות." }
        ]
      },
      {
        title: "JavaScript & React",
        questions: [
          { question: "מהו ה-Event Loop ב-JS?", answer: "מנגנון המאפשר ביצוע פעולות אסינכרוניות ב-Single Thread על ידי ניהול תור קריאות." },
          { question: "מהו ה-Virtual DOM ב-React?", answer: "העתק קל של ה-DOM האמיתי שמאפשר ל-React לעדכן רק את השינויים (Reconciliation)." },
          { question: "מה ההבדל בין Props ל-State?", answer: "Props מועברים מבחוץ (Read-only), State מנוהל פנימית וגורם לרינדור מחדש." },
          { question: "איך עובד ה-Hook useEffect?", answer: "מאפשר ביצוע Side Effects. רץ לאחר הרינדור וניתן לשליטה באמצעות רשימת תלויות." },
          { question: "מהו Higher-Order Component (HOC)?", answer: "קומפוננטה שמקבלת קומפוננטה אחרת ומחזירה אחת חדשה עם יכולות משופרות." }
        ]
      }
    ]
  },
  {
    id: "mechanical-design",
    name: "מהנדס מכונות",
    categories: [
      {
        title: "חוזק וחומרים",
        questions: [
          { question: "איך מחשבים מאמץ וכפיפה בקורה קונזולית?", answer: "σ = M*y/I. שקיעה בקצה: δ = PL³/3EI." },
          { question: "מהו מקדם בטיחות?", answer: "היחס בין מאמץ הכניעה למאמץ העבודה בפועל. מונע כשל במקרה של עומס חריג." },
          { question: "מה ההבדל בין קשיחות (Stiffness) לחוזק (Strength)?", answer: "קשיחות היא התנגדות לעיוות אלסטי (מודול יאנג), חוזק הוא העומס המקסימלי שהחומר יכול לשאת." },
          { question: "מהי עייפות חומר (Fatigue)?", answer: "כשל הנוצר תחת עומסים משתנים לאורך זמן, גם אם המאמץ נמוך ממאמץ הכניעה." },
          { question: "הסבר על דיאגרמת מאמץ-מעוות.", answer: "מציגה את התנהגות החומר: תחום אלסטי, נקודת כניעה, תחום פלסטי ונקודת שבר." }
        ]
      },
      {
        title: "תכן וייצור",
        questions: [
          { question: "מהם עקרונות GD&T?", answer: "שפת שרטוט המגדירה סובלנות גיאומטרית (מיקום, צורה, כיוון) להבטחת תפקוד והרכבה." },
          { question: "מה ההבדל בין אלומיניום 6061 ל-7075?", answer: "6061 רב-תכליתי ונוח לריתוך. 7075 חזק משמעותית אך יקר ורגיש לקורוזיה." },
          { question: "איך מתכננים חלק להזרקת פלסטיק?", answer: "שמירה על עובי דופן אחיד, זוויות חליצה (Draft) ומיקום נכון של צלעות חיזוק." },
          { question: "מהו תפקיד הטיפול התרמי?", answer: "שינוי המבנה המיקרוסקופי של החומר לשיפור תכונות כמו קשיות או גמישות." },
          { question: "מתי נשתמש במיסב כדורי לעומת מיסב החלקה?", answer: "כדורי למהירויות גבוהות וחיכוך נמוך. החלקה לעומסים גבוהים ופשטות מכאנית." }
        ]
      }
    ]
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    categories: [
      {
        title: "Machine Learning Concepts",
        questions: [
          { question: "מה ההבדל בין Supervised ל-Unsupervised Learning?", answer: "Supervised דורש נתונים מתויגים (Labels), Unsupervised מחפש תבניות בנתונים ללא תוויות." },
          { question: "מהו ה-Bias-Variance Tradeoff?", answer: "האיזון בין טעות המודל על נתוני האימון (Bias) לבין רגישותו לשינויים בנתונים (Variance)." },
          { question: "מהו Overfitting ואיך מונעים אותו?", answer: "מצב בו המודל לומד 'רעש'. פתרונות: רגולריזציה (L1/L2), הגדלת דאטה, או Cross-validation." },
          { question: "איך עובד אלגוריתם Random Forest?", answer: "שילוב של עצי החלטה רבים הפועלים במקביל (Ensemble) לשיפור הדיוק והקטנת Variance." },
          { question: "מהו ה-Confusion Matrix?", answer: "טבלה להערכת ביצועי מודל סיווג: Precision, Recall, Accuracy ו-F1-score." }
        ]
      },
      {
        title: "Statistics & Data Prep",
        questions: [
          { question: "מהו P-value?", answer: "הסתברות לקבל תוצאה קיצונית תחת הנחת השערת האפס. p < 0.05 נחשב לרוב כמשמעותי סטטיסטית." },
          { question: "מה ההבדל בין נורמליזציה לסטנדרטיזציה?", answer: "נורמליזציה משנה טווח ל-0-1. סטנדרטיזציה משנה לערכים עם ממוצע 0 וסטיית תקן 1." },
          { question: "מהו PCA (Principal Component Analysis)?", answer: "טכניקה להורדת מימדים השומרת על מירב השונות בנתונים." },
          { question: "איך מטפלים בנתונים חסרים?", answer: "מחיקת שורות, מילוי לפי ממוצע/חציון, או שימוש ב-Imputation מבוסס מודל." },
          { question: "מהו A/B Testing?", answer: "ניסוי סטטיסטי להשוואת שתי גרסאות (A ו-B) כדי לקבוע איזו מהן מביאה לתוצאה עסקית טובה יותר." }
        ]
      }
    ]
  },
  {
    id: "cloud-engineer",
    name: "מהנדס ענן",
    categories: [
      {
        title: "Cloud Infrastructure",
        questions: [
          { question: "הסבר את המודלים SaaS, PaaS, IaaS.", answer: "IaaS - חומרה וירטואלית. PaaS - פלטפורמה לפיתוח. SaaS - תוכנה מוכנה לשימוש קצה." },
          { question: "מהי ארכיטקטורת Serverless?", answer: "הרצת קוד (כמו AWS Lambda) ללא ניהול שרתים. התשלום הוא לפי שימוש בלבד." },
          { question: "איך עובד Load Balancing?", answer: "חלוקת תעבורה בין שרתים שונים למניעת עומס והבטחת זמינות גבוהה." },
          { question: "מהו VPC (Virtual Private Cloud)?", answer: "רשת וירטואלית מבודדת בתוך הענן שמאפשרת שליטה מלאה על IP, סאבנטים וניתוב." },
          { question: "מהו ההבדל בין Object Storage ל-Block Storage?", answer: "Object (כמו S3) מתאים לקבצים גדולים וסקלאביליות. Block (כמו EBS) מתאים לביצועים גבוהים של DB." }
        ]
      },
      {
        title: "DevOps & Cloud Native",
        questions: [
          { question: "מהו Infrastructure as Code (IaC)?", answer: "ניהול תשתיות באמצעות קוד (Terraform, CloudFormation) לשיפור מהירות ושחזוריות." },
          { question: "מהו תפקיד ה-Auto Scaling?", answer: "הגדלה או הקטנה של מספר השרתים אוטומטית בהתאם לעומס בזמן אמת." },
          { question: "מהי החשיבות של IAM Roles?", answer: "ניהול הרשאות מאובטח לרכיבים בענן מבלי להשתמש במפתחות גישה קבועים." },
          { question: "מהו היתרון של Multi-AZ Deployment?", answer: "יתירות גיאוגרפית - אם מרכז נתונים אחד קורס, המערכת ממשיכה לעבוד מאחר." },
          { question: "איך מבצעים אופטימיזציה של עלויות בענן?", answer: "שימוש ב-Reserved Instances, מחיקת משאבים שאינם בשימוש, ושימוש ב-Spot Instances." }
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity Analyst",
    categories: [
      {
        title: "Foundations & Defense",
        questions: [
          { question: "מהו ה-CIA Triad?", answer: "Confidentiality (סודיות), Integrity (שלמות), Availability (זמינות)." },
          { question: "הסבר את המושג Zero Trust.", answer: "מודל אבטחה שאינו סומך על אף אחד - כל גישה נבדקת ומאומתת מחדש, גם בתוך הרשת." },
          { question: "מה ההבדל בין IDS ל-IPS?", answer: "IDS רק מתריע על איומים. IPS מתריע וגם מבצע פעולה אקטיבית לחסימתם." },
          { question: "מהו תפקיד ה-WAF (Web Application Firewall)?", answer: "מסנן ומנטר תעבורת HTTP כדי למנוע התקפות כמו SQL Injection ו-XSS." },
          { question: "איך עובדת הצפנה אסימטרית?", answer: "שימוש בזוג מפתחות: Public להצפנה ו-Private לפענוח." }
        ]
      },
      {
        title: "Threats & Mitigation",
        questions: [
          { question: "מהו Phishing ואיך מזהים אותו?", answer: "הונאה דיגיטלית שמטרתה לגנוב פרטים. זיהוי: כתובות שגויות, לחץ זמן, בקשות חריגות." },
          { question: "מהי התקפת SQL Injection?", answer: "הזרקת פקודות SQL לתוך שדות קלט כדי לגשת למידע רגיש במסד הנתונים." },
          { question: "מהו ה-SIEM ומה תפקידו ב-SOC?", answer: "מערכת המרכזת לוגים מכל הרשת ומנתחת אותם לזיהוי אירועי אבטחה בזמן אמת." },
          { question: "מהן ה-OWASP Top 10?", answer: "רשימת 10 סיכוני אבטחת המידע הנפוצים והקריטיים ביותר לאפליקציות Web." },
          { question: "מהו תהליך ה-Incident Response?", answer: "זיהוי, הכלה, ניקוי, שחזור והפקת לקחים לאחר אירוע סייבר." }
        ]
      }
    ]
  },
  {
    id: "qa-engineer",
    name: "בודק תוכנה / QA",
    categories: [
      {
        title: "Methodology",
        questions: [
          { question: "מה ההבדל בין בדיקות שפיות (Sanity) לבדיקות עשן (Smoke)?", answer: "Smoke בודק את יציבות ה-build הבסיסי. Sanity בודק שפונקציה ספציפית עובדת אחרי שינוי." },
          { question: "מהן בדיקות רגרסיה?", answer: "בדיקות שמוודאות ששינויים חדשים לא הרסו יכולות קיימות שעבדו בעבר." },
          { question: "מהו מחזור החיים של באג?", answer: "New -> Open -> Fixed -> Retest -> Closed (או Reopen)." },
          { question: "מה ההבדל בין QA ל-QC?", answer: "QA מתמקד במניעת תקלות (תהליך). QC מתמקד בזיהוי תקלות (תוצר)." },
          { question: "איך כותבים Bug Report אפקטיבי?", answer: "כותרת קצרה, צעדים לשחזור, תוצאה צפויה, תוצאה בפועל וצילום מסך." }
        ]
      },
      {
        title: "Automation & Tools",
        questions: [
          { question: "מהו ה-Page Object Model?", answer: "תבנית עיצוב באוטומציה המפרידה בין תיאור הדפים לבין קוד הבדיקות עצמו." },
          { question: "איך בוחרים אילו טסטים להפוך לאוטומטיים?", answer: "טסטים שחוזרים על עצמם, טסטים קריטיים וטסטים שקשה לבצע ידנית." },
          { question: "מהן בדיקות API?", answer: "בדיקות ישירות של שירותי השרת (Endpoint) לוודא פלט נכון לפי קלט." },
          { question: "מה ההבדל בין Implicit ל-Explicit Wait?", answer: "Implicit מחכה זמן כללי לכל אלמנט. Explicit מחכה לאלמנט ספציפי תחת תנאי מסוים." },
          { question: "מהן בדיקות ביצועים (Performance Testing)?", answer: "בחינת מהירות התגובה והיציבות של המערכת תחת עומסים שונים." }
        ]
      }
    ]
  },
  {
    id: "python-developer",
    name: "מפתח Python",
    categories: [
      {
        title: "Language Internals",
        questions: [
          { question: "מהו ה-GIL ב-Python?", answer: "Global Interpreter Lock - מנגנון המאפשר רק ל-thread אחד להריץ קוד בכל רגע, מה שמגביל Multi-threading." },
          { question: "מה ההבדל בין List ל-Tuple?", answer: "List ניתן לשינוי (Mutable), Tuple לא ניתן לשינוי (Immutable) ומהיר יותר." },
          { question: "מהם Generators ב-Python?", answer: "פונקציות שמחזירות Iterator באמצעות המילה yield, ללא צורך בשמירת כל הנתונים בזיכרון." },
          { question: "איך עובדים Decorators?", answer: "פונקציות שעוטפות פונקציות אחרות כדי להוסיף להן יכולות מבלי לשנות את הקוד המקורי." },
          { question: "מה ההבדל בין append ל-extend ברשימה?", answer: "append מוסיף אובייקט אחד לסוף. extend מוסיף את כל האיברים של iterable לרשימה." }
        ]
      },
      {
        title: "Advanced Topics",
        questions: [
          { question: "מהו ה-Context Manager (המילה with)?", answer: "מבטיח ניהול משאבים נכון, למשל סגירת קובץ אוטומטית בסיום השימוש." },
          { question: "מה ההבדל בין __init__ ל-__new__?", answer: "__new__ יוצר את האובייקט, __init__ מאתחל אותו." },
          { question: "איך Python מנהל זיכרון?", answer: "באמצעות Reference Counting ו-Garbage Collector שמזהה מעגלי הפניות." },
          { question: "מה ההבדל בין שגיאות Syntax לשגיאות Runtime?", answer: "Syntax מתגלות בזמן הקומפילציה. Runtime מתגלות בזמן הרצת הקוד." },
          { question: "מהו List Comprehension?", answer: "דרך מקוצרת ואלגנטית ליצירת רשימות חדשות על בסיס רשימות קיימות." }
        ]
      }
    ]
  },
  {
    id: "cpp-developer",
    name: "מפתח C++",
    categories: [
      {
        title: "Memory & Performance",
        questions: [
          { question: "מה ההבדל בין Stack ל-Heap?", answer: "Stack מנוהל אוטומטית ומהיר. Heap מנוהל ידנית ומתאים להקצאות גדולות ודינמיות." },
          { question: "מהם Smart Pointers?", answer: "אובייקטים המנהלים זיכרון ומונעים Memory Leaks (unique_ptr, shared_ptr)." },
          { question: "מהו RAII?", answer: "Resource Acquisition Is Initialization - משאב נקשר למחזור החיים של אובייקט ומשתחרר ב-Destructor." },
          { question: "מהו תפקיד המילה virtual?", answer: "מאפשרת Dynamic Dispatch - קריאה לפונקציה של מחלקת הבן בזמן ריצה דרך מצביע של מחלקת האב." },
          { question: "מהו ההבדל בין קומפילציה ללינקינג?", answer: "קומפילציה הופכת קוד לקבצי Object. לינקינג מחבר אותם לספרייה או קובץ הרצה." }
        ]
      },
      {
        title: "OOP & Templates",
        questions: [
          { question: "מהו ה-VTable?", answer: "טבלה פנימית המשמשת למימוש פולימורפיזם בזמן ריצה ב-C++." },
          { question: "מהם Templates ב-C++?", answer: "מאפשרים כתיבת קוד גנרי שיכול לעבוד עם טיפוסי נתונים שונים." },
          { question: "מה ההבדל בין Public, Private ו-Protected?", answer: "Public נגיש לכולם. Private נגיש רק למחלקה. Protected נגיש גם למחלקות יורשות." },
          { question: "מהו ה-Rule of Three/Five?", answer: "הנחיה למימוש נכון של Copy Constructor, Assignment Operator ו-Destructor כשמנהלים משאבים." },
          { question: "מהו ה-Namespace ולמה הוא משמש?", answer: "מונע התנגשויות שמות בין ספריות ורכיבים שונים בקוד." }
        ]
      }
    ]
  },
  {
    id: "it-specialist",
    name: "איש IT / מערכות",
    categories: [
      {
        title: "Networking",
        questions: [
          { question: "הסבר את מודל ה-OSI.", answer: "7 שכבות המגדירות איך נתונים עוברים ברשת, מהפיזית ועד לאפליקציה." },
          { question: "מה ההבדל בין TCP ל-UDP?", answer: "TCP אמין ואיטי יותר (וידוא הגעה). UDP מהיר ופחות אמין (ללא וידוא)." },
          { question: "מהו ה-Subnet Mask?", answer: "מגדיר איזה חלק מה-IP שייך לרשת ואיזה למארח הספציפי." },
          { question: "מהו ה-DHCP?", answer: "פרוטוקול המקצה כתובות IP באופן אוטומטי למכשירים ברשת." },
          { question: "מה ההבדל בין Switch ל-Router?", answer: "Switch מחבר מכשירים בתוך רשת אחת. Router מחבר בין רשתות שונות." }
        ]
      },
      {
        title: "Systems & Security",
        questions: [
          { question: "מהו ה-Active Directory?", answer: "שירות של מיקרוסופט לניהול משתמשים, מחשבים והרשאות ברשת ארגונית." },
          { question: "מהו ההבדל בין RAID 1 ל-RAID 5?", answer: "RAID 1 הוא מירור (שכפול). RAID 5 משתמש ב-Parity ליעילות ויתירות." },
          { question: "איך עובד ה-VPN?", answer: "יוצר מנהרה מוצפנת ומאובטחת בין המשתמש לבין הרשת הארגונית מעל האינטרנט." },
          { question: "מהו ה-Blue Screen of Death (BSOD)?", answer: "שגיאת קריסה קריטית של מערכת ההפעלה Windows, לרוב עקב חומרה או דרייבר פגום." },
          { question: "מה זה Group Policy (GPO)?", answer: "כלי לניהול הגדרות של משתמשים ומחשבים בצורה מרוכזת ב-Domain." }
        ]
      }
    ]
  },
  {
    id: "computer-science",
    name: "מדעי המחשב / אלגוריתמים",
    categories: [
      {
        title: "Data Structures",
        questions: [
          { question: "מה ההבדל בין Array ל-Linked List?", answer: "Array בכתובות רציפות וגישה מהירה ב-index. Linked List דינמי וגישה איטית יותר." },
          { question: "איך עובד ה-Hash Table?", answer: "משתמש בפונקציית Hash כדי למפות מפתחות לערכים בסיבוכיות ממוצעת של O(1)." },
          { question: "מה ההבדל בין BFS ל-DFS?", answer: "BFS סורק לרוחב (שימוש בתור). DFS סורק לעומק (שימוש במחסנית/רקורסיה)." },
          { question: "מהו Binary Search Tree (BST)?", answer: "עץ שבו לכל צומת הבן השמאלי קטן ממנו והימני גדול ממנו." },
          { question: "מהו ה-Heap ואיפה משתמשים בו?", answer: "מבנה נתונים המשמש למימוש תור עדיפויות (Priority Queue)." }
        ]
      },
      {
        title: "Algorithms & Logic",
        questions: [
          { question: "מהי סיבוכיות זמן של QuickSort?", answer: "O(n log n) בממוצע. O(n²) במקרה הגרוע ביותר." },
          { question: "מהו אלגוריתם חמדן (Greedy)?", answer: "בוחר את האופציה הטובה ביותר באותו רגע, בתקווה להגיע לפתרון אופטימלי גלובלי." },
          { question: "מה זה Dynamic Programming?", answer: "פתרון בעיה מורכבת על ידי פירוקה לתת-בעיות ושמירת התוצאות למניעת חישוב חוזר." },
          { question: "הסבר את המושג P vs NP.", answer: "P הן בעיות שניתן לפתור מהר. NP הן בעיות שניתן לוודא פתרון שלהן מהר." },
          { question: "מה ההבדל בין רקורסיה לאיטרציה?", answer: "רקורסיה היא קריאה של פונקציה לעצמה. איטרציה היא שימוש בלופים." }
        ]
      }
    ]
  }
];

export const PROFESSIONAL_ADVICE_EXTENDED: AdviceItem[] = [
  ...PROFESSIONAL_ADVICE,
  {
    id: 'search-strategy',
    title: 'אסטרטגיית חיפוש',
    icon: 'Compass',
    color: 'emerald',
    content: [
      'חוק ה-80/20: השקיעו 80% מהזמן בנטוורקינג ופנייה יזומה, ורק 20% בלוחות דרושים.',
      'מעקב צמוד: נהלו טבלת אקסל עם כל המשרות שהגשתם אליהן ותאריכי מעקב.',
      'התאמת קו"ח: שנו מילות מפתח בכל פעם כדי להתאים לתיאור המשרה הספציפי.'
    ]
  }
];
