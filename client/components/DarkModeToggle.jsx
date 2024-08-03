import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className="dark-mode-toggle">
      <label htmlFor="darkModeSwitch" className="toggle-label">Dark mode?</label>
      <input
        type="checkbox"
        id="darkModeSwitch"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="toggle-switch"
      />
    </div>
  );
};

export default DarkModeToggle;
