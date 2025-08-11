'use client';

import { useEffect, useState } from 'react';

export default function PaletteSelector() {
  const [theme, setTheme] = useState('blush');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'blush';
    setTheme(savedTheme);
    document.documentElement.className = `theme-${savedTheme}`;
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.documentElement.className = `theme-${selectedTheme}`;
  };

  return (
    <div className="flex gap-2 justify-center mb-4">
      <button
        onClick={() => handleThemeChange('blush')}
        className={`px-3 py-1 rounded ${theme === 'blush' ? 'bg-blush-dark text-white' : 'bg-gray-200'}`}
      >
        Blush
      </button>
      <button
        onClick={() => handleThemeChange('earthy')}
        className={`px-3 py-1 rounded ${theme === 'earthy' ? 'bg-earthy-dark text-white' : 'bg-gray-200'}`}
      >
        Earthy
      </button>
    </div>
  );
}
