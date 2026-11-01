import type { QuickFix } from "@/types";

export const QUICK_FIXES: QuickFix[] = [
  {
    id: "fix-jumping",
    title: "קפיצות על אורחים",
    description: "להפסיק קפיצות בכניסה של אורחים לבית.",
    categoryId: "commands",
    trainerId: "yoav",
    videoSeconds: 60,
    videoTitle: "הפסקת קפיצות על אורחים",
    steps: [
      "הפנה את הגב לכלב והצלב ידיים ברגע שהוא קופץ",
      "המתן עד שארבע הכפות על הרצפה, ואז סמן ותגמל בגובה הברכיים",
      "בקש מהאורח לפעול באותו אופן ולא לפנות אל הכלב לפני שהוא רגוע",
    ],
  },
  {
    id: "fix-drop-it",
    title: "הוצאת חפץ מהפה ללא מאבק",
    description: "לקבל חזרה חפץ בלי רדיפה ובלי משיכות.",
    categoryId: "commands",
    trainerId: "tomer",
    videoSeconds: 60,
    videoTitle: "החלפת חפץ בחטיף בלי מאבק",
    steps: [
      "אל תרדוף אחרי הכלב ואל תתפוס את החפץ, והושט יד פתוחה בגובה הפה",
      "הצג חטיף ערך גבוה ליד האף וסמן ברגע שהחפץ נופל",
      "הרם את החפץ רק אחרי שהכלב אכל, והחזר לו חפץ מותר",
    ],
  },
  {
    id: "fix-door-barking",
    title: "נביחות על הדלת",
    description: "להרגיע נביחות בעקבות צלצול או רעש בדלת.",
    categoryId: "calm",
    trainerId: "maya",
    videoSeconds: 60,
    videoTitle: "הרגעת נביחות בדלת",
    steps: [
      "דבר בקול נמוך והורד את הגוף לפני שהכלב מגיע אל הדלת",
      "הובל את הכלב למחצלת בצעד איטי וסמן ברגע שהוא נח עליה",
      "גמול על שקט של שלוש שניות ופתח את הדלת רק כשהכלב רגוע",
    ],
  },
];
