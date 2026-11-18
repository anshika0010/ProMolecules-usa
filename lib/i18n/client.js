"use client";

import { createContext, useContext, useMemo } from "react";
import { isRtl, DEFAULT_LOCALE } from "./config";

const I18nContext = createContext({ locale: DEFAULT_LOCALE, messages: {} });

/** Nested providers merge their namespaces with the parent's. */
export function I18nProvider({ locale, messages, children }) {
  const parent = useContext(I18nContext);
  const value = useMemo(
    () => ({
      locale: locale || parent.locale,
      messages: { ...parent.messages, ...messages },
    }),
    [locale, messages, parent]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const { locale } = useContext(I18nContext);
  return { locale, rtl: isRtl(locale) };
}

/** Text for a namespace, e.g. const t = useT("home"). */
export function useT(ns, { optional = false } = {}) {
  const { messages } = useContext(I18nContext);
  if (!optional && !(ns in messages) && process.env.NODE_ENV !== "production") {
    console.warn(`[i18n] namespace "${ns}" not provided — wrap the page in <Messages ns={["${ns}"]}>`);
  }
  return messages[ns] || {};
}
