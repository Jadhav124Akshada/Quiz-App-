// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}

themeToggle.addEventListener('click', toggleTheme);

// On load, set theme from localStorage or system preference
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
})(); 