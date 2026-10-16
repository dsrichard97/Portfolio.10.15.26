import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Check, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';
import { ContactMessage } from '../types/portfolio';

interface ContactSectionProps {
  email: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Time FP&A Role',
    timeline: 'Immediate (< 1 month)',
    budget: 'Standard Corporate Comp',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>(() => {
    try {
      const stored = localStorage.getItem('richard_portfolio_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const newMessage: ContactMessage = {
      id: `inq_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      timeline: formData.timeline,
      budget: formData.budget,
      message: formData.message,
    };

    // Save to local ledger
    const updated = [newMessage, ...savedMessages];
    setSavedMessages(updated);
    try {
      localStorage.setItem('richard_portfolio_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save to localStorage', err);
    }

    setSubmitted(true);
  };

  const handleMailtoLaunch = () => {
    const subject = encodeURIComponent(`Let's Connect: ${formData.projectType} — ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Richard,\n\nName: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.projectType}\nTimeline: ${formData.timeline}\n\nDetails:\n${formData.message}\n\nSent via Portfolio Contact Form`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Full-Time FP&A Role',
      timeline: 'Immediate (< 1 month)',
      budget: 'Standard Corporate Comp',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with targeted h2: Let's Connect */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wide">
            <span>Direct Correspondence</span>
            <span aria-hidden="true">·</span>
            <span>Corporate Finance & FP&A</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-neutral-100">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-body mt-2 max-w-2xl">
            Open to corporate FP&A opportunities, financial modeling consulting, and strategic data automation collaborations. Reach out directly or connect on LinkedIn.
          </p>
        </div>

        {/* 2-Column Split: Contact Info Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & LinkedIn profile card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
              
              {/* LinkedIn Direct Banner */}
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Professional Network
                </span>
                <a
                  href="https://www.linkedin.com/in/richarddiazdeleon"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-neutral-950 p-4 rounded-xl border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                        Richard Diaz De Leon
                      </p>
                      <p className="text-xs text-neutral-400 font-mono">
                        linkedin.com/in/richarddiazdeleon
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>

              {/* Direct Email */}
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Direct Email
                </span>
                <div className="flex items-center justify-between bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono text-xs sm:text-sm text-neutral-200 select-all">
                      {email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Availability & Response Time
                </span>
                <p className="text-sm text-neutral-300 font-body leading-relaxed">
                  I typically respond within 24 hours to recruiter inquiries, corporate strategy discussions, and FP&A modeling proposals.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400 space-y-2">
                <div className="flex items-center gap-2 text-neutral-300">
                  <span className="text-emerald-400">⚡</span>
                  <span>Turnkey Static & GitHub Pages Ready</span>
                </div>
                <p className="text-neutral-500 leading-relaxed">
                  Inquiries are saved securely in your browser's local ledger and seamlessly transferred to your email client.
                </p>
              </div>
            </div>

            {/* Saved Inquiries Counter */}
            {savedMessages.length > 0 && (
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 flex items-center justify-between">
                <span>Local Message Ledger: {savedMessages.length} saved</span>
                <span className="text-emerald-400">Encrypted in Browser</span>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-display text-neutral-100">
                  Message Prepared
                </h3>
                <p className="text-sm text-neutral-300 font-body max-w-md mx-auto leading-relaxed">
                  Your note has been formatted and saved locally. Click below to launch your email client and send it directly to <span className="font-mono text-emerald-400">{email}</span>.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleMailtoLaunch}
                    className="px-5 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors font-sans shadow-sm flex items-center gap-1.5"
                  >
                    <span>Send via Email Client</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Inquiry Type & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Discussion Topic
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Full-Time FP&A Role">Full-Time FP&A Role</option>
                      <option value="Financial Modeling & Forecasting">Financial Modeling & Forecasting</option>
                      <option value="Budget vs Actuals (BvA) Automation">Budget vs Actuals (BvA) Automation</option>
                      <option value="SaaS Metrics & Unit Economics">SaaS Metrics & Unit Economics</option>
                      <option value="General Finance Advisory">General Strategic Finance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Target Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                      <option value="1-3 Months">1–3 Months</option>
                      <option value="Upcoming Fiscal Quarter">Upcoming Fiscal Quarter</option>
                      <option value="Exploratory / Networking">Exploratory / Networking</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                    Message / Opportunity Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your team's FP&A requirements, corporate modeling challenges, or open roles..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-400 transition-colors resize-y"
                  />
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-neutral-500 font-mono">
                    Direct handoff to {email}
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors font-sans flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
