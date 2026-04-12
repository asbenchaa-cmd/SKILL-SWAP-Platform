/* ============================================================
   script-pricing.js — Billing toggle, subscriptions, payments
   ============================================================ */

const PAYMENT_METHODS = [
  { icon: 'credit_card',           nameAr: 'CIB / الذهبية',    nameFr: 'CIB / Carte dorée',      descAr: 'دفع فوري وآمن',             descFr: 'Paiement rapide et sécurisé', badge: 'POPULAR', badgeType: 'accent' },
  { icon: 'smartphone',            nameAr: 'BaridiMob',          nameFr: 'BaridiMob',               descAr: 'عبر تطبيق بريد الجزائر',    descFr: 'Via l\'app Poste Algérie',    badge: 'جديد',    badgeType: 'primary' },
  { icon: 'account_balance',       nameAr: 'تحويل بنكي',         nameFr: 'Virement bancaire',       descAr: 'CPA, BNA, BEA, BADR',       descFr: 'CPA, BNA, BEA, BADR',        badge: null },
  { icon: 'payments',              nameAr: 'دفع نقدي',           nameFr: 'Paiement en espèces',    descAr: 'في مراكزنا المعتمدة',       descFr: 'Dans nos centres agréés',     badge: null },
  { icon: 'language',              nameAr: 'Paysera',            nameFr: 'Paysera',                 descAr: 'دفع دولي سريع',             descFr: 'Paiement international rapide',badge: null },
  { icon: 'app_shortcut',          nameAr: 'Flexy / Mobilis',   nameFr: 'Flexy / Mobilis',         descAr: 'تعبئة رصيد هاتف',           descFr: 'Recharge téléphonique',       badge: null },
  { icon: 'account_balance_wallet',nameAr: 'PayPal',             nameFr: 'PayPal',                  descAr: 'عالمي وموثوق',              descFr: 'International et fiable',     badge: null },
  { icon: 'currency_bitcoin',      nameAr: 'Crypto USDT',        nameFr: 'Crypto USDT',             descAr: 'عبر محفظة Binance',         descFr: 'Via portefeuille Binance',    badge: null },
];

let isYearly = false;

document.addEventListener('DOMContentLoaded', () => {
  SS.init('pricing');
  SS.onLangChange = (lang) => {
    applyLang(lang);
    renderPayments();
  };

  applyLang(SS.state.lang);
  renderPayments();
  setupBillingToggle();
  setupPlanButtons();
});

/* ── Language ── */
function applyLang(lang) {
  const isAr = lang === 'ar';
  document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
    if (el.tagName !== 'INPUT') el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
  });
  // Update billing period label
  document.querySelectorAll('.billing-period').forEach(el => {
    el.textContent = isAr ? (isYearly ? 'دج/سنة' : 'دج/شهر') : (isYearly ? 'DA/an' : 'DA/mois');
  });
}

/* ── Billing Toggle ── */
function setupBillingToggle() {
  const toggle   = document.getElementById('billing-toggle');
  const monthly  = document.getElementById('label-monthly');
  const yearly   = document.getElementById('label-yearly');

  toggle?.addEventListener('click', () => {
    isYearly = !isYearly;
    toggle.setAttribute('aria-checked', String(isYearly));

    // Label styles
    if (isYearly) {
      monthly.classList.remove('billing-label-active'); monthly.style.opacity = '.45';
      yearly.classList.add('billing-label-active');    yearly.style.opacity = '1';
    } else {
      yearly.classList.remove('billing-label-active');  yearly.style.opacity = '.45';
      monthly.classList.add('billing-label-active');   monthly.style.opacity = '1';
    }

    // Update prices
    document.querySelectorAll('.price-display').forEach(el => {
      const val = parseFloat(isYearly ? el.dataset.yearly : el.dataset.monthly);
      el.classList.add('price-flash');
      el.addEventListener('animationend', () => el.classList.remove('price-flash'), { once: true });
      el.textContent = val === 0 ? '0' : val.toLocaleString();
    });

    // Update period labels
    const lang = SS.state.lang;
    document.querySelectorAll('.billing-period').forEach(el => {
      el.textContent = lang === 'ar' ? (isYearly ? 'دج/سنة' : 'دج/شهر') : (isYearly ? 'DA/an' : 'DA/mois');
    });
  });
}

/* ── Plan Buttons ── */
function setupPlanButtons() {
  document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      if (!SS.state.user) {
        SS.openRegModal();
        return;
      }
      const lang = SS.state.lang;
      const period = isYearly ? (lang === 'ar' ? 'سنوي' : 'annuel') : (lang === 'ar' ? 'شهري' : 'mensuel');
      SS.toast(lang === 'ar'
        ? `✅ تم الاشتراك في خطة ${plan} (${period}) بنجاح!`
        : `✅ Abonnement au plan ${plan} (${period}) réussi !`);
    });
  });
}

/* ── Payment Methods ── */
function renderPayments() {
  const grid = document.getElementById('payment-methods-grid');
  if (!grid) return;
  const lang = SS.state.lang;
  const isAr = lang === 'ar';

  grid.innerHTML = PAYMENT_METHODS.map(m => {
    const badgeHtml = m.badge
      ? `<div class="absolute -top-3 left-4"><span class="${m.badgeType === 'accent' ? 'accent-glow text-white' : 'bg-primary text-on-primary'} text-[10px] font-black px-2 py-0.5 rounded-full">${m.badge}</span></div>`
      : '';
    return `
      <div class="payment-card relative" onclick="SS.toast('${isAr ? '💳 ' + m.nameAr : '💳 ' + m.nameFr}')">
        ${badgeHtml}
        <div class="payment-icon">
          <span class="material-symbols-outlined text-primary">${m.icon}</span>
        </div>
        <h4 class="font-headline font-bold text-lg mb-1">${isAr ? m.nameAr : m.nameFr}</h4>
        <p class="text-on-surface-variant text-sm">${isAr ? m.descAr : m.descFr}</p>
      </div>
    `;
  }).join('');
}
