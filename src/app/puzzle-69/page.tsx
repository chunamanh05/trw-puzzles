"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowLeft, Globe, Clock } from "lucide-react";
import Link from "next/link";

export default function Puzzle69ContactMap() {
  // Google Maps Embed URL for Landmark 81, Ho Chi Minh City
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.203254921935!2d106.71963071115865!3d10.79574345879007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c301444973%3A0x1125adabc0485147!2zVG9hIG5ow6AgTGFuZG1hcmsgODE!5e0!3m2!1svi!2s!4v1715093500000!5m2!1svi!2s";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* Navbar */}
      <nav className="px-8 h-20 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={16} /> Lobby
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Globe size={18} />
          </div>
          <span className="font-black tracking-tighter text-lg">ContactStudio</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] hidden sm:block">
          Puzzle #69 / Google Maps
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact Form & Info */}
          <div className="space-y-12">
            <header className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                Get in Touch
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                Let's start a <span className="text-indigo-600">conversation.</span>
              </h1>
              <p className="text-slate-500 max-w-md text-lg font-medium leading-relaxed">
                Have a project in mind or just want to say hi? We'd love to hear from you.
              </p>
            </header>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ContactInfo icon={Mail} label="Email us" value="hello@studio.com" />
              <ContactInfo icon={Phone} label="Call us" value="+84 123 456 789" />
              <ContactInfo icon={MapPin} label="Visit us" value="Landmark 81, Ho Chi Minh City" />
              <ContactInfo icon={Clock} label="Open hours" value="Mon - Fri, 9am - 6pm" />
            </div>

            {/* Form */}
            <form className="space-y-6 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputGroup label="Full Name" placeholder="John Doe" />
                <InputGroup label="Email Address" placeholder="john@example.com" />
              </div>
              <InputGroup label="Message" placeholder="Tell us about your project..." textarea />
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-indigo-100">
                SEND MESSAGE 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Side: Google Maps Embed */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky top-32"
          >
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-indigo-50 rounded-[2.5rem] -z-10 group-hover:bg-indigo-100 transition-colors" />
              
              <div className="w-full aspect-[4/5] lg:aspect-square bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="transition-all duration-700"
                ></iframe>
                
                {/* Floating Map Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center justify-between border border-white">
                  <div>
                    <h3 className="font-black text-slate-900 tracking-tight">Landmark 81</h3>
                    <p className="text-xs text-slate-500 font-medium">Binh Thanh, Ho Chi Minh City</p>
                  </div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Landmark+81+Ho+Chi+Minh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors"
                  >
                    <MapPin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Decorative Index */}
      <div className="fixed bottom-10 left-10 text-[15vh] font-black text-slate-50 select-none pointer-events-none -z-20 uppercase">
        Contact
      </div>
    </div>
  );
}

function ContactInfo({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-indigo-600">
        <Icon size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className="font-bold text-slate-900">{value}</p>
    </div>
  );
}

function InputGroup({ label, placeholder, textarea }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      {textarea ? (
        <textarea 
          placeholder={placeholder}
          rows={4}
          className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all resize-none text-slate-900 font-medium"
        />
      ) : (
        <input 
          type="text" 
          placeholder={placeholder}
          className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-600 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all text-slate-900 font-medium"
        />
      )}
    </div>
  );
}
