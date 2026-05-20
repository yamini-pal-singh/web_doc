/* Shell: header + product nav + sidebar placeholder (single file, no extra requests) */
(function () {
  const HF_ICON =
    '<path d="M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378"/>';

  const NAV_ICONS = {
    home: '<path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    stt: '<path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/><path d="M6 14a6 6 0 0 0 12 0"/><line x1="12" y1="20" x2="12" y2="22"/><path d="M8 22h8"/>',
    tts: '<path d="M11 6L6 10H3v4h3l5 4V6z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8 8 0 0 1 0 12"/>',
    intel:
      '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><circle cx="12" cy="12" r="2.5" opacity="0.35"/>',
    translate:
      '<circle cx="12" cy="12" r="9"/><path d="M2 12h20"/><path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z"/><path d="M8 9l4 3-4 3M16 9l-4 3 4 3"/>',
    api: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22" opacity="0.35"/>',
    integrations:
      '<path d="M12 2v6"/><path d="M8 8h8"/><rect x="3" y="10" width="7" height="7" rx="1.5"/><rect x="14" y="10" width="7" height="7" rx="1.5"/><path d="M10 17v3M14 17v3"/>',
    deploy:
      '<rect x="4" y="4" width="16" height="5" rx="1"/><rect x="4" y="11" width="16" height="5" rx="1"/><rect x="4" y="18" width="16" height="2" rx="0.5"/><circle cx="7" cy="6.5" r="0.75" fill="currentColor" stroke="none"/><circle cx="7" cy="13.5" r="0.75" fill="currentColor" stroke="none"/>',
    chevron: '<polyline points="6 9 12 15 18 9"/>',
  };

  let docBase = '';
  let headerNavWired = false;

  function getDocBase() {
    if (docBase) return docBase;
    const link = document.querySelector('link[href*="main.css"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const i = href.indexOf('/assets/css/');
      if (i !== -1) {
        docBase = href.slice(0, i);
        return docBase;
      }
      if (href.startsWith('.')) {
        try {
          docBase = new URL(href, window.location.href).pathname.replace(/\/assets\/css\/.*$/, '');
          return docBase;
        } catch (e) {
          /* fall through */
        }
      }
    }
    const script = document.querySelector('script[src*="shell.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const i = src.indexOf('/assets/js/');
      if (i !== -1) {
        docBase = src.slice(0, i);
        return docBase;
      }
    }
    if (window.location.pathname.indexOf('/web_doc') !== -1) {
      docBase = '/web_doc';
    } else {
      docBase = '';
    }
    return docBase;
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  function navSvg(name, cls) {
    const path = NAV_ICONS[name] || '';
    return `<svg class="${cls || 'header-nav-ico'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  function buildHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
      <div class="header-top">
        <button type="button" class="icon-btn mobile-menu-btn" aria-label="Open sidebar menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="${docUrl('/index.html')}" class="brand">
          <span class="brand-logo">S</span>
          <span class="brand-text">Shunya <span class="brand-accent">Labs Docs</span></span>
        </a>
        <div class="header-spacer"></div>
        <div class="doc-search" id="doc-search">
          <div class="doc-search-field">
            <span class="doc-search-glow" aria-hidden="true"></span>
            <svg class="doc-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="search" class="doc-search-input" placeholder="Search docs, models, APIs..." aria-label="Search documentation" aria-expanded="false" aria-controls="doc-search-panel" autocomplete="off" spellcheck="false">
            <button type="button" class="doc-search-clear" hidden aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <kbd class="doc-search-kbd" aria-hidden="true">/</kbd>
          </div>
          <div class="doc-search-panel" id="doc-search-panel" role="listbox" hidden></div>
        </div>
        <div class="header-actions">
          <a href="https://playground.shunyalabs.ai" class="header-action-link header-action-playground" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>Playground</span>
          </a>
          <a href="https://huggingface.co/shunyalabs" class="header-action-link header-action-models" target="_blank" rel="noopener" title="Open weights on Hugging Face">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${HF_ICON}</svg>
            <span>Models</span>
          </a>
          <a href="https://accounts.shunyalabs.ai" class="header-btn header-btn-ghost" target="_blank" rel="noopener">Log in</a>
          <a href="https://accounts.shunyalabs.ai" class="header-btn header-btn-primary" target="_blank" rel="noopener">Free API key</a>
          <button type="button" id="theme-btn" class="icon-btn" aria-label="Toggle theme"></button>
        </div>
      </div>
      <nav class="header-nav" aria-label="Jump to product area"></nav>
    `;
    const themeBtn = header.querySelector('#theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        if (window.ShunyaTheme) window.ShunyaTheme.cycle();
      });
    }
    return header;
  }

  const TOP_LINKS = [
    {
      id: 'home',
      label: 'Home',
      path: '/index.html',
      icon: 'home',
      match: [/index\.html$/, /\/web_doc\/?$/, /what-is-shunya/, /glossary/, /capability-matrix/],
    },
    {
      id: 'quickstart',
      label: 'Quickstart',
      path: '/get-started/quickstart.html',
      icon: 'zap',
      match: [/\/get-started\/quickstart/],
    },
    {
      id: 'stt',
      label: 'Speech-to-Text',
      path: '/asr/overview.html',
      icon: 'stt',
      match: [/\/asr\//],
    },
    {
      id: 'tts',
      label: 'Text-to-Speech',
      path: '/tts/overview.html',
      icon: 'tts',
      match: [/\/tts\//],
    },
    {
      id: 'intel',
      label: 'Intelligence',
      path: '/intelligence/overview.html',
      icon: 'intel',
      match: [/\/intelligence\//],
    },
    {
      id: 'api',
      label: 'API Reference',
      path: '/api-reference/index.html',
      icon: 'api',
      match: [/\/api-reference\//],
    },
    {
      id: 'integrations',
      label: 'Integrations',
      path: '/integrations/overview.html',
      icon: 'integrations',
      match: [/\/integrations\//],
    },
    {
      id: 'deploy',
      label: 'Deployment',
      path: '/deployment/overview.html',
      icon: 'deploy',
      match: [/\/deployment\//, /\/security\//, /\/enterprise\//],
    },
  ];

  function renderHeaderNav() {
    const nav = document.querySelector('.header-nav');
    if (!nav) return;
    const path = window.location.pathname;

    nav.innerHTML = TOP_LINKS.map((item) => {
      const active = item.match && item.match.some((re) => re.test(path));
      if (item.dropdown) {
        const links = item.dropdown
          .map(
            (d) => `
          <a class="header-nav-drop-link" href="${docUrl(d.path)}">
            <span class="header-nav-drop-title">${d.label}</span>
            <span class="header-nav-drop-desc">${d.desc}</span>
          </a>`
          )
          .join('');
        return `
          <div class="header-nav-item${active ? ' is-active' : ''}" data-nav-id="${item.id}">
            <button type="button" class="header-nav-link" aria-expanded="false" aria-haspopup="true">
              ${navSvg(item.icon)}
              <span>${item.label}</span>
              ${navSvg('chevron', 'header-nav-chevron')}
            </button>
            <div class="header-nav-dropdown" role="menu">${links}</div>
          </div>`;
      }
      return `
        <a class="header-nav-link${active ? ' is-active' : ''}" href="${docUrl(item.path)}" data-nav-id="${item.id}">
          ${navSvg(item.icon)}
          <span>${item.label}</span>
        </a>`;
    }).join('');
  }

  function wireHeaderNav() {
    if (headerNavWired) return;
    document.querySelectorAll('.header-nav-item').forEach((item) => {
      const btn = item.querySelector('button.header-nav-link');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.querySelectorAll('.header-nav-item.is-open').forEach((other) => {
          if (other !== item) {
            other.classList.remove('is-open');
            const b = other.querySelector('button.header-nav-link');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.header-nav-item.is-open').forEach((item) => {
        item.classList.remove('is-open');
        const b = item.querySelector('button.header-nav-link');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
    const header = document.querySelector('.header');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    window.addEventListener('resize', setHeaderHeight);
    headerNavWired = true;
  }

  function setHeaderHeight() {
    const header = document.querySelector('.header');
    if (!header) return;
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
  }

  function initHeaderNav() {
    renderHeaderNav();
    wireHeaderNav();
    setHeaderHeight();
    requestAnimationFrame(setHeaderHeight);
  }

  function init() {
    const app = document.querySelector('.app');
    if (!app) return;

    if (!app.querySelector('.header')) {
      app.insertBefore(buildHeader(), app.firstChild);
      initHeaderNav();
    } else {
      initHeaderNav();
    }

    if (!app.querySelector('.sidebar')) {
      const sb = document.createElement('aside');
      sb.className = 'sidebar';
      sb.setAttribute('aria-label', 'Documentation sections');
      const main = app.querySelector('.main');
      if (main) app.insertBefore(sb, main);
      else app.appendChild(sb);
    }

    if (window.ShunyaTheme) window.ShunyaTheme.updateButton();

    if (!document.querySelector('script[src*="hf-links.js"]')) {
      const hf = document.createElement('script');
      hf.src = docUrl('/assets/js/hf-links.js?v=2');
      hf.defer = true;
      document.body.appendChild(hf);
    }

    if (!document.querySelector('script[src*="doc-search.js"]')) {
      const ds = document.createElement('script');
      ds.src = docUrl('/assets/js/doc-search.js?v=2');
      ds.onload = () => {
        if (window.ShunyaDocSearch) window.ShunyaDocSearch.init();
      };
      document.body.appendChild(ds);
    } else if (window.ShunyaDocSearch) {
      window.ShunyaDocSearch.init();
    }

    const navScript = document.querySelector('script[src*="nav.js"]');
    if (navScript) {
      if (!document.querySelector('script[src*="api-ref-nav.js"]')) {
        const ar = document.createElement('script');
        ar.src = docUrl('/assets/js/api-ref-nav.js?v=3');
        navScript.before(ar);
      }
      if (!document.querySelector('script[src*="intelligence-nav.js"]')) {
        const intel = document.createElement('script');
        intel.src = docUrl('/assets/js/intelligence-nav.js?v=1');
        navScript.before(intel);
      }
      if (!document.querySelector('script[src*="stt-nav.js"]')) {
        const stt = document.createElement('script');
        stt.src = docUrl('/assets/js/stt-nav.js?v=3');
        navScript.before(stt);
      }
      if (!document.querySelector('script[src*="tts-nav.js"]')) {
        const tts = document.createElement('script');
        tts.src = docUrl('/assets/js/tts-nav.js?v=1');
        navScript.before(tts);
      }
    }
  }

  window.ShunyaHeaderNav = { init: initHeaderNav, HF_ICON };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
