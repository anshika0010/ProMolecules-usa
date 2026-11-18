"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Phone, Mail } from "lucide-react";
import { useT } from "@/lib/i18n/client";

export default function ContactForm() {
  const [showPopup, setShowPopup] = useState(false);
  const c = useT("contact").contactForm || {};
  const left = c.leftSection || {};
  const form = c.form || {};
  const fields = form.fields || {};
  const v = (field) => fields[field]?.validation || {};

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});

  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = v("name").required;
    } else if (!/^[\p{L}\s.'-]+$/u.test(formData.name)) {
      // any alphabet (Latin, Arabic, ...), not just A–Z
      newErrors.name = v("name").letters_only;
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = v("phone").required;
    } else if (formData.phone.length < 10) {
      newErrors.phone = v("phone").invalid;
    }

    // Email
    if (!formData.email) {
      newErrors.email = v("email").required;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = v("email").invalid;
    }

    // Subject
    if (!formData.subject.trim()) {
      newErrors.subject = v("subject").required;
    } else if (formData.subject.length < 10) {
      newErrors.subject = v("subject").min_length;
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // remove error on typing
    setErrors({ ...errors, [name]: "" });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
  const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.subject,
  }),
});

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setFormData({ name: "", phone: "", email: "", subject: "" });
    }, 3000);

  } catch (error) {
    console.error("Form submission failed:", error);
    alert(c.errorPopup?.description);
  }
};

  return (
    <section className="max-w-7xl mx-auto min-h-[280px] sm:min-h-[350px] lg:min-h-[530px]  bg-black text-white py-1 sm:py-2 md:py-10 relative">
      <div
        className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 transition-all duration-300 ${
          showPopup ? "blur-md pointer-events-none" : ""
        }`}
      >
        {/* LEFT SIDE (same as yours) */}
        <div className="space-y-0 mt-[160px]">
        
        <p className="flex justify-center md:justify-end text-4xl md:text-9xl anton-regularnew leading-tight font-bold uppercase">
  {left.heading?.[0]}
</p>

<h3 className="flex justify-center md:justify-end text-4xl md:text-9xl leading-tight anton-regularnew font-bold uppercase">
  {left.heading?.[1]}
</h3>
          <div className="flex justify-center  w-full px-12 h-[2px] bg-gray-500 "></div>
          <div className="grid grid-cols-2 gap-6 global-text-style uppercase tracking-wider px-2 py-5">
            {(left.descriptions || []).map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 px-2 text-white text-sm py-3">
            {/* Phone */}
            <a
              href="tel:+17867892121"
              className="flex items-center gap-2 hover:text-red-500 transition"
            >
              <Phone size={16} className="text-red-500" />
              <span dir="ltr">{left.phone}</span>
            </a>

            {/* Email */}
            <a
              href="mailto:info@promolecules.com"
              className="flex items-center gap-2 hover:text-red-500 transition"
            >
              <Mail size={16} className="text-red-500" />
              <span>{left.email}</span>
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="max-w-xl w-full">
          <h1 className="text-4xl mb-10 creepster-regular text-red-600">
            {form.heading}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAME */}
            <InputField
              label={fields.name?.label}
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder={fields.name?.placeholder}
            />

            {/* PHONE */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 tracking-widest">
                {fields.phone?.label} <span className="text-red-500">*</span>
              </label>

              <PhoneInput
                country={"in"}
                enableSearch
                value={formData.phone}
                onChange={(phone) => {
                  setFormData({ ...formData, phone });
                  setErrors({ ...errors, phone: "" });
                }}
                inputStyle={{
                  width: "100%",
                  background: "#000",
                  border: errors.phone ? "1px solid red" : "1px solid #1f2937",
                  color: "white",
                  height: "48px",
                }}
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* EMAIL */}
            <InputField
              label={fields.email?.label}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder={fields.email?.placeholder}
            />

            {/* SUBJECT */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 tracking-widest">
                {fields.subject?.label} <span className="text-red-500">*</span>
              </label>

              <textarea
                rows="5"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={fields.subject?.placeholder}
                className={`w-full bg-black/60 border ${
                  errors.subject ? "border-red-500" : "border-gray-800"
                } rounded-md px-4 py-3 text-white focus:outline-none`}
              />

              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-red-600 w-full hover:bg-red-700 transition px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider"
            >
              {form.submit_button}
            </button>
          </form>

        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="bg-black border border-green-500 px-10 py-8 rounded-xl shadow-2xl text-center">
            <h3 className="text-2xl font-semibold text-green-400 mb-2">
              ✅ {c.successPopup?.heading}
            </h3>
            <p className="text-gray-300">
              {c.successPopup?.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

/* INPUT COMPONENT */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-2 tracking-widest">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-black/60 border ${
          error ? "border-red-500" : "border-gray-800"
        } rounded-md px-4 py-3 text-white focus:outline-none`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
