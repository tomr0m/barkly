import { Footprints, ListChecks, PawPrint, Waves } from "lucide-react";
import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "puppy",
    chipLabel: "גורים",
    title: "חינוך גורים והרגלי בית",
    topics: "גמילה מצרכים, נשכנות, גבולות",
    description: "הבסיס לחיים רגועים בבית עם גור צעיר.",
    icon: PawPrint,
  },
  {
    id: "leash",
    chipLabel: "רצועה וטיולים",
    title: "הליכה ברצועה וחיים בעיר",
    topics: "משיכות, התעלמות מגירויים",
    description: "יציאה לרחוב עם רצועה רפויה וכלב שמרוכז בך.",
    icon: Footprints,
  },
  {
    id: "commands",
    chipLabel: "משמעת",
    title: "פקודות יסוד ומשמעת",
    topics: "שב, ארצה, הישאר, אליי",
    description: "פקודות ברורות ועקביות שהכלב מבצע בכל סביבה.",
    icon: ListChecks,
  },
  {
    id: "calm",
    chipLabel: "רוגע והתנהגות",
    title: "רוגע וויסות רגשי",
    topics: "הורדת עוררות, חרדות, בדידות בבית",
    description: "כלים להורדת עוררות ולהתמודדות עם לחץ והיעדרות.",
    icon: Waves,
  },
];
