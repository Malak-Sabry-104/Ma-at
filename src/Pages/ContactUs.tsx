import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Layout from "../Components/Layout";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    setSubmitted(true);
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        <section className="max-w-6xl mx-auto px-4 py-20">
          {/* Title */}
          <h1 className="text-center text-4xl md:text-5xl font-bold tracking-wide mb-14
            text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-cyan-400">
            {t("contact.title")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start ltr:text-left rtl:text-right">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text
                bg-gradient-to-r from-blue-800 to-cyan-300">
                {t("contact.getInTouch")}
              </h2>

              <p className="text-white/60 leading-relaxed max-w-md">
                {t("contact.contactDescription")}
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaPhoneAlt className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80 ltr:dir-ltr rtl:dir-ltr">{t("contact.phone")}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaEnvelope className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80">{t("contact.emailLabel")}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80">
                    {t("contact.addressLabel")}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative rounded-2xl bg-white/10 backdrop-blur-xl
              ring-1 ring-white/20 shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.namePlaceholder")}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-black/40 px-4 py-3
                    text-white placeholder:text-white/40
                    ring-1 ring-white/10
                    focus:outline-none focus:ring-2 focus:ring-blue-800
                    transition"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.emailPlaceholder")}
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-black/40 px-4 py-3
                    text-white placeholder:text-white/40
                    ring-1 ring-white/10
                    focus:outline-none focus:ring-2 focus:ring-blue-800
                    transition"
                  required
                />

                <textarea
                  name="message"
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-lg bg-black/40 px-4 py-3
                    text-white placeholder:text-white/40
                    ring-1 ring-white/10
                    focus:outline-none focus:ring-2 focus:ring-blue-800
                    transition resize-none"
                  required
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium
                    bg-gradient-to-r from-blue-800 to-cyan-500
                    hover:from-blue-800 hover:to-cyan-400
                    active:scale-[0.98] transition-transform shadow-lg"
                >
                  {t("contact.send")}
                </button>
              </form>

              {submitted && (
                <p className="mt-5 text-center text-green-400 font-medium">
                  {t("contact.thankYou")}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;

