import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mqejgonk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        setSubmitStatus("error");
        setErrorMessage(data.error || "Submission failed. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    en: {
      title: "Contact Us",
      subtitle: "Get in Touch with Bhasya Legal",
      description: "Have a legal question or need representation? Our team is ready to assist you. Fill out the form or reach us directly.",
      contactInfo: "Contact Information",
      address: "Babarmahal, Kathmandu, Nepal",
      phone: "+977 9845047233",
      whatsapp: "+977 9845047233",
      email: "bhasyalegal@gmail.com",
      hours: "Mon–Fri: 9:00 AM – 6:00 PM",
      hoursSat: "Sat: 10:00 AM – 2:00 PM",
      emergency: "Emergency: 24/7",
      callBtn: "Call Us",
      whatsappBtn: "WhatsApp",
      emailBtn: "Email Us",
      form: {
        name: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number",
        subject: "Subject *",
        message: "Message *",
        submit: "Send Message",
        submitting: "Sending...",
        namePlaceholder: "Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "Number",
        subjectPlaceholder: "What is this regarding?",
        messagePlaceholder: "Tell us about your legal matter...",
      },
      success: "Thank you! Your message has been sent. We'll get back to you shortly.",
      error: "Something went wrong. Please try again or call us directly.",
    },
    np: {
      title: "सम्पर्क गर्नुहोस्",
      subtitle: "भास्य कानूनसँग सम्पर्कमा रहनुहोस्",
      description: "कानूनी प्रश्न वा प्रतिनिधित्व चाहिन्छ? हाम्रो टोली तपाईंको सहायताको लागि तयार छ। फारम भर्नुहोस् वा सीधै सम्पर्क गर्नुहोस्।",
      contactInfo: "सम्पर्क जानकारी",
      address: "बाबरमहल, काठमाडौं, नेपाल",
      phone: "+977 9845047233",
      whatsapp: "+977 9845047233",
      email: "bhasyalegal@gmail.com",
      hours: "सोम–शुक्र: बिहान ९ – साँझ ६",
      hoursSat: "शनि: बिहान १० – दिउँसो २",
      emergency: "आपत्कालीन: २४/७",
      callBtn: "फोन गर्नुहोस्",
      whatsappBtn: "व्हाट्सएप",
      emailBtn: "इमेल गर्नुहोस्",
      form: {
        name: "पूरा नाम *",
        email: "इमेल ठेगाना *",
        phone: "फोन नम्बर",
        subject: "विषय *",
        message: "सन्देश *",
        submit: "सन्देश पठाउनुहोस्",
        submitting: "पठाउँदै...",
        namePlaceholder: "तपाईंको पूरा नाम",
        emailPlaceholder: "तपाईं@उदाहरण.com",
        phonePlaceholder: "+९७७ XXXXXXXXX",
        subjectPlaceholder: "यसको बारेमा के हो?",
        messagePlaceholder: "आफ्नो कानूनी मामिलाको बारेमा बताउनुहोस्...",
      },
      success: "धन्यवाद! तपाईंको सन्देश पठाइएको छ। हामी चाँडै सम्पर्क गर्नेछौं।",
      error: "केही त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस् वा सीधै हामीलाई फोन गर्नुहोस्।",
    },
  };

  const c = language === "en" ? content.en : content.np;
  const phoneHref = `tel:${c.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`;
  const emailHref = `mailto:${c.email}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A192F] py-24 md:py-28 relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient backdrop, consistent with the site's premium theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#1b0738]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase">{c.subtitle}</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-serif font-bold text-[#1b0738] dark:text-white tracking-tight">
            {c.title}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E3B2] mx-auto rounded-full mt-6 mb-8" />
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            {c.description}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            <div className="card-premium p-8 shadow-elegant">
              <h2 className="text-2xl font-serif font-bold text-[#1b0738] dark:text-white mb-6">
                {c.contactInfo}
              </h2>

              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="font-medium text-gray-700 dark:text-gray-200 leading-relaxed">{c.address}</p>
              </div>

              {/* Actionable contact buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <a
                  href={phoneHref}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-[#1b0738]/[0.03] dark:bg-white/5 px-4 py-4 text-center hover:bg-[#1b0738] hover:border-[#1b0738] dark:hover:bg-[#D4AF37] dark:hover:border-[#D4AF37] transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 text-[#1b0738] dark:text-[#D4AF37] group-hover:text-[#D4AF37] dark:group-hover:text-[#1b0738] transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b0738] dark:text-white group-hover:text-white dark:group-hover:text-[#1b0738] transition-colors">
                    {c.callBtn}
                  </span>
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/[0.06] dark:bg-white/5 px-4 py-4 text-center hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300 group"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b0738] dark:text-white group-hover:text-white transition-colors">
                    {c.whatsappBtn}
                  </span>
                </a>

                <a
                  href={emailHref}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/25 bg-[#1b0738]/[0.03] dark:bg-white/5 px-4 py-4 text-center hover:bg-[#1b0738] hover:border-[#1b0738] dark:hover:bg-[#D4AF37] dark:hover:border-[#D4AF37] transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 text-[#1b0738] dark:text-[#D4AF37] group-hover:text-[#D4AF37] dark:group-hover:text-[#1b0738] transition-colors" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1b0738] dark:text-white group-hover:text-white dark:group-hover:text-[#1b0738] transition-colors">
                    {c.emailBtn}
                  </span>
                </a>
              </div>

              <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <p>{c.phone}</p>
                <p>{c.email}</p>
              </div>

              <div className="flex items-start gap-4 pt-5 border-t border-gray-100 dark:border-white/5">
                <Clock className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">{c.hours}</p>
                  <p className="text-gray-500 dark:text-gray-400">{c.hoursSat}</p>
                  <p className="text-[#D4AF37] font-semibold mt-1">{c.emergency}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="card-premium p-4 shadow-elegant">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.234567890123!2d85.338987!3d27.700123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a3e5e6b8f%3A0x8b3c7b2f5d6e8a9f!2sKadaghari%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhasya Legal Location"
                className="rounded-xl grayscale-[15%] contrast-[1.05]"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium shadow-elegant-lg p-8">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#1b0738] dark:text-white mb-2">
                  {language === "en" ? "Message Sent!" : "सन्देश पठाइयो!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{c.success}</p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-6 bg-[#D4AF37] text-[#1b0738] hover:bg-[#D4AF37]/90 font-semibold"
                >
                  {language === "en" ? "Send Another Message" : "अर्को सन्देश पठाउनुहोस्"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {c.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                      placeholder={c.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {c.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                      placeholder={c.form.emailPlaceholder}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {c.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                      placeholder={c.form.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {c.form.subject}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition"
                      placeholder={c.form.subjectPlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {c.form.message}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition resize-none"
                    placeholder={c.form.messagePlaceholder}
                  />
                </div>

                {submitStatus === "error" && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300 text-sm">{c.error} {errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1b0738] font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#1b0738] border-t-transparent rounded-full animate-spin"></div>
                      {c.form.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {c.form.submit}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
