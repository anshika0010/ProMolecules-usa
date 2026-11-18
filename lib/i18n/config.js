// Supported languages. `folder` is the directory name under /language.
export const LANGUAGES = {
  en: { folder: "English", dir: "ltr" },
  ar: { folder: "Arabic", dir: "rtl" },
  fr: { folder: "french", dir: "ltr" },
  ru: { folder: "Russian", dir: "ltr" },
  es: { folder: "Spainsh", dir: "ltr" },
  pt: { folder: "Postuguese", dir: "ltr" },
  fa: { folder: "Farsi", dir: "rtl" },
  ms: { folder: "Malay", dir: "ltr" },
  uz: { folder: "Uzbek", dir: "ltr" },
};

export const DEFAULT_LOCALE = "en";

// Namespace -> file name inside each language folder.
export const NAMESPACES = {
  navbar: "navbar.json",
  footer: "footer.json",
  home: "home.json",
  about: "about.json",
  shop: "shop.json",
  product: "product.json",
  productDetails: "productDetails.json",
  contact: "contact.json",
  blog: "blog.json",
  merch: "merch.json",
  cookie: "cookie.json",
  privacy: "privacy_policy.json",
  terms: "t&c.json",
  shipping: "shipping.json",
  returns: "returnexchange.json",
};

export const isRtl = (locale) => LANGUAGES[locale]?.dir === "rtl";
