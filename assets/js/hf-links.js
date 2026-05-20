/* Link Shunya model identifiers in doc content to Hugging Face repos or Spaces. */
(function () {
  const HF_REPOS = {
    'pingala-v1-universal': 'https://huggingface.co/shunyalabs/pingala-v1-universal',
    'zero-universal': 'https://huggingface.co/shunyalabs/pingala-v1-universal',
    'zero-stt-hinglish': 'https://huggingface.co/shunyalabs/zero-stt-hinglish',
    'zero-codeswitch': 'https://huggingface.co/shunyalabs/zero-stt-hinglish',
    'vak-translate-1.3b-ct2': 'https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2',
    'vak-translate-1.3b': 'https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2',
    'pingala-v1-en-verbatim': 'https://huggingface.co/shunyalabs/pingala-v1-en-verbatim',
  };

  const HF_SPACES = {
    'zero-med': 'https://huggingface.co/spaces/shunyalabs/Zero_STT_Med_Shunya_Labs',
    'Zero STT Med': 'https://huggingface.co/spaces/shunyalabs/Zero_STT_Med_Shunya_Labs',
    'Zero STT (Universal)': 'https://huggingface.co/shunyalabs/pingala-v1-universal',
    'Zero STT Indic': 'https://huggingface.co/spaces/shunyalabs/Zero-STT-Shunya-Labs',
    'Zero TTS': 'https://huggingface.co/spaces/shunyalabs/TTS-Indic',
    'Vāķ Translate': 'https://huggingface.co/shunyalabs/vak-translate-1.3b-ct2',
  };

  function zeroIndicUrl() {
    return window.location.pathname.includes('/tts/')
      ? 'https://huggingface.co/spaces/shunyalabs/TTS-Indic'
      : 'https://huggingface.co/spaces/shunyalabs/Zero-STT-Shunya-Labs';
  }

  function hrefFor(text) {
    if (text === 'zero-indic') return zeroIndicUrl();
    return HF_REPOS[text] || HF_SPACES[text] || null;
  }

  function wrapElement(el) {
    if (el.closest('a, pre, script, .callout-title')) return;
    if (el.dataset.hfLinked === '1') return;
    const text = el.textContent.trim();
    const href = hrefFor(text);
    if (!href) return;

    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = 'View on Hugging Face';
    a.className = 'hf-model-link hf-external-link';
    el.parentNode.insertBefore(a, el);
    a.appendChild(el);
    el.dataset.hfLinked = '1';
  }

  function init() {
    const root = document.querySelector('.content');
    if (!root) return;
    root.querySelectorAll('code, strong, td').forEach(function (el) {
      if (el.tagName === 'TD') {
        const code = el.querySelector(':scope > code, :scope > strong');
        if (code) wrapElement(code);
        return;
      }
      wrapElement(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
