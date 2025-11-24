import { ResourceItem } from './types';

export const JOB_SITES: ResourceItem[] = [
  {
    name: "LinkedIn",
    description: "הרשת המקצועית הגדולה בעולם. מצוינת למציאת עבודה, נטוורקינג ומיתוג אישי.",
    url: "https://www.linkedin.com/jobs",
    category: "General",
  },
  {
    name: "Jobify360",
    description: "פלטפורמה טכנולוגית מתקדמת להתאמת מועמדים למשרות מדויקות בישראל.",
    url: "https://www.jobify360.co.il",
    category: "Tech",
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
    name: "Webcand",
    description: "פלטפורמה מובילה לראיונות וידאו דיגיטליים. מומלץ להכיר את המערכת והפורמט המוקלט.",
    url: "https://www.webcand.com/",
    category: "Interview",
  }
];
