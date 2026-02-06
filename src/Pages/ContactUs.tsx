import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Layout from "../Components/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
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
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text
                bg-gradient-to-r from-blue-800 to-cyan-300">
                Get in Touch
              </h2>

              <p className="text-white/60 leading-relaxed max-w-md">
                We'd love to hear from you. Whether you have a question,
                feedback, or a business inquiry, our team is ready to help.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaPhoneAlt className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80">+1 (234) 567-890</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaEnvelope className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80">contact@Ma'at.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="p-2 rounded-lg bg-gradient-to-r from-blue-800 to-cyan-500">
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                  </span>
                  <span className="text-white/80">
                    123 Main Street, City, Country
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
                  placeholder="Your Name"
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
                  placeholder="Your Email"
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
                  placeholder="Your Message"
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
                  Send Message
                </button>
              </form>

              {submitted && (
                <p className="mt-5 text-center text-green-400 font-medium">
                  Thank you for contacting us!
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
