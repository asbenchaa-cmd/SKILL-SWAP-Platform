/* ============================================================
   script-index.js — Index page interactions
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Init shared (header + auth) ── */
  SS.init('home');

  /* ── 2. Language: apply translations to static data-ar / data-fr ── */
  SS.onLangChange = applyLangTranslations;
  applyLangTranslations(SS.state.lang);

  function applyLangTranslations(lang) {
    const isAr = lang === 'ar';
    document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
      const val = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
      if (val && el.tagName !== 'INPUT') el.textContent = val;
    });
    document.querySelectorAll('[data-ar]:not([data-fr])').forEach(el => {
      if (!isAr) { /* keep original if no fr translation */ }
    });
  }

  /* ── 3. CTA / Hero buttons → open registration modal ── */
  ['btn-hero-start', 'btn-cta-journey'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      addRipple(btn, e);
      SS.openRegModal();
    });
  });

  /* ── 4. Ripple helper ── */
  function addRipple(el, e) {
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top  = y + 'px';
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  /* ── 5. Step cards scroll reveal ── */
  const stepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.step-item').forEach(el => stepObserver.observe(el));

  /* ── 6. "استكشف الدورات" / "Explorer les cours" button text sync ── */
  SS.onLangChange = function(lang) {
    applyLangTranslations(lang);
    const exploreBtn = document.querySelector('a[data-ar="استكشف الدورات"]');
    if (exploreBtn) {
      exploreBtn.textContent = lang === 'ar' ? 'استكشف الدورات' : 'Explorer les cours';
    }
  };

  /* ── 7. Scroll → nav shadow enhancement ── */
  const nav = document.getElementById('ss-header');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.background = window.scrollY > 40
      ? 'rgba(11,19,38,.97)'
      : 'rgba(11,19,38,.85)';
  }, { passive: true });

});
