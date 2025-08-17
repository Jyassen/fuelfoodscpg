"use client";
import Link from 'next/link';
import { useState, type FormEvent } from 'react';

export default function Footer() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }
    try {
      setStatus('loading');
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to subscribe');
      setStatus('success');
      setMessage("Thanks! You're on the list.");
      setFirstName('');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Something went wrong. Please try again later.');
    }
  };
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Logo + Disclaimer */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <img
                src="/images/logo.png"
                alt="FuelFoods Logo"
                className="h-14 w-14 rounded-full"
              />
            </Link>
            <p className="text-gray-300 mb-6 max-w-xl">
              Not evaluated by the FDA. This product isn’t designed to diagnose, treat, cure, or prevent any disease. Information here is for informational purposes. Not a substitute for medical advice. Consult a medical professional before using our products or if health concerns arise.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/FuelxFoods"
                className="text-gray-400 hover:text-fuelfoods-green-500 transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/fuelxfoods/"
                className="text-gray-400 hover:text-fuelfoods-green-500 transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@fuelfoodsindustries"
                className="text-gray-400 hover:text-fuelfoods-green-500 transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Middle: Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-gray-300 hover:text-fuelfoods-green-500 transition-colors">ABOUT US</Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-fuelfoods-green-500 transition-colors">CONTACT US</Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-fuelfoods-green-500 transition-colors">GET YOUR GREENS</Link>
              </li>
              <li>
                <Link href="/culinary" className="text-gray-300 hover:text-fuelfoods-green-500 transition-colors">CULINARY</Link>
              </li>
              <li>
                <Link href="/fulfillment-policy" className="text-gray-300 hover:text-fuelfoods-green-500 transition-colors">FULFILLMENT POLICY</Link>
              </li>
            </ul>
          </div>

          {/* Right: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Subscribe To Our Newsletter</h3>
            <p className="text-gray-300 mb-4">Get notified about health tips, new releases, and deals!</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="First name"
                className="px-4 py-2 rounded-md text-gray-900 bg-white placeholder-gray-500 w-full"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-md text-gray-900 bg-white placeholder-gray-500 w-full"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#e56322] hover:bg-[#cc4f16] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition-colors w-full"
              >
                {status === 'loading' ? 'Sending…' : 'Send'}
              </button>
              <div aria-live="polite" className="min-h-[20px] text-sm">
                {status === 'error' && (
                  <p className="text-red-400">{message}</p>
                )}
                {status === 'success' && (
                  <p className="text-green-400">{message}</p>
                )}
              </div>
              <p className="text-xs text-gray-400">Powered by Mailchimp</p>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-black text-white text-center py-3 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-sm">
          Copyright © {currentYear} FuelFoods Industries. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
