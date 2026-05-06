/* Shell: injects header (and sidebar placeholder) into every page so
 * content pages only have to write the <main> block. Keeps the shared
 * chrome in one place. */
(function () {
  function buildHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <button class="icon-btn mobile-menu-btn" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <a href="/web_doc/index.html" class="brand">
        <span class="brand-logo">S</span>
        <span>Shunya Labs</span>
        <span class="brand-badge">Docs</span>
      </a>
      <div class="header-spacer"></div>
      <div class="search">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="search" placeholder="Search docs" aria-label="Search">
        <kbd class="search-kbd">/</kbd>
      </div>
      <button id="theme-btn" class="icon-btn" aria-label="Toggle theme" onclick="ShunyaTheme.cycle()"></button>
      <a class="icon-btn" href="https://huggingface.co/shunyalabs" target="_blank" rel="noopener" aria-label="Hugging Face" title="Hugging Face models">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-3.5-3.5 1.4-1.4L11 13.7V7h2v6.7l2.1-2.1 1.4 1.4L13 16.5h-2z"/></svg>
      </a>
    `;
    return header;
  }

  function init() {
    const app = document.querySelector('.app');
    if (!app) return;
    // Header
    if (!app.querySelector('.header')) {
      app.insertBefore(buildHeader(), app.firstChild);
    }
    // Sidebar placeholder (populated by nav.js)
    if (!app.querySelector('.sidebar')) {
      const sb = document.createElement('aside');
      sb.className = 'sidebar';
      sb.setAttribute('aria-label', 'Documentation sections');
      const main = app.querySelector('.main');
      if (main) app.insertBefore(sb, main);
      else app.appendChild(sb);
    }
    // Theme button init
    if (window.ShunyaTheme) window.ShunyaTheme.updateButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
