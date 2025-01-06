import React, { useState } from 'react';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { submitEmail } from '../hooks/waitlist';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await submitEmail(email);
      if (success) {
        setSubmitted(true);
        setEmail('');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setError('Failed to join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
        <div className="text-center space-y-6">
          <h1 className="text-2xl md:text-6xl font-extrabold text-white tracking-tight">
            Welcome to Foliospace
          </h1>

          <p className="text-sm md:text-2xl text-white/90">
            Your all-in-one portfolio platform for creative professionals. Showcase your work, connect with clients, and grow your career.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <>
                  <Mail className="w-5 h-5 inline mr-2" />
                  Join Waitlist
                </>
              )}
            </button>
          </form>

          {submitted && (
            <p className="text-green-300">Thanks for joining our waitlist! We'll notify you when we launch.</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <div className="flex justify-center space-x-6 mt-8">
            <Twitter className="w-8 h-8 text-white/80 hover:text-white cursor-pointer" />
            <Instagram className="w-8 h-8 text-white/80 hover:text-white cursor-pointer" />
            <Linkedin className="w-8 h-8 text-white/80 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
