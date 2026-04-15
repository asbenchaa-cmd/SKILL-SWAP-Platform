/* ============================================================
   script-partners.js
   ============================================================ */

const PARTNERS_DATA = [
  { name:'يوسف', city:'وهران', online:true,  rating:4.9, offersAr:'تطوير واجهات الويب (React)', offersFr:'Développement Web (React)', wantsAr:'التصوير السينمائي', wantsFr:'Cinématographie', tags:['JavaScript','Tailwind','SEO'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCYyHXShb8sMWhZ5nllD8SkQ0IRbGAyMxHwMrets2FZPFO6WoXpkcwJEkUxyrMCua0s5gnDW7voe97Qrw2UluFSqaxmXglj8hy1lIhBC3wABRKW0hdMOcrZrqVxTFoW4kiPi0DYNH_3nrfaJWAQgXelFlFgObO9nbXkbwBX1kpjKxZqOgT5yNVuJOwnH7Ctaboh_O9ePVYHyZCOfvQQaljS1MIRuoogYN9Y2-dsz2y0H8yXUK248QfTfFjlCqw5DxyBg517GkhEt_w' },
  { name:'لينا', city:'الجزائر', online:false, rating:5.0, offersAr:'تصميم الهوية البصرية (Branding)', offersFr:'Design Identité Visuelle', wantsAr:'اللغة الألمانية', wantsFr:'Langue allemande', tags:['Illustrator','Logo Design'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBfwr_VCcS1fLqK1nq12OR79CcoFfGUY5bXIos8IvhejtUBO-RqQCZUVBGWyscfIpnygaNB-8fQLlXJLfQr0qq1mlIRqrfSbP16xCbA_y38EEhuAlrxwDrIFkiM6ncujdiYoKaQrK0IAQ41AZFfxqymPi8f2CKpbmyVmsjaF9w3dMAOytQ7KlyOeDwCXYL5brdNcHyPWTF_92Xphny2orae6gtJp7oLAohEo7dnxIQpac9kAppn4Ty49MEO3pfBaNmYI_fHldqOZJg' },
  { name:'سامي', city:'قسنطينة', online:true, rating:4.8, offersAr:'تحليل البيانات (Python)', offersFr:'Analyse de données (Python)', wantsAr:'صناعة المحتوى الرقمي', wantsFr:'Création de contenu', tags:['Pandas','Statistics'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAnxH7iDjpgOjM2ZWLI6vFt7yHZpI7-X452IS4TsjEBfd7HCnq7ifb0qzUk40JDr6Cxj7-syfTEzesK2XbWHXUQhvbjIaYcQedPPipE7eBHsSkf3v2NBkGzq1EQrVHKDqjmcnMhiTRkR_Uo5c5oZ5PkNtLlW_9Xp1CHyeqNU33cxxA29kv389asFs9nMaBUGL0SfCZkCmo8l4EtX6Y24JRnXPfAHC4zDDNbG5qxwpyYAPUPRiwCS57oxTni2QyChnmtnSywqbaMAa0' },
  { name:'فاطمة', city:'عنابة', online:true,  rating:4.7, offersAr:'التسويق عبر البريد الإلكتروني', offersFr:'Email Marketing', wantsAr:'أساسيات UI/UX', wantsFr:'Bases UI/UX', tags:['Mailchimp','Copywriting'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3LULkio3U4ueQjtjTu-Dbd8fuYyciHJxDJKQY2tAnsmHj0VfSKcBgbNWq7uVm8F5zydsUDiKKMLrYr4-_2kWY8QYBlpNlaX4gFf6x5TubPpCVfl-Ri0fr5SrvqVJXsX9ravXpZ9MxA7NNpl-sL8MHgdhrQK2-ReA2cNtGyYu9ApHE3tcNE9JII4pRoq3_aE6beRlQ_rGkLX-J_0d_mIu2uzEqMKb8v0wF-gS0Fx3YKKRvvXhWdo0xzWeltBhiNbIABIISK2W-bM' },
  { name:'أمين', city:'سطيف', online:false, rating:4.9, offersAr:'تحرير الفيديو (Premiere Pro)', offersFr:'Montage vidéo (Premiere Pro)', wantsAr:'إدارة المشاريع الرشيقة', wantsFr:'Gestion de projets Agile', tags:['After Effects','Color Grading'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCS6VdYsffJ2HZiuh26g-0k8qqzU0laNGyPxBjNWIFftDfH_p6CWgfrK-zQnBduQIFha58UpIjN5yIm7FhxgQJHnEuPw6wqcYbQImmPGUTlvyDQNC0Q8zduwaBI8_yUeCkQwojwl7NskR2w42VQYAu5at4QxyBx8ksSoZC2ZLLtZnk-JOl-VHb_VqPe12c3OmqPp-wrg9JPWVzzBnvzokvV12JClMlHK6fzlOvLYGVYElLRcziqv-zm-Zyq-jsW6OkUf6XhWrd0bdk' },
  { name:'مروان', city:'تلمسان', online:true, rating:5.0, offersAr:'كتابة المقالات الأدبية', offersFr:'Rédaction d\'articles', wantsAr:'تصميم المواقع (Webflow)', wantsFr:'Webdesign (Webflow)', tags:['SEO Writing','Blogging'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBOE7Thp9XjKBtGaYo4y6tN9RF4nmKONkmxdP9n6RS_TRsp9ZzmiT7Z_HBqG0Pdm9hb7G6BBHbbPhnN0MGsqr9MA-UouKAbgCJ4rCPZmYMGzy5hw-UmrkinbyORTJHL9XCeN4y0PqSbYB0R8x5QHQmkEOr-63cJwHGzhDE2NB48HYXhsgXycnlrIwTmmFFYi7-ypkUcMo11klQAfWIdzN7ExnWxzs5ScpiGYNKFpf0ghQfaTew4BYTy-3WqfgdGWdbsZNeiupSVFDA' },
  { name:'كريم', city:'الجزائر', online:false, rating:4.6, offersAr:'إدارة منصات التواصل الاجتماعي', offersFr:'Gestion des réseaux sociaux', wantsAr:'تحليل البيانات الضخمة', wantsFr:'Big Data', tags:['Instagram','Facebook Ads'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBWhrVKQ6OOtl_aHxwXdx7DeHQvbbWZTScxuY6jptF9HRytK6HHSER1artKOttFt02vuCgM-3yUB7rARcg2i1-MC04yO9vLraTJOkaAQOeAuAvQymCuYobnLHM97victoJ1F7xK71zPgIebEbtROuan5VVsSxyG4QndXOsog01iehk_xn6gKPDdm7mWBSAjCrV9DTefcKfWbcJR4Je5LkD-q_mwGb2JaqALptQ6hz4zoJEQIbNvHce2Byw3b_7uhtkiQN4gmi3Ra3I' },
  { name:'منير', city:'وهران', online:true, rating:4.9, offersAr:'تحسين محركات البحث (SEO)', offersFr:'Référencement naturel (SEO)', wantsAr:'اللغة الإنجليزية للأعمال', wantsFr:'Anglais des affaires', tags:['Google Analytics','Ahrefs'], img:'https://lh3.googleusercontent.com/aida-public/AB6AXuDLl7mjHoi2B5Q2_kA7LcaAJN5LU6WGEND1zqU3kfOAObf6aS25qmXM1jhDo3fZbLRDDFfQJij82rUlJ8y_-q3xlE753yhSliIiG-ESxBnKvv6p1GwotlVN54VPHGs1Kyj_j5cgXPZACHQfMXGEOvZISpaDNmwCyRsfx883XjvrnMI8w0l6C9Zx8wP-FhfReB-IVq7S1bkDK7KbwNRysJuiEmw-BrTPvLppUHVGsIuzCUSF77g2XWFqoVM2fFyv-SKkHAn03XrqA08' },
];

document.addEventListener('DOMContentLoaded', () => {
  SS.init('partners');
  SS.onLangChange = (lang) => { applyLang(lang); renderPartners('all'); };
  applyLang(SS.state.lang);
  renderPartners('all');

  document.getElementById('city-filter')?.addEventListener('change', e => renderPartners(e.target.value));

  document.getElementById('ai-match-btn')?.addEventListener('click', () => {
    const lang = SS.state.lang;
    SS.toast(lang === 'ar' ? '🔍 الذكاء الاصطناعي يبحث عن أفضل الشركاء...' : '🔍 L\'IA recherche les meilleurs partenaires...');
    setTimeout(() => {
      SS.toast(lang === 'ar' ? '✅ وجدنا لك 3 شركاء مثاليين في وهران وسطيف!' : '✅ Nous avons trouvé 3 partenaires idéaux pour vous !', 'success', 4000);
    }, 2200);
  });
});

function applyLang(lang) {
  const isAr = lang === 'ar';
  document.querySelectorAll('[data-ar][data-fr]').forEach(el => {
    if (el.tagName !== 'INPUT' && el.tagName !== 'OPTION') el.textContent = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-fr');
  });
}

function renderPartners(cityFilter) {
  const grid = document.getElementById('partners-grid');
  if (!grid) return;
  const lang = SS.state.lang;
  const isAr = lang === 'ar';

  const filtered = cityFilter === 'all' ? PARTNERS_DATA : PARTNERS_DATA.filter(p => p.city === cityFilter);

  if (!filtered.length) {
    grid.innerHTML = `<div class="col-span-4 text-center py-20 text-on-surface-variant">${isAr ? 'لا يوجد شركاء في هذه الولاية حالياً' : 'Aucun partenaire dans cette wilaya pour le moment'}</div>`;
    return;
  }

  grid.innerHTML = '';
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'partner-card';
    card.style.animationDelay = `${i * 0.08}s`;
    const exchangeLabel = isAr ? 'تواصل للتبادل' : 'Contacter';
    const offersLabel  = isAr ? 'يقدم مهارة:' : 'Offre :';
    const wantsLabel   = isAr ? 'يريد تعلم:' : 'Souhaite apprendre :';
    card.innerHTML = `
      <div class="partner-avatar-wrap">
        <img class="partner-avatar" src="${p.img}" alt="${p.name}" loading="lazy"
          onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2288%22 height=%2288%22><rect fill=%22%23222a3d%22 width=%2288%22 height=%2288%22/><text x=%2244%22 y=%2258%22 fill=%22%236bd8cb%22 font-size=%2240%22 text-anchor=%22middle%22>${p.name[0]}</text></svg>'" />
        <div class="partner-status ${p.online ? 'status-online' : 'status-offline'}"></div>
      </div>
      <div class="partner-name">${p.name}</div>
      <div class="partner-city">
        <span class="material-symbols-outlined" style="font-size:.875rem">location_on</span>
        ${p.city}
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
          ${p.rating}
        </div>
        <button class="btn-exchange" onclick="requestExchange('${p.name}')">${exchangeLabel}</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function requestExchange(name) {
  const lang = SS.state.lang;
  if (!SS.state.user) { SS.openRegModal(); return; }
  SS.toast(lang === 'ar' ? `✅ تم إرسال طلب التبادل إلى ${name}!` : `✅ Demande d'échange envoyée à ${name} !`);
}
window.requestExchange = requestExchange;
