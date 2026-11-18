import { Mail } from "lucide-react";

const List = ({ items, ordered }) => {
  if (!items?.length) return null;
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={ordered ? "list-decimal ps-5 space-y-2" : undefined}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </Tag>
  );
};

const Paragraphs = ({ lines }) =>
  (lines || []).map((line, i) => <p key={i}>{line}</p>);

const Notice = ({ text }) =>
  text ? <p className="font-medium text-red-700">{text}</p> : null;

/**
 * Renders one policy section from the language JSON (language/<lang>/*.json).
 * Supported keys: intro, content[], items[], steps[], subsections[], consequences[],
 * neverCollectTitle + neverCollect[], note, notice, importantNote, email.
 */
export default function PolicyBody({ section, emailClassName }) {
  const s = section || {};
  return (
    <>
      {s.intro && <p>{s.intro}</p>}
      <Paragraphs lines={s.content} />
      <List items={s.items} />
      <List items={s.steps} ordered />
      {s.subsections?.length > 0 && (
        <div className="space-y-6">
          {s.subsections.map((sub, i) => (
            <div key={i}>
              {sub.title && <p className="font-semibold text-stone-900">{sub.title}</p>}
              {sub.intro && <p>{sub.intro}</p>}
              <List items={sub.items} />
              {sub.collectIntro && <p>{sub.collectIntro}</p>}
              <List items={sub.collectItems} />
              <Notice text={sub.notice} />
            </div>
          ))}
        </div>
      )}
      <List items={s.consequences} />
      {s.neverCollectTitle && (
        <p className="font-semibold text-stone-900">{s.neverCollectTitle}</p>
      )}
      <List items={s.neverCollect} />
      <Notice text={s.importantNote} />
      <Notice text={s.note} />
      <Notice text={s.notice} />
      {s.email && (
        <a
          href={`mailto:${s.email}`}
          className={
            emailClassName ||
            "mt-2 inline-flex items-center gap-2 rounded-full bg-red-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-900"
          }
        >
          <Mail size={15} /> {s.email}
        </a>
      )}
    </>
  );
}
