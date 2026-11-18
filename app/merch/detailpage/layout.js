import Messages from "@/lib/i18n/Messages";

// page.jsx is a client component, so its text is provided from here.
export default function MerchDetailLayout({ children }) {
  return <Messages ns={["merch"]}>{children}</Messages>;
}
