const dictionaries = {
  "en-CA": () =>
    import("./dictionaries/en-CA.json").then((module) => module.default),
  "ar-SA": () =>
    import("./dictionaries/ar-SA.json").then((module) => module.default),
  "fr-CA": () =>
    import("./dictionaries/fr-CA.json").then((module) => module.default),
  "tr-TR": () =>
    import("./dictionaries/tr-TR.json").then((module) => module.default),
  "ur-PK": () =>
    import("./dictionaries/ur-PK.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
