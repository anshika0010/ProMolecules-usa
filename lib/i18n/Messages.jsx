import { getLocale, getMessages } from "./server";
import { I18nProvider } from "./client";
import { LANGUAGES } from "./config";

/**
 * Server component: loads namespaces for the current locale and provides them to client components below.
 * Pass `locale` to pin a section to one language on every country site (e.g. blogs are English-only);
 * the section is then also wrapped with that language's lang/dir so it lays out correctly on RTL sites.
 */
export default async function Messages({ ns, locale: forced, children }) {
  const locale = forced && LANGUAGES[forced] ? forced : await getLocale();
  const messages = await getMessages(locale, ns);
  const content = (
    <I18nProvider locale={locale} messages={messages}>
      {children}
    </I18nProvider>
  );
  if (!forced) return content;
  return (
    <div lang={locale} dir={LANGUAGES[locale].dir}>
      {content}
    </div>
  );
}
