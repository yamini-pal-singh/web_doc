/* Shared Mermaid bootstrap.
 * Picks themeVariables that match the rest of the site (Inter font,
 * slate base, indigo/violet accents) and re-renders diagrams when
 * the user toggles light/dark/auto via the header theme switch. */
(function () {
  if (typeof window === 'undefined') return;

  const DARK = {
    background: 'transparent',
    primaryColor: '#1e293b',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#475569',
    secondaryColor: '#312e81',
    secondaryTextColor: '#e0e7ff',
    secondaryBorderColor: '#4f46e5',
    tertiaryColor: '#1e1b4b',
    tertiaryTextColor: '#ddd6fe',
    tertiaryBorderColor: '#7c3aed',
    lineColor: '#94a3b8',
    textColor: '#e2e8f0',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    nodeBorder: '#475569',
    edgeLabelBackground: '#0f172a',
    clusterBkg: '#0f172a',
    clusterBorder: '#334155',
    actorBkg: '#1e293b',
    actorBorder: '#475569',
    actorTextColor: '#e2e8f0',
    actorLineColor: '#64748b',
    signalColor: '#cbd5e1',
    signalTextColor: '#e2e8f0',
    labelBoxBkgColor: '#1e293b',
    labelBoxBorderColor: '#475569',
    labelTextColor: '#e2e8f0',
    loopTextColor: '#e2e8f0',
    noteBkgColor: '#312e81',
    noteTextColor: '#e0e7ff',
    noteBorderColor: '#4f46e5',
  };

  const LIGHT = {
    background: 'transparent',
    primaryColor: '#f8fafc',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#cbd5e1',
    secondaryColor: '#eef2ff',
    secondaryTextColor: '#1e1b4b',
    secondaryBorderColor: '#6366f1',
    tertiaryColor: '#faf5ff',
    tertiaryTextColor: '#3b0764',
    tertiaryBorderColor: '#a855f7',
    lineColor: '#64748b',
    textColor: '#0f172a',
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: '14px',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#f8fafc',
    clusterBorder: '#cbd5e1',
    actorBkg: '#f8fafc',
    actorBorder: '#cbd5e1',
    actorTextColor: '#0f172a',
    actorLineColor: '#94a3b8',
    signalColor: '#475569',
    signalTextColor: '#0f172a',
    labelBoxBkgColor: '#f1f5f9',
    labelBoxBorderColor: '#cbd5e1',
    labelTextColor: '#0f172a',
    loopTextColor: '#0f172a',
    noteBkgColor: '#fef3c7',
    noteTextColor: '#78350f',
    noteBorderColor: '#f59e0b',
  };

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function config() {
    return {
      startOnLoad: true,
      theme: 'base',
      themeVariables: isDark() ? DARK : LIGHT,
      flowchart: { curve: 'basis', padding: 14, htmlLabels: true },
      sequence: { useMaxWidth: true, mirrorActors: false, bottomMarginAdj: 0 },
      securityLevel: 'loose',
    };
  }

  function init() {
    if (typeof mermaid === 'undefined') return false;
    mermaid.initialize(config());
    return true;
  }

  // Initial render — guard for the case where mermaid loads after this script.
  if (!init()) {
    const ready = setInterval(() => { if (init()) clearInterval(ready); }, 50);
  }

  // Re-render every diagram when the theme class on <html> changes,
  // so light → dark (or back) doesn't leave stale colours on the page.
  let rerendering = false;
  const observer = new MutationObserver(async () => {
    if (typeof mermaid === 'undefined' || rerendering) return;
    rerendering = true;
    mermaid.initialize(config());
    document.querySelectorAll('.mermaid').forEach((el) => {
      // Save the original source the first time we see this node
      if (!el.dataset.mermaidSource) {
        el.dataset.mermaidSource = el.getAttribute('data-src') || el.textContent.trim();
      }
      el.removeAttribute('data-processed');
      el.innerHTML = el.dataset.mermaidSource;
    });
    try { await mermaid.run({ querySelector: '.mermaid' }); } catch (e) {}
    rerendering = false;
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
})();
