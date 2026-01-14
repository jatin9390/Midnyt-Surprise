import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Hero from './components/Hero';
import CoverLetter from './components/CoverLetter';
import AdminPanel from './components/AdminPanel';
import { Moon, Sun } from 'lucide-react';

import SerialLights from './components/SerialLights';

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-gray-200/20 dark:border-white/10 shadow-xl hover:scale-110 transition-all text-midnyt-gold"
  >
    {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6 text-orange-400" />}
  </button>
);

const BirthdayPage = () => {
  const [name, setName] = useState('Friend');
  const [message, setMessage] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for ID in URL (e.g. ?id=123)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const fetchUrl = id
      ? `/api/public-config?id=${id}`
      : '/api/public-config';

    fetch(fetchUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load surprise');
        return res.json();
      })
      .then(data => {
        if (data.recipientName) setName(data.recipientName);
        setMessage(data); // Pass full data object (content, images, senderName)
      })
      .catch((e) => {
        console.error("API Fetch Error:", e);
        setError("Could not load your surprise. Please try again later.");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">Oops!</h1>
          <p>{error}</p>
          <p className="text-sm text-gray-400 mt-4">Debug: Check internet or invalid link.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-midnyt-dark text-slate-900 dark:text-gray-100 font-sans relative transition-colors duration-500">
      <SerialLights />
      <Hero name={name} />

      {/* Main Content Area */}
      <section className="relative z-10 bg-purple-50 dark:bg-midnyt-dark border-t border-purple-100 dark:border-white/5 shadow-2xl transition-colors duration-500">
        <CoverLetter message={message} />
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-600 text-sm">
        Made with ❤️ for a special day.
      </footer>
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<BirthdayPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
