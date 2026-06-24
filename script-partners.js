/* ============================================================
   script-partners.js
   Firestore version: load real users from Firebase
   ============================================================ */

let PARTNERS_DATA = [];
let currentCityFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  SS.init('partners');

  SS.onLangChange = (lang) => {
    applyLang(lang);
    renderPartners(currentCityFilter);
  };

  applyLang(SS.state.lang);

  await loadPartnersFromFirestore();
  renderPartners('all');

  document.getElementById('city-filter')?.addEventListener('change', e => {
    currentCityFilter = e.target.value;
    renderPartners(currentCityFilter);
  });

  document.getElementById('ai-match-btn')?.addEventListener('click', () => {
    const lang = SS.state.lang;

    SS.toast(
      lang === 'ar'
        ? '🔍 الذكاء الاصطناعي يبحث عن أفضل الشركاء...'
        : '🔍 L’IA recherche les meilleurs partenaires...'
    );

    setTimeout(() => {
      SS.toast(
        lang === 'ar'
          ? '✅ وجدنا لك شركاء مناسبين حسب المهارات المتوفرة!'
          : '✅ Nous avons trouvé des partenaires adaptés selon les compétences disponibles !',
        'success',
        4000
      );
    }, 2200);
  });
});

async function loadPartnersFromFirestore() {
  const lang = SS.state.lang;

  if (!window.FB) {
    console.error("Firebase is not loaded.");
    SS.toast(
      lang === 'ar'
        ? 'Firebase غير محمل بعد'
        : 'Firebase n’est pas encore chargé',
      'error'
    );
    PARTNERS_DATA = [];
    return;
  }

  try {
    const usersRef = FB.collection(FB.db, "users");
    const snapshot = await FB.getDocs(usersRef);

    PARTNERS_DATA = snapshot.docs.map(docSnap => {
      const u = docSnap.data();

      const fullName =
        u.name ||
        [u.fname, u.lname].filter(Boolean).join(' ') ||
        (u.email ? u.email.split('@')[0] : 'User');

      const skill =
        u.skill ||
        u.offersAr ||
        u.offersFr ||
        '';

      return {
        uid: u.uid || docSnap.id,
        name: fullName,
        city: u.city || '',
        online: true,
        rating: u.rating || 0,
        offersAr: u.offersAr || skill || 'لم يحدد المهارة بعد',
        offersFr: u.offersFr || skill || 'Compétence non précisée',
        wantsAr: u.wantsAr || 'لم يحدد بعد ما يريد تعلمه',
        wantsFr: u.wantsFr || 'Objectif non précisé',
        tags: Array.isArray(u.tags) && u.tags.length
          ? u.tags
          : skill
            ? [skill]
            : ['SkillSwap'],
        img: u.photoURL || u.img || ''
      };
    });

    console.warn("Partners loaded from Firestore:", PARTNERS_DATA.length);

  } catch (error) {
    console.error("Error loading partners:", error);

    SS.toast(
      lang === 'ar'
        ? 'حدث خطأ أثناء تحميل الشركاء'
        : 'Erreur lors du chargement des partenaires',
      'error'
    );

    PARTNERS_DATA = [];
  }
}

function applyLang(lang) {
  const isAr = lang === 'ar';

  document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
    if (el.tagName !== 'INPUT' && el.tagName !== 'OPTION') {
      el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
    }
  });
}

function renderPartners(cityFilter) {
  const grid = document.getElementById('partners-grid');
  if (!grid) return;

  const lang = SS.state.lang;
  const isAr = lang === 'ar';

  const filtered =
    cityFilter === 'all'
      ? PARTNERS_DATA
      : PARTNERS_DATA.filter(p => p.city === cityFilter);

  if (!filtered.length) {
    grid.innerHTML = `
      <div class="col-span-4 text-center py-20 text-on-surface-variant">
        ${isAr ? 'لا يوجد شركاء حالياً' : 'Aucun partenaire pour le moment'}
      </div>
    `;
    return;
  }

  grid.innerHTML = '';

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.style.animationDelay = `${i * 0.08}s`;

    const exchangeLabel = isAr ? 'تواصل للتبادل' : 'Contacter';
    const offersLabel = isAr ? 'يقدم مهارة:' : 'Offre :';
    const wantsLabel = isAr ? 'يريد تعلم:' : 'Souhaite apprendre :';

    const firstLetter = p.name ? p.name.charAt(0) : '?';

    const avatarSrc = p.img
      ? p.img
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=222a3d&color=6bd8cb&size=128`;

    card.innerHTML = `
      <div class="partner-avatar-wrap">
        <img class="partner-avatar" src="${avatarSrc}" alt="${p.name}" loading="lazy" />
        <div class="partner-status ${p.online ? 'status-online' : 'status-offline'}"></div>
      </div>

      <div class="partner-name">${p.name}</div>

      <div class="partner-city">
        <span class="material-symbols-outlined" style="font-size:.875rem">location_on</span>
        ${p.city || (isAr ? 'غير محدد' : 'Non précisé')}
      </div>

      <div class="skill-box skill-offers">
        <p class="skill-label skill-label-offers">${offersLabel}</p>
        <p class="skill-text">${isAr ? p.offersAr : p.offersFr}</p>
      </div>

      <div class="skill-box skill-wants">
        <p class="skill-label skill-label-wants">${wantsLabel}</p>
        <p class="skill-text">${isAr ? p.wantsAr : p.wantsFr}</p>
      </div>

      <div class="partner-tags">
        ${p.tags.map(t => `<span class="partner-tag">${t}</span>`).join('')}
      </div>

      <div class="partner-footer">
        <div class="partner-rating">
          <span class="material-symbols-outlined" style="color:#ffb690;font-size:1rem;font-variation-settings:'FILL' 1">star</span>
          ${p.rating || 0}
        </div>

        <button class="btn-exchange" onclick="requestExchange('${p.name.replace(/'/g, "\\'")}')">
          ${exchangeLabel}
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function requestExchange(name) {
  const lang = SS.state.lang;

  if (!SS.state.user) {
    SS.openRegModal();
    return;
  }

  SS.toast(
    lang === 'ar'
      ? `✅ تم إرسال طلب التبادل إلى ${name}!`
      : `✅ Demande d’échange envoyée à ${name} !`
  );
}

window.requestExchange = requestExchange;