"use client";

import { useState, useRef, useEffect } from "react";
import { isValidName, isValidMobile, normalizeMobile } from "@/lib/chatValidation";

// Order ID format: ORD- followed by 8 alphanumeric characters (e.g. ORD-93455CA2)
const ORDER_ID_REGEX = /^ORD-[A-Z0-9]{8}$/i;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// Common keyboard-mashing sequences people type when not being genuine
const KEYBOARD_PATTERNS = [
  "qwerty", "asdf", "zxcv", "qazwsx", "wasd", "aaaa", "1234", "hjkl",
];

/**
 * Heuristic check for whether typed text looks like a genuine, meaningful
 * message rather than random/keyboard-mash text. Not a spellchecker —
 * just filters out obvious junk like "asdkj", "kjkjkj", "111111".
 */
function isMeaningfulText(text, { minLength = 3 } = {}) {
  const cleaned = text.trim();
  if (cleaned.length < minLength) return false;

  // Must contain at least one letter (English or Devanagari/Hindi)
  if (!/[a-zA-Z\u0900-\u097F]/.test(cleaned)) return false;

  // Same character repeated 4+ times in a row ("aaaaa", "kkkkkk")
  if (/(.)\1{3,}/.test(cleaned)) return false;

  const lower = cleaned.toLowerCase();
  if (KEYBOARD_PATTERNS.some((p) => lower.includes(p))) return false;

  // For English-ish text, check each word's vowel ratio individually —
  // short tokens (abbreviations like "pkg") are skipped so real sentences
  // with a mix of short + long words aren't unfairly flagged.
  // Skipped entirely for Hindi/Devanagari script.
  const hasDevanagari = /[\u0900-\u097F]/.test(cleaned);
  if (!hasDevanagari) {
    const words = cleaned.split(/\s+/).filter(Boolean);
    for (const w of words) {
      const letters = w.replace(/[^a-zA-Z]/g, "");
      if (letters.length < 4) continue;
      const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length;
      if (vowels / letters.length < 0.25) return false; // e.g. "sdlkfjsdklfj"
    }
  }

  return true;
}

