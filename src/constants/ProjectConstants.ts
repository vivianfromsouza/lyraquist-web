export const languages = [
  { language: "English", code: "en" },
  { language: "Spanish", code: "es" },
  { language: "French", code: "fr" },
  { language: "German", code: "de" },
];

export const dropdownLanguages = languages.map((lang) => ({
  label: lang.language,
  value: lang.code,
}));
