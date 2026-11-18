// Shared by server (locale detection) and client (CountrySelector).
// `lang` must be a key of LANGUAGES in lib/i18n/config.js.
export const COUNTRIES = [
  { name: "UAE", code: "AE", lang: "ar" },
  { name: "Qatar", code: "QA", lang: "ar" },
  { name: "Algeria", code: "DZ", lang: "ar" },
  { name: "Jordan", code: "JO", lang: "ar" },
  { name: "Kuwait", code: "KW", lang: "ar" },
  { name: "Lebanon", code: "LB", lang: "ar" },
  { name: "Egypt", code: "EG", lang: "ar" },
  { name: "Syria", code: "SY", lang: "ar" },
  { name: "Tunisia", code: "TN", lang: "ar" },
  { name: "Morocco", code: "MA", lang: "ar" },
  { name: "Bahrain", code: "BH", lang: "ar" },
  { name: "Iraq", code: "IQ", lang: "ar" },
  { name: "Iran", code: "IR", lang: "fa" },
  { name: "Oman", code: "OM", lang: "ar" },
  { name: "Saudi Arabia", code: "SA", lang: "ar" },
  { name: "Malaysia", code: "MY", lang: "ms" },
  { name: "Libya", code: "LY", lang: "ar" },
  { name: "Tanzania", code: "TZ", lang: "en" },
  { name: "Kazakhstan", code: "KZ", lang: "ru" },
  { name: "Uzbekistan", code: "UZ", lang: "uz" },
  { name: "Turkmenistan", code: "TM", lang: "ru" },
  { name: "Kyrgyzstan", code: "KG", lang: "ru" },
  { name: "Tajikistan", code: "TJ", lang: "ru" },
  { name: "Brazil", code: "BR", lang: "pt" },
  { name: "Argentina", code: "AR", lang: "es" },
  { name: "Colombia", code: "CO", lang: "es" },
  { name: "Chile", code: "CL", lang: "es" },
  { name: "Peru", code: "PE", lang: "es" },
  { name: "Venezuela", code: "VE", lang: "es" },
  { name: "Ecuador", code: "EC", lang: "es" },
  { name: "Bolivia", code: "BO", lang: "es" },
  { name: "Paraguay", code: "PY", lang: "es" },
  { name: "Uruguay", code: "UY", lang: "es" },
  { name: "Mexico", code: "MX", lang: "es" },
  { name: "Guatemala", code: "GT", lang: "es" },
  { name: "Honduras", code: "HN", lang: "es" },
  { name: "El Salvador", code: "SV", lang: "es" },
  { name: "Nicaragua", code: "NI", lang: "es" },
  { name: "Costa Rica", code: "CR", lang: "es" },
  { name: "Panama", code: "PA", lang: "es" },
  { name: "Belize", code: "BZ", lang: "en" },
  { name: "Cuba", code: "CU", lang: "es" },
  { name: "Dominican Republic", code: "DO", lang: "es" },
  { name: "Haiti", code: "HT", lang: "fr" },
  { name: "Puerto Rico", code: "PR", lang: "es" },
];

export const BASE_DOMAIN = "promolecules.com";

/** "ae.promolecules.com" -> COUNTRIES entry for AE (or undefined) */
export function countryFromHost(host = "") {
  const sub = host.split(":")[0].split(".")[0].toUpperCase();
  return COUNTRIES.find((c) => c.code === sub);
}

/**
 * URL of a country's site. On localhost it uses <code>.localhost:<port>
 * (browsers resolve *.localhost to your machine) so it can be tested in dev.
 */
export function countryUrl(code, currentLocation) {
  const sub = code.toLowerCase();
  if (currentLocation && /(^|\.)localhost$/.test(currentLocation.hostname)) {
    const port = currentLocation.port ? `:${currentLocation.port}` : "";
    return `${currentLocation.protocol}//${sub}.localhost${port}`;
  }
  return `https://${sub}.${BASE_DOMAIN}`;
}
