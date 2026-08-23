/**
 * constants/options.js
 * ------------------------------------------------------------
 * Single source of truth for every enum used by the registration
 * form. The `value` of each option MUST match
 * registration-fields-reference.md character-for-character —
 * these are sent to the API verbatim. Only `label` (the Arabic
 * text shown to the user) is presentation and safe to edit.
 */

export const INTEREST_OPTIONS = [
  { value: "Web Development", label: "تطوير الويب" },
  { value: "Mobile App Development", label: "تطوير تطبيقات الجوال" },
  { value: "Networking", label: "الشبكات" },
  { value: "Artificial Intelligence", label: "الذكاء الاصطناعي" },
];

export const PROJECT_OPTIONS = [
  { value: "Frontend", label: "واجهات أمامية (Frontend)" },
  { value: "Backend", label: "أنظمة خلفية (Backend)" },
  { value: "AI", label: "ذكاء اصطناعي" },
  { value: "Mobile Apps", label: "تطبيقات جوال" },
  { value: "None", label: "لا شيء من ذلك", isExclusive: true },
];

export const LANGUAGE_OPTIONS = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "PHP", label: "PHP" },
  { value: "Dart", label: "Dart" },
  { value: "None", label: "لا شيء من ذلك", isExclusive: true },
];

export const HOW_DID_YOU_HEAR_OPTIONS = [
  { value: "Facebook", label: "فيسبوك" },
  { value: "WhatsApp", label: "واتساب" },
  { value: "TikTok", label: "تيك توك" },
  { value: "Friend", label: "صديق" },
  { value: "University", label: "الجامعة" },
  { value: "Company Website", label: "موقع الشركة" },
  { value: "Other", label: "أخرى" },
];

export const GOAL_ITEMS = [
  { title: "استغلال سنوات الجامعة", desc: "توظيف سنوات الدراسة بالشكل الصحيح لبناء أساس تقني قوي.", icon: "cap" },
  { title: "التعرف على المجالات التقنية", desc: "استكشاف أبرز المجالات التقنية المتاحة اليوم.", icon: "layers" },
  { title: "فهم المسارات التقنية المختلفة", desc: "معرفة المسارات المتاحة وما يناسب اهتماماتك منها.", icon: "route" },
  { title: "تطوير نفسك", desc: "اكتساب خطوات عملية للبدء في تطوير مهاراتك التقنية.", icon: "trend" },
  { title: "بناء رؤية أوضح لمسارك التقني", desc: "الخروج برؤية أقرب لمسارك المهني القادم.", icon: "target" },
  { title: "الاستعداد بشكل أفضل لسوق العمل", desc: "خطوات تقربك من دخول سوق العمل التقني بثقة أكبر.", icon: "brief" },
];

export const FIELD_NAMES = [
  "name", "email", "phone", "university", "interests",
  "major", "quiz_projects", "quiz_languages", "how_did_you_hear",
];

export const FRIENDLY_MESSAGES = {
  name: "يرجى إدخال اسم صحيح.",
  email: "يرجى إدخال بريد إلكتروني صحيح.",
  phone: "يرجى التأكد من رقم الهاتف.",
  university: "يرجى إدخال جهة الدراسة بشكل صحيح.",
  interests: "يرجى اختيار مجال تقني واحد على الأقل.",
  major: "يرجى مراجعة حقل التخصص.",
  quiz_projects: 'لا يمكن اختيار "لا شيء من ذلك" مع خيارات أخرى.',
  quiz_languages: 'لا يمكن اختيار "لا شيء من ذلك" مع خيارات أخرى.',
  how_did_you_hear: "يرجى اختيار كيف تعرفت على الورشة.",
};

export const ICONS = {
  cap: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  layers: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.2 17.5C13 15 11 9 15.8 6.5"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  hourglass: '<path d="M6 3h12M6 21h12M6 3c0 5 12 5 12 0-12-5 0 13 0 18"/>',
  pin: '<path d="M12 21s-7-6.1-7-11.3A7 7 0 0 1 19 9.7C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/>',
};

export function iconSvg(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ""}</svg>`;
}
