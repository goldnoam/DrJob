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
    description: "שיתוף פעולה עם אוניברסיטאות מובילות. רוב הקורסים ניתנים לצפייה חינם.",
    url: "https://www.coursera.org/",
  },
  {
    name: "freeCodeCamp",
    description: "למידת תכנות ופיתוח תוכנה בחינם לחלוטין עם תעודות.",
    url: "https://www.freecodecamp.org/",
  },
  {
    name: "הר הידע - דיגיטלית (Digitalit)",
    description: "פלטפורמה ללמידה דיגיטלית ושיפור מיומנויות טכנולוגיות מבית משרד העבודה.",
    url: "https://harhayeda.gov.il/digitalit/",
    recommended: true,
  }
];

export const INTERVIEW_SITES: ResourceItem[] = [
  {
    name: "Google Interview Warmup",
    description: "כלי מבוסס בינה מלאכותית של גוגל לתרגול ראיונות עבודה באנגלית. קבלת משוב בזמן אמת.",
    url: "https://grow.google/certificates/interview-warmup/",
    recommended: true,
    category: "Interview",
  },
  {
    name: "JobTraining (כלי להדמיה)",
    description: "כלי להדמיה של ראיונות עבודה בעברית ובשפות נוספות, המאפשר תרגול אינטראקטיבי.",
    url: "https://jobtraining.me/he",
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
      'שתפו תובנות מקצועיות: פוסטים של פתרון בעיות מושכים מגייסים הרבה יותר מפוסטים של "שמח לבשר".',
      'אופטימיזציה של הכותרת: הגדירו את הערך המוסף שלכם, לא רק את התואר הנוכחי.',
      'חפשו קשרים מדרגה שנייה: בקשו מהחברים שלכם להכיר לכם אנשי מפתח בחברות היעד.'
    ]
  },
  {
    id: 'interview',
    title: 'מאסטריות בראיון',
    icon: 'UserCheck',
    color: 'purple',
    content: [
      'שיטת STAR: Situation, Task, Action, Result - הדרך הטובה ביותר לתאר הצלחה ומורכבות.',
      'חקר עומק: הכירו את מוצרי החברה, התרבות הארגונית ואת המתחרים היטב לפני הראיון.',
      'השאלה בסוף: הכינו 3 שאלות חכמות למראיין על האתגרים הצפויים והתמיכה בצוות.',
      'שפת גוף: שמרו על קשר עין, ישיבה זקופה וחיוך. שפת גוף משדרת ביטחון עצמי.'
    ]
  },
  {
    id: 'negotiation',
    title: 'ניהול מו"מ על שכר',
    icon: 'Zap',
    color: 'yellow',
    content: [
      'מחקר מקדים: השתמשו באתרים כמו Glassdoor או טבלאות שכר עדכניות כדי לדעת מה השווי שלכם בשוק.',
      'אל תהיו הראשונים להגיד מספר: נסו להבין מה התקציב של החברה לפני שאתם חושפים את הציפיות שלכם.',
      'הסתכלו על כל החבילה: שכר בסיס הוא רק חלק. בדקו גם בונוסים, אופציות, ימי חופשה וקרן השתלמות.',
      'היו מוכנים ל-No: מו"מ הוא שיחה, לא דרישה. אם לא מקבלים את השכר המבוקש, בקשו לבחון זאת שוב בעוד חצי שנה.'
    ]
  },
  {
    id: 'first90',
    title: 'החודשים הראשונים בתפקיד',
    icon: 'Star',
    color: 'emerald',
    content: [
      'הקשיבו יותר ממה שאתם מדברים: למדו את התהליכים הקיימים לפני שאתם מציעים שינויים מרחיקי לכת.',
      'זהו "ניצחונות מהירים" (Quick Wins): מצאו משימות קטנות שתוכלו לבצע מצוין כדי לבנות אמון מהיר.',
      'בנו מערכות יחסים: קבעו פגישות קצרות להכיר את הקולגות והממשקים שלכם מחוץ לצוות הישיר.',
      'הגדירו ציפיות עם המנהל: ודאו שאתם מבינים מה נחשב להצלחה עבורכם ב-30, 60 ו-90 הימים הראשונים.'
    ]
  }
];

