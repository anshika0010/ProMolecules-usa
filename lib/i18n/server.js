import { cache } from "react";
import { headers } from "next/headers";
import { LANGUAGES, DEFAULT_LOCALE, NAMESPACES } from "./config";
import { countryFromHost } from "../countries";

/** Locale for the current request, from the country subdomain (ae.promolecules.com -> ar). */
export const getLocale = cache(async () => {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "";
  const lang = countryFromHost(host)?.lang;
  return LANGUAGES[lang] ? lang : DEFAULT_LOCALE;
});

async function loadFile(locale, ns) {
  const folder = LANGUAGES[locale].folder;
  const file = NAMESPACES[ns];
  try {
    return (await import(`../../language/${folder}/${file}`)).default;
  } catch {
    return undefined;
  }
}

/** Fill anything missing in `override` (e.g. untranslated keys, image paths) from `base`. */
function deepMerge(base, override) {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) && Array.isArray(override)) {
    return override.map((v, i) => deepMerge(base[i], v));
  }
  if (base && typeof base === "object" && typeof override === "object" && !Array.isArray(override)) {
    const out = { ...base };
    for (const k of Object.keys(override)) out[k] = deepMerge(base[k], override[k]);
    return out;
  }
  return override;
}

/** One namespace for a locale, falling back to English for missing keys. */
export const getNamespace = cache(async (locale, ns) => {
  const en = await loadFile(DEFAULT_LOCALE, ns);
  if (locale === DEFAULT_LOCALE) return en;
  return deepMerge(en, await loadFile(locale, ns));
});

/** Several namespaces as { ns: data }. */
export async function getMessages(locale, namespaces) {
  const entries = await Promise.all(
    namespaces.map(async (ns) => [ns, await getNamespace(locale, ns)])
  );
  return Object.fromEntries(entries);
}

/** Shortcut for server components: const t = await getT("terms"). */
export async function getT(ns) {
  return getNamespace(await getLocale(), ns);
}

/** Products (language/<lang>/productDetails.json) for the current locale. */
export async function getProducts(locale) {
  return (await getNamespace(locale ?? (await getLocale()), "productDetails"))?.products || [];
}

/** Small product list for cards, search and "more products" (keeps page payload small). */
export async function getProductSummaries(locale) {
  return (await getProducts(locale)).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    featuredimg: p.featuredimg,
    images: p.images?.slice(0, 1) || [],
    servings: p.servings,
  }));
}
