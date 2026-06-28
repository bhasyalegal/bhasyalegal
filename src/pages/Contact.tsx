import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";

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
      subtitle: "Get in touch with Bhasya Legal",
      description: "Have a legal question or need representation? Our team is ready to assist you. Fill out the form or reach us directly.",
      contactInfo: "Contact Information",
      address: "Babarmahal, Kathmandu, Nepal",
      phone: "+977 9845047233",
      email: "bhasyalegal@gmail.com",
      hours: "Mon–Fri: 9:00 AM – 6:00 PM",
      hoursSat: "Sat: 10:00 AM – 2:00 PM",
      emergency: "Emergency: 24/7",
      form: {
        name: "Full Name *",
        email: "Email Address *",
        phone: "Phone Number",
        subject: "Subject *",
        message: "Message *",
        submit: "Send Message",
        submitting: "Sending...",
        namePlaceholder: "Your full name",
        emailPlaceholder: "you@example.com",
        phonePlaceholder: "+977 XXXXXXXXX",
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
      phone: "+९७७ ९८४३७२२०१५",
      email: "bhasyalegal@gmail.com",
      hours: "सोम–शुक्र: बिहान ९ – साँझ ६",
      hoursSat: "शनि: बिहान १० – दिउँसो २",
      emergency: "आपत्कालीन: २४/७",
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue dark:text-white mb-4">
            {c.title}
          </h1>
          <p className="text-lg text-law-gold font-medium mb-4">{c.subtitle}</p>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {c.description}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-serif font-bold text-royal-blue dark:text-white mb-6">
                {c.contactInfo}
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-law-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{c.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-law-gold flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{c.phone}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp: {c.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-law-gold flex-shrink-0" />
                  <p className="font-medium text-gray-800 dark:text-white">{c.email}</p>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-law-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{c.hours}</p>
                    <p className="text-gray-600 dark:text-gray-300">{c.hoursSat}</p>
                    <p className="text-law-gold font-medium mt-1">{c.emergency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Map Placeholder */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.234567890123!2d85.338987!3d27.700123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a3e5e6b8f%3A0x8b3c7b2f5d6e8a9f!2sKadaghari%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bhasya Legal Location"
                className="rounded-xl"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-royal-blue dark:text-white mb-2">
                  {language === "en" ? "Message Sent!" : "सन्देश पठाइयो!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{c.success}</p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-6 bg-law-gold text-royal-blue hover:bg-law-gold/90"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-transparent transition"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-transparent transition"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-transparent transition"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-transparent transition"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-law-gold focus:border-transparent transition resize-none"
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
                  className="w-full bg-law-gold hover:bg-law-gold/90 text-royal-blue font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-royal-blue border-t-transparent rounded-full animate-spin"></div>
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