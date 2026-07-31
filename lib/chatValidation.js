// Shared name/mobile validation for the support chat widget — used by both
// the client component (SupportChatBot) and the /api/chat proxy route, so
// the two never drift out of sync.

// Letters (English + Devanagari) plus space/apostrophe/hyphen/dot, 2-60 chars.
// Must start with a letter so things like "123" or "-- " are rejected outright.
const NAME_REGEX = /^[a-zA-Zऀ-ॿ][a-zA-Zऀ-ॿ\s.'-]{1,59}$/;

// Indian mobile number: 10 digits starting 6-9, optional +91 prefix, with
// optional spaces/dashes anywhere a user might have typed them.
const MOBILE_INPUT_REGEX = /^(?:\+?91[\-\s]?)?[6-9]\d{9}$/;

export function isValidName(name) {
  if (typeof name !== "string") return false;
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!NAME_REGEX.test(trimmed)) return false;
  // Reject the same character repeated 4+ times in a row (e.g. "aaaaaaa").
  if (/(.)\1{3,}/.test(trimmed)) return false;
  return true;
}

// Strips spaces/dashes/+91 prefix down to a plain 10-digit number.
export function normalizeMobile(mobile) {
  if (typeof mobile !== "string") return "";
  const digits = mobile.replace(/[^\d]/g, "");
  return digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits;
}

export function isValidMobile(mobile) {
  if (typeof mobile !== "string") return false;
  if (!MOBILE_INPUT_REGEX.test(mobile.trim())) return false;
  return /^[6-9]\d{9}$/.test(normalizeMobile(mobile));
}