export default function SupportChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 Welcome to ProMolecules Support.\nHow can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  // step: null | "orderId" | "issue" | "name" | "mobile"
  const [step, setStep] = useState(null);
  const [draft, setDraft] = useState({ orderId: "", issue: "", name: "", mobile: "" });
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  // Shows a "typing..." indicator for `delay` ms, then adds the bot's message.
  const pushBotMessage = (text, delay = 700) => {
    return new Promise((resolve) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: "bot", text }]);
        resolve();
      }, delay);
    });
  };

  // Saves a ticket via the backend's POST /api/chat (guest or logged-in,
  // identified server-side via cookies — hence credentials: "include").
  const saveTicket = async ({ name = "", mobile = "", orderId = "", issue = "" }) => {
    const res = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  name: name.trim(),
  mobile: normalizeMobile(mobile),
  orderId: orderId?.trim() || null,
  issue: issue.trim(),
}),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Failed to save ticket");
    }
    return data;
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");

    // Step: waiting for Order ID (or a skip)
    if (step === "orderId") {
      const wantsToSkip = /^(skip|no|na|don'?t have|nahi|nhi)/i.test(trimmed);

      if (wantsToSkip) {
        setStep("issue");
        await pushBotMessage(
          "No problem! Please describe your issue in a few words."
        );
        return;
      }

      if (!ORDER_ID_REGEX.test(trimmed)) {
        await pushBotMessage(
          "That doesn't look like a valid Order ID. It should look like ORD-93455CA2 (ORD- followed by 8 letters/numbers). Or type 'skip' if you don't have one."
        );
        return; // stay on this step so they can retry
      }

      setDraft((prev) => ({ ...prev, orderId: trimmed }));
-     setStep("name");
-     await pushBotMessage("Got it ✅ Could you share your name?");
+     setStep("issue");
+     await pushBotMessage("Got it ✅ Could you briefly describe your issue?");
      return;
    }

    // Step: waiting for a free-text issue (user skipped the Order ID)
    if (step === "issue") {
      if (!isMeaningfulText(trimmed, { minLength: 4 })) {
        await pushBotMessage(
          "Hmm, that doesn't look like a valid description 🙏 Could you tell me your issue in a few actual words?"
        );
        return;
      }
      setDraft((prev) => ({ ...prev, issue: trimmed }));
      setStep("name");
      await pushBotMessage("Thanks for sharing that. Could you tell me your name?");
      return;
    }

    // Step: waiting for name
    if (step === "name") {
      if (!isValidName(trimmed)) {
        await pushBotMessage(
          "Could you share your real full name, please? (letters only, at least 2 characters)"
        );
        return;
      }
      setDraft((prev) => ({ ...prev, name: trimmed }));
      setStep("mobile");
      await pushBotMessage("Thanks! And your 10-digit mobile number?");
      return;
    }

    // Step: waiting for mobile number, then save everything
    if (step === "mobile") {
      if (!isValidMobile(trimmed)) {
        await pushBotMessage(
          "That doesn't look like a valid mobile number. Please enter a 10-digit number (e.g. 9876543210)."
        );
        return;
      }

      const finalTicket = { ...draft, mobile: normalizeMobile(trimmed) };
      setDraft(finalTicket);
      setStep(null);
      setIsSending(true);

      await pushBotMessage("🙏 Thank you for reaching out!");
      await pushBotMessage("Our team will connect with you shortly.");

      try {
        await saveTicket(finalTicket);
      } catch (err) {
        await pushBotMessage(
          "⚠️ Something went wrong while saving your request. Please try again in a moment."
        );
      } finally {
        setIsSending(false);
        setDraft({ orderId: "", issue: "", name: "", mobile: "" });
      }

      return;
    }

    const msg = trimmed.toLowerCase();

    if (
      msg.includes("order") ||
      msg.includes("parcel") ||
      msg.includes("delivery") ||
      msg.includes("track")
    ) {
      await pushBotMessage(
        "📦 Sure! Please enter your Order ID (e.g. ORD-93455CA2), or type 'skip' if you don't have one."
      );
      setStep("orderId");
      return;
    }

    if (msg.includes("shipping")) {
      await pushBotMessage("Orders are usually delivered within 3–7 business days.");
      return;
    }

    if (msg.includes("payment")) {
      await pushBotMessage("We accept UPI, Debit Card, Credit Card and Net Banking.");
      return;
    }

    if (msg.includes("warflex")) {
      await pushBotMessage(" Warflex is our High Stim Pre-Workout, built for intense training sessions.");
      return;
    }

    // No specific match — if it looks like a genuine message, collect details
    if (!isMeaningfulText(trimmed, { minLength: 4 })) {
      await pushBotMessage(
        "Sorry, I didn't quite get that 🙏 Could you type your query in a few actual words, or ask about orders, shipping, or payments?"
      );
      return;
    }

    await pushBotMessage("🙏 Thanks for reaching out! Let's get your request logged.");
    setDraft((prev) => ({ ...prev, issue: trimmed }));
    setStep("name");
    await pushBotMessage("Could you share your name?");
  };

  const handleToggle = () => {
    if (isOpen) {
      // Closing the chat — reset everything so it starts fresh next time
      setMessages([
        {
          sender: "bot",
          text: "Hi there! 👋 Welcome to ProMolecules Support.\nHow can I help you today?",
        },
      ]);
      setInput("");
      setStep(null);
      setDraft({ orderId: "", issue: "", name: "", mobile: "" });
      setIsSending(false);
      setIsTyping(false);
    }
    setIsOpen((prev) => !prev);
  };

  const handleQuickReply = (text) => {
    setInput(text);
  };

  const handleSkipOrderId = async () => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "I don't have an Order ID" },
    ]);
    setStep("issue");
    await pushBotMessage(
      "No problem! Please describe your issue in a few words."
    );
  };

  return (
    <>
      <style>{`
        @keyframes pmTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pmChatPopIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pmMessageIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Floating Button */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close support chat" : "Open support chat"}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4be11d, #0c942e)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(225,29,46,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          zIndex: 9999,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "94px",
            right: "24px",
            width: "360px",
            height: "520px",
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            zIndex: 9999,
            border: "1px solid rgba(0,0,0,0.06)",
            animation: "pmChatPopIn 0.25s ease-out",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #E11D2E, #B0121F)",
              color: "#fff",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
           
            <div style={{ lineHeight: 1.25 }}>
              <div style={{ fontWeight: 700, fontSize: "15px" }}>
                ProMolecules Support
              </div>
              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#4ADE80",
                    display: "inline-block",
                  }}
                />
                We typically reply in minutes
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "14px",
              overflowY: "auto",
              background: "#F9F9FB",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                  animation: "pmMessageIn 0.2s ease-out",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg, #E11D2E, #B0121F)"
                        : "#fff",
                    color: msg.sender === "user" ? "#fff" : "#1F2937",
                    padding: "10px 13px",
                    borderRadius:
                      msg.sender === "user"
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                    maxWidth: "80%",
                    whiteSpace: "pre-line",
                    fontSize: "13.5px",
                    lineHeight: 1.45,
                    boxShadow:
                      msg.sender === "user"
                        ? "none"
                        : "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "#fff",
                    padding: "12px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#B0B4BB",
                        animation: "pmTypingBounce 1.2s infinite ease-in-out",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </span>
              </div>
            )}

            {step === "orderId" && (
              <div
                style={{
                  fontSize: "11.5px",
                  color: "#9CA3AF",
                  marginTop: "2px",
                  paddingLeft: "2px",
                }}
              >
                Format: ORD- followed by 8 letters/numbers — or type "skip"
              </div>
            )}

            {step === "mobile" && (
              <div
                style={{
                  fontSize: "11.5px",
                  color: "#9CA3AF",
                  marginTop: "2px",
                  paddingLeft: "2px",
                }}
              >
                10-digit mobile number, e.g. 9876543210
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Skip Order ID option */}
          {step === "orderId" && (
            <div style={{ padding: "0 14px 10px" }}>
              <button
                onClick={handleSkipOrderId}
                style={{
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  color: "#374151",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
               I don't have an Order ID
              </button>
            </div>
          )}

          {/* Quick replies (only shown at the start of a conversation) */}
          {messages.length === 1 && step === null && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                padding: "0 14px 10px",
                flexWrap: "wrap",
              }}
            >
              {["Track my order", "Shipping info", "Payment options"].map(
                (label) => (
                  <button
                    key={label}
                    onClick={() => handleQuickReply(label)}
                    style={{
                      border: "1px solid #E5E7EB",
                      background: "#fff",
                      color: "#374151",
                      borderRadius: "999px",
                      padding: "6px 12px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #EEE",
              padding: "10px",
              gap: "8px",
              background: "#fff",
            }}
          >
            <input
              value={input}
              onChange={(e) => {
                const value = e.target.value;
                // Mobile step: only allow digits, capped at 10 characters
                // (a pasted +91 country code is stripped first so it
                // doesn't eat into the actual number).
                if (step === "mobile") {
                  const digits = value.replace(/\D/g, "");
                  const withoutCountryCode =
                    digits.length > 10 && digits.startsWith("91")
                      ? digits.slice(2)
                      : digits;
                  setInput(withoutCountryCode.slice(0, 10));
                } else {
                  setInput(value);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              inputMode={step === "mobile" ? "numeric" : "text"}
              maxLength={step === "mobile" ? 10 : undefined}
              placeholder={
                step === "orderId"
                  ? "e.g. ORD-93455CA2 or type 'skip'"
                  : step === "issue"
                  ? "Describe your issue..."
                  : step === "name"
                  ? "Your full name..."
                  : step === "mobile"
                  ? "10-digit mobile number..."
                  : "Type your message..."
              }
              disabled={isSending}
              style={{
                flex: 1,
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                padding: "10px 12px",
                outline: "none",
                fontSize: "13.5px",
                background: isSending ? "#F3F4F6" : "#fff",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={isSending || !input.trim()}
              style={{
                border: "none",
                background:
                  isSending || !input.trim()
                    ? "#F3B8BD"
                    : "linear-gradient(135deg, #E11D2E, #B0121F)",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px 16px",
                cursor: isSending || !input.trim() ? "not-allowed" : "pointer",
                fontSize: "13.5px",
                fontWeight: 600,
                transition: "opacity 0.2s ease",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}