export const TECHNICAL_ROLES: TechnicalRole[] = [
  {
    id: "mechanical-designer",
    name: "מתכנן מכאני",
    categories: [
      {
        title: "תכן וחוזק חומרים",
        questions: [
          { question: "איך מחשבים מאמץ וכפיפה בקורה קונזולית?", answer: "σ = M*y/I. השקיעה בקצה: δ = PL³/3EI. מאמץ מקסימלי מתרחש בסיבים הקיצוניים של בסיס הקורה." },
          { question: "מהו ההבדל בין מאמץ נורמלי למאמץ גזירה?", answer: "נורמלי פועל בניצב לשטח החתך (מתיחה/לחיצה). גזירה פועל במקביל לשטח החתך." },
          { question: "מהי עייפות חומר (Fatigue) ואיך מתכננים נגדה?", answer: "כשל תחת עומס מחזורי נמוך ממאמץ הכניעה. מתכננים באמצעות דיאגרמות S-N והורדת ריכוזי מאמצים." },
          { question: "הסבר את המושג 'מקדם בטיחות' (Safety Factor).", answer: "היחס בין מאמץ הכניעה למאמץ העבודה. בחירתו תלויה ברמת אי-הוודאות בעומס ובחשיבות הבטיחות." },
          { question: "מהו מודול יאנג (Young's Modulus)?", answer: "קבוע המייצג את קשיחות החומר בתחום האלסטי. יחס בין מאמץ למעוות (Stress/Strain)." }
        ]
      },
      {
        title: "ייצור וסבילות (GD&T)",
        questions: [
          { question: "מהם עקרונות ה-GD&T ומה חשיבותם?", answer: "שפת סימון גיאומטרית המגדירה סבילות למיקום, צורה וכיוון, ומבטיחה הרכבה תקינה ותפקוד." },
          { question: "מה ההבדל בין אלומיניום 6061 ל-7075?", answer: "6061 נוח לעיבוד וריתוך, עמיד לקורוזיה. 7075 חזק משמעותית (תעופתי) אך יקר ורגיש לקורוזיה." },
          { question: "איך מתכננים חלק להזרקת פלסטיק?", answer: "שמירה על עובי דופן אחיד, זוויות חליצה (Draft) ומיקום נכון של צלעות חיזוק למניעת Sink marks." },
          { question: "מתי נבחר בטיפול תרמי מסוג T6?", answer: "כשרוצים להעלות את החוזק המכני של סגסוגות אלומיניום מסוימות באמצעות יישון מלאכותי." },
          { question: "מה ההבדל בין מיסב כדורי למיסב החלקה?", answer: "כדורי למהירויות גבוהות וחיכוך נמוך. החלקה לעומסים גבוהים מאוד ושטח מגע גדול." }
        ]
      }
    ]
  },
  {
    id: "devops-engineer",
    name: "DevOps Engineer",
    categories: [
      {
        title: "Infrastructure & Automation",
        questions: [
          { question: "מהו CI/CD ומה חשיבותו?", answer: "Continuous Integration & Deployment. אוטומציה של בנייה, בדיקה והפצה של קוד לשיפור המהירות והאיכות." },
          { question: "הסבר את ההבדל בין Docker ל-VM.", answer: "VM מדמה חומרה ומריצה מערכת הפעלה מלאה. Docker משתמש ב-Kernel של המארח ומריץ קונטיינרים מבודדים וקלים." },
          { question: "מה זה Infrastructure as Code (IaC)?", answer: "ניהול תשתיות באמצעות קוד (Terraform, CloudFormation) לשיפור שחזוריות, גרסאות ודיוק." },
          { question: "מהו Kubernetes ומה תפקידו?", answer: "מערכת לניהול (Orchestration) של קונטיינרים. דואגת ל-Scaling, Self-healing וניהול תעבורה." },
          { question: "איך עובד Load Balancer?", answer: "חלוקת עומסי תעבורה בין מספר שרתים כדי למנוע קריסה ולשפר זמינות." }
        ]
      },
      {
        title: "Monitoring & Clouds",
        questions: [
          { question: "מהו Blue-Green Deployment?", answer: "שיטת הפצה עם שתי סביבות זהות - אחת פעילה ואחת חדשה. המעבר ביניהן מיידי ומאפשר Rollback מהיר." },
          { question: "הסבר את המושג 'Observability'.", answer: "היכולת להבין את המצב הפנימי של המערכת על בסיס הפלטים שלה (Metrics, Logs, Traces)." },
          { question: "איך מאבטחים CI/CD Pipeline?", answer: "סריקת קוד (SAST), סריקת קונטיינרים לחולשות, וניהול סודות (Secrets Management) מאובטח." },
          { question: "מה ההבדל בין Ansible ל-Terraform?", answer: "Terraform הוא Declarative ומשמש להקמת תשתית. Ansible הוא Procedural ומשמש לניהול קונפיגורציה של שרתים." },
          { question: "איך מטפלים ב-Zero Downtime Deployment?", answer: "שימוש בשיטות כמו Rolling Updates או Canary Deployments להחלפה הדרגתית של גרסאות." }
        ]
      }
    ]
  },
  {
    id: "db-admin",
    name: "Database Administrator",
    categories: [
      {
        title: "SQL & Performance",
        questions: [
          { question: "מה ההבדל בין Clustered ל-Non-Clustered Index?", answer: "Clustered קובע את הסדר הפיזי של הנתונים בטבלה. Non-Clustered יוצר מבנה נפרד שמצביע לנתונים." },
          { question: "איך מבצעים Database Normalization?", answer: "תהליך של ארגון הנתונים להפחתת כפילויות ושיפור שלמות הנתונים (1NF, 2NF, 3NF)." },
          { question: "מהו ה-Execution Plan ב-SQL?", answer: "מפת הדרכים שה-Query Optimizer יוצר כדי לבצע את השאילתה בצורה היעילה ביותר." },
          { question: "מה ההבדל בין SQL ל-NoSQL?", answer: "SQL הוא טבלאי וקשיח (Relational). NoSQL הוא גמיש (Document, Key-Value) ומתאים לנתונים לא מובנים." },
          { question: "איך מטפלים ב-Deadlocks?", answer: "זיהוי ע\"י השרת, ביטול אחת הטרנזקציות, וכתיבת קוד שפונה למשאבים באותו סדר תמיד." }
        ]
      },
      {
        title: "Maintenance & Backup",
        questions: [
          { question: "מה ההבדל בין Full, Differential ו-Transaction Log Backup?", answer: "Full מגבה הכל. Differential מגבה שינויים מאז ה-Full האחרון. Log מגבה את כל הפעולות מאז הגיבוי הקודם." },
          { question: "איך מבצעים Database Sharding?", answer: "חלוקת מסד נתונים גדול למספר מסדים קטנים יותר (Shards) הפרוסים על שרתים שונים לשיפור ביצועים." },
          { question: "מהי החשיבות של Statistics ב-SQL Server?", answer: "נתונים על התפלגות הערכים שעוזרים ל-Optimizer לבחור את תוכנית ההרצה הטובה ביותר." },
          { question: "מה זה Replication?", answer: "העתקת נתונים ממסד נתונים אחד לאחר בזמן אמת לשיפור יתירות וזמינות." },
          { question: "איך בודקים שלמות של גיבוי?", answer: "ביצוע שחזור (Restore) תקופתי לסביבת בדיקה ואימות הנתונים." }
        ]
      }
    ]
  },
  {
    id: "solutions-architect",
    name: "Solutions Architect",
    categories: [
      {
        title: "System Design",
        questions: [
          { question: "איך מתכננים מערכת ל-High Availability?", answer: "שימוש בייתירות (Redundancy), Load Balancers, פריסה ב-Multi-Region וניהול Failover אוטומטי." },
          { question: "מה זה Microservices Architecture ומה האתגרים בה?", answer: "פירוק מערכת לשירותים קטנים. אתגרים: תקשורת בין שירותים, עקביות נתונים (Saga pattern) וניטור מורכב." },
          { question: "הסבר את ה-CAP Theorem.", answer: "במערכת מבוזרת ניתן להבטיח רק 2 מתוך 3: Consistency, Availability, Partition Tolerance." },
          { question: "איך בוחרים בין הודעות סינכרוניות לא-סינכרוניות?", answer: "סינכרוני (REST/gRPC) לתגובה מיידית. א-סינכרוני (Message Queues) לעיבוד כבד ושיפור Scalability." },
          { question: "איך מטפלים ב-Data Consistency במערכת מבוזרת?", answer: "שימוש ב-Two-Phase Commit או ב-Eventual Consistency בהתאם לצרכים העסקיים." }
        ]
      },
      {
        title: "Strategy & Cost",
        questions: [
          { question: "איך מבצעים Cloud Migration?", answer: "אסטרטגיות ה-6 R's: Rehost, Replatform, Refactor, Retire, Retain, repurchase." },
          { question: "איך מתכננים מערכת תוך עמידה במגבלות תקציב (FinOps)?", answer: "בחירת משאבים מתאימים (Right-sizing), שימוש ב-Reserved Instances וניטור עלויות שוטף." },
          { question: "מה תפקידו של ה-API Gateway?", answer: "נקודת כניסה אחת לכל השירותים, ניהול אימות (Auth), Rate Limiting וניתוב בקשות." },
          { question: "איך מתכננים ל-Disaster Recovery?", answer: "הגדרת RTO (זמן חזרה) ו-RPO (איבוד נתונים מקסימלי) ובחירת פתרון (Backup, Pilot Light, Hot Site)." },
          { question: "מה החשיבות של Security by Design?", answer: "הטמעת עקרונות אבטחה (כמו Least Privilege) כבר בשלב התכנון הראשוני ולא כתוספת מאוחרת." }
        ]
      }
    ]
  },
  {
    id: "cpp-developer",
    name: "מפתח C++",
    categories: [
      {
        title: "Memory & Core",
        questions: [
          { question: "מה ההבדל בין Stack ל-Heap?", answer: "Stack מנוהל אוטומטית, מהיר ומוגבל. Heap מנוהל ידנית, גמיש ומתאים לאובייקטים דינמיים גדולים." },
          { question: "מהם Smart Pointers?", answer: "אובייקטים המנהלים זיכרון ומונעים Memory Leaks (unique_ptr, shared_ptr, weak_ptr)." },
          { question: "מהו RAII?", answer: "Resource Acquisition Is Initialization - משאב נקשר למחזור החיים של אובייקט ומשתחרר אוטומטית ב-Destructor." },
          { question: "מה תפקיד המילה virtual?", answer: "מאפשרת פולימורפיזם בזמן ריצה (Dynamic Dispatch) - קריאה לפונקציית הבן דרך מצביע של מחלקת האב." },
          { question: "מהו ההבדל בין קומפילציה ללינקינג?", answer: "קומפילציה הופכת קוד מקור לקבצי Object. לינקינג מחבר אותם לספרייה או לקובץ הרצה (Executable)." },
          { question: "מהו Shallow Copy לעומת Deep Copy?", answer: "Shallow מעתיק רק את המצביעים (שניהם מצביעים לאותו זיכרון). Deep מעתיק את התוכן של הזיכרון לכתובת חדשה." },
          { question: "מהו Memory Leak ואיך מונעים אותו?", answer: "הקצאת זיכרון ב-Heap ללא שחרורו. מונעים ע\"י שימוש ב-Smart Pointers או הקפדה על delete לכל new." }
        ]
      },
      {
        title: "Advanced C++ & OOP",
        questions: [
          { question: "מהו ה-VTable?", answer: "טבלה פנימית למימוש פולימורפיזם. מכילה כתובות של פונקציות וירטואליות עבור כל מחלקה." },
          { question: "מהם Templates ב-C++?", answer: "כלי לכתיבת קוד גנרי (פונקציות או מחלקות) שיכול לעבוד עם טיפוסי נתונים שונים ללא שכפול קוד." },
          { question: "מה ההבדל בין Public, Private ו-Protected?", answer: "Public נגיש לכולם. Private נגיש רק למחלקה עצמה. Protected נגיש גם למחלקות יורשות." },
          { question: "מהו ה-Rule of Five?", answer: "הנחיה למימוש Copy/Move Constructors, Assignment Operators ו-Destructor כשמנהלים משאבי זיכרון." },
          { question: "מהו ה-Namespace ולמה הוא משמש?", answer: "מניעת התנגשויות שמות בין ספריות ורכיבים שונים בקוד רחב היקף." },
          { question: "מהו Pure Virtual Function?", answer: "פונקציה שמוגדרת כ-0= וגורמת למחלקה להיות Abstract (לא ניתן ליצור ממנה אובייקטים)." },
          { question: "מהו ההבדל בין Overloading ל-Overriding?", answer: "Overloading הוא אותה פונקציה עם חתימות שונות באותה מחלקה. Overriding הוא מימוש מחדש של פונקציית אב במחלקת בן." }
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
          { question: "מהו ה-GIL ב-Python?", answer: "Global Interpreter Lock - מנגנון המאפשר רק ל-thread אחד להריץ byte-code בכל רגע, מה שמגביל ביצועים ב-Multi-threading." },
          { question: "מה ההבדל בין List ל-Tuple?", answer: "List ניתן לשינוי (Mutable) ואיטי יותר. Tuple לא ניתן לשינוי (Immutable), מהיר יותר ותופס פחות זיכרון." },
          { question: "מהם Generators ב-Python?", answer: "פונקציות המחזירות Iterator באמצעות המילה yield. חוסכות זיכרון כי הן מייצרות איברים לפי דרישה." },
          { question: "איך עובדים Decorators?", answer: "פונקציות שעוטפות פונקציות אחרות להוספת לוגיקה (למשל Logging או Timing) מבלי לשנות את הקוד המקורי." },
          { question: "מה ההבדל בין append ל-extend?", answer: "append מוסיף אובייקט בודד לסוף הרשימה. extend מוסיף את כל האיברים של iterable לרשימה הקיימת." },
          { question: "מהו ה-MRO (Method Resolution Order)?", answer: "הסדר שבו פייתון מחפש מתודות בהיררכיית ירושה מרובה, נקבע לפי אלגוריתם C3 linearization." },
          { question: "מה ההבדל בין is ל-==?", answer: "== בודק שוויון ערכים (Equality). is בודק אם שני המשתנים מצביעים לאותו אובייקט בזיכרון (Identity)." }
        ]
      },
      {
        title: "Advanced Python Topics",
        questions: [
          { question: "מהו ה-Context Manager (המילה with)?", answer: "מבטיח ניהול משאבים נכון, למשל סגירה אוטומטית של קבצים או שחרור Locks בסיום השימוש." },
          { question: "מה ההבדל בין __init__ ל-__new__?", answer: "__new__ הוא המפעל שיוצר את האובייקט, __init__ הוא המעצב שמאתחל את הערכים שלו." },
          { question: "איך Python מנהל זיכרון?", answer: "באמצעות Reference Counting בשילוב עם Garbage Collector שמזהה מעגלי הפניות (Cyclic References)." },
          { question: "מה ההבדל בין שגיאות Syntax לשגיאות Runtime?", answer: "Syntax מתגלות לפני ההרצה (קוד לא חוקי). Runtime מתרחשות בזמן ריצה (למשל חילוק ב-0)." },
          { question: "מהו List Comprehension?", answer: "דרך קצרה ואלגנטית ליצירת רשימות חדשות על בסיס לולאה ותנאי בשורה אחת בלבד." },
          { question: "מהו ה-Metaclass?", answer: "מחלקה של מחלקות. מאפשרת לשנות את אופן היצירה של מחלקות עצמן (למשל לאכיפת סטנדרטים)." },
          { question: "מה ההבדל בין Multiprocessing ל-Multithreading?", answer: "Threading משתף זיכרון ומוגבל ע\"י ה-GIL. Multiprocessing יוצר תהליכים נפרדים עם זיכרון נפרד ועוקף את ה-GIL." }
        ]
      }
    ]
  },
  {
    id: "ui-developer",
    name: "מפתח UI/Frontend",
    categories: [
      {
        title: "React & Frameworks",
        questions: [
          { question: "מהו ה-Virtual DOM?", answer: "ייצוג קל של ה-DOM האמיתי בזיכרון. React משווה ביניהם (Diffing) ומעדכנת רק את מה שצריך." },
          { question: "מה ההבדל בין Props ל-State?", answer: "Props מועברים מרכיב אב (Immutable). State מנוהל פנימית וגורם לרינדור מחדש בעת שינוי." },
          { question: "איך עובד ה-Hook useEffect?", answer: "מאפשר לבצע Side Effects לאחר הרינדור. ניתן לשלוט בתדירות ההרצה ע\"י מערך תלויות." },
          { question: "מה זה Context API?", answer: "דרך להעביר נתונים בין רכיבים מבלי לעבור דרך כל השלבים בדרך (מניעת Prop Drilling)." },
          { question: "מהו ה-Ref (useRef) ב-React?", answer: "מאפשר גישה ישירה לאלמנט ב-DOM או שמירת ערך שלא גורם לרינדור מחדש בעת שינוי." }
        ]
      },
      {
        title: "CSS & Web",
        questions: [
          { question: "איך עובד ה-Box Model?", answer: "כל אלמנט מורכב מ-Content, Padding, Border ו-Margin." },
          { question: "מה ההבדל בין Flexbox ל-Grid?", answer: "Flexbox לסידור חד-מימדי (שורה/עמודה). Grid לסידור דו-מימדי." },
          { question: "מה זה Semantic HTML?", answer: "שימוש בתגיות בעלות משמעות (כמו <nav>, <article>) לשיפור SEO ונגישות." },
          { question: "איך מבצעים אופטימיזציה לביצועי Frontend?", answer: "Lazy loading, צמצום קבצי JS, אופטימיזציית תמונות ושימוש ב-Caching." },
          { question: "מה זה Responsive Design?", answer: "תכנון אתר שמתאים את עצמו לגדלי מסך שונים באמצעות Media Queries." }
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
          { question: "מה ההבדל בין Sanity ל-Smoke Testing?", answer: "Smoke בודק יציבות build בסיסי. Sanity בודק פונקציונליות ספציפית אחרי שינוי קוד." },
          { question: "מהן בדיקות רגרסיה?", answer: "בדיקות שמוודאות ששינויים חדשים לא קלקלו יכולות קיימות שעבדו בעבר." },
          { question: "מהו Bug Lifecycle?", answer: "New -> Open -> Fixed -> Retest -> Closed (או Reopen אם הבעיה לא נפתרה)." },
          { question: "מה ההבדל בין Black Box ל-White Box Testing?", answer: "Black Box בודק פלט לפי קלט בלי לראות קוד. White Box בודק את הלוגיקה הפנימית של הקוד." },
          { question: "איך כותבים Bug Report איכותי?", answer: "כותרת ברורה, צעדים לשחזור, תוצאה צפויה מול תוצאה בפועל וצילום מסך." }
        ]
      }
    ]
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    categories: [
      {
        title: "Networking",
        questions: [
          { question: "מהו מודל ה-OSI ומהן 7 השכבות שלו?", answer: "מודל תיאורטי לתקשורת: Physical, Data Link, Network, Transport, Session, Presentation, Application." },
          { question: "מה ההבדל בין TCP ל-UDP?", answer: "TCP הוא Connection-oriented ומבטיח הגעת נתונים. UDP הוא Connectionless, מהיר יותר אך לא מבטיח הגעה." },
          { question: "איך עובד פרוטוקול DHCP?", answer: "מקצה כתובות IP באופן אוטומטי למכשירים ברשת באמצעות תהליך DORA (Discover, Offer, Request, Acknowledge)." },
          { question: "מהו DNS ואיך הוא מתרגם שמות?", answer: "Domain Name System - מתרגם שמות דומיין (כמו google.com) לכתובות IP שהמחשב מבין." },
          { question: "מה ההבדל בין Router ל-Switch?", answer: "Switch מחבר מכשירים בתוך אותה רשת (LAN). Router מחבר בין רשתות שונות (למשל הבית לאינטרנט)." }
        ]
      },
      {
        title: "Systems & Security",
        questions: [
          { question: "מהו Active Directory (AD)?", answer: "שירות של מיקרוסופט לניהול משתמשים, קבוצות והרשאות ברשת ארגונית בצורה מרכזית." },
          { question: "מה ההבדל בין HTTP ל-HTTPS?", answer: "HTTPS מוסיף שכבת הצפנה (SSL/TLS) על גבי HTTP להגנה על פרטיות הנתונים." },
          { question: "מהו Firewall ואיך הוא מגן על הרשת?", answer: "מערכת אבטחה המסננת תעבורה נכנסת ויוצאת על פי חוקים מוגדרים מראש." },
          { question: "מהו VPN ומה השימוש העיקרי שלו?", answer: "Virtual Private Network - יוצר צינור מוצפן ומאובטח על גבי רשת ציבורית לגישה מרחוק למשאבי הארגון." },
          { question: "איך מתמודדים עם מתקפת Phishing?", answer: "הדרכת משתמשים, שימוש ב-MFA (אימות דו-שלבי), וסינון דוא\"ל זדוני במערכות הארגון." }
        ]
      }
    ]
  }
];
