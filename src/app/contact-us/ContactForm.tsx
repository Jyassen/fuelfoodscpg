'use client';
import * as React from 'react';

export default function ContactForm() {
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    try {
      setStatus('loading');
      await new Promise(r => setTimeout(r, 600));
      setStatus('success');
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          name="firstName"
          placeholder="First Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          type="email"
          name="email"
          placeholder="E-mail Address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <textarea
        name="message"
        placeholder="Message"
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
        required
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-[#0a3b2a] text-white py-3 px-4 rounded-full font-semibold hover:bg-[#0c4a35] transition-colors shadow-md"
      >
        {status === 'loading' ? 'Sending…' : 'Submit Message'}
      </button>
      {status === 'success' && (
        <p className="text-green-600 text-sm">
          Thank You! You're info was received. You'll be hearing from us!
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm">
          Please enter a valid email or try again later.
        </p>
      )}
    </form>
  );
}
