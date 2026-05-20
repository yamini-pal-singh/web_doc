/* Text-to-Speech docs — grouped sidebar (Batch, Streaming, Voices, etc.) */
(function () {
  function getDocBase() {
    const link = document.querySelector('link[href*="main.css"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const i = href.indexOf('/assets/css/');
      if (i !== -1) return href.slice(0, i);
    }
    const script = document.querySelector('script[src*="shell.js"]');
    if (script) {
      const src = script.getAttribute('src') || '';
      const i = src.indexOf('/assets/js/');
      if (i !== -1) return src.slice(0, i);
    }
    return '/web_doc';
  }

  function docUrl(path) {
    const base = getDocBase();
    const p = path.charAt(0) === '/' ? path : '/' + path;
    return base + p;
  }

  function isTtsContext() {
    return /\/tts\//.test(window.location.pathname);
  }

  const NAV = [
    { id: 'title', title: 'Text-to-Speech (TTS)' },
    {
      id: 'batch',
      heading: 'Batch',
      open: true,
      items: [
        { label: 'Batch vs Streaming', path: '/tts/overview.html#batch-vs-streaming' },
        { label: 'Quickstart', path: '/tts/quickstart.html' },
        { label: 'POST /v1/audio/speech', path: '/tts/api-reference.html#post-speech' },
      ],
    },
    {
      id: 'streaming',
      heading: 'Streaming',
      open: true,
      items: [
        { label: 'Streaming (WebSocket)', path: '/tts/streaming.html' },
        { label: 'WebSocket /ws', path: '/tts/api-reference.html#websocket' },
      ],
    },
    {
      id: 'voices',
      heading: 'Voices and languages',
      open: true,
      items: [
        { label: 'Voices & languages', path: '/tts/voices.html' },
        { label: 'Expression styles', path: '/tts/expression-styles.html' },
        { label: 'Audio formats', path: '/tts/audio-formats.html' },
        { label: 'Voice cloning', path: '/tts/voice-cloning.html' },
      ],
    },
    {
      id: 'expression',
      heading: 'Expression styles',
      open: false,
      items: [
        { label: 'How tags work', path: '/tts/expression-styles.html#how-tags-work' },
        { label: 'The eleven styles', path: '/tts/expression-styles.html#the-eleven-styles' },
        { label: 'Style by use case', path: '/tts/expression-styles.html#style-by-use-case' },
        { label: 'Style pairing guide', path: '/tts/expression-styles.html#style-pairing-guide' },
        { label: 'Combining with speed & trim', path: '/tts/expression-styles.html#combining-with-speed-trim' },
      ],
    },
    {
      id: 'formats',
      heading: 'Audio formats',
      open: false,
      items: [
        { label: 'Format reference', path: '/tts/audio-formats.html#format-reference' },
        { label: 'Pick by use case', path: '/tts/audio-formats.html#pick-by-use-case' },
        { label: 'Per-format examples', path: '/tts/audio-formats.html#per-format-examples' },
        { label: 'Telephony (mulaw & alaw)', path: '/tts/audio-formats.html#telephony-mulaw-alaw' },
        { label: 'HTTP response headers', path: '/tts/audio-formats.html#http-response-headers' },
      ],
    },
    {
      id: 'cloning',
      heading: 'Voice cloning',
      open: false,
      items: [
        { label: 'How it works', path: '/tts/voice-cloning.html#how-it-works' },
        { label: 'Two cloning modes', path: '/tts/voice-cloning.html#two-cloning-modes' },
        { label: 'Reference audio requirements', path: '/tts/voice-cloning.html#reference-audio-requirements' },
        { label: 'Best practices', path: '/tts/voice-cloning.html#best-practices' },
        { label: 'Error cases', path: '/tts/voice-cloning.html#error-cases' },
      ],
    },
    {
      id: 'pipelines',
      heading: 'Pipelines',
      open: false,
      items: [{ label: 'LLM → TTS pipeline', path: '/tts/llm-to-tts.html' }],
    },
    {
      id: 'api',
      heading: 'API reference',
      open: false,
      items: [
        { label: 'Authentication', path: '/tts/api-reference.html#authentication' },
        { label: 'GET /health', path: '/tts/api-reference.html#health' },
        { label: 'Rate & concurrency limits', path: '/tts/api-reference.html#rate-limits' },
        { label: 'HTTP error status codes', path: '/tts/api-reference.html#http-error-status-codes' },
        { label: 'API reference', path: '/tts/api-reference.html' },
      ],
    },
  ];

  function isActive(path) {
    const here = window.location.pathname + window.location.hash;
    const basePath = docUrl(path.split('#')[0]);
    const hash = path.includes('#') ? '#' + path.split('#')[1] : '';
    if (hash) {
      return here === basePath + hash || (window.location.pathname === basePath && window.location.hash === hash);
    }
    return window.location.pathname === basePath || window.location.pathname.endsWith(path);
  }

  function sectionHasActive(section) {
    return section.items && section.items.some((item) => isActive(item.path));
  }

  function renderLink(item) {
    const href = docUrl(item.path);
    const active = isActive(item.path);
    return `<a class="product-nav-link${active ? ' active' : ''}" href="${href}"><span class="product-nav-link-label">${item.label}</span></a>`;
  }

  function renderSection(section) {
    if (section.title) {
      return `<div class="product-nav-title" role="presentation">${section.title}</div>`;
    }
    const open = section.open || sectionHasActive(section);
    const items = section.items.map(renderLink).join('');
    return `
      <div class="product-nav-group" data-group="${section.id}">
        <button type="button" class="product-nav-group-toggle" aria-expanded="${open ? 'true' : 'false'}">
          <span>${section.heading}</span>
          <svg class="product-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="product-nav-group-links" ${open ? '' : 'hidden'}>${items}</div>
      </div>`;
  }

  function renderSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('product-nav-sidebar');
    sidebar.innerHTML = `<div class="product-nav-sidebar-inner">${NAV.map(renderSection).join('')}</div>`;

    sidebar.querySelectorAll('.product-nav-group-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wrap = btn.closest('.product-nav-group');
        const panel = wrap.querySelector('.product-nav-group-links');
        const open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });

    const active = sidebar.querySelector('.product-nav-link.active');
    if (active) {
      sidebar.scrollTop = Math.max(0, active.offsetTop - sidebar.clientHeight / 3);
      const group = active.closest('.product-nav-group');
      if (group) {
        const panel = group.querySelector('.product-nav-group-links');
        const btn = group.querySelector('.product-nav-group-toggle');
        if (panel && panel.hidden) {
          panel.hidden = false;
          if (btn) btn.setAttribute('aria-expanded', 'true');
        }
      }
    }
  }

  function init() {
    if (!isTtsContext()) return;
    document.body.classList.add('tts-doc-mode');
    document.querySelector('.app')?.classList.add('app-tts-doc');
    renderSidebar();
  }

  window.ShunyaTtsNav = { init, isTtsContext, docUrl };
})();
