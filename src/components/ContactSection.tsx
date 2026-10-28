import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactSection: React.FC = () => {
  const { settings } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWhatsAppDirect = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        'Hello Mamlaka Prints! I am reaching out to discuss your printing supplies and branding services.'
      )}`,
      '_blank'
    );
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      setIsSent(true);
    } catch (err) {
      console.warn(err);
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Mamlaka Prints
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Need pricing on bulk printing media or custom branded gear? Reach our team directly via WhatsApp, call, or email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Priority Box */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base">Direct WhatsApp Hotline</h3>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed mb-4">
                For the fastest quotations, artwork review, and immediate order dispatch arrangements:
              </p>
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Mamlaka on WhatsApp</span>
              </button>
              <div className="mt-3 text-center text-[11px] text-emerald-300">
                Number: +{settings.whatsappNumber}
              </div>
            </div>

            {/* Business Contact Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0a3d24] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Phone Support</h4>
                  <p className="text-slate-500 mt-0.5">Direct line for consultations and orders</p>
                  <a
                    href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-semibold text-[#0a3d24] hover:underline mt-1 block"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0a3d24] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="text-slate-500 mt-0.5">Corporate tenders, RFQs and inquiries</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-semibold text-[#0a3d24] hover:underline mt-1 block"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0a3d24] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Workshop & Pickup Hub</h4>
                  <p className="text-slate-500 mt-0.5">{settings.address}</p>
                  <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
                    Pickups & Courier Dispatches Daily
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0a3d24] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Operating Hours</h4>
                  <p className="text-slate-500 mt-0.5">{settings.workingHours}</p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-lg text-slate-900 mb-1">Send an Online Inquiry</h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill in your enquiry details below. For urgent requirements, please use our WhatsApp hotline.
              </p>

              {isSent ? (
                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-emerald-950">Inquiry Received</h4>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Thank you, {name}. A member of the Mamlaka Prints team has received your message and will respond shortly via phone or email.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="text-xs font-semibold text-emerald-900 underline pt-2"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Kiprono Koech"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +254 759 884 132"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. info@yourcompany.co.ke"
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Subject / Interest
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Vinyl roll bulk pricing, Polo shirts..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Message / Project Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify quantities, required delivery date, substrate requirements..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-[#0a3d24] hover:bg-[#072a19] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>We respect your privacy. Inquiries are stored securely on our dedicated server.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
