/* Theme: light / dark / auto with persistence */
(function () {
  const KEY = 'shunya-theme';
  const root = document.documentElement;

  function apply(mode) {
    const effective = mode === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
    root.classList.toggle('dark', effective === 'dark');
    root.dataset.theme = mode;
    // Mermaid theme sync
    if (window.mermaid && window.mermaid.initialize) {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: effective === 'dark' ? 'dark' : 'neutral',
          themeVariables: effective === 'dark'
            ? { background: '#0f0f11', primaryColor: '#1e1b4b', primaryTextColor: '#e4e4e7', lineColor: '#52525b', textColor: '#e4e4e7' }
            : { background: '#fafafa', primaryColor: '#eef2ff', primaryTextColor: '#18181b', lineColor: '#71717a', textColor: '#18181b' }
        });
        document.querySelectorAll('.mermaid').forEach(el => {
          if (el.dataset.src) el.innerHTML = el.dataset.src;
          el.removeAttribute('data-processed');
        });
        window.mermaid.run && window.mermaid.run();
      } catch (e) {}
    }
  }

  function getStored() {
    try { return localStorage.getItem(KEY) || 'auto'; } catch { return 'auto'; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch {}
  }

  window.ShunyaTheme = {
    cycle() {
      const current = getStored();
      const next = current === 'auto' ? 'light' : current === 'light' ? 'dark' : 'auto';
      setStored(next);
      apply(next);
      this.updateButton();
    },
    updateButton() {
      const btn = document.getElementById('theme-btn');
      if (!btn) return;
      const mode = getStored();
      btn.dataset.mode = mode;
      btn.setAttribute('title', `Theme: ${mode}`);
      btn.innerHTML = mode === 'dark'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : mode === 'light'
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18"/></svg>';
    }
  };

  // Apply immediately to avoid FOUC
  apply(getStored());

  // React to OS theme changes when in auto
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStored() === 'auto') apply('auto');
  });

  document.addEventListener('DOMContentLoaded', () => {
    window.ShunyaTheme.updateButton();
  });
})();
